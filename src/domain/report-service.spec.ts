import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ReportService } from '../services/ReportService';
import { InvalidReportSizeError } from '../services/ReportService';

beforeEach(() => {
  vi.clearAllMocks(); // Limpa o histórico de chamadas antes de cada teste
});

// Gera um relatório e verifica se o serviço lança a exceção: InvalidReportSizeError
describe('Teste de Exceção - ReportService', () => {
  
  //Tente gerar um relatório com n = -5. Verifique se o serviço lança a exceção InvalidReportSizeError.
  it('deve lançar erro se n for menor que 1', () => {
    const mockLogger = {
        info: vi.fn(),
        error: vi.fn(),
        warn: vi.fn()
    };

    const mockMailer = {
        send: vi.fn()
    };
    const reportService = new ReportService(mockLogger as any, mockMailer as any);

    expect(() => {
      reportService.generateAndSend('abacaxi123@gmail.com', -5);
    }).toThrow(InvalidReportSizeError);
  });

  //Tente gerar um relatório com n = 15. Verifique se o serviço lança a exceção InvalidReportSizeError.
  it('deve lançar erro se n for maior que 10', () => {
    const mockLogger = {
        info: vi.fn(),
        error: vi.fn(),
        warn: vi.fn()
    };

    const mockMailer = {
        send: vi.fn()
    };

    const reportService = new ReportService(mockLogger as any, mockMailer as any);

    expect(() => {
      reportService.generateAndSend('abacaxi123@gmail.com', 15);
    }).toThrow(InvalidReportSizeError);
  });
});

// Gere um relatório válido. Verifique (usando spy ou mocks) se o método mailer.send foi chamado com o e-mail correto.
describe('Teste de Lógica do Email - ReportService', () => {
  
  it('deve chamar mailer.send com o e-mail de destino correto', () => {
    const mockLogger = {
        info: vi.fn(), 
        error: vi.fn(),
        warn: vi.fn()
    };

    const mockMailer = {
        send: vi.fn().mockResolvedValue(undefined)
    };

    const reportService = new ReportService(mockLogger as any, mockMailer as any);
    const email = 'abacaxi123@gmail.com';
    const n = 5;

    reportService.generateAndSend(email, n)

    expect(mockMailer.send).toHaveBeenCalled();
    expect(mockMailer.send).toHaveBeenCalledWith(
        email,
        "Enviando Relatório de Dados",
        expect.any(String)
    );
  });
});