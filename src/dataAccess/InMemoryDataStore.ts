import { Email } from "../types/email";
import { EmailRecord } from "../types/emailRecord";
import { DataStore } from "./dataStore";
import { randomUUID } from "crypto";
import { EmailStatus } from "../types/emailStatus";
import { UUID } from "../types/uuid";

export class InMemoryDataStore implements DataStore {
  private static records: EmailRecord[] = [];

  async addEmail(email: Email): Promise<EmailRecord> {
    const uuid = randomUUID();

    const record: EmailRecord = {
      id: uuid,
      email,
      status: EmailStatus.Queued,
    };
    InMemoryDataStore.records.push(record);

    return record;
  }

  async getEmails(id?: UUID): Promise<EmailRecord[]> {
    return InMemoryDataStore.records;
  }
}
