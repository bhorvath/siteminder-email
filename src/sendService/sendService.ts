import { DataStore } from "../dataAccess/dataStore";
import { EmailProvider } from "./providers/emailProvider";

export class SendService {
  constructor(
    private dataStore: DataStore,
    private providers: EmailProvider[]
  ) {}
}
