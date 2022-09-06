import { inject, injectable } from "tsyringe";
import { DataStore } from "./dataAccess/dataStore";
import { Dependency } from "./dependency";
import { IEmailService } from "./emailController";
import { Email } from "./types/email";
import { EmailRecord } from "./types/emailRecord";

@injectable()
export class EmailService implements IEmailService {
  constructor(@inject(Dependency.DataStore) private dataStore: DataStore) {}

  async createEmailRecord(email: Email): Promise<EmailRecord> {
    console.log("Creating email", email);

    return await this.dataStore.addEmail(email);
  }
}
