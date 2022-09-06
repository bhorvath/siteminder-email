import type { Email } from "./email";
import { UUID } from "./uuid";

export type EmailRecord = {
  id: UUID;
  email: Email;
  status: EmailStatus;
};

export enum EmailStatus {
  Queued,
  Processing,
  Sent,
  Error,
}
