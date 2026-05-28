"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _standardfolder = require("../../../types/standard-folder");
const _getstandardfolderbyregex = require("../../../utils/get-standard-folder-by-regex");
function testFolderMatches(variants, expectedStandardFolder) {
    variants.forEach((variant)=>{
        const result = (0, _getstandardfolderbyregex.getStandardFolderByRegex)(variant);
        expect(result).toBe(expectedStandardFolder);
    });
}
describe('getStandardFolderByRegex', ()=>{
    describe('INBOX folder detection', ()=>{
        it('matches English variants', ()=>{
            const englishVariants = [
                'Inbox',
                'Mail',
                'Messages',
                'Message',
                'Received'
            ];
            testFolderMatches(englishVariants, _standardfolder.StandardFolder.INBOX);
        });
        it('matches French variants', ()=>{
            const frenchVariants = [
                'Boîte de réception',
                'Courrier entrant',
                'Messages reçus',
                'Réception'
            ];
            testFolderMatches(frenchVariants, _standardfolder.StandardFolder.INBOX);
        });
        it('matches German variants', ()=>{
            const germanVariants = [
                'Posteingang',
                'Eingang',
                'Eingangsmails',
                'Empfangen'
            ];
            testFolderMatches(germanVariants, _standardfolder.StandardFolder.INBOX);
        });
        it('matches Spanish variants', ()=>{
            const spanishVariants = [
                'Bandeja de entrada',
                'Entrada',
                'Correo entrante',
                'Recibidos'
            ];
            testFolderMatches(spanishVariants, _standardfolder.StandardFolder.INBOX);
        });
        it('matches Portuguese variants', ()=>{
            const portugueseVariants = [
                'Caixa de entrada',
                'Entrada',
                'Correio de entrada',
                'Recebidos'
            ];
            testFolderMatches(portugueseVariants, _standardfolder.StandardFolder.INBOX);
        });
        it('matches Italian variants', ()=>{
            const italianVariants = [
                'Posta in arrivo',
                'Arrivo',
                'Casella postale',
                'Ricevuti'
            ];
            testFolderMatches(italianVariants, _standardfolder.StandardFolder.INBOX);
        });
        it('matches Korean variants', ()=>{
            const koreanVariants = [
                '받은편지함',
                '수신함',
                '받은메일'
            ];
            testFolderMatches(koreanVariants, _standardfolder.StandardFolder.INBOX);
        });
        it('matches Japanese variants', ()=>{
            const japaneseVariants = [
                '受信トレイ',
                '受信箱',
                '受信メール'
            ];
            testFolderMatches(japaneseVariants, _standardfolder.StandardFolder.INBOX);
        });
        it('matches Polish variants', ()=>{
            const polishVariants = [
                'Odebrane',
                'Skrzynka odbiorcza',
                'Wiadomości przychodzące'
            ];
            testFolderMatches(polishVariants, _standardfolder.StandardFolder.INBOX);
        });
        it('matches Russian variants', ()=>{
            const russianVariants = [
                'Входящие',
                'Папка входящих',
                'Полученные сообщения',
                'Полученные письма'
            ];
            testFolderMatches(russianVariants, _standardfolder.StandardFolder.INBOX);
        });
        it('matches Gmail special folder', ()=>{
            const gmailVariants = [
                '[Gmail]/Inbox',
                '[Gmail]\\Inbox'
            ];
            testFolderMatches(gmailVariants, _standardfolder.StandardFolder.INBOX);
        });
    });
    describe('DRAFTS folder detection', ()=>{
        it('matches English variants', ()=>{
            const englishVariants = [
                'Drafts',
                'Draft',
                'Draft Items',
                'Draft Mail',
                'Draft Messages'
            ];
            testFolderMatches(englishVariants, _standardfolder.StandardFolder.DRAFTS);
        });
        it('matches French variants', ()=>{
            const frenchVariants = [
                'Brouillons',
                'Éléments brouillons'
            ];
            testFolderMatches(frenchVariants, _standardfolder.StandardFolder.DRAFTS);
        });
        it('matches German variants', ()=>{
            const germanVariants = [
                'Entwürfe',
                'Entwurf'
            ];
            testFolderMatches(germanVariants, _standardfolder.StandardFolder.DRAFTS);
        });
        it('matches Spanish variants', ()=>{
            const spanishVariants = [
                'Borradores',
                'Elementos borrador'
            ];
            testFolderMatches(spanishVariants, _standardfolder.StandardFolder.DRAFTS);
        });
        it('matches Portuguese variants', ()=>{
            const portugueseVariants = [
                'Rascunhos',
                'Itens rascunho'
            ];
            testFolderMatches(portugueseVariants, _standardfolder.StandardFolder.DRAFTS);
        });
        it('matches Italian variants', ()=>{
            const italianVariants = [
                'Bozze',
                'Bozze salvate'
            ];
            testFolderMatches(italianVariants, _standardfolder.StandardFolder.DRAFTS);
        });
        it('matches Korean variants', ()=>{
            const koreanVariants = [
                '임시보관함',
                '초안'
            ];
            testFolderMatches(koreanVariants, _standardfolder.StandardFolder.DRAFTS);
        });
        it('matches Japanese variants', ()=>{
            const japaneseVariants = [
                '下書き',
                '草稿'
            ];
            testFolderMatches(japaneseVariants, _standardfolder.StandardFolder.DRAFTS);
        });
        it('matches Polish variants', ()=>{
            const polishVariants = [
                'Wersje robocze',
                'Szkice'
            ];
            testFolderMatches(polishVariants, _standardfolder.StandardFolder.DRAFTS);
        });
        it('matches Russian variants', ()=>{
            const russianVariants = [
                'Черновики',
                'Черновые сообщения',
                'Неотправленные'
            ];
            testFolderMatches(russianVariants, _standardfolder.StandardFolder.DRAFTS);
        });
        it('matches Gmail special folder', ()=>{
            const gmailVariants = [
                '[Gmail]/Drafts',
                '[Gmail]\\Drafts'
            ];
            testFolderMatches(gmailVariants, _standardfolder.StandardFolder.DRAFTS);
        });
    });
    describe('SENT folder detection', ()=>{
        it('matches English variants', ()=>{
            const englishVariants = [
                'Sent',
                'Sent Items',
                'Sent Mail',
                'Sent Messages',
                'sent-elements'
            ];
            testFolderMatches(englishVariants, _standardfolder.StandardFolder.SENT);
        });
        it('matches French variants', ()=>{
            const frenchVariants = [
                'Envoyés',
                'Éléments envoyés',
                'Objets envoyés'
            ];
            testFolderMatches(frenchVariants, _standardfolder.StandardFolder.SENT);
        });
        it('matches German variants', ()=>{
            const germanVariants = [
                'Gesendet',
                'Gesendete Elemente'
            ];
            testFolderMatches(germanVariants, _standardfolder.StandardFolder.SENT);
        });
        it('matches Spanish variants', ()=>{
            const spanishVariants = [
                'Enviados',
                'Elementos enviados'
            ];
            testFolderMatches(spanishVariants, _standardfolder.StandardFolder.SENT);
        });
        it('matches Portuguese variants', ()=>{
            const portugueseVariants = [
                'Itens enviados'
            ];
            testFolderMatches(portugueseVariants, _standardfolder.StandardFolder.SENT);
        });
        it('matches Italian variants', ()=>{
            const italianVariants = [
                'Posta inviata',
                'Inviati'
            ];
            testFolderMatches(italianVariants, _standardfolder.StandardFolder.SENT);
        });
        it('matches Korean variant', ()=>{
            const koreanVariants = [
                '보낸편지함'
            ];
            testFolderMatches(koreanVariants, _standardfolder.StandardFolder.SENT);
        });
        it('matches Japanese variants', ()=>{
            const japaneseVariants = [
                '送信済みメール',
                '送信済み'
            ];
            testFolderMatches(japaneseVariants, _standardfolder.StandardFolder.SENT);
        });
        it('matches Polish variants', ()=>{
            const polishVariants = [
                'Wysłane',
                'Elementy wysłane'
            ];
            testFolderMatches(polishVariants, _standardfolder.StandardFolder.SENT);
        });
        it('matches Russian variants', ()=>{
            const russianVariants = [
                'Отправленные',
                'Отправленные письма',
                'Отправленные сообщения',
                'Исходящие'
            ];
            testFolderMatches(russianVariants, _standardfolder.StandardFolder.SENT);
        });
        it('matches Gmail special folder', ()=>{
            const gmailVariants = [
                '[Gmail]/Sent Mail',
                '[Gmail]\\Sent Mail'
            ];
            testFolderMatches(gmailVariants, _standardfolder.StandardFolder.SENT);
        });
        it('does not match unrelated folders', ()=>{
            const unrelatedFolders = [
                'Inbox',
                'Drafts',
                'Trash',
                'Archive',
                'Junk',
                'Important',
                'RandomFolder'
            ];
            unrelatedFolders.forEach((folder)=>{
                const result = (0, _getstandardfolderbyregex.getStandardFolderByRegex)(folder);
                expect(result).not.toBe(_standardfolder.StandardFolder.SENT);
            });
        });
    });
    describe('TRASH folder detection', ()=>{
        it('matches English variants', ()=>{
            const englishVariants = [
                'Trash',
                'Deleted Items',
                'Deleted Messages',
                'Bin',
                'Recycle Bin'
            ];
            testFolderMatches(englishVariants, _standardfolder.StandardFolder.TRASH);
        });
        it('matches French variants', ()=>{
            const frenchVariants = [
                'Corbeille',
                'Supprimés',
                'Éléments supprimés'
            ];
            testFolderMatches(frenchVariants, _standardfolder.StandardFolder.TRASH);
        });
        it('matches German variants', ()=>{
            const germanVariants = [
                'Gelöscht',
                'Gelöschte Elemente',
                'Papierkorb'
            ];
            testFolderMatches(germanVariants, _standardfolder.StandardFolder.TRASH);
        });
        it('matches Spanish variants', ()=>{
            const spanishVariants = [
                'Papelera',
                'Eliminados',
                'Elementos eliminados'
            ];
            testFolderMatches(spanishVariants, _standardfolder.StandardFolder.TRASH);
        });
        it('matches Portuguese variants', ()=>{
            const portugueseVariants = [
                'Lixeira',
                'Itens excluídos'
            ];
            testFolderMatches(portugueseVariants, _standardfolder.StandardFolder.TRASH);
        });
        it('matches Italian variants', ()=>{
            const italianVariants = [
                'Cestino',
                'Posta eliminata',
                'Eliminati'
            ];
            testFolderMatches(italianVariants, _standardfolder.StandardFolder.TRASH);
        });
        it('matches Korean variants', ()=>{
            const koreanVariants = [
                '휴지통',
                '삭제된편지함'
            ];
            testFolderMatches(koreanVariants, _standardfolder.StandardFolder.TRASH);
        });
        it('matches Japanese variants', ()=>{
            const japaneseVariants = [
                'ごみ箱',
                '削除済み',
                '削除済みメール'
            ];
            testFolderMatches(japaneseVariants, _standardfolder.StandardFolder.TRASH);
        });
        it('matches Polish variants', ()=>{
            const polishVariants = [
                'Kosz',
                'Usunięte',
                'Elementy usunięte'
            ];
            testFolderMatches(polishVariants, _standardfolder.StandardFolder.TRASH);
        });
        it('matches Russian variants', ()=>{
            const russianVariants = [
                'Удалённые',
                'Корзина',
                'Удалённые сообщения'
            ];
            testFolderMatches(russianVariants, _standardfolder.StandardFolder.TRASH);
        });
        it('matches Gmail special folder', ()=>{
            const gmailVariants = [
                '[Gmail]/Trash',
                '[Gmail]\\Trash'
            ];
            testFolderMatches(gmailVariants, _standardfolder.StandardFolder.TRASH);
        });
    });
    describe('JUNK/SPAM folder detection', ()=>{
        it('matches English variants', ()=>{
            const englishVariants = [
                'Spam',
                'Junk Mail',
                'Junk Messages',
                'Bulk Mail',
                'Bulk Messages'
            ];
            testFolderMatches(englishVariants, _standardfolder.StandardFolder.JUNK);
        });
        it('matches French variants', ()=>{
            const frenchVariants = [
                'Indésirables',
                'Courrier indésirable',
                'Spam'
            ];
            testFolderMatches(frenchVariants, _standardfolder.StandardFolder.JUNK);
        });
        it('matches German variants', ()=>{
            const germanVariants = [
                'Spam',
                'Junk Mail',
                'Unerwünscht'
            ];
            testFolderMatches(germanVariants, _standardfolder.StandardFolder.JUNK);
        });
        it('matches Spanish variants', ()=>{
            const spanishVariants = [
                'Spam',
                'Correo basura',
                'No deseado'
            ];
            testFolderMatches(spanishVariants, _standardfolder.StandardFolder.JUNK);
        });
        it('matches Portuguese variants', ()=>{
            const portugueseVariants = [
                'Spam',
                'Lixo eletrônico',
                'Indesejados'
            ];
            testFolderMatches(portugueseVariants, _standardfolder.StandardFolder.JUNK);
        });
        it('matches Italian variants', ()=>{
            const italianVariants = [
                'Spam',
                'Posta indesiderata',
                'Indesiderata'
            ];
            testFolderMatches(italianVariants, _standardfolder.StandardFolder.JUNK);
        });
        it('matches Korean variants', ()=>{
            const koreanVariants = [
                '스팸',
                '정크메일'
            ];
            testFolderMatches(koreanVariants, _standardfolder.StandardFolder.JUNK);
        });
        it('matches Japanese variants', ()=>{
            const japaneseVariants = [
                'スパム',
                '迷惑メール'
            ];
            testFolderMatches(japaneseVariants, _standardfolder.StandardFolder.JUNK);
        });
        it('matches Polish variants', ()=>{
            const polishVariants = [
                'Spam',
                'Niechciane',
                'Śmieci'
            ];
            testFolderMatches(polishVariants, _standardfolder.StandardFolder.JUNK);
        });
        it('matches Russian variants', ()=>{
            const russianVariants = [
                'Спам',
                'Нежелательные',
                'Мусор'
            ];
            testFolderMatches(russianVariants, _standardfolder.StandardFolder.JUNK);
        });
        it('matches Gmail special folder', ()=>{
            const gmailVariants = [
                '[Gmail]/Spam',
                '[Gmail]\\Spam'
            ];
            testFolderMatches(gmailVariants, _standardfolder.StandardFolder.JUNK);
        });
    });
});

//# sourceMappingURL=get-standard-folder-by-regex.util.spec.js.map