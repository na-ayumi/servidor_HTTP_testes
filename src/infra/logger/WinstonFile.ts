import winston from "winston";
import { ILogger } from "../../interfaces/ILogger";

export class WinstonFile implements ILogger {
    private logger: winston.Logger;
    constructor(){ 
        this.logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
        transports: [
            new winston.transports.File({ filename: 'app.log' })
        ],
})}
    info(msg: string): void{
        this.logger.info(msg);
    };
    error(msg: string): void{
        this.logger.error(msg);
    };
    warn(msg: string): void{
        this.logger.warn(msg)
    };
};
