"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _promises = require("node:fs/promises");
const _os = require("os");
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _filestorageexception = require("../../interfaces/file-storage-exception");
const _localdriver = require("../local.driver");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
describe('LocalDriver security hardening', ()=>{
    const cleanupPaths = [];
    const createTempDirectory = async (prefix)=>{
        const dir = await (0, _promises.mkdtemp)(_path.default.join((0, _os.tmpdir)(), prefix));
        cleanupPaths.push(dir);
        return dir;
    };
    afterAll(async ()=>{
        await Promise.all(cleanupPaths.map(async (directoryPath)=>{
            await (0, _promises.rm)(directoryPath, {
                recursive: true,
                force: true
            });
        }));
    });
    it('should reject writeFile when target is a symlink', async ()=>{
        const storagePath = await createTempDirectory('local-driver-storage-');
        const outsidePath = await createTempDirectory('local-driver-outside-');
        const outsideFilePath = _path.default.join(outsidePath, 'outside.txt');
        const symlinkFolderPath = _path.default.join(storagePath, 'workspace', 'app');
        const symlinkFilePath = _path.default.join(symlinkFolderPath, 'target.txt');
        await (0, _promises.mkdir)(symlinkFolderPath, {
            recursive: true
        });
        await (0, _promises.writeFile)(outsideFilePath, 'outside');
        await (0, _promises.symlink)(outsideFilePath, symlinkFilePath);
        const driver = new _localdriver.LocalDriver({
            storagePath
        });
        await expect(driver.writeFile({
            filePath: 'workspace/app/target.txt',
            sourceFile: Buffer.from('new-content'),
            mimeType: undefined
        })).rejects.toMatchObject({
            code: _filestorageexception.FileStorageExceptionCode.ACCESS_DENIED
        });
        await expect((0, _promises.readFile)(outsideFilePath, 'utf8')).resolves.toBe('outside');
    });
    it('should reject downloadFile when path resolves outside storage', async ()=>{
        const storagePath = await createTempDirectory('local-driver-storage-');
        const outsidePath = await createTempDirectory('local-driver-outside-');
        const outsideFilePath = _path.default.join(outsidePath, 'outside.txt');
        const symlinkFolderPath = _path.default.join(storagePath, 'workspace', 'app');
        const symlinkFilePath = _path.default.join(symlinkFolderPath, 'target.txt');
        const downloadDestinationPath = _path.default.join(storagePath, 'download', 'file.txt');
        await (0, _promises.mkdir)(symlinkFolderPath, {
            recursive: true
        });
        await (0, _promises.writeFile)(outsideFilePath, 'outside');
        await (0, _promises.symlink)(outsideFilePath, symlinkFilePath);
        const driver = new _localdriver.LocalDriver({
            storagePath
        });
        await expect(driver.downloadFile({
            onStoragePath: 'workspace/app/target.txt',
            localPath: downloadDestinationPath
        })).rejects.toMatchObject({
            code: _filestorageexception.FileStorageExceptionCode.ACCESS_DENIED
        });
    });
});

//# sourceMappingURL=local.driver.spec.js.map