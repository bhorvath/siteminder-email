import { MockDataStore } from "../__mocks__/mockDataStore";
import { MockEmailProvider } from "../__mocks__/mockEmailProvider";
import { mockEmailRecord } from "../__mocks__/mockEmailRecord";
import { SendService } from "./sendService";

describe("SendService", () => {
  describe("sendEmails()", () => {
    let service: SendService;
    let dataStore: MockDataStore;
    let provider: MockEmailProvider = new MockEmailProvider();

    beforeEach(() => {
      dataStore = new MockDataStore();
      service = new SendService(dataStore, [provider]);
    });

    it("calls a provider for each email with a status of queued", async () => {
      await service.sendEmails();

      expect(provider.emails).toStrictEqual([mockEmailRecord]);
    });
  });
});
