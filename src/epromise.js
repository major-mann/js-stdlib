/**
* Extended promise module that extends native promises with some additional
*   functions to assist in working with them.
* @param {object} module The module to export to.
* @param {function} Promise The global promise function.
* @param {object} console The logging object.
* @param {object} process The global process control object (used for nextTick)
*/
(function epromiseModule(module, Promise, console, process) {
    'use strict';
    // Expose the extended promise.
    /* istanbul ignore else */
    if (Promise) {
        module.exports = ExtendedPromise;
    } else {
        module.exports = undefined;
    }

    /**
    * Defines the ExtendedPromise constructor which defines extended promise
    *   functions.
    * @param {function} executor The promise executor. This will be called
    *   with the following signature (resolve, reject, notify).
    */
    function ExtendedPromise(executor) {
        var self = this,
            notifyHandlers = [],
            completed = false,
            notTicked = [],
            prom;
        checkPromise();
        if (typeof executor !== 'function') {
            throw new Error('supplied executor MUST be a function');
        }
        // Call the base constructor
        prom = new Promise(exec);
        this.prototype = prom;
        this.trace = ExtendedPromise.trace;

        // Instance functions
        this.then = then;
        self.catch = prom.catch;
        this.notify = notify;
        this.finally = complete;
        this.callback = callback;

        // We do this to queue the notifications until consumers have had a
        //  chance to bind handlers.
        process.nextTick(onTick);

        // When complete, clear the handlers to ensure references are cleared
        //  and we don't leak
        complete(clearNotifyHandlers);

        /**
        * The executor function.
        * @param {function} res The resolve function.
        * @param {function} rej The reject function.
        */
        function exec(res, rej) {
            executor(onRes, onRej, doNotify);

            /**
            * Called when the consumer resolves a promise
            * @param arg The argument to pass along to the resolved handlers.
            */
            function onRes(arg) {
                if (self.trace) {
                    self.resolvedStackTrace = stack(1);
                }
                onTick();
                completed = true;
                res(arg);
            }

            /**
            * Called when the consumer rejects a promise
            * @param arg The argument to pass along to the reject handlers.
            */
            function onRej(arg) {
                if (self.trace) {
                    self.resolvedStackTrace = stack(1);
                }
                onTick();
                completed = true;
                rej(arg);
            }
        }

        /**
        * Called to assign handlers to the promise.
        * @param {function} onRes The function to call when the promise has
        *   been resolved.
        * @param {function} onRej The function to call when the promise has
        *   been rejected.
        * @param {function} onNot The function to call when a notification has
        *   been recieved.
        */
        function then(onRes, onRej, onNot) {
            prom.then(onRes, onRej);
            notify(onNot);
            return self;
        }

        /**
        * Called by the promise executor to notify the promise consumer of
        *   some ongoing change. This will queue notifications until the first
        *   tick has passed to allow handlers to be bound.
        * Note: If the promise is resolved before a tick happens,
        *   notifications will never be delivered.
        * @param arg The argument to pass to the notify handlers.
        */
        function doNotify(arg) {
            // Note: If the promise is resolved before a tick happens,
            //  notifications will never be delivered.
            if (completed) {
                return;
            }
            // If we have not ticked, queue the notification
            if (notTicked) {
                notTicked.push(arg);
            } else {
                executeHandlers(arg);
            }

            /**
            * Executes the handlers with the suppied argument
            * @param arg The argument to pass to the notify handlers.
            */
            function executeHandlers(arg) {
                var i;
                for (i = 0; i < notifyHandlers.length; i++) {
                    try {
                        notifyHandlers[i](arg);
                    } catch (err) {
                        console.error('Error in promise notify handler');
                        console.error(err);
                    }
                }
            }
        }

        /**
        * Called to add handlers to execute on notification.
        * @param {function} handler The handler to call when a notification is
        *   received.
        */
        function notify(handler) {
            if (typeof handler === 'function') {
                notifyHandlers.push(handler);
            }
            return self;
        }

        /**
        * Called to add a handler to execute when the promise has completed.
        * @param {function} handler The handler to call when the promise has
        *   been resolved or rejected.
        */
        function complete(handler) {
            self.then(handler);
            self.catch(handler);
            return self;
        }

        /**
        * Executed a callback from the promises given state.
        * @param {function} cb The callback to execute when the promise is
        *   resolved or rejected.
        */
        function callback(cb) {
            if (typeof cb === 'function') {
                try {
                    self.then(cb.bind(null, null));
                    self.catch(cb);
                } catch(err) {
                    // We cannot do any more than log
                    console.error(err);
                }
            }
            return self;
        }

        /** Removes all items from the notification array */
        function clearNotifyHandlers() {
            notTicked.length = 0;
            notTicked = undefined;
        }

        /** Called the first tick after creation */
        function onTick() {
            var notis;
            if (notTicked) {
                notis = notTicked;
                notTicked = undefined;
                notis.forEach(doNotify);
            }
        }
    }

    ExtendedPromise.all = all;
    ExtendedPromise.race = race;
    ExtendedPromise.resolve = resolve;
    ExtendedPromise.reject = reject;
    ExtendedPromise.defer = defer;
    ExtendedPromise.callback = callback;
    ExtendedPromise.trace = false;

    /**
    * Returns a promise that resolves or rejects as soon as one of the supplied
    *   promises resolves or rejects.
    * @param {array} promises An array containing the promises to execute.
    */
    function all(promises) {
        var deferred = defer(),
            results = [],
            reach,
            cnt;

        cnt = 0;
        reach = promises.length;
        promises.forEach(processPromise);

        return deferred.promise;

        /**
        * Processes the supplied promise.
        * @param prom The promise to process.
        * @param {number} index The index of the promise being processed.
        */
        function processPromise(prom, index) {
            prom.then(onComplete.bind(null, index))
                .catch(deferred.reject);
        }

        /**
        * Called when one of the supplied promises is complete.
        * @param {number} index The index of the promise being completed.
        * @param arg The argument the promise resolved with.
        */
        function onComplete(index, arg) {
            results[index] = arg;
            cnt++;
            if (cnt === reach) {
                deferred.resolve(results);
            }
        }
    }

    /**
    * Returns a promise that resolves or rejects as soon as one of the supplied
    *   promises resolves or rejects.
    * @param promises An array or object containing the promises to execute.
    */
    function race(promises) {
        var deferred = defer(),
            prom;
        for (prom in promises) {
            if (promises.hasOwnProperty(prom)) {
                promises[prom]
                    .then(deferred.resolve)
                    .catch(deferred.reject);
            }
        }
        return deferred.promise;
    }

    /**
    * Creates and resolves a promise with the given argument.
    * @param arg The argument to pass to the resolve function.
    */
    function resolve(arg) {
        var deferred = defer();
        deferred.resolve(arg);
        return deferred.promise;
    }

    /**
    * Creates and rejects a promise with the given argument.
    * @param arg The argument to pass to the reject function.
    */
    function reject(arg) {
        var deferred = defer();
        deferred.reject(arg);
        return deferred.promise;
    }

    /**
    * Creates an object which contains a promise, and can be used to manipulate
    *   it's state.
    */
    function defer() {
        var resolve, reject, notify, promise;
        promise = new ExtendedPromise(executor);
        return {
            promise: promise,
            resolve: resolve,
            reject: reject,
            notify: notify
        };

        /**
        * The promise executor.
        * @param {function} res The function to call to resolve the promise.
        * @param {function} rej The function to call to reject the promise.
        * @param {function} noti The function to call to perform a notification.
        */
        function executor(res, rej, noti) {
            resolve = res;
            reject = rej;
            notify = noti;
        }
    }

    /**
    * Wraps a given function that has a callback style to provide a fast way
    *   to turn a callback style function into a promise style
    * Note: This only supports a single result argument in the callback
    * @param context Optional context to execute the callback in.
    *   Note: If this is supplied as a function, it will be assumed that
    *       function is actually the func argument
    * @param func The function to execute.
    */
    function callback(context, func) {
        var deferred = defer(),
            offset = 1,
            args;
        if (typeof context === 'function') {
            func = context;
            context = null;
        } else if (typeof func === 'function') {
            offset = 2;
        } else {
            throw new Error('Not function provided to execute');
        }
        args = Array.prototype.slice.call(arguments, offset);
        args.push(onComplete);
        func.apply(context, args);
        return deferred.promise;

        /**
        * Called once the function execution is complete
        * @param err Error information if the process failed.
        * @param res The response data, on success.
        */
        function onComplete(err, res) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(res);
            }
        }
    }

    /** Checks that a native promise exists, and if not throws an error. */
    function checkPromise() {
        /* istanbul ignore if */
        if (!Promise) {
            throw new Error('No native promise implementation found! This ' +
                'module extends native promise functionality');
        }
    }

    /**
    * Generates a stack trace from the frame skip levels above the current.
    * @param {number} skip The number of stack frames to skip.
    */
    function stack(skip) {
        var st;
        skip = skip + 1;
        st = (new Error()).stack || '';
        st = st.split('\n');
        st.shift();
        while (skip) {
            st.shift();
            skip--;
        }
        return st.join('\n');
    }
}(module, global.Promise, global.console, process));
