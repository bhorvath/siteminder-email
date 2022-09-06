import { EmailService } from "./emailService";
import { mockEmail } from "./__mocks__/mockEmail";
import { MockDataStore } from "./__mocks__/mockDataStore";
import { mockUuid } from "./__mocks__/mockUuid";

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

      expect(dataStore.emails).toStrictEqual([mockEmail]);
    });

    it("returns the ID of the new email record", async () => {
      const id = await service.createEmailRecord(mockEmail);

      expect(id).toStrictEqual(mockUuid);
    });
  });
});
