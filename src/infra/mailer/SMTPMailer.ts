import { injectable } from "inversify";
import nodemailer from "nodemailer";
import { IMailer } from "../../interfaces/IMailer";

@injectable()
export class SMTPMailer implements IMailer {
    private transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    async send(to: string, subject: string, body: string): Promise<void> {
        await this.transporter.sendMail({
            to,
            subject,
            text: body
        });
    }
}