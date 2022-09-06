import { Email } from "../types/email";

export const mockEmail: Email = {
  fromAddress: "from@test.com",
  toAddresses: ["to1@test.com", "to2@test.com"],
  subject: "Test",
  body: "Test email.",
};
