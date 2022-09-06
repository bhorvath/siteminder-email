import { injectable } from "tsyringe";
import { DataStore } from "../dataAccess/dataStore";
import { Email } from "../types/email";
import { EmailRecord } from "../types/emailRecord";

@injectable()
export class MockDataStore implements DataStore {
  emails: Email[] = [];

  async addEmail(email: Email): Promise<void> {
    this.emails.push(email);
  }

  checkEmailStatus(uuid: string): Promise<EmailRecord> {
    throw new Error("Method not implemented.");
  }
}
