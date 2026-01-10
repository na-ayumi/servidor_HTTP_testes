import { injectable, inject  } from "inversify";
import { faker } from "@faker-js/faker";
import { IReportService } from "../interfaces/IReportService";
import { ILogger } from "../interfaces/ILogger";
import { IMailer } from "../interfaces/IMailer";
import { TYPES } from "../types";

export class InvalidReportSizeError extends Error {
    constructor() {
        super("Erro: Número inváilido de registro.");
        this.name = "InvalidReportSizeError"
    }
}

@injectable()
export class ReportService implements IReportService{
    constructor (
        @inject(TYPES.Logger) private logger: ILogger,
        @inject(TYPES.Mailer) private mailer: IMailer
    ) {}

    generateAndSend(email: string, n: number): void {
        if (n <= 0 || n > 10) {
            throw new InvalidReportSizeError();
        }

        this.logger.info(`Iniciando geração de relatório para: ${email}`);

        const data = Array.from({ length: n}, () => ({
            nome: faker.person.fullName(),
            cidade: faker.location.city()
        }));

        const reportContent = JSON.stringify(data, null, 2);

        this.mailer.send(email, "Enviando Relatório de Dados", reportContent);

        this.logger.info("Relatório gerado e enviado com sucesso.")
    }
}