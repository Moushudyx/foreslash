/*!
Copyright (c) 2024 moushu
foreslash is licensed under Mulan PSL v2.
You can use this software according to the terms and conditions of the Mulan PSL v2.
You may obtain a copy of Mulan PSL v2 at:
          http://license.coscl.org.cn/MulanPSL2
THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
See the Mulan PSL v2 for more details.
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.foreslash = {}));
})(this, (function (exports) { 'use strict';

    const isArray = Array.isArray;

    function _cloneArray(obj, map, cloner, ...args) {
        const res = obj.slice();
        map.set(obj, res);
        for (let index = 0; index < obj.length; index++) {
            res[index] = cloner(obj[index], map, ...args);
        }
        return res;
    }
    function _cloneMap(obj, map, cloner, ...args) {
        const res = new Map();
        map.set(obj, res);
        obj.forEach((value, key) => {
            res.set(cloner(key, map, ...args), cloner(value, map, ...args));
        });
        return res;
    }
    function _cloneSet(obj, map, cloner, ...args) {
        const res = new Set();
        map.set(obj, res);
        obj.forEach((item) => res.add(cloner(item, map, ...args)));
        return res;
    }

    function _fastClone(obj, map) {
        if (map.has(obj))
            return map.get(obj);
        if (!isObject(obj) || isFunction(obj) || isWeakMap(obj) || isWeakSet(obj) || isPromise(obj))
            return obj;
        if (isArray(obj))
            return _cloneArray(obj, map, _fastClone);
        if (isMap(obj))
            return _cloneMap(obj, map, _fastClone);
        if (isSet(obj))
            return _cloneSet(obj, map, _fastClone);
        let res;
        if (obj instanceof Date) {
            res = new Date(obj.valueOf());
            map.set(obj, res);
        }
        else if (obj instanceof RegExp) {
            res = new RegExp(obj.source, obj.flags);
            map.set(obj, res);
        }
        else {
            res = {};
            map.set(obj, res);
            Object.keys(obj).forEach((key) => {
                res[key] = _fastClone(obj[key], map);
            });
        }
        return res;
    }

    const object2String = Object.prototype.toString;
    function getTag(value) {
        return object2String.call(value).slice(8, -1);
    }

    function getGlobalThis() {
        if (typeof self !== 'undefined') {
            return self;
        }
        if (typeof window !== 'undefined') {
            return window;
        }
        if (typeof global !== 'undefined') {
            return global;
        }
        return Function('return this')();
    }

    const global$5 = getGlobalThis();
    const ArrayBuffer = global$5.ArrayBuffer;
    function isArrayBuffer(val) {
        return !!ArrayBuffer && val instanceof ArrayBuffer;
    }

    function isInteger(value) {
        return typeof value === 'number' && isFinite(value) && value % 1 === 0;
    }

    function isArrayLike(value) {
        return value != null && typeof value !== 'function' && isInteger(value.length) && value.length >= 0;
    }

    function isBigInt(value) {
        return typeof value === 'bigint';
    }

    function isBoolean(value) {
        return typeof value === 'boolean';
    }

    const global$4 = getGlobalThis();
    const Buffer = global$4.Buffer;
    const isBuffer = (Buffer && Buffer.isBuffer) || (() => false);

    function isFunction(value) {
        return typeof value === 'function';
    }

    const global$3 = getGlobalThis();
    function isMap(value) {
        return !!global$3.Map && value instanceof Map;
    }
    function isWeakMap(value) {
        return !!global$3.WeakMap && value instanceof WeakMap;
    }

    function isNil(value) {
        return value == null;
    }
    function isNull(value) {
        return value === null;
    }
    function isUndefined(value) {
        return value === void 0;
    }

    function isNumber(value) {
        return typeof value === 'number';
    }

    function isObject(value) {
        return typeof value === 'object' && value !== null;
    }

    function isPromise(value) {
        return isObject(value) && isFunction(value.then) && getTag(value) === 'Promise';
    }

    function isPromiseLike(value) {
        return isObject(value) && isFunction(value.then);
    }

    const global$2 = getGlobalThis();
    function isSet(value) {
        return !!global$2.Set && value instanceof Set;
    }
    function isWeakSet(value) {
        return !!global$2.WeakSet && value instanceof WeakSet;
    }

    function isString(value) {
        return typeof value === 'string';
    }

    function isSymbol(value) {
        return typeof value === 'symbol';
    }

    const global$1 = getGlobalThis();
    function isWrapperObject(value) {
        return (!!value &&
            typeof value === 'object' &&
            (isWrapperNumber(value) ||
                isWrapperBoolean(value) ||
                isWrapperString(value) ||
                isWrapperSymbol(value) ||
                isWrapperBigInt(value)));
    }
    function isWrapperNumber(value) {
        return value instanceof Number;
    }
    function isWrapperBoolean(value) {
        return value instanceof Boolean;
    }
    function isWrapperString(value) {
        return value instanceof String;
    }
    function isWrapperSymbol(value) {
        return !!global$1.Symbol && value instanceof Symbol;
    }
    function isWrapperBigInt(value) {
        return !!global$1.BigInt && value instanceof BigInt;
    }

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function randomIntFloor(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function randomChoice(arr) {
        return arr[randomIntFloor(0, arr.length)];
    }

    function randomString(length, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
        if (!Number.isInteger(length) || length <= 0) {
            throw new Error('Invalid length parameter');
        }
        let res = '';
        for (let i = 0; i < length; i++)
            res += randomChoice(chars);
        return res;
    }
    function randomHexString(length) {
        if (!Number.isInteger(length) || length <= 0) {
            throw new Error('Invalid length parameter');
        }
        if (length > 13) {
            const count = Math.floor(length / 13);
            let res = _randomHexString(length % 13);
            for (let i = 0; i < count; i++)
                res += _randomHexString(13);
            return res;
        }
        else {
            return _randomHexString(length);
        }
    }
    function _randomHexString(length) {
        let res = Math.floor(Math.random() * 16 ** length).toString(16);
        while (res.length < length)
            res = '0' + res;
        return res;
    }

    function compose(...composeFunc) {
        if (composeFunc.length === 0) {
            throw new Error('Invalid composeFunc parameter: composeFunc is empty');
        }
        for (let i = 0; i < composeFunc.length; i++) {
            if (typeof composeFunc[i] !== 'function') {
                throw new Error(`Invalid composeFunc parameter: composeFunc[${i}] is not a function`);
            }
        }
        const _fnList = composeFunc.slice().reverse();
        return (...args) => {
            let result = _fnList[0](...args);
            for (let i = 1; i < _fnList.length; i++) {
                result = _fnList[i](result);
            }
            return result;
        };
    }

    const _ = Object.freeze({ '@@functional/placeholder': true });
    function isPlaceholder(arg) {
        return typeof arg === 'object' && Boolean(arg) && arg['@@functional/placeholder'] === true;
    }

    const _curry1 = function _curry1(fn) {
        return function curried1(arg1) {
            if (arguments.length < 1 || isPlaceholder(arg1)) {
                return curried1;
            }
            else {
                return fn.apply(this, arguments);
            }
        };
    };

    const _curry2 = function _curry2(fn) {
        return function curried2(arg1, arg2) {
            const p1 = arguments.length < 1 || isPlaceholder(arg1);
            const p2 = arguments.length < 2 || isPlaceholder(arg2);
            if (p1 && p2) {
                return curried2;
            }
            else if (!p1 && p2) {
                return _curry1(function (_arg2) {
                    return fn.apply(this, [arg1, _arg2]);
                });
            }
            else if (p1 && !p2) {
                return _curry1(function (_arg1) {
                    return fn.apply(this, [_arg1, arg2]);
                });
            }
            else {
                return fn.apply(this, arguments);
            }
        };
    };

    const _curry3 = function _curry3(fn) {
        return function curried3(arg1, arg2, arg3) {
            const p1 = arguments.length < 1 || isPlaceholder(arg1);
            const p2 = arguments.length < 2 || isPlaceholder(arg2);
            const p3 = arguments.length < 3 || isPlaceholder(arg3);
            if (p1) {
                if (p2 && p3) {
                    return curried3;
                }
                else if (p2 && !p3) {
                    return _curry2(function (_arg1, _arg2) {
                        return fn.apply(this, [_arg1, _arg2, arg3]);
                    });
                }
                else if (!p2 && p3) {
                    return _curry2(function (_arg1, _arg3) {
                        return fn.apply(this, [_arg1, arg2, _arg3]);
                    });
                }
                else {
                    return _curry1(function (_arg1) {
                        return fn.apply(this, [_arg1, arg2, arg3]);
                    });
                }
            }
            else {
                if (p2 && p3) {
                    return _curry2(function (_arg2, _arg3) {
                        return fn.apply(this, [arg1, _arg2, _arg3]);
                    });
                }
                else if (p2 && !p3) {
                    return _curry1(function (_arg2) {
                        return fn.apply(this, [arg1, _arg2, arg3]);
                    });
                }
                else if (!p2 && p3) {
                    return _curry1(function (_arg3) {
                        return fn.apply(this, [arg1, arg2, _arg3]);
                    });
                }
                else {
                    return fn.apply(this, arguments);
                }
            }
        };
    };

    const _curryAny = function _curryAny(fn, args) {
        return function curriedAny(...currentArguments) {
            const currArgs = _mergeArguments(args, currentArguments);
            if (_countArguments(currArgs) >= fn.length) {
                return fn.apply(this, currArgs);
            }
            else
                return _curryAny.apply(this, [fn, currArgs]);
        };
    };
    function _mergeArguments(args, currentArguments) {
        let p1 = 0;
        const res = args.concat([]);
        for (let i = 0; i < currentArguments.length; i++) {
            while (!isPlaceholder(res[p1]) && p1 < res.length)
                p1++;
            res[p1] = currentArguments[i];
            p1++;
        }
        return res;
    }
    function _countArguments(args) {
        for (let i = 0; i < args.length; i++) {
            if (isPlaceholder(args[i]))
                return i;
        }
        return args.length;
    }

    function _curryMore(fn) {
        if (typeof fn !== 'function') {
            throw new Error('Invalid fn parameter: fn is not a function.');
        }
        const fnStr = fn.toString();
        const rightBracket = fnStr.indexOf(')');
        if (rightBracket < 3 || /=|\.{3}/.test(fnStr.substring(0, rightBracket))) {
            return _curryAny(fn, []);
        }
        switch (fn.length) {
            case 0:
                return fn;
            case 1:
                return _curry1(fn);
            case 2:
                return _curry2(fn);
            case 3:
                return _curry3(fn);
            default:
                return _curryAny(fn, []);
        }
    }

    function fastClone(obj, map) {
        if (!isMap(map))
            map = new Map();
        const res = _fastClone(obj, map);
        map.clear();
        return res;
    }

    const noop = function noop() { };
    function pass(value) {
        return value;
    }
    function passWith(fn) {
        return ((arg) => {
            fn(arg);
            return arg;
        });
    }

    function not(value) {
        return !Boolean(value);
    }

    function pipe(...pipeFunc) {
        if (pipeFunc.length === 0) {
            throw new Error('Invalid pipeFunc parameter: pipeFunc is empty');
        }
        for (let i = 0; i < pipeFunc.length; i++) {
            if (typeof pipeFunc[i] !== 'function') {
                throw new Error(`Invalid pipeFunc parameter: pipeFunc[${i}] is not a function`);
            }
        }
        return (...args) => {
            let result = pipeFunc[0](...args);
            for (let i = 1; i < pipeFunc.length; i++) {
                result = pipeFunc[i](result);
            }
            return result;
        };
    }

    exports._ = _;
    exports._fastClone = _fastClone;
    exports.compose = compose;
    exports.curry = _curryMore;
    exports.fastClone = fastClone;
    exports.getGlobalThis = getGlobalThis;
    exports.getTag = getTag;
    exports.isArray = isArray;
    exports.isArrayBuffer = isArrayBuffer;
    exports.isArrayLike = isArrayLike;
    exports.isBigInt = isBigInt;
    exports.isBoolean = isBoolean;
    exports.isBuffer = isBuffer;
    exports.isFunction = isFunction;
    exports.isInteger = isInteger;
    exports.isMap = isMap;
    exports.isNil = isNil;
    exports.isNull = isNull;
    exports.isNumber = isNumber;
    exports.isObject = isObject;
    exports.isPlaceholder = isPlaceholder;
    exports.isPromise = isPromise;
    exports.isPromiseLike = isPromiseLike;
    exports.isSet = isSet;
    exports.isString = isString;
    exports.isSymbol = isSymbol;
    exports.isUndefined = isUndefined;
    exports.isWeakMap = isWeakMap;
    exports.isWeakSet = isWeakSet;
    exports.isWrapperBigInt = isWrapperBigInt;
    exports.isWrapperBoolean = isWrapperBoolean;
    exports.isWrapperNumber = isWrapperNumber;
    exports.isWrapperObject = isWrapperObject;
    exports.isWrapperString = isWrapperString;
    exports.isWrapperSymbol = isWrapperSymbol;
    exports.noop = noop;
    exports.not = not;
    exports.pass = pass;
    exports.passWith = passWith;
    exports.pipe = pipe;
    exports.randomChoice = randomChoice;
    exports.randomHexString = randomHexString;
    exports.randomInt = randomInt;
    exports.randomIntFloor = randomIntFloor;
    exports.randomString = randomString;

}));
