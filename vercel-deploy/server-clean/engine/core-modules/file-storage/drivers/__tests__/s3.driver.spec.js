"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _clients3 = require("@aws-sdk/client-s3");
const _s3requestpresigner = require("@aws-sdk/s3-request-presigner");
const _s3driver = require("../s3.driver");
jest.mock('@aws-sdk/client-s3', ()=>{
    const actual = jest.requireActual('@aws-sdk/client-s3');
    return {
        ...actual,
        S3: jest.fn().mockImplementation(()=>({}))
    };
});
jest.mock('@aws-sdk/s3-request-presigner', ()=>({
        getSignedUrl: jest.fn()
    }));
describe('S3Driver.getPresignedUrl', ()=>{
    afterEach(()=>{
        jest.clearAllMocks();
    });
    it('should return null when presigning is not enabled', async ()=>{
        const driver = new _s3driver.S3Driver({
            bucketName: 'test-bucket',
            region: 'us-east-1',
            endpoint: 'http://localhost:9000'
        });
        const result = await driver.getPresignedUrl({
            filePath: 'some/file.png'
        });
        expect(result).toBeNull();
        expect(_s3requestpresigner.getSignedUrl).not.toHaveBeenCalled();
    });
    it('should presign with the main client when enabled without endpoint override', async ()=>{
        _s3requestpresigner.getSignedUrl.mockResolvedValue('https://s3.us-east-1.amazonaws.com/test-bucket/file.png?X-Amz-Signature=abc');
        const driver = new _s3driver.S3Driver({
            bucketName: 'test-bucket',
            region: 'us-east-1',
            presignEnabled: true
        });
        const result = await driver.getPresignedUrl({
            filePath: 'file.png',
            responseContentType: 'image/png',
            responseContentDisposition: 'inline'
        });
        expect(result).toBe('https://s3.us-east-1.amazonaws.com/test-bucket/file.png?X-Amz-Signature=abc');
        expect(_s3requestpresigner.getSignedUrl).toHaveBeenCalledWith(expect.anything(), expect.any(_clients3.GetObjectCommand), {
            expiresIn: 900
        });
    });
    it('should presign with a separate client when endpoint override is provided', async ()=>{
        _s3requestpresigner.getSignedUrl.mockResolvedValue('https://public.s3.com/test-bucket/some/file.png?X-Amz-Signature=abc');
        const driver = new _s3driver.S3Driver({
            bucketName: 'test-bucket',
            region: 'us-east-1',
            endpoint: 'http://internal-minio:9000',
            presignEnabled: true,
            presignEndpoint: 'https://public.s3.com'
        });
        const result = await driver.getPresignedUrl({
            filePath: 'some/file.png',
            responseContentType: 'image/png',
            responseContentDisposition: 'inline'
        });
        expect(result).toBe('https://public.s3.com/test-bucket/some/file.png?X-Amz-Signature=abc');
        expect(_s3requestpresigner.getSignedUrl).toHaveBeenCalledWith(expect.anything(), expect.any(_clients3.GetObjectCommand), {
            expiresIn: 900
        });
    });
    it('should use custom expiry when provided', async ()=>{
        _s3requestpresigner.getSignedUrl.mockResolvedValue('https://signed.url');
        const driver = new _s3driver.S3Driver({
            bucketName: 'test-bucket',
            region: 'us-east-1',
            presignEnabled: true
        });
        await driver.getPresignedUrl({
            filePath: 'file.txt',
            expiresInSeconds: 3600
        });
        expect(_s3requestpresigner.getSignedUrl).toHaveBeenCalledWith(expect.anything(), expect.any(_clients3.GetObjectCommand), {
            expiresIn: 3600
        });
    });
});

//# sourceMappingURL=s3.driver.spec.js.map