import { EmailRecord } from "../../types/emailRecord";

export interface EmailProvider {
  sendEmail(email: EmailRecord): Promise<void>;
}
