export const isFalsy = (value: unknown) => value === 0 ? false : !value;

export const cleanObject = <T extends Record<string, any>>(object: T): T => {
    const res = { ...object };
    Object.keys(res).forEach(key => {
        if (isFalsy(res[key])) {
            delete res[key];
        }
    });
    return res;
};

