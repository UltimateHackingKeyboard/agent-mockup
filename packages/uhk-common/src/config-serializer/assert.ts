export function assertUInt8(target: any, key: string) {
    return assertInteger(target, key, 0, 0xff);
}

export function assertInt8(target: any, key: string) {
    return assertInteger(target, key, -0x80, 0x7f);
}

export function assertUInt16(target: any, key: string) {
    return assertInteger(target, key, 0, 0xffff);
}

export function assertInt16(target: any, key: string) {
    return assertInteger(target, key, -0x8000, 0x7fff);
}

export function assertUInt32(target: any, key: string) {
    return assertInteger(target, key, 0, 0xffffffff);
}

export function assertInt32(target: any, key: string) {
    return assertInteger(target, key, -0x80000000, 0x7fffffff);
}

export function assertCompactLength(target: any, key: string) {
    return assertUInt16(target, key);
}

function assertInteger(target: any, key: string, min: number, max: number) {
    const priv = '_' + key;

    function getter() {
        return this[priv];
    }

    function setter(newVal: any) {
        if (this[priv] !== newVal) {
            if (newVal < min || newVal > max) {
                throw `${target.constructor.name}.${key}: ` + `Integer ${newVal} is outside the valid [${min}, ${max}] interval`;
            }
            this[priv] = newVal;
        }
    }

    Object.defineProperty(target, key, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
    });
}

export function assertEnum<E>(enumerated: E) {
    return function(target: any, key: string) {
        const priv = '_' + key;

        function getter() {
            return this[priv];
        }

        function setter(newVal: any) {
            if (this[priv] !== newVal) {
                if (enumerated[newVal] === undefined) {
                    throw `${target.constructor.name}.${key}: ${newVal} is not enum`;
                }
                this[priv] = newVal;
            }
        }

        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    };
}
