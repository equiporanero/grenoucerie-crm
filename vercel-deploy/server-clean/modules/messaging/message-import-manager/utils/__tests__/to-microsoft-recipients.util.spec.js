"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _tomicrosoftrecipientsutil = require("../to-microsoft-recipients.util");
describe('toMicrosoftRecipients', ()=>{
    it('should return empty array when addresses is undefined', ()=>{
        expect((0, _tomicrosoftrecipientsutil.toMicrosoftRecipients)(undefined)).toEqual([]);
    });
    it('should convert a single email string to Microsoft recipient format', ()=>{
        const result = (0, _tomicrosoftrecipientsutil.toMicrosoftRecipients)('john@example.com');
        expect(result).toEqual([
            {
                emailAddress: {
                    address: 'john@example.com'
                }
            }
        ]);
    });
    it('should convert an array of emails to Microsoft recipient format', ()=>{
        const result = (0, _tomicrosoftrecipientsutil.toMicrosoftRecipients)([
            'john@example.com',
            'jane@example.com'
        ]);
        expect(result).toEqual([
            {
                emailAddress: {
                    address: 'john@example.com'
                }
            },
            {
                emailAddress: {
                    address: 'jane@example.com'
                }
            }
        ]);
    });
    it('should return empty array for empty string array', ()=>{
        expect((0, _tomicrosoftrecipientsutil.toMicrosoftRecipients)([])).toEqual([]);
    });
    it('should preserve email addresses exactly as provided', ()=>{
        const emailWithPlus = 'user+tag@example.com';
        const emailWithDots = 'first.last@sub.domain.com';
        const result = (0, _tomicrosoftrecipientsutil.toMicrosoftRecipients)([
            emailWithPlus,
            emailWithDots
        ]);
        expect(result[0].emailAddress.address).toBe(emailWithPlus);
        expect(result[1].emailAddress.address).toBe(emailWithDots);
    });
});

//# sourceMappingURL=to-microsoft-recipients.util.spec.js.map