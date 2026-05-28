"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BeforeCreateOneAppToken", {
    enumerable: true,
    get: function() {
        return BeforeCreateOneAppToken;
    }
});
let BeforeCreateOneAppToken = class BeforeCreateOneAppToken {
    async run(instance, // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    context) {
        const userId = context?.req?.user?.id;
        instance.input.userId = userId;
        return instance;
    }
};

//# sourceMappingURL=before-create-one-app-token.hook.js.map