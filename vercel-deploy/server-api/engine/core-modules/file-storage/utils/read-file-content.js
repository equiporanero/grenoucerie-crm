"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "readFileContent", {
    enumerable: true,
    get: function() {
        return readFileContent;
    }
});
const readFileContent = async (stream)=>{
    const chunks = [];
    for await (const chunk of stream){
        chunks.push(Buffer.from(chunk));
    }
    return Buffer.concat(chunks).toString('utf8');
};

//# sourceMappingURL=read-file-content.js.map