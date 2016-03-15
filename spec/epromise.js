/** Defines the tests to run for the extended promise */
(function extendedPromiseTests() {

    var Promise = require('../src/epromise.js');
    describe('Extended Promise', function () {
        beforeEach(function () {
            Promise.trace = true;
        });
        it('should be a function', function () {
            expect(Promise).toEqual(jasmine.any(Function));
        });
        it('should expect a single function argument', function () {
            expect(createNewProm()).toThrowError(/must.*function/i);
            expect(createNewProm(123)).toThrowError(/must.*function/i);
            expect(createNewProm('foo')).toThrowError(/must.*function/i);
            expect(createNewProm(noop)).not.toThrow();
            function createNewProm(arg) {
                return function () {
                    return new Promise(arg);
                };
            }
        });
        it('should call the supplied function argument with the resolve, reject and notify functions', function () {
            var called = false;
            new Promise(exec);
            expect(called).toBe(true);

            function exec(resolve, reject, notify) {
                called = true;
                expect(resolve).toEqual(jasmine.any(Function));
                expect(reject).toEqual(jasmine.any(Function));
                expect(notify).toEqual(jasmine.any(Function));
            }
        });

        describe('defer', function () {
            it('should be a function', function () {
                expect(Promise.defer).toEqual(jasmine.any(Function));
            });
            it('should return an object containing the promise, resolve, reject and notify properties', function () {
                var deferred = Promise.defer();
                expect(deferred.promise).toEqual(jasmine.any(Promise));
                expect(deferred.resolve).toEqual(jasmine.any(Function));
                expect(deferred.reject).toEqual(jasmine.any(Function));
                expect(deferred.notify).toEqual(jasmine.any(Function));
            });
        });

        describe('ExtendedPromise.callback', function () {
            it('should be a function', function () {
                expect(Promise.callback).toEqual(jasmine.any(Function));
            });
            it('should return a function which, when called, will call the originally supplied function with' +
                ' a callback, and tie a returned promise to said callback', function (done) {
                var called = {
                    res: 0,
                    rej: 0
                };
                checkRes()
                    .then(checkRej)
                    .then(done);

                function checkRes() {
                    var result = Promise.callback(handler, 'foo', null, 'result')
                        .then(res)
                        .catch(rej)
                        .finally(checkCounts(1, 0));
                    expect(result).toEqual(jasmine.any(Promise));
                    return result;
                }

                function checkRej() {
                    var result = Promise.callback(handler, 'foo', 'err', null)
                        .then(res)
                        .catch(rej);
                    expect(result).toEqual(jasmine.any(Promise));
                    return result;
                }

                function checkCounts(res, rej) {
                    return function () {
                        expect(called.res).toBe(res);
                        expect(called.rej).toBe(rej);
                    };
                }

                function handler(arg, err, res, cb) {
                    expect(arg).toBe('foo');
                    expect(cb).toEqual(jasmine.any(Function));
                    cb(err, res);
                }
                function res(arg) {
                    expect(arg).toBe('result');
                    called.res++;
                }
                function rej(err) {
                    expect(err).toBe('err');
                    called.rej++;
                }
            });
        });

        describe('Instance functions', function () {
            describe('then', function () {
                var prom;
                beforeEach(function () {
                    prom = new Promise(noop);
                });
                it('should be a function', function () {
                    expect(prom.then).toEqual(jasmine.any(Function));
                });
                it('should return the promise', function () {
                    expect(prom.then(noop)).toBe(prom);
                });
                it('allow an onResolved, onRejected and onNotified to be passed', function (done) {
                    var counts = {
                        res: 0,
                        rej: 0,
                        noti: 0
                    };
                    prom = new Promise(function (res, rej, noti) {
                        noti('baz');
                        process.nextTick(function () {
                            res('foo');
                        });
                    });
                    prom
                        .then(onRes, onRej, onNoti)
                        .then(checkCounts(1, 0, 1))
                        .then(function () {
                            return new Promise(function (res, rej, noti) {
                                noti('baz');
                                process.nextTick(function () {
                                    rej('err');
                                });
                            })
                                .then(onRes, onRej, onNoti)
                                .then(checkCounts(1, 0, 1));
                        })
                        .then(done);

                    function onRes(arg) {
                        expect(arg).toBe('foo');
                        counts.res++;
                    }

                    function onRej(arg) {
                        expect(arg).toBe('err');
                        counts.rej++;
                    }

                    function onNoti(arg) {
                        expect(arg).toBe('baz');
                        counts.noti++;
                    }

                    function checkCounts(res, rej, noti) {
                        return function () {
                            expect(counts.res).toBe(res);
                            expect(counts.rej).toBe(rej);
                            expect(counts.noti).toBe(noti);
                        };
                    }
                });

                describe('notify', function () {
                    it('should be a function', function () {
                        expect(prom.notify).toEqual(jasmine.any(Function));
                    });
                    it('add a handler to be executed if the executor notify function is called', function (done) {
                        var count = 0;

                        new Promise(function (res, rej, noti) {
                            process.nextTick(function () {
                                noti('foo');
                                noti('foo');
                                res();
                            });
                        })
                            .notify(onNotify)
                            .then(checkCount(2))
                            .then(done);

                        function checkCount(val) {
                            return function () {
                                expect(count).toBe(val);
                            };
                        }

                        function onNotify(arg) {
                            expect(arg).toBe('foo');
                            count++;
                        }
                    });
                    it('should execute all handlers regardless of whether errors are thrown in any handlers', function (done) {
                        var count = 0, tmp;

                        tmp = console.error;
                        console.error = noop;
                        new Promise(function (res, rej, noti) {
                            process.nextTick(function () {
                                noti('foo');
                                noti('foo');
                                res();
                            });
                        })
                            .notify(onErrNotify)
                            .notify(onNotify)
                            .then(checkCount(2))
                            .then(function () {
                                console.error = tmp;
                            })
                            .then(done);

                        function checkCount(val) {
                            return function () {
                                expect(count).toBe(val);
                            };
                        }

                        function onErrNotify(arg) {
                            expect(arg).toBe('foo');
                            throw new Error();
                        }

                        function onNotify(arg) {
                            expect(arg).toBe('foo');
                            count++;
                        }
                    });
                    it('should not execute once the promise is complete', function (done) {
                        var cnt = 0;
                        new Promise(function (res, rej, noti) {
                            process.nextTick(function () {
                                res();
                                noti('foo');
                                noti('foo');
                            });
                        })
                            .notify(function () { cnt++; })
                            .then(function () {
                                expect(cnt).toBe(0);
                            })
                            .then(done);
                    });
                    it('should return the promise', function () {
                        expect(prom.notify(noop)).toBe(prom);
                    });
                });

                describe('finally', function () {
                    it('should be a function', function () {
                        expect(prom.finally).toEqual(jasmine.any(Function));
                    });
                    it('should return the promise', function () {
                        expect(prom.finally(noop)).toEqual(prom);
                    });
                    it('add a handler to be executed if the executor then or catch functions are called', function (done) {
                        var count = 0;
                        prom = new Promise(function (res) {
                            res();
                        });
                        prom.finally(onDone);
                        prom.then(function () {
                            prom = new Promise(function (res, rej) {
                                rej();
                            });
                            prom.finally(onDone);
                            prom.catch(function () {
                                expect(count).toBe(2);
                                done();
                            });
                        });

                        function onDone() {
                            count++;
                        }
                    });
                });

                describe('callback', function () {
                    it('should be a function', function () {
                        expect(prom.callback).toEqual(jasmine.any(Function));
                    });
                    it('should return the promise', function () {
                        expect(prom.callback(noop)).toBe(prom);
                    });
                    it('should take a callback function that is executed when the promise is resolved or rejected', function (done) {
                        var prom, count = 0;

                        checkComplete()
                            .then(checkError)
                            .then(done);

                        function checkComplete() {
                            var prom = new Promise(function (res) {
                                res('foo');
                            });
                            prom
                                .callback(onComplete)
                                .then(checkCount(1));
                            return prom;
                        }

                        function checkError() {
                            var prom = new Promise(function (res, rej) {
                                rej('bar');
                            });
                            prom
                                .callback(onError)
                                .then(checkCount(2));
                            return prom;
                        }

                        function checkCount(val) {
                            return function () {
                                expect(count).toBe(val);
                            };
                        }

                        function onComplete(err, res) {
                            count++;
                            expect(err).toBe(null);
                            expect(res).toBe('foo');
                        }
                        function onError(err) {
                            count++;
                            expect(err).toBe('bar');
                        }
                    });
                });
            });
        });
    });

    describe('all(promises)', function () {
        it('should be a function', function () {
            expect(Promise.all).toEqual(jasmine.any(Function));
        });
        it('should return a promise that is resolved once all supplied promises have resolved', function (done) {
            var d1 = Promise.defer(),
                d2 = Promise.defer(),
                d3 = Promise.defer(),
                all,
                complete;
            complete = false;
            all = Promise.all([d1.promise, d2.promise, d3.promise]);
            all.then(onComplete);
            expect(complete).toBe(false);
            d1.resolve(1);
            setTimeout(function () {
                expect(complete).toBe(false);
                d2.resolve(2);
                setTimeout(function () {
                    expect(complete).toBe(false);
                    d3.resolve(3);
                    setTimeout(function () {
                        expect(complete).toBe(true);
                        done();
                    }, 10);
                }, 10);
            }, 10);

            /**
            * Called once the promises have all completed.
            * @param {array} arg An array of results from the promises.
            */
            function onComplete(arg) {
                expect(arg).toEqual(jasmine.any(Array));
                expect(arg.length).toBe(3);
                expect(arg[0]).toBe(1);
                expect(arg[1]).toBe(2);
                expect(arg[2]).toBe(3);
                complete = true;
            }

        });
        it('should return a promise that is rejected as soon as any supplied promise rejects', function (done) {
            var d1 = Promise.defer(),
                d2 = Promise.defer(),
                d3 = Promise.defer(),
                all,
                complete;
            complete = false;
            all = Promise.all([d1.promise, d2.promise, d3.promise]);
            all.catch(onRejected);
            expect(complete).toBe(false);
            d1.resolve(1);
            setTimeout(function () {
                expect(complete).toBe(false);
                d2.reject('foo bar');
                setTimeout(function () {
                    expect(complete).toBe(true);
                    done();
                }, 10);
            }, 10);

            /**
            * Called once the promises have all completed.
            * @param {array} arg An array of results from the promises.
            */
            function onRejected(arg) {
                expect(arg).toBe('foo bar');
                complete = true;
            }
        });
    });

    describe('race(promises)', function () {
        it('should be a function', function () {
            expect(Promise.race).toEqual(jasmine.any(Function));
        });
        it('should return a promise that is resolved any of the promises have resolved', function (done) {
            var d1 = Promise.defer(),
                d2 = Promise.defer(),
                d3 = Promise.defer(),
                all,
                complete;
            complete = false;
            all = Promise.race([d1.promise, d2.promise, d3.promise]);
            all.then(onComplete);
            expect(complete).toBe(false);
            d1.resolve(1);
            setTimeout(function () {
                expect(complete).toBe(true);
                done();
            }, 10);

            /**
            * Called once the promises have all completed.
            * @param {array} arg An array of results from the promises.
            */
            function onComplete(arg) {
                expect(arg).toBe(1);
                complete = true;
            }
        });
        it('should return a promise that is rejected as soon as any supplied promise rejects', function (done) {
            var d1 = Promise.defer(),
                d2 = Promise.defer(),
                d3 = Promise.defer(),
                all,
                complete;
            complete = false;
            all = Promise.race([d1.promise, d2.promise, d3.promise]);
            all.catch(onRejected);
            expect(complete).toBe(false);
            d1.reject(1);
            setTimeout(function () {
                expect(complete).toBe(true);
                done();
            }, 10);

            /**
            * Called once the promises have all completed.
            * @param {array} arg An array of results from the promises.
            */
            function onRejected(arg) {
                expect(arg).toBe(1);
                complete = true;
            }
        });
    });

    describe('resolve(arg)', function () {
        it('should be a function', function () {
            expect(Promise.resolve).toEqual(jasmine.any(Function));
        });
        it('should return a promise that is already resolved with the supplied arg', function (done) {
            var prom = Promise.resolve('foo bar'),
                complete = false;
            prom.then(onComplete);
            setTimeout(function () {
                expect(complete).toBe(true);
                done();
            }, 10);
            function onComplete(arg) {
                expect(arg).toBe('foo bar');
                complete = true;
                done();
            }
        });
    });

    describe('reject(arg)', function () {
        it('should be a function', function () {
            expect(Promise.reject).toEqual(jasmine.any(Function));
        });
        it('should return a promise that is already rejected with the supplied arg', function (done) {
            var prom = Promise.reject('foo bar'),
                complete = false;
            prom.catch(onComplete);
            setTimeout(function () {
                expect(complete).toBe(true);
                done();
            }, 10);
            function onComplete(arg) {
                expect(arg).toBe('foo bar');
                complete = true;
                done();
            }
        });
    });

    function noop() { }
}());
