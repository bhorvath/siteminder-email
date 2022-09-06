import e from "express";
import { injectable } from "tsyringe";
import { DataStore } from "../dataAccess/dataStore";
import { Email } from "../types/email";
import { EmailRecord } from "../types/emailRecord";
import { UUID } from "../types/uuid";
import { mockEmailRecord } from "./mockEmailRecord";

@injectable()
export class MockDataStore implements DataStore {
  addedEmails: Email[] = [];
  updatedEmails: EmailRecord[] = [];

  async addEmail(email: Email): Promise<EmailRecord> {
    this.addedEmails.push(email);

    return mockEmailRecord;
  }

  async updateEmail(id: string, email: EmailRecord): Promise<void> {
    this.updatedEmails.push(email);
  }

  async getEmails(id?: UUID): Promise<EmailRecord[]> {
    return [mockEmailRecord];
  }
}
