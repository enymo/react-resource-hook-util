const pad = (n: number) => `${Math.floor(Math.abs(n))}`.padStart(2, '0');

function toISOStringWithTimezone(date: Date) {
    const tzOffset = -date.getTimezoneOffset();
    const diff = tzOffset >= 0 ? '+' : '-';
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        diff + pad(tzOffset / 60) +
        ':' + pad(tzOffset % 60);
};

export function dateTransformer(input: any) {
    return Object.fromEntries(Object.entries(input).map(([key, value]) => [
        key,
        typeof value === "string" && /^\d{4}-\d{2}-\d{2}T(?:\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|(?:\+|-)\d{2}:\d{2})?)?$/.test(value) 
            ? new Date(value) 
            : value
    ]));
}

export function inverseDateTransformer(input: any) {
    return Object.fromEntries(Object.entries(input).map(([key, value]) => [key, value instanceof Date ? toISOStringWithTimezone(value) : value]));
}

export function filter<T extends object>(input: T): T {
    return Object.fromEntries(Object.entries(input).filter(([,value]) => value !== undefined)) as T;
}

export const identity = (input: any) => input