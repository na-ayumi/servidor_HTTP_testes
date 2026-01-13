import { describe, it, expect, vi, beforeEach } from 'vitest';
import { InvalidReportSizeError } from '../services/ReportService';
import { ReportController } from './ReportController';

beforeEach(() => {
  vi.clearAllMocks(); // Limpa o histórico de chamadas antes de cada teste
});

describe('Teste de Bad Request(400) - ReportService', () => {
    //Simulação de requisição sem o query param email.
  it('Deve lançar erro se a requisição não tem o query param email', async () => {
    const mockLogger = {
        info: vi.fn(),
        error: vi.fn(),
        warn: vi.fn()
    };

    const mockService = {
        generateAndSend: vi.fn()
    };

    const controller = new ReportController(mockLogger as any, mockService as any);

    const req = {
        query: {},
        params: {n: "5"}
    } as any;

    const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis()
    } as any;

    await controller.relatoryProcess(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
        error: "Parâmetro 'email' é obrigatório"
    });
});

    // Simulação do serviço para lançar InvalidReportSizeError e verificar se o Adapter respondeu status 400
    it('Deve responder com 400 quando o serviço lançar InvalidReportSizeError', async() => {
        const mockLogger = {
            info: vi.fn(),
            error: vi.fn(),
            warn: vi.fn()
        };

        const mockService = {
            generateAndSend: vi.fn().mockImplementation(() => {
                throw new InvalidReportSizeError();
            })
        };

        const controller = new ReportController(mockLogger as any, mockService as any);

        const req = {
            query: {email: 'abacaxi123@gmail.com'},
            params: {n: "99"}
        } as any;

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis()
        } as any;

        await controller.relatoryProcess(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Erro: Número inválido de registro."
        });

        expect(mockLogger.warn).toHaveBeenCalledWith("Erro: Número inválido de registro.")
        });
    });


describe('Teste de Internal Server Error(500)', () => {
    //Simulação do serviço para lançar um Error genérico (ex: “Database down”) e verifique se o Adapter respondeu status 500.
    it('Deve responder com 500 quando um erro genérico for lançado', async() => {
        const mockLogger = {
            info: vi.fn(),
            error: vi.fn(),
            warn: vi.fn()
        };

        const mockService = {
            generateAndSend: vi.fn().mockImplementation(() => {
                throw new Error ("Database Down");
            })
        };

        const controller = new ReportController(mockLogger as any, mockService as any);

        const req = {
            query: {email: 'abacaxi123@gmail.com'},
            params: {n: "5"}
        } as any;

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis()
        } as any;

        await controller.relatoryProcess(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: "Erro interno ao processar o relatório"
        });
    });
});