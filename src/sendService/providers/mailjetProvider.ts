import { EmailRecord } from "../../types/emailRecord";
import { EmailProvider } from "./emailProvider";

export class MailjetProvider implements EmailProvider {
  async sendEmail(email: EmailRecord): Promise<void> {
    console.log("Sending email via mailjet", email);
  }
}
