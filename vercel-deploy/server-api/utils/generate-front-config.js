"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateFrontConfig", {
    enumerable: true,
    get: function() {
        return generateFrontConfig;
    }
});
const _fs = /*#__PURE__*/ _interop_require_wildcard(require("fs"));
const _path = /*#__PURE__*/ _interop_require_wildcard(require("path"));
const _dotenv = require("dotenv");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
(0, _dotenv.config)({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    override: true
});
function generateFrontConfig() {
    const configObject = {
        window: {
            _env_: {
                REACT_APP_SERVER_BASE_URL: process.env.SERVER_URL
            }
        }
    };
    const configString = `<!-- BEGIN: Twenty Config -->
    <script id="twenty-env-config">
      window._env_ = ${JSON.stringify(configObject.window._env_, null, 2)};
    </script>
    <!-- END: Twenty Config -->`;
    const distPath = _path.join(__dirname, '..', 'front');
    const indexPath = _path.join(distPath, 'index.html');
    try {
        let indexContent = _fs.readFileSync(indexPath, 'utf8');
        indexContent = indexContent.replace(/<!-- BEGIN: Twenty Config -->[\s\S]*?<!-- END: Twenty Config -->/, configString);
        _fs.writeFileSync(indexPath, indexContent, 'utf8');
    } catch  {
        // oxlint-disable-next-line no-console
        console.log('Frontend build not found or not writable, assuming it is served independently');
    }
}

//# sourceMappingURL=generate-front-config.js.map