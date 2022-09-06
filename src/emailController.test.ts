import { EmailController } from "./emailController";
import { mockEmail } from "./__mocks__/mockEmail";
import { mockEmailRecord } from "./__mocks__/mockEmailRecord";
import { MockEmailService } from "./__mocks__/mockEmailService";

describe("EmailController", () => {
  let service: MockEmailService;
  let controller: EmailController;

  beforeEach(() => {
    service = new MockEmailService();
    controller = new EmailController(service);
  });

  describe("createEmail()", () => {
    it("calls the email service with the given email", async () => {
      await controller.createEmail(mockEmail);

      expect(service.emails).toStrictEqual([mockEmail]);
    });

    it("returns the new email record", async () => {
      const response = await controller.createEmail(mockEmail);

      expect(response).toStrictEqual(mockEmailRecord);
    });
  });
});
