import { useEffect, useState } from 'react';

/**
 * 精简版 debounce
 * @param fn
 * @param delay
 */
export function debounce<T extends (...args: unknown[]) => any>(fn: T, delay: number) {
    let timer: any;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn();
        }, delay);
    };
}

/**
 * @param value 暂时不处理函数，先处理value
 * @param delay
 */
export const useDebounce = <T>(value: T, delay?: number): T => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay || 200);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
};
