import "reflect-metadata";
import { Container } from "inversify";
import { ILogger } from "../domain/ILogger";
import { IMailer } from "../domain/IMailer";

import { WinstonConsole } from "./logger/WinstonConsole";
import { WinstonFile } from "./logger/WinstonFile";
import { EtherealMailer } from "./mailer/EtherealMailer";
import { SMTPMailer } from "./mailer/SMTPMailer";

import { TYPES } from "../types";

const container = new Container();

if (process.env.APP_ENV === "prod") {
    container.bind<ILogger>(TYPES.Logger).to(WinstonFile).inSingletonScope;
    container.bind<IMailer>(TYPES.Mailer).to(SMTPMailer).inSingletonScope;
} else {
    container.bind<ILogger>(TYPES.Logger).to(WinstonConsole).inSingletonScope;
    container.bind<IMailer>(TYPES.Mailer).to(EtherealMailer).inSingletonScope;
}

export {container};