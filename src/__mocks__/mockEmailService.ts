import { IEmailService } from "../emailController";
import { Email } from "../types/email";
import { EmailRecord } from "../types/emailRecord";
import { mockEmailRecord } from "./mockEmailRecord";

export class MockEmailService implements IEmailService {
  emails: Email[] = [];

  async createEmailRecord(email: Email): Promise<EmailRecord> {
    this.emails.push(email);

    return mockEmailRecord;
  }
}
