"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _resolveandvalidatehostnameutil = require("../resolve-and-validate-hostname.util");
describe('resolveAndValidateHostname', ()=>{
    let mockDnsLookup;
    beforeEach(()=>{
        jest.clearAllMocks();
        mockDnsLookup = jest.fn();
    });
    it('should resolve a plain hostname and pass it to DNS lookup', async ()=>{
        mockDnsLookup.mockResolvedValue({
            address: '93.184.216.34',
            family: 4
        });
        await (0, _resolveandvalidatehostnameutil.resolveAndValidateHostname)('imap.fastmail.com', mockDnsLookup);
        expect(mockDnsLookup).toHaveBeenCalledWith('imap.fastmail.com');
    });
    it('should extract hostname from a full URL before resolving', async ()=>{
        mockDnsLookup.mockResolvedValue({
            address: '93.184.216.34',
            family: 4
        });
        await (0, _resolveandvalidatehostnameutil.resolveAndValidateHostname)('https://caldav.example.com:8443/dav/principals', mockDnsLookup);
        expect(mockDnsLookup).toHaveBeenCalledWith('caldav.example.com');
    });
    it('should throw when the resolved IP is private', async ()=>{
        mockDnsLookup.mockResolvedValue({
            address: '10.0.0.1',
            family: 4
        });
        await expect((0, _resolveandvalidatehostnameutil.resolveAndValidateHostname)('evil.example.com', mockDnsLookup)).rejects.toThrow('Connection to internal IP address 10.0.0.1 is not allowed.');
    });
    it('should return the resolved public IP', async ()=>{
        mockDnsLookup.mockResolvedValue({
            address: '93.184.216.34',
            family: 4
        });
        const result = await (0, _resolveandvalidatehostnameutil.resolveAndValidateHostname)('mail.example.com', mockDnsLookup);
        expect(result).toBe('93.184.216.34');
    });
    it('should propagate DNS resolution failures', async ()=>{
        mockDnsLookup.mockRejectedValue(new Error('getaddrinfo ENOTFOUND bogus.invalid'));
        await expect((0, _resolveandvalidatehostnameutil.resolveAndValidateHostname)('bogus.invalid', mockDnsLookup)).rejects.toThrow('getaddrinfo ENOTFOUND bogus.invalid');
    });
});

//# sourceMappingURL=resolve-and-validate-hostname.util.spec.js.map