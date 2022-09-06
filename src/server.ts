import { app } from "./app";
import { InMemoryDataStore } from "./dataAccess/InMemoryDataStore";
import { MailjetProvider } from "./sendService/providers/mailjetProvider";
import { SendService } from "./sendService/sendService";

const port = process.env.PORT || 3000;
const sendEmailInterval = 30_000; // 30 seconds

app.listen(port, () =>
  console.log(`Service started at http://localhost:${port}`)
);

const startSendService = async () => {
  const dataStore = new InMemoryDataStore();
  /**
   * Additional providers can be added and they will be used as fallback in the order they are
   * added. eg:
   *
   * `const providers = [getMailjetProvider(), new MailgunProvider(), new SendGridProvider()];`
   */
  const providers = [getMailjetProvider()];
  const sendService = new SendService(dataStore, providers);
  setInterval(async () => {
    await sendService.sendEmails();
  }, sendEmailInterval);
  await sendService.sendEmails();
};

const getMailjetProvider = (): MailjetProvider => {
  const mailjetPublicKey = "";
  const mailjetPrivateKey = "";

  return new MailjetProvider(mailjetPublicKey, mailjetPrivateKey);
};

(async () => await startSendService())();
