import { DataStore } from "../dataAccess/dataStore";
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
    queuedEmails.forEach(async (email) => {
      for (const provider of this.providers) {
        try {
          await provider.sendEmail(email);
          console.log(`Successfully sent email with ID ${email.id}`);
          return;
        } catch (e) {
          console.error("Error encountered sending email", e);
        }
      }
    });
  }
}
