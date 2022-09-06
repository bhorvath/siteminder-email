import { Body, Controller, Post, Route, SuccessResponse } from "tsoa";
import { inject, singleton } from "tsyringe";
import { Dependency } from "./dependency";
import { Email } from "./types/email";
import { UUID } from "./types/uuid";

export interface IEmailService {
  createEmailRecord(email: Email): Promise<UUID>;
}

@Route("api/v1/emails")
@singleton()
export class EmailController extends Controller {
  constructor(@inject(Dependency.EmailService) private service: IEmailService) {
    super();
  }

  @Post()
  @SuccessResponse("201", "Created")
  async createEmail(@Body() email: Email): Promise<void> {
    await this.service.createEmailRecord(email);
  }
}
