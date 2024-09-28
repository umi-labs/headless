export enum STATUS_ENUM {
    NULL,
    SUBMITTING,
    SUCCESS,
    ERROR,
}

export type STATUS_TYPE = {
    TYPE: STATUS_ENUM
    MESSAGE: string
}

export const STATUS: STATUS_TYPE[] = [
    {
        TYPE: STATUS_ENUM.NULL,
        MESSAGE: '',
    },
    {
        TYPE: STATUS_ENUM.SUBMITTING,
        MESSAGE: 'Sending...',
    },
    {
        TYPE: STATUS_ENUM.SUCCESS,
        MESSAGE: 'Message Sent!',
    },
    {
        TYPE: STATUS_ENUM.ERROR,
        MESSAGE:
            'There seems to have been a small issue. Please refresh and try again.',
    },
]
