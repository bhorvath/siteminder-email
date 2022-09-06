import { EmailRecord, EmailStatus } from "../types/emailRecord";
import { mockEmail } from "./mockEmail";
import { mockUuid } from "./mockUuid";

export const mockEmailRecord: EmailRecord = {
  id: mockUuid,
  email: mockEmail,
  status: EmailStatus.Queued,
};
