"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtticServerNotifications = void 0;
const notifications_1 = require("@thirdact/notifications");
class AtticServerNotifications {
    constructor(applicationContext) {
        this.applicationContext = applicationContext;
    }
    async init() {
        const ctx = this.applicationContext;
        ctx.rpcServer.methods.notify = async function (who, what, opts) {
            await ctx.notifications.notify(who, 
            // @ts-ignore
            what, opts);
        };
        ctx.notifications = new notifications_1.Notifications();
        for (const spec of ctx.config.notifyOnEvents || []) {
            ctx.registerHook(`events.${spec.eventName}`, async (event) => {
                await ctx.notifications.notify(spec.who, {
                    data: event,
                    templateName: spec.what.templateName,
                    meta: spec.what.meta
                }, spec.opts);
            });
        }
    }
    get name() {
        return '@znetstar/attic-server-notifications';
    }
}
exports.AtticServerNotifications = AtticServerNotifications;
exports.default = AtticServerNotifications;
//# sourceMappingURL=Atticfile.js.map