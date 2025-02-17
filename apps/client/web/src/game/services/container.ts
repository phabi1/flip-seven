const registry: Record<string, unknown>= {};

function get<T = any>(name: string) {
    return registry[name] as T;
}

const set = (name: string, value: unknown) => {
    registry[name] = value;
}

export const container = {
    get,
    set
};
