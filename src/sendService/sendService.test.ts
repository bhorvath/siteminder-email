import { EmailStatus } from "../types/emailStatus";
import { MockDataStore } from "../__mocks__/mockDataStore";
import { MockEmailProvider } from "../__mocks__/mockEmailProvider";
import { mockEmailRecord } from "../__mocks__/mockEmailRecord";
import { SendService } from "./sendService";

describe("SendService", () => {
  describe("sendEmails()", () => {
    let dataStore: MockDataStore;
    let provider1: MockEmailProvider;
    let provider2: MockEmailProvider;
    let service: SendService;

    beforeEach(() => {
      dataStore = new MockDataStore();
      provider1 = new MockEmailProvider();
      provider2 = new MockEmailProvider();
      service = new SendService(dataStore, [provider1, provider2]);
    });

    it("calls a provider for each email with a status of queued", async () => {
      await service.sendEmails();

      expect(provider1.emails).toStrictEqual([mockEmailRecord]);
    });

    it("falls back to alternative providers if a provider fails", async () => {
      provider1.failOnNextSend = true;
      await service.sendEmails();

      expect(provider1.emails).toStrictEqual([]);
      expect(provider2.emails).toStrictEqual([mockEmailRecord]);
    });

    it("doesn't try alternative providers if a provider succeeds", async () => {
      await service.sendEmails();

      expect(provider1.emails).toStrictEqual([mockEmailRecord]);
      expect(provider2.emails).toStrictEqual([]);
    });

    it("marks an email as completed if it sent successfully", async () => {
      await service.sendEmails();
      const updatedRecord = { ...mockEmailRecord, status: EmailStatus.Sent };

      expect(dataStore.updatedEmails).toStrictEqual([updatedRecord]);
    });
  });
});
