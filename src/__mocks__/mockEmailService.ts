import { IEmailService } from "../emailController";
import { Email } from "../types/email";
import { UUID } from "../types/uuid";
import { mockUuid } from "./mockUuid";

export class MockEmailService implements IEmailService {
  emails: Email[] = [];

  async createEmailRecord(email: Email): Promise<UUID> {
    this.emails.push(email);

    return mockUuid;
  }
}
