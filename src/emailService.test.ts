import { EmailService } from "./emailService";
import { mockEmail } from "./__mocks__/email";
import { MockDataStore } from "./__mocks__/mockDataStore";

describe("EmailService", () => {
  describe("createEmailRecord()", () => {
    it("creates an email record", () => {
      const dataStore = new MockDataStore();
      const service = new EmailService(dataStore);
      service.createEmailRecord(mockEmail);

      expect(dataStore.emails).toStrictEqual([mockEmail]);
    });
  });
});
