import { inject } from "tsyringe";
import { DataStore } from "./dataAccess/dataStore";
import { Dependency } from "./dependency";
import { Email } from "./types/email";

export class EmailService {
  constructor(@inject(Dependency.DataStore) private dataStore: DataStore) {}

  async createEmailRecord(email: Email): Promise<void> {
    await this.dataStore.addEmail(email);
  }
}
