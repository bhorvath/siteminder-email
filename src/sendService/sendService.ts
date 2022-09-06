import { DataStore } from "../dataAccess/dataStore";
import { EmailRecord } from "../types/emailRecord";
import { EmailStatus } from "../types/emailStatus";
import { EmailProvider } from "./providers/emailProvider";

export class SendService {
  constructor(
    private dataStore: DataStore,
    private providers: EmailProvider[]
  ) {}

  async sendEmails(): Promise<void> {
    try {
      const unsentEmails = await this.getUnsentEmails();
      console.log(`Found ${unsentEmails.length} queued emails`);
      await this.processEmails(unsentEmails);
    } catch (error) {
      console.error("Encountered error in SendService\n", error);
    }
  }

  private async getUnsentEmails() {
    const allEmails = await this.dataStore.getEmails();
    const queuedEmails = allEmails.filter(
      (email) => email.status === EmailStatus.Queued
    );

    return queuedEmails;
  }

  private async processEmails(emails: EmailRecord[]) {
    for (const email of emails) {
      await this.updateStatus(email, EmailStatus.Processing);
      for (const provider of this.providers) {
        try {
          await provider.sendEmail(email);
          await this.updateStatus(email, EmailStatus.Sent);
          console.log(`Successfully sent email with ID ${email.id}`);

          return;
        } catch (error) {
          console.error("Error encountered sending email\n", error);
        }
      }

      await this.updateStatus(email, EmailStatus.Error);
      console.error(`Failed to send email with ID ${email.id}`);
    }
  }

  private async updateStatus(email: EmailRecord, status: EmailStatus) {
    this.dataStore.updateEmail(email.id, {
      ...email,
      status,
    });
  }
}
