"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _hasprimaryemailchanged = require("../has-primary-email-changed");
const testCases = [
    {
        title: 'should return true when primary email has changed',
        context: {
            diff: {
                emails: {
                    before: {
                        primaryEmail: 'old@example.com',
                        additionalEmails: []
                    },
                    after: {
                        primaryEmail: 'new@example.com',
                        additionalEmails: []
                    }
                }
            },
            expected: true
        }
    },
    {
        title: 'should return false when primary email has not changed',
        context: {
            diff: {
                emails: {
                    before: {
                        primaryEmail: 'same@example.com',
                        additionalEmails: [
                            'additional@example.com'
                        ]
                    },
                    after: {
                        primaryEmail: 'same@example.com',
                        additionalEmails: [
                            'different@example.com'
                        ]
                    }
                }
            },
            expected: false
        }
    },
    {
        title: 'should return true when primary email changes from null to a value',
        context: {
            diff: {
                emails: {
                    before: {
                        primaryEmail: null,
                        additionalEmails: []
                    },
                    after: {
                        primaryEmail: 'new@example.com',
                        additionalEmails: []
                    }
                }
            },
            expected: true
        }
    },
    {
        title: 'should return true when primary email changes from a value to null',
        context: {
            diff: {
                emails: {
                    before: {
                        primaryEmail: 'old@example.com',
                        additionalEmails: []
                    },
                    after: {
                        primaryEmail: null,
                        additionalEmails: []
                    }
                }
            },
            expected: true
        }
    },
    {
        title: 'should return false when both primary emails are null',
        context: {
            diff: {
                emails: {
                    before: {
                        primaryEmail: null,
                        additionalEmails: []
                    },
                    after: {
                        primaryEmail: null,
                        additionalEmails: []
                    }
                }
            },
            expected: false
        }
    },
    {
        title: 'should return true when primary email changes from undefined to a value',
        context: {
            diff: {
                emails: {
                    before: {
                        primaryEmail: undefined,
                        additionalEmails: []
                    },
                    after: {
                        primaryEmail: 'new@example.com',
                        additionalEmails: []
                    }
                }
            },
            expected: true
        }
    },
    {
        title: 'should return true when primary email changes from a value to undefined',
        context: {
            diff: {
                emails: {
                    before: {
                        primaryEmail: 'old@example.com',
                        additionalEmails: []
                    },
                    after: {
                        primaryEmail: undefined,
                        additionalEmails: []
                    }
                }
            },
            expected: true
        }
    },
    {
        title: 'should return false when both primary emails are undefined',
        context: {
            diff: {
                emails: {
                    before: {
                        primaryEmail: undefined,
                        additionalEmails: []
                    },
                    after: {
                        primaryEmail: undefined,
                        additionalEmails: []
                    }
                }
            },
            expected: false
        }
    },
    {
        title: 'should return true when primary email changes from empty string to a value',
        context: {
            diff: {
                emails: {
                    before: {
                        primaryEmail: '',
                        additionalEmails: []
                    },
                    after: {
                        primaryEmail: 'new@example.com',
                        additionalEmails: []
                    }
                }
            },
            expected: true
        }
    },
    {
        title: 'should return true when primary email changes from a value to empty string',
        context: {
            diff: {
                emails: {
                    before: {
                        primaryEmail: 'old@example.com',
                        additionalEmails: []
                    },
                    after: {
                        primaryEmail: '',
                        additionalEmails: []
                    }
                }
            },
            expected: true
        }
    },
    {
        title: 'should return false when both primary emails are empty strings',
        context: {
            diff: {
                emails: {
                    before: {
                        primaryEmail: '',
                        additionalEmails: []
                    },
                    after: {
                        primaryEmail: '',
                        additionalEmails: []
                    }
                }
            },
            expected: false
        }
    },
    {
        title: 'should handle case when emails diff is undefined',
        context: {
            diff: {},
            expected: false
        }
    },
    {
        title: 'should handle case when emails.before is undefined',
        context: {
            diff: {
                emails: {
                    before: undefined,
                    after: {
                        primaryEmail: 'new@example.com',
                        additionalEmails: []
                    }
                }
            },
            expected: true
        }
    },
    {
        title: 'should handle case when emails.after is undefined',
        context: {
            diff: {
                emails: {
                    before: {
                        primaryEmail: 'old@example.com',
                        additionalEmails: []
                    },
                    after: undefined
                }
            },
            expected: true
        }
    },
    {
        title: 'should handle case when both emails.before and emails.after are undefined',
        context: {
            diff: {
                emails: {
                    before: undefined,
                    after: undefined
                }
            },
            expected: false
        }
    },
    {
        title: 'should not be case sensitive when comparing emails',
        context: {
            diff: {
                emails: {
                    before: {
                        primaryEmail: 'test@example.com',
                        additionalEmails: []
                    },
                    after: {
                        primaryEmail: 'TEST@EXAMPLE.COM',
                        additionalEmails: []
                    }
                }
            },
            expected: false
        }
    }
];
describe('hasPrimaryEmailChanged', ()=>{
    test.each(testCases)('$title', ({ context: { diff, expected } })=>{
        const result = (0, _hasprimaryemailchanged.hasPrimaryEmailChanged)(diff);
        expect(result).toBe(expected);
    });
});

//# sourceMappingURL=has-primary-email-changed.spec.js.map