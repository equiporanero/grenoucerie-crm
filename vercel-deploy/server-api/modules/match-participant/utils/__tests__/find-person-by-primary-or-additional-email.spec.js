"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _findpersonbyprimaryoradditionalemail = require("../find-person-by-primary-or-additional-email");
describe('findPersonByPrimaryOrAdditionalEmail', ()=>{
    const mockPeople = [
        {
            id: 'person-1',
            emails: {
                primaryEmail: 'primary@example.com',
                additionalEmails: [
                    'additional1@example.com',
                    'additional2@example.com'
                ]
            }
        },
        {
            id: 'person-2',
            emails: {
                primaryEmail: 'other@example.com',
                additionalEmails: [
                    'test@example.com'
                ]
            }
        },
        {
            id: 'person-3',
            emails: {
                primaryEmail: 'test@example.com',
                additionalEmails: [
                    'backup@example.com'
                ]
            }
        }
    ];
    it('should return person with matching primary email', ()=>{
        const result = (0, _findpersonbyprimaryoradditionalemail.findPersonByPrimaryOrAdditionalEmail)({
            people: mockPeople,
            email: 'test@example.com'
        });
        expect(result).toEqual(mockPeople[2]);
    });
    it('should return person with matching additional email when no primary match exists', ()=>{
        const result = (0, _findpersonbyprimaryoradditionalemail.findPersonByPrimaryOrAdditionalEmail)({
            people: mockPeople,
            email: 'additional1@example.com'
        });
        expect(result).toEqual(mockPeople[0]);
    });
    it('should prioritize primary email over additional email', ()=>{
        const peopleWithConflict = [
            {
                id: 'person-with-additional',
                emails: {
                    primaryEmail: 'other@example.com',
                    additionalEmails: [
                        'conflict@example.com'
                    ]
                }
            },
            {
                id: 'person-with-primary',
                emails: {
                    primaryEmail: 'conflict@example.com',
                    additionalEmails: [
                        'backup@example.com'
                    ]
                }
            }
        ];
        const result = (0, _findpersonbyprimaryoradditionalemail.findPersonByPrimaryOrAdditionalEmail)({
            people: peopleWithConflict,
            email: 'conflict@example.com'
        });
        expect(result).toEqual(peopleWithConflict[1]);
    });
    it('should return undefined when no match is found', ()=>{
        const result = (0, _findpersonbyprimaryoradditionalemail.findPersonByPrimaryOrAdditionalEmail)({
            people: mockPeople,
            email: 'nonexistent@example.com'
        });
        expect(result).toBeUndefined();
    });
    it('should return undefined when people array is empty', ()=>{
        const result = (0, _findpersonbyprimaryoradditionalemail.findPersonByPrimaryOrAdditionalEmail)({
            people: [],
            email: 'test@example.com'
        });
        expect(result).toBeUndefined();
    });
    it('should handle people with null or undefined emails', ()=>{
        const peopleWithNullEmails = [
            {
                id: 'person-1',
                emails: null
            },
            {
                id: 'person-2',
                emails: {
                    primaryEmail: 'test@example.com',
                    additionalEmails: null
                }
            },
            {
                id: 'person-3',
                emails: {
                    primaryEmail: null,
                    additionalEmails: [
                        'test@example.com'
                    ]
                }
            }
        ];
        const result = (0, _findpersonbyprimaryoradditionalemail.findPersonByPrimaryOrAdditionalEmail)({
            people: peopleWithNullEmails,
            email: 'test@example.com'
        });
        expect(result).toEqual(peopleWithNullEmails[1]);
    });
    it('should handle people with empty additional emails array', ()=>{
        const peopleWithEmptyAdditional = [
            {
                id: 'person-1',
                emails: {
                    primaryEmail: 'other@example.com',
                    additionalEmails: null
                }
            },
            {
                id: 'person-2',
                emails: {
                    primaryEmail: 'test@example.com',
                    additionalEmails: null
                }
            }
        ];
        const result = (0, _findpersonbyprimaryoradditionalemail.findPersonByPrimaryOrAdditionalEmail)({
            people: peopleWithEmptyAdditional,
            email: 'test@example.com'
        });
        expect(result).toEqual(peopleWithEmptyAdditional[1]);
    });
    it('should handle case sensitivity correctly', ()=>{
        const result = (0, _findpersonbyprimaryoradditionalemail.findPersonByPrimaryOrAdditionalEmail)({
            people: mockPeople,
            email: 'TEST@EXAMPLE.COM'
        });
        expect(result).toEqual(mockPeople[2]);
    });
    it('should handle people with non-array additional emails', ()=>{
        const peopleWithInvalidAdditionalEmail = [
            {
                id: 'person-1',
                emails: {
                    primaryEmail: 'other@example.com',
                    additionalEmails: 'not-an-array'
                }
            },
            {
                id: 'person-2',
                emails: {
                    primaryEmail: 'test@example.com',
                    additionalEmails: []
                }
            }
        ];
        const result = (0, _findpersonbyprimaryoradditionalemail.findPersonByPrimaryOrAdditionalEmail)({
            people: peopleWithInvalidAdditionalEmail,
            email: 'test@example.com'
        });
        expect(result).toEqual(peopleWithInvalidAdditionalEmail[1]);
    });
});

//# sourceMappingURL=find-person-by-primary-or-additional-email.spec.js.map