# js stdlib
This module is intended to provide commonly used functionality which is
desired in most projects.

## Getting started
### Node js
`npm install js-stdlib`. `require('js-stdlib')`.

### Bower
`bower install js-stdlib`. `window.stdlib`.

## Functionality
The following functionality is contained within the
library:

* `clone` - Deep clones any value.
* `copy` - Shallow copies any value.
* `epromise` - Extends the native promise with defer, and callback conversion
    functions.
* `extend` - Extends objects with values from other objects.
* `format` - Provides .NET like string formatting.
* `regex` - Provides regex string encoding and decoding.
* `typeof` - Provides an extended typeof function.

### clone(val)
Deep copies all properties in the supplied value. This function can be used to
create deep copies of objects, arrays or functions.

#### clone.register()
Adds the clone function to `Object.prototype`.

#### clone.deregister()
Removes the clone function from `Object.prototype`.

### copy(val)
Shallow copies all properties in the supplied value. This function can be used
to create shallow copies of objects, arrays or functions.

#### copy.register()
Adds the copy function to `Object.prototype`.

#### copy.deregister()
Removes the copy function from `Object.prototype`.

### Promise(executor)
The extended promise type. This offers the following extensions onto the
standard promise object.

#### Promise.defer()
Returns an object containing the `promise`, as well as `resolve`, `reject` and
`notify` functions.

#### Promise.callback([context], func, arg1, arg2, arg3)
Calls a function with the supplied context and arguments, and supplied an
additional function callback which will resolve or reject the promise returned
from the function.

#### promise.then(onResolved, onRejected, onNotified)
The `onNotified` function is added as a possible argument to the then function.
This function will be called when the executor `notify` function us called.

#### promise.notify(onNotified)
The function adds a handler to be called when a notification has been received.

#### promise.callback(cb)
Calls the supplied callback when the promise is resolved or rejected.

### extend(dest, src, argN)
Extends the destination object with the properties from source. Continues
extending through all supplied arguments.

#### extend.register()
Adds the extend function to `Object.prototype`.

#### extend.deregister()
Removes the extend function from `Object.prototype`.

### regex
#### regex.encode(str)
Replaces special regex characters with their escaped equivalents.

#### regex.decode(str)
Replaces escaped regex characters with their unescaped equivalents.

#### regex.register()
Adds the encode and decode functions to `RegExp.prototype`.

#### regex.deregister()
Removes the encode and decode functions from `RegExp.prototype`.

### typeOf(val)
An improved typeOf function. This returns the usual values from `typeof` along
with the following differences:

* A `RegExp` retruns `regexp`.
* A `Date` returns `date`.
* An `Array` returns `array`.
* `null` returns `null`.
* `NaN` returns `nan`.

#### typeOf.register()
Adds the typeOf function to `Object.prototype`.

#### typeOf.deregister()
Removes the typeOf function from `Object.prototype`.

### format
This follows the .NET string, number and date formatting with some exceptions.
Links to the relevant .NET documentation:

* [String Formatting](https://msdn.microsoft.com/en-us/library/system.string.format(v=vs.110).aspx)
* [Number Formatting](https://msdn.microsoft.com/en-us/library/dwhawy9k(v=vs.110).aspx)
* [Custom Number Formatting](https://msdn.microsoft.com/en-us/library/0c899ak8(v=vs.110).aspx)
* [Date Formatting](https://msdn.microsoft.com/en-us/library/az4se3k1(v=vs.110).aspx)
* [Custom Date Formatting](https://msdn.microsoft.com/en-us/library/8kb3ddd4(v=vs.110).aspx)

#### Differences
[TODO]

### EvemtEmitter
[TODO]
