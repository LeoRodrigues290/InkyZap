// src/utils/userMap.ts
export const USER_MAP: Record<string, string> = {
    '682W3CstDoZ0mq8Kefq3zQlsHzH2': 'Michelle',
    'O7gKboNp1mTToqsWyTg603rxkup2': 'William',
    'l51SkyVyJPfUFaYDUel38iAaPYv1': 'Pedro',
};

export function getUserName(uid: string, fallback = 'Usuário'): string {
    return USER_MAP[uid] ?? fallback;
}
