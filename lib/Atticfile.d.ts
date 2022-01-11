import { IPlugin } from "@znetstar/attic-common/lib/Server";
import { AtticServerNotificationsApplicationContext } from "./common";
export declare class AtticServerNotifications implements IPlugin {
    applicationContext: AtticServerNotificationsApplicationContext;
    constructor(applicationContext: AtticServerNotificationsApplicationContext);
    init(): Promise<void>;
    get name(): string;
}
export default AtticServerNotifications;
