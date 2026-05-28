"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "streamToBuffer", {
    enumerable: true,
    get: function() {
        return streamToBuffer;
    }
});
const streamToBuffer = async (stream, maxSizeBytes)=>{
    const chunks = [];
    let totalSize = 0;
    return new Promise((resolve, reject)=>{
        if (stream.readableEnded) {
            reject(new Error('Stream has already ended'));
            return;
        }
        if (!stream.readable) {
            reject(new Error('Stream is not readable'));
            return;
        }
        let isResolved = false;
        const cleanup = ()=>{
            stream.removeListener('data', onData);
            stream.removeListener('end', onEnd);
            stream.removeListener('error', onError);
            stream.removeListener('close', onClose);
        };
        const onData = (chunk)=>{
            if (!isResolved) {
                totalSize += chunk.length;
                if (maxSizeBytes !== undefined && totalSize > maxSizeBytes) {
                    isResolved = true;
                    cleanup();
                    stream.destroy();
                    reject(new Error(`Stream exceeds maximum allowed size of ${maxSizeBytes} bytes`));
                    return;
                }
                chunks.push(chunk);
            }
        };
        const onEnd = ()=>{
            if (!isResolved) {
                isResolved = true;
                cleanup();
                resolve(Buffer.concat(chunks));
            }
        };
        const onError = (error)=>{
            if (!isResolved) {
                isResolved = true;
                cleanup();
                reject(error);
            }
        };
        const onClose = ()=>{
            if (!isResolved) {
                if (stream.readableEnded) {
                    isResolved = true;
                    cleanup();
                    resolve(Buffer.concat(chunks));
                } else {
                    isResolved = true;
                    cleanup();
                    reject(new Error('Stream closed before end'));
                }
            }
        };
        stream.on('data', onData);
        stream.on('end', onEnd);
        stream.on('error', onError);
        stream.on('close', onClose);
    });
};

//# sourceMappingURL=stream-to-buffer.js.map