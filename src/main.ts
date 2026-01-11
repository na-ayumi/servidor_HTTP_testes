import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";

import { container } from "./infra/inversivy.config";
import { TYPES } from "./types";
import { ReportController } from "./controllers/ReportController";
import { IReportService } from "./domain/IReportService";
import { ILogger } from "./domain/ILogger";

dotenv.config();

const app = express();
app.use(express.json());

// resolve dependências
const reportService = container.get<IReportService>(TYPES.ReportService);
const logger = container.get<ILogger>(TYPES.Logger);

// cria controller manualmente
const controller = new ReportController(logger, reportService);

// rota
app.get("/relatorio/:n", controller.relatoryProcess);

const PORT = Number(process.env.APP_PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando na porta ${PORT}`);
});
