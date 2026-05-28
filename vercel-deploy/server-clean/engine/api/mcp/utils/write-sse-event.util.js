"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "writeSseEvent", {
    enumerable: true,
    get: function() {
        return writeSseEvent;
    }
});
const writeSseEvent = (response, data)=>{
    // Ensure non-HTML content type so user data serialized as JSON cannot trigger XSS
    if (!response.headersSent) {
        response.setHeader('Content-Type', 'text/event-stream');
        response.setHeader('X-Content-Type-Options', 'nosniff');
    }
    response.write(`event: message\ndata: ${JSON.stringify(data)}\n\n`);
};

//# sourceMappingURL=write-sse-event.util.js.map