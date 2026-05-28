"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get getCropSize () {
        return getCropSize;
    },
    get getImageBufferFromUrl () {
        return getImageBufferFromUrl;
    }
});
const cropRegex = /([w|h])([0-9]+)/;
const getCropSize = (value)=>{
    const match = value.match(cropRegex);
    if (value === 'original' || match === null) {
        return null;
    }
    return {
        type: match[1] === 'w' ? 'width' : 'height',
        value: +match[2]
    };
};
const getImageBufferFromUrl = async (url, axiosInstance)=>{
    if (!url || typeof url !== 'string' || url.trim().length === 0) {
        throw new Error('Invalid URL provided: URL must be a non-empty string');
    }
    try {
        const response = await axiosInstance.get(url, {
            responseType: 'arraybuffer',
            validateStatus: (status)=>status >= 200 && status < 300,
            maxRedirects: 5,
            timeout: 10000
        });
        if (!response.data) {
            throw new Error('Received empty response from image URL');
        }
        const bufferLength = Buffer.isBuffer(response.data) ? response.data.length : response.data.byteLength;
        if (bufferLength === 0) {
            throw new Error('Received empty response from image URL');
        }
        const contentType = response.headers['content-type'];
        if (contentType && !contentType.startsWith('image/')) {
            throw new Error(`Invalid content type: expected image/*, got ${contentType}`);
        }
        return Buffer.from(response.data, 'binary');
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Failed to fetch image from ${url}: ${message}`);
    }
};

//# sourceMappingURL=image.js.map