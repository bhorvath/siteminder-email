import { EmailProvider } from "../sendService/providers/emailProvider";
import { EmailRecord } from "../types/emailRecord";

export class MockEmailProvider implements EmailProvider {
  emails: EmailRecord[] = [];
  async sendEmail(email: EmailRecord): Promise<void> {
    this.emails.push(email);
  }
}
