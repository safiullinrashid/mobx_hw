import { nanoid as _nanoid } from 'nanoid';

const nanoid = (size: number = 21): string => {
    return _nanoid(size);
};

export { nanoid };
