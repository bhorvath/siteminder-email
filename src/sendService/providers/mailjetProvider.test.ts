import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { mockEmail } from "../../__mocks__/mockEmail";
import { mockEmailRecord } from "../../__mocks__/mockEmailRecord";
import { MailjetProvider, MailjetRequestBody } from "./mailjetProvider";

const mockAxios = new MockAdapter(axios);

describe("MailjetProvider", () => {
  afterEach(() => mockAxios.resetHistory());

  describe("sendMail()", () => {
    it("calls the Mailjet API to send the given email", async () => {
      mockAxios.onPost("v3/send").reply(201);
      const provider = new MailjetProvider("", "");
      await provider.sendEmail(mockEmailRecord);
      const request: MailjetRequestBody = {
        FromEmail: mockEmail.fromAddress,
        To: mockEmail.toAddresses.toString(),
        "Text-part": mockEmail.body,
        Subject: mockEmail.subject ?? "",
      };

      expect(mockAxios.history.post[0].headers).toEqual(
        expect.objectContaining({
          "Content-Type": "application/json",
        })
      );
      expect(mockAxios.history.post[0].data).toStrictEqual(
        JSON.stringify(request)
      );
    });
  });
});
