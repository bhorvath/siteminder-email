import { Email } from "../types/email";
import { EmailRecord } from "../types/emailRecord";
import { UUID } from "../types/uuid";

export interface DataStore {
  addEmail(email: Email): Promise<UUID>;
  checkEmailStatus(uuid: UUID): Promise<EmailRecord>;
}
