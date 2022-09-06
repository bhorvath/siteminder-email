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

  async addEmail(email: Email): Promise<EmailRecord> {
    this.addedEmails.push(email);

    return mockEmailRecord;
  }

  async getEmails(id?: UUID): Promise<EmailRecord[]> {
    return [mockEmailRecord];
  }
}
