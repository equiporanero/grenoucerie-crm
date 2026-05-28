"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validatePageLayoutWidgetGridPosition", {
    enumerable: true,
    get: function() {
        return validatePageLayoutWidgetGridPosition;
    }
});
const _widgetgridmaxcolumnsconstant = require("../constants/widget-grid-max-columns.constant");
const _widgetgridmaxrowsconstant = require("../constants/widget-grid-max-rows.constant");
const _pagelayoutwidgetexception = require("../exceptions/page-layout-widget.exception");
const validatePageLayoutWidgetGridPosition = (position, widgetTitle)=>{
    const errors = [];
    const { row, column, rowSpan, columnSpan } = position;
    if (column >= _widgetgridmaxcolumnsconstant.WIDGET_GRID_MAX_COLUMNS) {
        errors.push({
            code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
            message: (0, _pagelayoutwidgetexception.generatePageLayoutWidgetExceptionMessage)(_pagelayoutwidgetexception.PageLayoutWidgetExceptionMessageKey.INVALID_WIDGET_POSITION, widgetTitle, undefined, `column ${column} exceeds grid width (max column is ${_widgetgridmaxcolumnsconstant.WIDGET_GRID_MAX_COLUMNS - 1})`),
            userFriendlyMessage: /*i18n*/ {
                id: "PFI4iS",
                message: "Widget extends beyond grid width"
            }
        });
    }
    if (column + columnSpan > _widgetgridmaxcolumnsconstant.WIDGET_GRID_MAX_COLUMNS) {
        errors.push({
            code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
            message: (0, _pagelayoutwidgetexception.generatePageLayoutWidgetExceptionMessage)(_pagelayoutwidgetexception.PageLayoutWidgetExceptionMessageKey.INVALID_WIDGET_POSITION, widgetTitle, undefined, `widget extends beyond grid width (column ${column} + columnSpan ${columnSpan} > ${_widgetgridmaxcolumnsconstant.WIDGET_GRID_MAX_COLUMNS})`),
            userFriendlyMessage: /*i18n*/ {
                id: "PFI4iS",
                message: "Widget extends beyond grid width"
            }
        });
    }
    if (row >= _widgetgridmaxrowsconstant.WIDGET_GRID_MAX_ROWS) {
        errors.push({
            code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
            message: (0, _pagelayoutwidgetexception.generatePageLayoutWidgetExceptionMessage)(_pagelayoutwidgetexception.PageLayoutWidgetExceptionMessageKey.INVALID_WIDGET_POSITION, widgetTitle, undefined, `row ${row} exceeds maximum allowed rows (${_widgetgridmaxrowsconstant.WIDGET_GRID_MAX_ROWS})`),
            userFriendlyMessage: /*i18n*/ {
                id: "D5gHL1",
                message: "Widget row exceeds grid height"
            }
        });
    }
    if (row + rowSpan > _widgetgridmaxrowsconstant.WIDGET_GRID_MAX_ROWS) {
        errors.push({
            code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
            message: (0, _pagelayoutwidgetexception.generatePageLayoutWidgetExceptionMessage)(_pagelayoutwidgetexception.PageLayoutWidgetExceptionMessageKey.INVALID_WIDGET_POSITION, widgetTitle, undefined, `widget extends beyond grid height (row ${row} + rowSpan ${rowSpan} > ${_widgetgridmaxrowsconstant.WIDGET_GRID_MAX_ROWS})`),
            userFriendlyMessage: /*i18n*/ {
                id: "OHlJ1X",
                message: "Widget extends beyond grid height"
            }
        });
    }
    return errors;
};

//# sourceMappingURL=validate-page-layout-widget-grid-position.util.js.map