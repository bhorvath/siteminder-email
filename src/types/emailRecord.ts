import type { Email } from "./email";
import { EmailStatus } from "./emailStatus";
import { UUID } from "./uuid";

export type EmailRecord = {
  id: UUID;
  email: Email;
  status: EmailStatus;
};
