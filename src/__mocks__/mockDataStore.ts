import { injectable } from "tsyringe";
import { DataStore } from "../dataAccess/dataStore";
import { Email } from "../types/email";
import { EmailRecord } from "../types/emailRecord";
import { UUID } from "../types/uuid";
import { mockUuid } from "./mockUuid";

@injectable()
export class MockDataStore implements DataStore {
  emails: Email[] = [];

  async addEmail(email: Email): Promise<UUID> {
    this.emails.push(email);

    return mockUuid;
  }

  checkEmailStatus(uuid: string): Promise<EmailRecord> {
    throw new Error("Method not implemented.");
  }
}
