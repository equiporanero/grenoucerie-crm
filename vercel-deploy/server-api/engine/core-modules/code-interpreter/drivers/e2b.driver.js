"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "E2BDriver", {
    enumerable: true,
    get: function() {
        return E2BDriver;
    }
});
const _fs = require("fs");
const _path = require("path");
const _codeinterpreter = require("@e2b/code-interpreter");
const _codeinterpreterconstants = require("../code-interpreter.constants");
const _getmimetypeutil = require("../utils/get-mime-type.util");
const SANDBOX_SCRIPTS_PATH = (0, _path.join)(__dirname, '..', 'sandbox-scripts');
async function uploadDirectoryToSandbox(sbx, localPath, remotePath) {
    const entries = await _fs.promises.readdir(localPath, {
        withFileTypes: true
    });
    for (const entry of entries){
        const localEntryPath = (0, _path.join)(localPath, entry.name);
        const remoteEntryPath = `${remotePath}/${entry.name}`;
        if (entry.isDirectory()) {
            await uploadDirectoryToSandbox(sbx, localEntryPath, remoteEntryPath);
        } else {
            const content = await _fs.promises.readFile(localEntryPath);
            const arrayBuffer = new Uint8Array(content).buffer;
            await sbx.files.write(remoteEntryPath, arrayBuffer);
        }
    }
}
let E2BDriver = class E2BDriver {
    async execute(code, files, context, callbacks) {
        const sbx = await _codeinterpreter.Sandbox.create({
            apiKey: this.options.apiKey,
            timeoutMs: this.options.timeoutMs ?? _codeinterpreterconstants.DEFAULT_CODE_INTERPRETER_TIMEOUT_MS
        });
        try {
            // Upload pre-installed scripts to sandbox
            try {
                await uploadDirectoryToSandbox(sbx, SANDBOX_SCRIPTS_PATH, '/home/user/scripts');
            } catch  {
            // Scripts directory might not exist
            }
            for (const file of files ?? []){
                const arrayBuffer = new Uint8Array(file.content).buffer;
                await sbx.files.write(`/home/user/${file.filename}`, arrayBuffer);
            }
            const envSetup = context?.env ? `import os\n${Object.entries(context.env).map(([key, value])=>{
                const escapedValue = value.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '\\r');
                return `os.environ['${key}'] = '${escapedValue}'`;
            }).join('\n')}\n\n` : '';
            const outputFiles = [];
            let chartCounter = 0;
            const execution = await sbx.runCode(envSetup + code, {
                onStdout: (data)=>callbacks?.onStdout?.(data.line),
                onStderr: (data)=>callbacks?.onStderr?.(data.line),
                onResult: async (result)=>{
                    if (result.png) {
                        const outputFile = {
                            filename: `chart-${chartCounter++}.png`,
                            content: Buffer.from(result.png, 'base64'),
                            mimeType: 'image/png'
                        };
                        outputFiles.push(outputFile);
                        await callbacks?.onResult?.(outputFile);
                    }
                }
            });
            try {
                const outputDir = await sbx.files.list('/home/user/output');
                for (const file of outputDir){
                    if (file.type === 'file') {
                        const content = await sbx.files.read(`/home/user/output/${file.name}`);
                        const outputFile = {
                            filename: file.name,
                            content: Buffer.from(content),
                            mimeType: (0, _getmimetypeutil.getMimeType)(file.name)
                        };
                        outputFiles.push(outputFile);
                        await callbacks?.onResult?.(outputFile);
                    }
                }
            } catch  {
            // Output directory doesn't exist - that's fine
            }
            return {
                stdout: execution.logs.stdout.join('\n'),
                stderr: execution.logs.stderr.join('\n'),
                exitCode: execution.error ? 1 : 0,
                files: outputFiles,
                error: execution.error?.value
            };
        } finally{
            await sbx.kill();
        }
    }
    constructor(options){
        this.options = options;
    }
};

//# sourceMappingURL=e2b.driver.js.map