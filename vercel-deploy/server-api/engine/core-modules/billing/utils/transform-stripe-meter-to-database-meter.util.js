/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "transformStripeMeterToDatabaseMeter", {
    enumerable: true,
    get: function() {
        return transformStripeMeterToDatabaseMeter;
    }
});
const _billingmetereventtimewindowenum = require("../enums/billing-meter-event-time-window.enum");
const _billingmeterstatusenum = require("../enums/billing-meter-status.enum");
const transformStripeMeterToDatabaseMeter = (data)=>{
    return {
        stripeMeterId: data.id,
        displayName: data.display_name,
        eventName: data.event_name,
        status: getBillingMeterStatus(data.status),
        customerMapping: data.customer_mapping,
        eventTimeWindow: data.event_time_window ? getBillingMeterEventTimeWindow(data.event_time_window) : undefined,
        valueSettings: data.value_settings
    };
};
const getBillingMeterStatus = (data)=>{
    switch(data){
        case 'active':
            return _billingmeterstatusenum.BillingMeterStatus.ACTIVE;
        case 'inactive':
            return _billingmeterstatusenum.BillingMeterStatus.INACTIVE;
    }
};
const getBillingMeterEventTimeWindow = (data)=>{
    switch(data){
        case 'day':
            return _billingmetereventtimewindowenum.BillingMeterEventTimeWindow.DAY;
        case 'hour':
            return _billingmetereventtimewindowenum.BillingMeterEventTimeWindow.HOUR;
    }
};

//# sourceMappingURL=transform-stripe-meter-to-database-meter.util.js.map