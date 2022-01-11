import {IApplicationContext, IConfig, IPlugin} from "@znetstar/attic-common/lib/Server";
import {IEvent,ILocation, IRPC} from "@znetstar/attic-common";
import {AddressList, Notifications} from '@thirdact/notifications';
import {
  AtticServerNotificationsApplicationContext,
  AtticServerNotificationsConfig,
  AtticServerNotificationsContext
} from "./common";

export class AtticServerNotifications implements IPlugin {
    constructor(
      public applicationContext: AtticServerNotificationsApplicationContext
    ) {
    }

    public async init(): Promise<void> {
      const ctx = this.applicationContext as AtticServerNotificationsApplicationContext;

      ctx.rpcServer.methods.notify = async function(
        who: AddressList,
        what: { data?: unknown, templateName: string, meta?: { [name: string]: unknown } }|string,
        opts?: Partial<AtticServerNotificationsContext>
    ): Promise<void> {
        await ctx.notifications.notify(
          who,
          // @ts-ignore
          what,
          opts
        );
      }

      ctx.notifications = new Notifications<AtticServerNotificationsContext>();
      for (const spec of ctx.config.notifyOnEvents || []) {
        ctx.registerHook(`events.${spec.eventName}`, async (event: IEvent<unknown>) => {
          await ctx.notifications.notify(
            spec.who,
            {
              data: event,
              templateName: spec.what.templateName,
              meta: spec.what.meta
            },
            spec.opts
          )
        });
      }
    }

    public get name(): string {
        return '@znetstar/attic-server-notifications';
    }
}

export default AtticServerNotifications;
