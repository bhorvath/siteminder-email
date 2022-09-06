import { EmailRecord } from "../../types/emailRecord";
import { EmailProvider } from "./emailProvider";

export class SendGridProvider implements EmailProvider {
  sendEmail(email: EmailRecord): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
