import { Email } from "../types/email";
import { EmailRecord, EmailStatus } from "../types/emailRecord";
import { UUID } from "../types/uuid";
import { DataStore } from "./dataStore";
import { randomUUID } from "crypto";

export class InMemoryDataStore implements DataStore {
  private records: EmailRecord[] = [];

  async addEmail(email: Email): Promise<UUID> {
    const uuid = randomUUID();

    const record: EmailRecord = {
      id: uuid,
      email,
      status: EmailStatus.Queued,
    };
    this.records.push(record);

    return uuid;
  }

  checkEmailStatus(uuid: string): Promise<EmailRecord> {
    throw new Error("Method not implemented.");
  }
}
