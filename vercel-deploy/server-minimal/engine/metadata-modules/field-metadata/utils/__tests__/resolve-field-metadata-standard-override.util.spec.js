"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _translations = require("twenty-shared/translations");
const _generateMessageId = require("../../../../core-modules/i18n/utils/generateMessageId");
const _resolvefieldmetadatastandardoverrideutil = require("../resolve-field-metadata-standard-override.util");
jest.mock('src/engine/core-modules/i18n/utils/generateMessageId');
const mockGenerateMessageId = _generateMessageId.generateMessageId;
describe('resolveFieldMetadataStandardOverride', ()=>{
    let mockI18n;
    beforeEach(()=>{
        jest.clearAllMocks();
        mockI18n = {
            _: jest.fn()
        };
    });
    describe('Custom fields', ()=>{
        it('should return the field value for custom label field', ()=>{
            const fieldMetadata = {
                label: 'Custom Label',
                description: 'Custom Description',
                icon: 'custom-icon',
                isCustom: true,
                standardOverrides: undefined
            };
            const result = (0, _resolvefieldmetadatastandardoverrideutil.resolveFieldMetadataStandardOverride)(fieldMetadata, 'label', 'fr-FR', mockI18n);
            expect(result).toBe('Custom Label');
        });
        it('should return the field value for custom description field', ()=>{
            const fieldMetadata = {
                label: 'Custom Label',
                description: 'Custom Description',
                icon: 'custom-icon',
                isCustom: true,
                standardOverrides: undefined
            };
            const result = (0, _resolvefieldmetadatastandardoverrideutil.resolveFieldMetadataStandardOverride)(fieldMetadata, 'description', undefined, mockI18n);
            expect(result).toBe('Custom Description');
        });
        it('should return the field value for custom icon field', ()=>{
            const fieldMetadata = {
                label: 'Custom Label',
                description: 'Custom Description',
                icon: 'custom-icon',
                isCustom: true,
                standardOverrides: undefined
            };
            const result = (0, _resolvefieldmetadatastandardoverrideutil.resolveFieldMetadataStandardOverride)(fieldMetadata, 'icon', _translations.SOURCE_LOCALE, mockI18n);
            expect(result).toBe('custom-icon');
        });
    });
    describe('Standard fields - Icon overrides', ()=>{
        it('should return override icon when available for standard field', ()=>{
            const fieldMetadata = {
                label: 'Standard Label',
                description: 'Standard Description',
                icon: 'default-icon',
                isCustom: false,
                standardOverrides: {
                    icon: 'override-icon'
                }
            };
            const result = (0, _resolvefieldmetadatastandardoverrideutil.resolveFieldMetadataStandardOverride)(fieldMetadata, 'icon', 'fr-FR', mockI18n);
            expect(result).toBe('override-icon');
        });
    });
    describe('Standard fields - Translation overrides', ()=>{
        it('should return translation override when available for non-icon fields', ()=>{
            const fieldMetadata = {
                label: 'Standard Label',
                description: 'Standard Description',
                icon: 'default-icon',
                isCustom: false,
                standardOverrides: {
                    translations: {
                        'fr-FR': {
                            label: 'Libellé traduit',
                            description: 'Description traduite'
                        }
                    }
                }
            };
            expect((0, _resolvefieldmetadatastandardoverrideutil.resolveFieldMetadataStandardOverride)(fieldMetadata, 'label', 'fr-FR', mockI18n)).toBe('Libellé traduit');
            expect((0, _resolvefieldmetadatastandardoverrideutil.resolveFieldMetadataStandardOverride)(fieldMetadata, 'description', 'fr-FR', mockI18n)).toBe('Description traduite');
        });
        it('should fallback when translation override is not available for the locale', ()=>{
            const fieldMetadata = {
                label: 'Standard Label',
                description: 'Standard Description',
                icon: 'default-icon',
                isCustom: false,
                standardOverrides: {
                    translations: {
                        'es-ES': {
                            label: 'Etiqueta en español'
                        }
                    }
                }
            };
            mockGenerateMessageId.mockReturnValue('generated-message-id');
            mockI18n._.mockReturnValue('generated-message-id');
            const result = (0, _resolvefieldmetadatastandardoverrideutil.resolveFieldMetadataStandardOverride)(fieldMetadata, 'label', 'fr-FR', mockI18n);
            expect(result).toBe('Standard Label');
        });
        it('should fallback when translation override is not available for the labelKey', ()=>{
            const fieldMetadata = {
                label: 'Standard Label',
                description: 'Standard Description',
                icon: 'default-icon',
                isCustom: false,
                standardOverrides: {
                    translations: {
                        'fr-FR': {
                            label: 'Libellé traduit'
                        }
                    }
                }
            };
            mockGenerateMessageId.mockReturnValue('generated-message-id');
            mockI18n._.mockReturnValue('generated-message-id');
            const result = (0, _resolvefieldmetadatastandardoverrideutil.resolveFieldMetadataStandardOverride)(fieldMetadata, 'description', 'fr-FR', mockI18n);
            expect(result).toBe('Standard Description');
        });
        it('should not use translation overrides when locale is undefined', ()=>{
            const fieldMetadata = {
                label: 'Standard Label',
                description: 'Standard Description',
                icon: 'default-icon',
                isCustom: false,
                standardOverrides: {
                    translations: {
                        'fr-FR': {
                            label: 'Libellé traduit'
                        }
                    }
                }
            };
            mockGenerateMessageId.mockReturnValue('generated-message-id');
            mockI18n._.mockReturnValue('generated-message-id');
            const result = (0, _resolvefieldmetadatastandardoverrideutil.resolveFieldMetadataStandardOverride)(fieldMetadata, 'label', undefined, mockI18n);
            expect(result).toBe('Standard Label');
        });
    });
    describe('Standard fields - SOURCE_LOCALE overrides', ()=>{
        it('should return direct override for SOURCE_LOCALE when available', ()=>{
            const fieldMetadata = {
                label: 'Standard Label',
                description: 'Standard Description',
                icon: 'default-icon',
                isCustom: false,
                standardOverrides: {
                    label: 'Overridden Label',
                    description: 'Overridden Description',
                    icon: 'overridden-icon'
                }
            };
            expect((0, _resolvefieldmetadatastandardoverrideutil.resolveFieldMetadataStandardOverride)(fieldMetadata, 'label', _translations.SOURCE_LOCALE, mockI18n)).toBe('Overridden Label');
            expect((0, _resolvefieldmetadatastandardoverrideutil.resolveFieldMetadataStandardOverride)(fieldMetadata, 'description', _translations.SOURCE_LOCALE, mockI18n)).toBe('Overridden Description');
            expect((0, _resolvefieldmetadatastandardoverrideutil.resolveFieldMetadataStandardOverride)(fieldMetadata, 'icon', _translations.SOURCE_LOCALE, mockI18n)).toBe('overridden-icon');
        });
        it('should use direct override for non-SOURCE_LOCALE when translation override is missing', ()=>{
            const fieldMetadata = {
                label: 'Standard Label',
                description: 'Standard Description',
                icon: 'default-icon',
                isCustom: false,
                standardOverrides: {
                    label: 'Overridden Label'
                }
            };
            mockGenerateMessageId.mockReturnValue('generated-message-id');
            mockI18n._.mockReturnValue('generated-message-id');
            const result = (0, _resolvefieldmetadatastandardoverrideutil.resolveFieldMetadataStandardOverride)(fieldMetadata, 'label', 'fr-FR', mockI18n);
            expect(result).toBe('Overridden Label');
            expect(mockGenerateMessageId).not.toHaveBeenCalled();
            expect(mockI18n._).not.toHaveBeenCalled();
        });
        it('should not use empty string override for SOURCE_LOCALE', ()=>{
            const fieldMetadata = {
                label: 'Standard Label',
                description: 'Standard Description',
                icon: 'default-icon',
                isCustom: false,
                standardOverrides: {
                    label: ''
                }
            };
            mockGenerateMessageId.mockReturnValue('generated-message-id');
            mockI18n._.mockReturnValue('generated-message-id');
            const result = (0, _resolvefieldmetadatastandardoverrideutil.resolveFieldMetadataStandardOverride)(fieldMetadata, 'label', _translations.SOURCE_LOCALE, mockI18n);
            expect(result).toBe('Standard Label');
        });
        it('should not use undefined override for SOURCE_LOCALE', ()=>{
            const fieldMetadata = {
                label: 'Standard Label',
                description: 'Standard Description',
                icon: 'default-icon',
                isCustom: false,
                standardOverrides: {
                    label: undefined
                }
            };
            mockGenerateMessageId.mockReturnValue('generated-message-id');
            mockI18n._.mockReturnValue('generated-message-id');
            const result = (0, _resolvefieldmetadatastandardoverrideutil.resolveFieldMetadataStandardOverride)(fieldMetadata, 'label', _translations.SOURCE_LOCALE, mockI18n);
            expect(result).toBe('Standard Label');
        });
    });
    describe('Standard fields - Auto translation fallback', ()=>{
        it('should return translated message when translation is available', ()=>{
            const fieldMetadata = {
                label: 'Standard Label',
                description: 'Standard Description',
                icon: 'default-icon',
                isCustom: false,
                standardOverrides: undefined
            };
            mockGenerateMessageId.mockReturnValue('standard.label.message.id');
            mockI18n._.mockReturnValue('Libellé traduit automatiquement');
            const result = (0, _resolvefieldmetadatastandardoverrideutil.resolveFieldMetadataStandardOverride)(fieldMetadata, 'label', 'fr-FR', mockI18n);
            expect(mockGenerateMessageId).toHaveBeenCalledWith('Standard Label');
            expect(mockI18n._).toHaveBeenCalledWith('standard.label.message.id');
            expect(result).toBe('Libellé traduit automatiquement');
        });
        it('should return original field value when no translation is found', ()=>{
            const fieldMetadata = {
                label: 'Standard Label',
                description: 'Standard Description',
                icon: 'default-icon',
                isCustom: false,
                standardOverrides: undefined
            };
            const messageId = 'standard.label.message.id';
            mockGenerateMessageId.mockReturnValue(messageId);
            mockI18n._.mockReturnValue(messageId);
            const result = (0, _resolvefieldmetadatastandardoverrideutil.resolveFieldMetadataStandardOverride)(fieldMetadata, 'label', 'fr-FR', mockI18n);
            expect(result).toBe('Standard Label');
        });
    });
    describe('Priority order - Standard fields', ()=>{
        it('should prioritize translation override over SOURCE_LOCALE override for non-SOURCE_LOCALE', ()=>{
            const fieldMetadata = {
                label: 'Standard Label',
                description: 'Standard Description',
                icon: 'default-icon',
                isCustom: false,
                standardOverrides: {
                    label: 'Source Override',
                    translations: {
                        'fr-FR': {
                            label: 'Translation Override'
                        }
                    }
                }
            };
            const result = (0, _resolvefieldmetadatastandardoverrideutil.resolveFieldMetadataStandardOverride)(fieldMetadata, 'label', 'fr-FR', mockI18n);
            expect(result).toBe('Translation Override');
            expect(mockGenerateMessageId).not.toHaveBeenCalled();
            expect(mockI18n._).not.toHaveBeenCalled();
        });
        it('should prioritize SOURCE_LOCALE override over auto translation for SOURCE_LOCALE', ()=>{
            const fieldMetadata = {
                label: 'Standard Label',
                description: 'Standard Description',
                icon: 'default-icon',
                isCustom: false,
                standardOverrides: {
                    label: 'Source Override'
                }
            };
            const result = (0, _resolvefieldmetadatastandardoverrideutil.resolveFieldMetadataStandardOverride)(fieldMetadata, 'label', _translations.SOURCE_LOCALE, mockI18n);
            expect(result).toBe('Source Override');
            expect(mockGenerateMessageId).not.toHaveBeenCalled();
            expect(mockI18n._).not.toHaveBeenCalled();
        });
        it('should use auto translation when no overrides are available', ()=>{
            const fieldMetadata = {
                label: 'Standard Label',
                description: 'Standard Description',
                icon: 'default-icon',
                isCustom: false,
                standardOverrides: {}
            };
            mockGenerateMessageId.mockReturnValue('auto.translation.id');
            mockI18n._.mockReturnValue('Auto Translated Label');
            const result = (0, _resolvefieldmetadatastandardoverrideutil.resolveFieldMetadataStandardOverride)(fieldMetadata, 'label', 'de-DE', mockI18n);
            expect(result).toBe('Auto Translated Label');
            expect(mockGenerateMessageId).toHaveBeenCalledWith('Standard Label');
            expect(mockI18n._).toHaveBeenCalledWith('auto.translation.id');
        });
    });
});

//# sourceMappingURL=resolve-field-metadata-standard-override.util.spec.js.map