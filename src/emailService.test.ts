import { EmailService } from "./emailService";
import { mockEmail } from "./__mocks__/mockEmail";
import { MockDataStore } from "./__mocks__/mockDataStore";
import { mockEmailRecord } from "./__mocks__/mockEmailRecord";

describe("EmailService", () => {
  describe("createEmailRecord()", () => {
    let dataStore: MockDataStore;
    let service: EmailService;

    beforeEach(() => {
      dataStore = new MockDataStore();
      service = new EmailService(dataStore);
    });

    it("creates an email record", async () => {
      await service.createEmailRecord(mockEmail);

      expect(dataStore.addedEmails).toStrictEqual([mockEmail]);
    });

    it("returns the new email record", async () => {
      const id = await service.createEmailRecord(mockEmail);

      expect(id).toStrictEqual(mockEmailRecord);
    });
  });
});
