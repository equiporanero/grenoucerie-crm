"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _generateMessageId = require("../../../../core-modules/i18n/utils/generateMessageId");
const _resolvepagelayoutwidgettitleutil = require("../resolve-page-layout-widget-title.util");
jest.mock('src/engine/core-modules/i18n/utils/generateMessageId');
const mockGenerateMessageId = _generateMessageId.generateMessageId;
const STANDARD_APPLICATION_ID = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
describe('resolvePageLayoutWidgetTitle', ()=>{
    let mockI18n;
    beforeEach(()=>{
        jest.clearAllMocks();
        mockI18n = {
            _: jest.fn()
        };
    });
    it('should return translated title when catalog has a match', ()=>{
        mockGenerateMessageId.mockReturnValue('abc123');
        mockI18n._.mockReturnValue('Champs');
        const result = (0, _resolvepagelayoutwidgettitleutil.resolvePageLayoutWidgetTitle)({
            title: 'Fields',
            applicationId: STANDARD_APPLICATION_ID,
            twentyStandardApplicationId: STANDARD_APPLICATION_ID,
            i18nInstance: mockI18n
        });
        expect(mockGenerateMessageId).toHaveBeenCalledWith('Fields');
        expect(mockI18n._).toHaveBeenCalledWith('abc123');
        expect(result).toBe('Champs');
    });
    it('should return original title when catalog returns the hash (no translation found)', ()=>{
        mockGenerateMessageId.mockReturnValue('xyz789');
        mockI18n._.mockReturnValue('xyz789');
        const result = (0, _resolvepagelayoutwidgettitleutil.resolvePageLayoutWidgetTitle)({
            title: 'My Custom Widget',
            applicationId: STANDARD_APPLICATION_ID,
            twentyStandardApplicationId: STANDARD_APPLICATION_ID,
            i18nInstance: mockI18n
        });
        expect(mockGenerateMessageId).toHaveBeenCalledWith('My Custom Widget');
        expect(mockI18n._).toHaveBeenCalledWith('xyz789');
        expect(result).toBe('My Custom Widget');
    });
    it('should return original title for empty string', ()=>{
        mockGenerateMessageId.mockReturnValue('empty-hash');
        mockI18n._.mockReturnValue('empty-hash');
        const result = (0, _resolvepagelayoutwidgettitleutil.resolvePageLayoutWidgetTitle)({
            title: '',
            applicationId: STANDARD_APPLICATION_ID,
            twentyStandardApplicationId: STANDARD_APPLICATION_ID,
            i18nInstance: mockI18n
        });
        expect(result).toBe('');
    });
    it('should translate standard widget titles', ()=>{
        const standardWidgets = [
            {
                source: 'Fields',
                translated: 'Champs'
            },
            {
                source: 'Timeline',
                translated: 'Chronologie'
            },
            {
                source: 'Tasks',
                translated: 'Tâches'
            },
            {
                source: 'Notes',
                translated: 'Notes'
            },
            {
                source: 'Files',
                translated: 'Fichiers'
            },
            {
                source: 'Emails',
                translated: 'E-mails'
            },
            {
                source: 'Calendar',
                translated: 'Calendrier'
            },
            {
                source: 'Note',
                translated: 'Note'
            },
            {
                source: 'Task',
                translated: 'Tâche'
            },
            {
                source: 'Flow',
                translated: 'Flux'
            },
            {
                source: 'Thread',
                translated: 'Fil'
            },
            {
                source: 'People',
                translated: 'Personnes'
            },
            {
                source: 'Opportunities',
                translated: 'Opportunités'
            },
            {
                source: 'Company',
                translated: 'Entreprise'
            },
            {
                source: 'Point of Contact',
                translated: 'Point de contact'
            },
            {
                source: 'Owner',
                translated: 'Propriétaire'
            },
            {
                source: 'Workflow',
                translated: 'Flux de travail'
            },
            {
                source: 'Deals by Company',
                translated: 'Affaires par entreprise'
            }
        ];
        standardWidgets.forEach(({ source, translated })=>{
            jest.clearAllMocks();
            mockGenerateMessageId.mockReturnValue(`hash-${source}`);
            mockI18n._.mockReturnValue(translated);
            const result = (0, _resolvepagelayoutwidgettitleutil.resolvePageLayoutWidgetTitle)({
                title: source,
                applicationId: STANDARD_APPLICATION_ID,
                twentyStandardApplicationId: STANDARD_APPLICATION_ID,
                i18nInstance: mockI18n
            });
            expect(result).toBe(translated);
        });
    });
    it('should not translate title when applicationId is not from standard app', ()=>{
        mockGenerateMessageId.mockReturnValue('abc123');
        mockI18n._.mockReturnValue('Champs');
        const customAppId = '11111111-1111-1111-1111-111111111111';
        const result = (0, _resolvepagelayoutwidgettitleutil.resolvePageLayoutWidgetTitle)({
            title: 'Fields',
            applicationId: customAppId,
            twentyStandardApplicationId: STANDARD_APPLICATION_ID,
            i18nInstance: mockI18n
        });
        expect(mockGenerateMessageId).not.toHaveBeenCalled();
        expect(mockI18n._).not.toHaveBeenCalled();
        expect(result).toBe('Fields');
    });
    it('should not translate title when overrides.title is defined', ()=>{
        mockGenerateMessageId.mockReturnValue('abc123');
        mockI18n._.mockReturnValue('Champs');
        const result = (0, _resolvepagelayoutwidgettitleutil.resolvePageLayoutWidgetTitle)({
            title: 'Fields',
            applicationId: STANDARD_APPLICATION_ID,
            twentyStandardApplicationId: STANDARD_APPLICATION_ID,
            overrides: {
                title: 'Fields'
            },
            i18nInstance: mockI18n
        });
        expect(mockGenerateMessageId).not.toHaveBeenCalled();
        expect(mockI18n._).not.toHaveBeenCalled();
        expect(result).toBe('Fields');
    });
    it('should translate title when overrides is defined but overrides.title is not', ()=>{
        mockGenerateMessageId.mockReturnValue('abc123');
        mockI18n._.mockReturnValue('Champs');
        const result = (0, _resolvepagelayoutwidgettitleutil.resolvePageLayoutWidgetTitle)({
            title: 'Fields',
            applicationId: STANDARD_APPLICATION_ID,
            twentyStandardApplicationId: STANDARD_APPLICATION_ID,
            overrides: {
                conditionalAvailabilityExpression: 'device == "MOBILE"'
            },
            i18nInstance: mockI18n
        });
        expect(mockGenerateMessageId).toHaveBeenCalledWith('Fields');
        expect(mockI18n._).toHaveBeenCalledWith('abc123');
        expect(result).toBe('Champs');
    });
});

//# sourceMappingURL=resolve-page-layout-widget-title.util.spec.js.map