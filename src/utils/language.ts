export enum LanguageKind {
    CN = "cn",
    EN = "en",
}

export function checkLanguage(text: string, kind: LanguageKind): boolean {
    switch (kind) {
        case LanguageKind.CN:
            return !/[A-Za-z]+/i.test(text);
        case LanguageKind.EN:
            return !/[\u4E00-\u9FA5]+/.test(text);
    }
}
