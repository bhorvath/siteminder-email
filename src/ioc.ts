import { IocContainer } from "@tsoa/runtime";
import { container } from "tsyringe";
import { DataStore } from "./dataAccess/dataStore";
import { InMemoryDataStore } from "./dataAccess/InMemoryDataStore";
import { Dependency } from "./dependency";
import { IEmailService } from "./emailController";
import { EmailService } from "./emailService";

export const iocContainer: IocContainer = {
  get: <T>(controller: { prototype: T }): T => {
    return container.resolve<T>(controller as never);
  },
};

export const setupContainer = () => {
  container.register<IEmailService>(Dependency.EmailService, {
    useClass: EmailService,
  });

  container.register<DataStore>(Dependency.DataStore, {
    useClass: InMemoryDataStore,
  });
};

setupContainer();
