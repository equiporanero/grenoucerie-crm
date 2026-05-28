"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "messagingGetMessagesServiceGetMessages", {
    enumerable: true,
    get: function() {
        return messagingGetMessagesServiceGetMessages;
    }
});
const _types = require("twenty-shared/types");
const _messagedirectionenum = require("../../../common/enums/message-direction.enum");
const messagingGetMessagesServiceGetMessages = [
    {
        externalId: 'AA-work-emails-internal',
        subject: 'Test email for microsoft',
        receivedAt: new Date('2025-01-09T09:54:37.000Z'),
        text: 'Just a test',
        headerMessageId: '<d45b9f1c@PR0P264MB2911.FRAP264.PROD.OUTLOOK.COM>',
        messageThreadExternalId: 'AAQkAGZlMDQ1NjU5Lk=',
        direction: _messagedirectionenum.MessageDirection.OUTGOING,
        participants: [
            {
                role: _types.MessageParticipantRole.FROM,
                handle: 'from@acme.com',
                displayName: 'From'
            },
            {
                role: _types.MessageParticipantRole.TO,
                handle: 'to@acme.com',
                displayName: 'To'
            }
        ],
        attachments: []
    },
    {
        externalId: 'AA-work-emails-external',
        subject: 'Test email for microsoft',
        receivedAt: new Date('2025-01-09T09:54:37.000Z'),
        text: 'Just a test',
        headerMessageId: '<d45b9f1c@PR0P264MB2911.FRAP264.PROD.OUTLOOK.COM>',
        messageThreadExternalId: 'AAQkAGZlMDQ1NjU5Lk=',
        direction: _messagedirectionenum.MessageDirection.OUTGOING,
        participants: [
            {
                role: _types.MessageParticipantRole.FROM,
                handle: 'from@acme.com',
                displayName: 'From'
            },
            {
                role: _types.MessageParticipantRole.TO,
                handle: 'to@external.com',
                displayName: 'To'
            }
        ],
        attachments: []
    },
    {
        externalId: 'AA-personal-emails',
        subject: 'Sign in to your Microsoft Learn account for more features',
        receivedAt: new Date('2025-01-28T19:01:21.000Z'),
        text: 'Learn with interactive sandboxes, curated collections, and bookmarks',
        headerMessageId: '<AC70000@mails.microsoft.com>',
        messageThreadExternalId: 'AAQkAGZlMDQ1NNc=',
        direction: _messagedirectionenum.MessageDirection.INCOMING,
        participants: [
            {
                role: _types.MessageParticipantRole.FROM,
                handle: 'learn@mails.microsoft.com',
                displayName: 'Microsoft Learn'
            },
            {
                role: _types.MessageParticipantRole.TO,
                handle: 'to@gmail.com',
                displayName: 'To'
            }
        ],
        attachments: []
    }
];

//# sourceMappingURL=messages.js.map