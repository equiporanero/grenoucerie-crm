"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _common = require("@nestjs/common");
const _testing = require("@nestjs/testing");
const _stream = require("stream");
const _promises = require("node:stream/promises");
const _types = require("twenty-shared/types");
const _fileexception = require("../file.exception");
const _fileapiexceptionfilter = require("../filters/file-api-exception.filter");
const _filebyidguard = require("../guards/file-by-id.guard");
const _fileservice = require("../services/file.service");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _publicendpointguard = require("../../../guards/public-endpoint.guard");
const _filecontroller = require("./file.controller");
jest.mock('node:stream/promises', ()=>({
        pipeline: jest.fn()
    }));
const createMockStream = ()=>{
    const stream = new _stream.Readable();
    stream.push('file content');
    stream.push(null);
    return stream;
};
const createMockResponse = ({ headersSent = false } = {})=>({
        setHeader: jest.fn(),
        redirect: jest.fn(),
        headersSent,
        destroy: jest.fn()
    });
const mockPipeline = jest.mocked(_promises.pipeline);
describe('FileController', ()=>{
    let controller;
    let fileService;
    const mock_FileByIdGuard = {
        canActivate: jest.fn(()=>true)
    };
    const mock_PublicEndpointGuard = {
        canActivate: jest.fn(()=>true)
    };
    const mock_NoPermissionGuard = {
        canActivate: jest.fn(()=>true)
    };
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            controllers: [
                _filecontroller.FileController
            ],
            providers: [
                {
                    provide: _fileservice.FileService,
                    useValue: {
                        getFileStreamById: jest.fn(),
                        getFileStreamByPath: jest.fn(),
                        getFileResponseById: jest.fn()
                    }
                }
            ]
        }).overrideGuard(_filebyidguard.FileByIdGuard).useValue(mock_FileByIdGuard).overrideGuard(_publicendpointguard.PublicEndpointGuard).useValue(mock_PublicEndpointGuard).overrideGuard(_nopermissionguard.NoPermissionGuard).useValue(mock_NoPermissionGuard).overrideFilter(_fileapiexceptionfilter.FileApiExceptionFilter).useValue({}).compile();
        controller = module.get(_filecontroller.FileController);
        fileService = module.get(_fileservice.FileService);
        // Default to a resolved pipeline so happy-path tests don't have to wire it up.
        mockPipeline.mockResolvedValue(undefined);
    });
    it('should be defined', ()=>{
        expect(controller).toBeDefined();
    });
    describe('getFileById', ()=>{
        it('should 302 redirect when presigned URL is available', async ()=>{
            jest.spyOn(fileService, 'getFileResponseById').mockResolvedValue({
                type: 'redirect',
                presignedUrl: 'https://s3.example.com/file?signed=abc'
            });
            const mockRequest = {
                workspaceId: 'workspace-id'
            };
            const mockResponse = createMockResponse();
            await controller.getFileById(mockResponse, mockRequest, _types.FileFolder.Workflow, 'file-123');
            expect(fileService.getFileResponseById).toHaveBeenCalledWith({
                fileId: 'file-123',
                workspaceId: 'workspace-id',
                fileFolder: _types.FileFolder.Workflow
            });
            expect(mockResponse.redirect).toHaveBeenCalledWith('https://s3.example.com/file?signed=abc');
            expect(mockResponse.setHeader).not.toHaveBeenCalled();
        });
        it('should stream with headers when no presigned URL (local driver)', async ()=>{
            const mockStream = createMockStream();
            jest.spyOn(fileService, 'getFileResponseById').mockResolvedValue({
                type: 'stream',
                stream: mockStream,
                mimeType: 'image/png'
            });
            const mockRequest = {
                workspaceId: 'workspace-id'
            };
            const mockResponse = createMockResponse();
            await controller.getFileById(mockResponse, mockRequest, _types.FileFolder.CorePicture, 'file-123');
            expect(mockResponse.setHeader).toHaveBeenCalledWith('Content-Type', 'image/png');
            expect(mockResponse.setHeader).toHaveBeenCalledWith('X-Content-Type-Options', 'nosniff');
            expect(mockResponse.setHeader).toHaveBeenCalledWith('Content-Disposition', 'inline');
            expect(mockPipeline).toHaveBeenCalledWith(mockStream, mockResponse);
        });
        it('should force attachment disposition for non-safe MIME types', async ()=>{
            const mockStream = createMockStream();
            jest.spyOn(fileService, 'getFileResponseById').mockResolvedValue({
                type: 'stream',
                stream: mockStream,
                mimeType: 'text/html'
            });
            const mockRequest = {
                workspaceId: 'workspace-id'
            };
            const mockResponse = createMockResponse();
            await controller.getFileById(mockResponse, mockRequest, _types.FileFolder.Workflow, 'file-123');
            expect(mockResponse.setHeader).toHaveBeenCalledWith('Content-Type', 'text/html');
            expect(mockResponse.setHeader).toHaveBeenCalledWith('Content-Disposition', 'attachment');
        });
        it('should throw FILE_NOT_FOUND when the service yields null', async ()=>{
            jest.spyOn(fileService, 'getFileResponseById').mockResolvedValue(null);
            const mockRequest = {
                workspaceId: 'workspace-id'
            };
            const mockResponse = createMockResponse();
            await expect(controller.getFileById(mockResponse, mockRequest, _types.FileFolder.FilesField, 'missing-file')).rejects.toThrow(new _fileexception.FileException('File not found', _fileexception.FileExceptionCode.FILE_NOT_FOUND));
        });
        it('should throw INTERNAL_SERVER_ERROR without leaking the underlying message, and log the original error', async ()=>{
            const loggerSpy = jest.spyOn(_common.Logger.prototype, 'error').mockImplementation(()=>undefined);
            const underlyingError = new Error('Storage unavailable: postgres://secret-host:5432');
            jest.spyOn(fileService, 'getFileResponseById').mockRejectedValue(underlyingError);
            const mockRequest = {
                workspaceId: 'workspace-id'
            };
            const mockResponse = createMockResponse();
            const promise = controller.getFileById(mockResponse, mockRequest, _types.FileFolder.Workflow, 'file-456');
            await expect(promise).rejects.toThrow(new _fileexception.FileException('Error retrieving file', _fileexception.FileExceptionCode.INTERNAL_SERVER_ERROR));
            await expect(promise).rejects.not.toThrow(/secret-host/);
            expect(loggerSpy).toHaveBeenCalledWith('getFileResponseById failed unexpectedly', {
                error: underlyingError
            });
        });
        it('should throw INTERNAL_SERVER_ERROR when the stream errors before headers are sent', async ()=>{
            const mockStream = createMockStream();
            jest.spyOn(fileService, 'getFileResponseById').mockResolvedValue({
                type: 'stream',
                stream: mockStream,
                mimeType: 'image/png'
            });
            mockPipeline.mockRejectedValue(new Error('source backend exploded'));
            const mockRequest = {
                workspaceId: 'workspace-id'
            };
            const mockResponse = createMockResponse({
                headersSent: false
            });
            await expect(controller.getFileById(mockResponse, mockRequest, _types.FileFolder.CorePicture, 'file-123')).rejects.toThrow(new _fileexception.FileException('Error streaming file from storage', _fileexception.FileExceptionCode.INTERNAL_SERVER_ERROR));
            expect(mockResponse.destroy).not.toHaveBeenCalled();
        });
        it('should destroy the response without throwing when the stream errors after headers are sent', async ()=>{
            const mockStream = createMockStream();
            jest.spyOn(fileService, 'getFileResponseById').mockResolvedValue({
                type: 'stream',
                stream: mockStream,
                mimeType: 'image/png'
            });
            mockPipeline.mockRejectedValue(new Error('socket reset mid-flight'));
            const mockRequest = {
                workspaceId: 'workspace-id'
            };
            const mockResponse = createMockResponse({
                headersSent: true
            });
            // No throw expected — once headers are out, the controller cannot honestly
            // switch to a 500 response, so it tears the socket down instead.
            await controller.getFileById(mockResponse, mockRequest, _types.FileFolder.CorePicture, 'file-123');
            expect(mockResponse.destroy).toHaveBeenCalledTimes(1);
        });
    });
    describe('getPublicAssets', ()=>{
        it('should call fileService.getFileStreamByPath and pipe with headers', async ()=>{
            const mockStream = createMockStream();
            jest.spyOn(fileService, 'getFileStreamByPath').mockResolvedValue({
                stream: mockStream,
                mimeType: 'image/png'
            });
            const mockRequest = {
                params: {
                    path: [
                        'images',
                        'logo.png'
                    ]
                }
            };
            const mockResponse = createMockResponse();
            await controller.getPublicAssets(mockResponse, mockRequest, 'workspace-id', 'app-id');
            expect(fileService.getFileStreamByPath).toHaveBeenCalledWith({
                workspaceId: 'workspace-id',
                applicationId: 'app-id',
                fileFolder: _types.FileFolder.PublicAsset,
                filepath: 'images/logo.png'
            });
            expect(mockResponse.setHeader).toHaveBeenCalledWith('Content-Type', 'image/png');
            expect(mockResponse.setHeader).toHaveBeenCalledWith('X-Content-Type-Options', 'nosniff');
            expect(mockResponse.setHeader).toHaveBeenCalledWith('Content-Disposition', 'inline');
            expect(mockPipeline).toHaveBeenCalledWith(mockStream, mockResponse);
        });
        it('should handle single-segment path', async ()=>{
            const mockStream = createMockStream();
            jest.spyOn(fileService, 'getFileStreamByPath').mockResolvedValue({
                stream: mockStream,
                mimeType: 'image/x-icon'
            });
            const mockRequest = {
                params: {
                    path: [
                        'favicon.ico'
                    ]
                }
            };
            const mockResponse = createMockResponse();
            await controller.getPublicAssets(mockResponse, mockRequest, 'workspace-id', 'app-id');
            expect(fileService.getFileStreamByPath).toHaveBeenCalledWith({
                workspaceId: 'workspace-id',
                applicationId: 'app-id',
                fileFolder: _types.FileFolder.PublicAsset,
                filepath: 'favicon.ico'
            });
        });
        it('should throw FILE_NOT_FOUND when the service yields null', async ()=>{
            jest.spyOn(fileService, 'getFileStreamByPath').mockResolvedValue(null);
            const mockRequest = {
                params: {
                    path: [
                        'missing-asset.png'
                    ]
                }
            };
            const mockResponse = createMockResponse();
            await expect(controller.getPublicAssets(mockResponse, mockRequest, 'workspace-id', 'app-id')).rejects.toThrow(new _fileexception.FileException('File not found', _fileexception.FileExceptionCode.FILE_NOT_FOUND));
        });
        it('should throw INTERNAL_SERVER_ERROR without leaking the underlying message, and log the original error', async ()=>{
            const loggerSpy = jest.spyOn(_common.Logger.prototype, 'error').mockImplementation(()=>undefined);
            const underlyingError = new Error('Connection refused: postgres://secret-host:5432');
            jest.spyOn(fileService, 'getFileStreamByPath').mockRejectedValue(underlyingError);
            const mockRequest = {
                params: {
                    path: [
                        'broken-asset.png'
                    ]
                }
            };
            const mockResponse = createMockResponse();
            const promise = controller.getPublicAssets(mockResponse, mockRequest, 'workspace-id', 'app-id');
            await expect(promise).rejects.toThrow(new _fileexception.FileException('Error retrieving file', _fileexception.FileExceptionCode.INTERNAL_SERVER_ERROR));
            await expect(promise).rejects.not.toThrow(/secret-host/);
            expect(loggerSpy).toHaveBeenCalledWith('getFileStreamByPath failed unexpectedly', {
                error: underlyingError
            });
        });
        it('should throw INTERNAL_SERVER_ERROR when the stream errors before headers are sent', async ()=>{
            const mockStream = createMockStream();
            jest.spyOn(fileService, 'getFileStreamByPath').mockResolvedValue({
                stream: mockStream,
                mimeType: 'image/png'
            });
            mockPipeline.mockRejectedValue(new Error('source backend exploded'));
            const mockRequest = {
                params: {
                    path: [
                        'mid-stream-error.png'
                    ]
                }
            };
            const mockResponse = createMockResponse({
                headersSent: false
            });
            await expect(controller.getPublicAssets(mockResponse, mockRequest, 'workspace-id', 'app-id')).rejects.toThrow(new _fileexception.FileException('Error streaming file from storage', _fileexception.FileExceptionCode.INTERNAL_SERVER_ERROR));
            expect(mockResponse.destroy).not.toHaveBeenCalled();
        });
        it('should destroy the response without throwing when the stream errors after headers are sent', async ()=>{
            const mockStream = createMockStream();
            jest.spyOn(fileService, 'getFileStreamByPath').mockResolvedValue({
                stream: mockStream,
                mimeType: 'image/png'
            });
            mockPipeline.mockRejectedValue(new Error('socket reset mid-flight'));
            const mockRequest = {
                params: {
                    path: [
                        'mid-stream-after-headers.png'
                    ]
                }
            };
            const mockResponse = createMockResponse({
                headersSent: true
            });
            // No throw expected — once headers are out, the controller cannot honestly
            // switch to a 500 response, so it tears the socket down instead.
            await controller.getPublicAssets(mockResponse, mockRequest, 'workspace-id', 'app-id');
            expect(mockResponse.destroy).toHaveBeenCalledTimes(1);
        });
    });
});

//# sourceMappingURL=file.controller.spec.js.map