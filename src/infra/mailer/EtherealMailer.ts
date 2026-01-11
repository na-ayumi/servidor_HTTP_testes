import { inject, injectable } from "inversify";
import nodemailer from "nodemailer";
import { TYPES } from "../../types";
import { IMailer } from "../../interfaces/IMailer";
import { ILogger } from "../../interfaces/ILogger";

@injectable()
export class EtherealMailer implements IMailer{

    constructor(@inject(TYPES.Logger) private logger: ILogger){}

    async send(to: string, subject: string, body: string): Promise<void> {
        const testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });

        const info = await transporter.sendMail({
            to,
            subject,
            text: body
        });

        this.logger.info(`Email enviado com sucesso: ${nodemailer.getTestMessageUrl(info)}`);
    }
}