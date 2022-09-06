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
  const providers = [new MailjetProvider()];
  const sendService = new SendService(dataStore, providers);
  setInterval(async () => {
    await sendService.sendEmails();
  }, sendEmailInterval);
  await sendService.sendEmails();
};

(async () => await startSendService())();
