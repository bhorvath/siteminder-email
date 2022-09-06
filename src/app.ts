import express, { Response as ExResponse, Request as ExRequest } from "express";
import bodyParser from "body-parser";
import { RegisterRoutes } from "./generated/routes";
import swaggerUi from "swagger-ui-express";
import { errorHandler } from "./middleware/errorHandler";

export const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(swaggerUi.generateHTML(await import("../spec/swagger.json")));
});

RegisterRoutes(app);

app.use(errorHandler);
