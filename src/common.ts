import {IApplicationContext, IConfig} from "@znetstar/attic-common/lib/Server";
import {AddressList, Notifications, RenderContextOptions} from '@thirdact/notifications';
import AtticServerNotifications from "./Atticfile";
import {IEvent,ILocation, IRPC} from "@znetstar/attic-common";


export type AtticServerNotificationsConfig = IConfig&{
  notifyOnEvents?: {
    eventName: string;
    who: AddressList,
    what: { templateName: string, meta?: { [name: string]: unknown } },
    opts?: Partial<AtticServerNotificationsContext>
  }[];
};

export type AtticServerNotificationsRPCServerMethods = IRPC&{
  notify(
    who: AddressList,
    what: { data?: unknown, templateName: string, meta?: { [name: string]: unknown } }|string,
    opts?: Partial<AtticServerNotificationsContext>
  ): Promise<void>;
}

export type AtticServerNotificationsContext = RenderContextOptions&{
  applicationContext: AtticServerNotificationsApplicationContext
}

export type AtticServerNotificationsApplicationContext = IApplicationContext&{
  config: AtticServerNotificationsConfig,
  notifications: Notifications<AtticServerNotificationsContext>,
  rpcServer: unknown&{ methods: AtticServerNotificationsRPCServerMethods }
}
