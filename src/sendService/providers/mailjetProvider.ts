import { EmailRecord } from "../../types/emailRecord";
import { EmailProvider } from "./emailProvider";
import axios, { AxiosRequestConfig } from "axios";
import { Email } from "../../types/email";

export type MailjetRequestBody = {
  FromEmail: string;
  To: string;
  Cc?: string;
  Bcc?: string;
  Subject?: string;
  "Text-part": string;
};

const baseUrl = "https://api.mailjet.com";

export class MailjetProvider implements EmailProvider {
  constructor(private apiKeyPublic: string, private apiKeyPrivate: string) {}

  async sendEmail(emailRecord: EmailRecord): Promise<void> {
    console.log("Sending email via mailjet", emailRecord.id);

    const body = this.buildBody(emailRecord.email);
    const requestConfig = this.buildRequestConfig();

    await axios.post("v3/send", body, requestConfig);
  }

  private buildBody(email: Email): MailjetRequestBody {
    const body: MailjetRequestBody = {
      FromEmail: email.fromAddress,
      To: email.toAddresses.toString(),
      "Text-part": email.body,
    };

    if (email.ccAddresses) {
      body.Cc = email.ccAddresses.toString();
    }

    if (email.bccAddresses) {
      body.Bcc = email.bccAddresses.toString();
    }

    if (email.subject) {
      body.Subject = email.subject.toString();
    }

    return body;
  }

  private buildRequestConfig(): AxiosRequestConfig {
    const headers = {
      "Content-Type": "application/json",
    };
    const auth = {
      username: this.apiKeyPublic,
      password: this.apiKeyPrivate,
    };

    return { baseURL: baseUrl, headers, auth };
  }
}
