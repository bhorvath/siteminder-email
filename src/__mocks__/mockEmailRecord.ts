import { EmailRecord } from "../types/emailRecord";
import { EmailStatus } from "../types/emailStatus";
import { mockEmail } from "./mockEmail";
import { mockUuid } from "./mockUuid";

export const mockEmailRecord: EmailRecord = {
  id: mockUuid,
  email: mockEmail,
  status: EmailStatus.Queued,
};
