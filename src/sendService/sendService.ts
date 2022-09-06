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
    const allEmails = await this.dataStore.getEmails();
    const queuedEmails = allEmails.filter(
      (email) => email.status === EmailStatus.Queued
    );

    console.log(`Found ${queuedEmails.length} queued emails`);
    for (const email of queuedEmails) {
      await this.updateStatus(email, EmailStatus.Processing);
      for (const provider of this.providers) {
        try {
          await provider.sendEmail(email);
          await this.updateStatus(email, EmailStatus.Sent);
          console.log(`Successfully sent email with ID ${email.id}`);

          return;
        } catch (e) {
          console.error("Error encountered sending email\n", e);
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
