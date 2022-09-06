import { Body, Controller, Post, Route, SuccessResponse } from "tsoa";
import { inject, singleton } from "tsyringe";
import { Dependency } from "./dependency";
import { ApiResponseBody } from "./types/api";
import { Email } from "./types/email";
import { EmailRecord } from "./types/emailRecord";

export interface IEmailService {
  createEmailRecord(email: Email): Promise<EmailRecord>;
}

// tsoa doesn't allow reading a route path from a variable, so this value can't be extracted
@Route("api/v1/emails")
@singleton()
export class EmailController extends Controller {
  constructor(@inject(Dependency.EmailService) private service: IEmailService) {
    super();
  }

  @Post()
  @SuccessResponse("201", "Created")
  async createEmail(
    @Body() email: Email
  ): Promise<ApiResponseBody<EmailRecord>> {
    const record = await this.service.createEmailRecord(email);
    this.setHeader("Location", "/api/v1/emails/" + record.id);

    return {
      data: record,
    };
  }
}
