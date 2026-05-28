"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "scalars", {
    enumerable: true,
    get: function() {
        return scalars;
    }
});
const _bigfloatscalar = _export_star(require("./big-float.scalar"), exports);
const _bigintscalar = _export_star(require("./big-int.scalar"), exports);
const _cursorscalar = _export_star(require("./cursor.scalar"), exports);
const _datescalar = _export_star(require("./date.scalar"), exports);
const _positionscalar = _export_star(require("./position.scalar"), exports);
const _timescalar = _export_star(require("./time.scalar"), exports);
const _tsvectorscalar = _export_star(require("./ts-vector.scalar"), exports);
const _uuidscalar = _export_star(require("./uuid.scalar"), exports);
function _export_star(from, to) {
    Object.keys(from).forEach(function(k) {
        if (k !== "default" && !Object.prototype.hasOwnProperty.call(to, k)) {
            Object.defineProperty(to, k, {
                enumerable: true,
                get: function() {
                    return from[k];
                }
            });
        }
    });
    return from;
}
const scalars = [
    _bigfloatscalar.BigFloatScalarType,
    _bigintscalar.BigIntScalarType,
    _datescalar.DateScalarType,
    _timescalar.TimeScalarType,
    _uuidscalar.UUIDScalarType,
    _cursorscalar.CursorScalarType,
    _positionscalar.PositionScalarType,
    _tsvectorscalar.TSVectorScalarType
];

//# sourceMappingURL=index.js.map