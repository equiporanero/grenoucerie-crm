"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _issubdomainvalidutil = require("../is-subdomain-valid.util");
describe('isSubdomainValid', ()=>{
    describe('valid subdomains', ()=>{
        it('should accept valid alphanumeric subdomains', ()=>{
            expect((0, _issubdomainvalidutil.isSubdomainValid)('abc')).toBe(true);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('test123')).toBe(true);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('company1')).toBe(true);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('workspace2024')).toBe(true);
        });
        it('should accept subdomains with hyphens in the middle', ()=>{
            expect((0, _issubdomainvalidutil.isSubdomainValid)('my-company')).toBe(true);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('test-workspace')).toBe(true);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('multi-word-subdomain')).toBe(true);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('a-b-c-d-e')).toBe(true);
        });
        it('should accept subdomains with mixed alphanumeric and hyphens', ()=>{
            expect((0, _issubdomainvalidutil.isSubdomainValid)('test-123')).toBe(true);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('company-2024')).toBe(true);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('workspace-v2')).toBe(true);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('my-app-123')).toBe(true);
        });
        it('should accept minimum length subdomains (3 characters)', ()=>{
            expect((0, _issubdomainvalidutil.isSubdomainValid)('abc')).toBe(true);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('a1b')).toBe(true);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('x-y')).toBe(true);
        });
        it('should accept maximum length subdomains (30 characters)', ()=>{
            const maxLengthSubdomain = 'a'.repeat(28) + 'bc'; // 30 characters total
            expect((0, _issubdomainvalidutil.isSubdomainValid)(maxLengthSubdomain)).toBe(true);
            const maxLengthWithHyphens = 'a' + '-'.repeat(28) + 'b'; // 30 characters with hyphens
            expect((0, _issubdomainvalidutil.isSubdomainValid)(maxLengthWithHyphens)).toBe(true);
        });
        it('should accept subdomains starting and ending with alphanumeric characters', ()=>{
            expect((0, _issubdomainvalidutil.isSubdomainValid)('a-b')).toBe(true);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('1-test-2')).toBe(true);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('start-middle-end')).toBe(true);
        });
    });
    describe('invalid subdomain patterns', ()=>{
        it('should reject empty strings', ()=>{
            expect((0, _issubdomainvalidutil.isSubdomainValid)('')).toBe(false);
        });
        it('should reject subdomains that are too short (less than 3 characters)', ()=>{
            expect((0, _issubdomainvalidutil.isSubdomainValid)('a')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('ab')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('1')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('12')).toBe(false);
        });
        it('should reject subdomains that are too long (more than 30 characters)', ()=>{
            const tooLongSubdomain = 'a'.repeat(31);
            expect((0, _issubdomainvalidutil.isSubdomainValid)(tooLongSubdomain)).toBe(false);
            const wayTooLongSubdomain = 'a'.repeat(50);
            expect((0, _issubdomainvalidutil.isSubdomainValid)(wayTooLongSubdomain)).toBe(false);
        });
        it('should reject subdomains starting with hyphens', ()=>{
            expect((0, _issubdomainvalidutil.isSubdomainValid)('-test')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('-abc')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('-my-company')).toBe(false);
        });
        it('should reject subdomains ending with hyphens', ()=>{
            expect((0, _issubdomainvalidutil.isSubdomainValid)('test-')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('abc-')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('my-company-')).toBe(false);
        });
        it('should reject subdomains with uppercase letters', ()=>{
            expect((0, _issubdomainvalidutil.isSubdomainValid)('Test')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('MyCompany')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('WORKSPACE')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('test-Company')).toBe(false);
        });
        it('should reject subdomains with special characters', ()=>{
            expect((0, _issubdomainvalidutil.isSubdomainValid)('test@company')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('my_workspace')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('test.company')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('workspace#1')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('test$company')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('my%workspace')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('test&company')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('workspace*1')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('test+company')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('my=workspace')).toBe(false);
        });
        it('should reject subdomains with spaces', ()=>{
            expect((0, _issubdomainvalidutil.isSubdomainValid)('test company')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('my workspace')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)(' test')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('test ')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)(' ')).toBe(false);
        });
        it('should reject subdomains starting with "api-"', ()=>{
            expect((0, _issubdomainvalidutil.isSubdomainValid)('api-test')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('api-company')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('api-workspace')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('api-123')).toBe(false);
        });
        it('should reject subdomains with only hyphens', ()=>{
            expect((0, _issubdomainvalidutil.isSubdomainValid)('---')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('----')).toBe(false);
        });
        it('should reject subdomains with numbers only at boundaries but invalid patterns', ()=>{
            expect((0, _issubdomainvalidutil.isSubdomainValid)('1-')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('-1')).toBe(false);
        });
    });
    describe('reserved subdomains', ()=>{
        it('should reject common reserved subdomains', ()=>{
            expect((0, _issubdomainvalidutil.isSubdomainValid)('api')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('www')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('admin')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('dashboard')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('billing')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('support')).toBe(false);
        });
        it('should reject technical reserved subdomains', ()=>{
            expect((0, _issubdomainvalidutil.isSubdomainValid)('db')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('cdn')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('storage')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('files')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('media')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('assets')).toBe(false);
        });
        it('should reject authentication related reserved subdomains', ()=>{
            expect((0, _issubdomainvalidutil.isSubdomainValid)('auth')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('login')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('signin')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('signup')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('register')).toBe(false);
        });
        it('should reject business related reserved subdomains', ()=>{
            expect((0, _issubdomainvalidutil.isSubdomainValid)('about')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('contact')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('careers')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('jobs')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('blog')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('news')).toBe(false);
        });
        it('should reject country code reserved subdomains', ()=>{
            expect((0, _issubdomainvalidutil.isSubdomainValid)('us')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('uk')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('ca')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('au')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('de')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('fr')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('it')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('es')).toBe(false);
        });
        it('should reject geographic reserved subdomains', ()=>{
            expect((0, _issubdomainvalidutil.isSubdomainValid)('europe')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('asia')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('africa')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('america')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('oceania')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('paris')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('london')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('new-york')).toBe(false);
        });
        it('should reject environment related reserved subdomains', ()=>{
            expect((0, _issubdomainvalidutil.isSubdomainValid)('dev')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('test')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('testing')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('staging')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('production')).toBe(false);
        });
        it('should reject reserved subdomains case-insensitively', ()=>{
            expect((0, _issubdomainvalidutil.isSubdomainValid)('API')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('Api')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('WWW')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('Www')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('ADMIN')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('Admin')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('TEST')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('Test')).toBe(false);
        });
        it('should reject all reserved subdomains from the constant', ()=>{
            const reservedSubdomains = [
                'trust',
                'demo',
                'api',
                't',
                'companies',
                'telemetry',
                'logs',
                'metrics',
                'next',
                'main',
                'admin',
                'dashboard',
                'dash',
                'billing',
                'db',
                'favicon',
                'www',
                'mail',
                'docs',
                'dev',
                'app',
                'staging',
                'production',
                'developer',
                'files',
                'cdn',
                'storage',
                'about',
                'help',
                'support',
                'contact',
                'privacy',
                'terms',
                'careers',
                'jobs',
                'blog',
                'news',
                'events',
                'community',
                'forum',
                'chat',
                'test',
                'testing',
                'feedback',
                'config',
                'settings',
                'media',
                'image',
                'audio',
                'video',
                'images',
                'partners',
                'partnership',
                'partnerships',
                'assets',
                'login',
                'signin',
                'signup',
                'legal',
                'shop',
                'merch',
                'store',
                'auth',
                'register',
                'payment'
            ];
            reservedSubdomains.forEach((subdomain)=>{
                expect((0, _issubdomainvalidutil.isSubdomainValid)(subdomain)).toBe(false);
            });
        });
    });
    describe('edge cases', ()=>{
        it('should handle whitespace-only strings', ()=>{
            expect((0, _issubdomainvalidutil.isSubdomainValid)('   ')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('\t')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('\n')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('\r')).toBe(false);
        });
        it('should handle strings with leading/trailing whitespace', ()=>{
            expect((0, _issubdomainvalidutil.isSubdomainValid)(' test')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('test ')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)(' test ')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('\ttest\t')).toBe(false);
        });
        it('should handle boundary length cases precisely', ()=>{
            // Exactly 3 characters (minimum valid)
            expect((0, _issubdomainvalidutil.isSubdomainValid)('abc')).toBe(true);
            // Exactly 30 characters (maximum valid)
            const exactly30Chars = 'a'.repeat(28) + 'bc';
            expect(exactly30Chars.length).toBe(30);
            expect((0, _issubdomainvalidutil.isSubdomainValid)(exactly30Chars)).toBe(true);
            // Exactly 31 characters (first invalid length)
            const exactly31Chars = 'a'.repeat(29) + 'bc';
            expect(exactly31Chars.length).toBe(31);
            expect((0, _issubdomainvalidutil.isSubdomainValid)(exactly31Chars)).toBe(false);
        });
        it('should validate that reserved subdomains check is case insensitive', ()=>{
            // Test mixed case variations of reserved subdomains
            expect((0, _issubdomainvalidutil.isSubdomainValid)('Trust')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('TRUST')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('tRuSt')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('Demo')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('DEMO')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('dEmO')).toBe(false);
        });
        it('should accept valid subdomains that are similar to reserved ones but not exact matches', ()=>{
            // 'testing' is reserved, but 'testing123' is not
            expect((0, _issubdomainvalidutil.isSubdomainValid)('testing123')).toBe(true);
            // 'api' is reserved, but 'myapi' is not
            expect((0, _issubdomainvalidutil.isSubdomainValid)('myapi')).toBe(true);
            // 'admin' is reserved, but 'adminpanel' is not
            expect((0, _issubdomainvalidutil.isSubdomainValid)('adminpanel')).toBe(true);
            // 'test' is reserved, but 'testapp' is not
            expect((0, _issubdomainvalidutil.isSubdomainValid)('testapp')).toBe(true);
        });
        it('should handle Unicode characters', ()=>{
            expect((0, _issubdomainvalidutil.isSubdomainValid)('tëst')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('tést')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('tèst')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('café')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('naïve')).toBe(false);
        });
        it('should handle numeric strings', ()=>{
            expect((0, _issubdomainvalidutil.isSubdomainValid)('123')).toBe(true);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('456789')).toBe(true);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('1-2-3')).toBe(true);
        });
    });
    describe('pattern validation specifics', ()=>{
        it('should enforce the exact regex pattern requirements', ()=>{
            // Test that the pattern requires alphanumeric start and end
            expect((0, _issubdomainvalidutil.isSubdomainValid)('a-b')).toBe(true);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('1-2')).toBe(true);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('test-123')).toBe(true);
            // Test that it rejects patterns not matching the regex
            expect((0, _issubdomainvalidutil.isSubdomainValid)('-ab')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('ab-')).toBe(false);
        });
        it('should reject api- prefix specifically', ()=>{
            expect((0, _issubdomainvalidutil.isSubdomainValid)('api-anything')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('api-test')).toBe(false);
            expect((0, _issubdomainvalidutil.isSubdomainValid)('api-123')).toBe(false);
            // But allow 'api' in other positions
            expect((0, _issubdomainvalidutil.isSubdomainValid)('myapi')).toBe(true);
        });
        it('should validate length constraints from regex', ()=>{
            // The regex pattern is: /^(?!api-).*^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$/
            // This means: start char + 1-28 middle chars + end char = 3-30 total chars
            // 3 chars: start + 1 middle + end
            expect((0, _issubdomainvalidutil.isSubdomainValid)('abc')).toBe(true);
            // 30 chars: start + 28 middle + end
            const thirtyChars = 'a' + 'b'.repeat(28) + 'c';
            expect(thirtyChars.length).toBe(30);
            expect((0, _issubdomainvalidutil.isSubdomainValid)(thirtyChars)).toBe(true);
        });
    });
});

//# sourceMappingURL=is-subdomain-valid.util.spec.js.map