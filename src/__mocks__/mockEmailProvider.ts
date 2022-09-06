import { EmailProvider } from "../sendService/providers/emailProvider";
import { EmailRecord } from "../types/emailRecord";

export class MockEmailProvider implements EmailProvider {
  emails: EmailRecord[] = [];
  failOnNextSend = false;

  async sendEmail(email: EmailRecord): Promise<void> {
    if (this.failOnNextSend) {
      throw new Error("Failed to send email");
    }

    this.emails.push(email);
  }
}
