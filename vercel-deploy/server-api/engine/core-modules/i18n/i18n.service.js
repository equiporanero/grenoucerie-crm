"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "I18nService", {
    enumerable: true,
    get: function() {
        return I18nService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@lingui/core");
const _translations = require("twenty-shared/translations");
const _afZA = require("./locales/generated/af-ZA");
const _arSA = require("./locales/generated/ar-SA");
const _caES = require("./locales/generated/ca-ES");
const _csCZ = require("./locales/generated/cs-CZ");
const _daDK = require("./locales/generated/da-DK");
const _deDE = require("./locales/generated/de-DE");
const _elGR = require("./locales/generated/el-GR");
const _en = require("./locales/generated/en");
const _esES = require("./locales/generated/es-ES");
const _fiFI = require("./locales/generated/fi-FI");
const _frFR = require("./locales/generated/fr-FR");
const _heIL = require("./locales/generated/he-IL");
const _huHU = require("./locales/generated/hu-HU");
const _itIT = require("./locales/generated/it-IT");
const _jaJP = require("./locales/generated/ja-JP");
const _koKR = require("./locales/generated/ko-KR");
const _nlNL = require("./locales/generated/nl-NL");
const _noNO = require("./locales/generated/no-NO");
const _plPL = require("./locales/generated/pl-PL");
const _pseudoen = require("./locales/generated/pseudo-en");
const _ptBR = require("./locales/generated/pt-BR");
const _ptPT = require("./locales/generated/pt-PT");
const _roRO = require("./locales/generated/ro-RO");
const _ruRU = require("./locales/generated/ru-RU");
const _srCyrl = require("./locales/generated/sr-Cyrl");
const _svSE = require("./locales/generated/sv-SE");
const _trTR = require("./locales/generated/tr-TR");
const _ukUA = require("./locales/generated/uk-UA");
const _viVN = require("./locales/generated/vi-VN");
const _zhCN = require("./locales/generated/zh-CN");
const _zhTW = require("./locales/generated/zh-TW");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let I18nService = class I18nService {
    async loadTranslations() {
        const messagesByLocale = {
            en: _en.messages,
            'pseudo-en': _pseudoen.messages,
            'af-ZA': _afZA.messages,
            'ar-SA': _arSA.messages,
            'ca-ES': _caES.messages,
            'cs-CZ': _csCZ.messages,
            'da-DK': _daDK.messages,
            'de-DE': _deDE.messages,
            'el-GR': _elGR.messages,
            'es-ES': _esES.messages,
            'fi-FI': _fiFI.messages,
            'fr-FR': _frFR.messages,
            'he-IL': _heIL.messages,
            'hu-HU': _huHU.messages,
            'it-IT': _itIT.messages,
            'ja-JP': _jaJP.messages,
            'ko-KR': _koKR.messages,
            'nl-NL': _nlNL.messages,
            'no-NO': _noNO.messages,
            'pl-PL': _plPL.messages,
            'pt-BR': _ptBR.messages,
            'pt-PT': _ptPT.messages,
            'ro-RO': _roRO.messages,
            'ru-RU': _ruRU.messages,
            'sr-Cyrl': _srCyrl.messages,
            'sv-SE': _svSE.messages,
            'tr-TR': _trTR.messages,
            'uk-UA': _ukUA.messages,
            'vi-VN': _viVN.messages,
            'zh-CN': _zhCN.messages,
            'zh-TW': _zhTW.messages
        };
        Object.entries(messagesByLocale).forEach(([locale, messages])=>{
            const localeI18n = (0, _core.setupI18n)();
            localeI18n.load(locale, messages);
            localeI18n.activate(locale);
            this.i18nInstancesMap[locale] = localeI18n;
        });
    }
    getI18nInstance(locale) {
        return this.i18nInstancesMap[locale];
    }
    translateMessage({ messageId, values, locale = _translations.SOURCE_LOCALE, options }) {
        const i18n = this.getI18nInstance(locale);
        return i18n._(messageId, values, options);
    }
    async onModuleInit() {
        await this.loadTranslations();
    }
    constructor(){
        this.i18nInstancesMap = {};
    }
};
I18nService = _ts_decorate([
    (0, _common.Injectable)()
], I18nService);

//# sourceMappingURL=i18n.service.js.map