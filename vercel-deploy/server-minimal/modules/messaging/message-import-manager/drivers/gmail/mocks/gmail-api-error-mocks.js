"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getGmailApiError", {
    enumerable: true,
    get: function() {
        return getGmailApiError;
    }
});
const _gaxios = require("gaxios");
const ERROR_DEFINITIONS = {
    400: {
        default: {
            reason: 'badRequest',
            message: 'Bad Request'
        },
        invalid_grant: {
            reason: 'invalid_grant',
            message: 'invalid_grant'
        },
        failedPrecondition: {
            reason: 'failedPrecondition',
            message: 'Precondition check failed.'
        }
    },
    401: {
        default: {
            reason: 'authError',
            message: 'Invalid Credentials'
        }
    },
    403: {
        default: {
            reason: 'rateLimitExceeded',
            message: 'Rate Limit Exceeded'
        },
        dailyLimit: {
            reason: 'dailyLimitExceeded',
            message: 'Daily Limit Exceeded'
        },
        userRateLimit: {
            reason: 'userRateLimitExceeded',
            message: 'User Rate Limit Exceeded'
        },
        rateLimit: {
            reason: 'rateLimitExceeded',
            message: 'Rate Limit Exceeded'
        },
        domainPolicy: {
            reason: 'domainPolicy',
            message: 'Domain Policy Error'
        }
    },
    404: {
        default: {
            reason: 'notFound',
            message: 'Not Found'
        }
    },
    410: {
        default: {
            reason: 'resourceGone',
            message: 'Resource Gone'
        }
    },
    429: {
        default: {
            reason: 'tooManyConcurrentRequests',
            message: 'Too Many Concurrent Requests'
        }
    },
    500: {
        default: {
            reason: 'backendError',
            message: 'Backend Error'
        }
    }
};
const getGmailApiError = ({ code, reason, message })=>{
    const statusMap = ERROR_DEFINITIONS[code];
    if (!statusMap) {
        throw new Error(`Unknown error code: ${code}`);
    }
    const config = statusMap[reason || ''] ?? statusMap.default;
    const errorMessage = message ?? config.message;
    return new _gaxios.GaxiosError(errorMessage, {
        url: 'https://gmail.googleapis.com/mocks'
    }, {
        status: code,
        statusText: config.message,
        data: {
            error: {
                code,
                message: errorMessage,
                errors: [
                    {
                        message: errorMessage,
                        reason: config.reason
                    }
                ]
            }
        },
        headers: {},
        config: {
            url: 'https://gmail.googleapis.com/mocks'
        },
        request: {
            responseURL: 'https://gmail.googleapis.com/mocks'
        }
    });
};

//# sourceMappingURL=gmail-api-error-mocks.js.map