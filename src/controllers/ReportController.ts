// npm install -D vitest
// npm install -D supertest @types/supertest
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { ILogger } from "../domain/ILogger";
import { IReportService } from "../domain/IReportService";
import { InvalidReportSizeError } from "../services/ReportService";

@injectable()
export class ReportController {
    constructor(
        @inject(TYPES.Logger) private readonly logger: ILogger,
        @inject(TYPES.ReportService) private readonly reportService: IReportService
    ) { }

    public relatoryProcess = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            const email = req.query.email as string;
            const n = Number(req.params.n);

            if (!email) {
                this.logger.warn("Parâmetro 'email' está vazio ou com formato inválido");
                return res.status(400).json({
                    error: "Parâmetro 'email' é obrigatório"
                });
            }

            await this.reportService.generateAndSend(email, n);

            return res.status(200).json({
                result: "E-mail enviado com sucesso"
            });
        } catch (error: any) {
            if (error instanceof InvalidReportSizeError) {
                this.logger.warn(error.message);
                return res.status(400).json({
                    error: error.message
                });
            }

            return res.status(500).json({
                error: "Erro interno ao processar o relatório"
            })
        }
    }
}