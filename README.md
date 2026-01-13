# servidor_HTTP_testes
## Instalação e Configuração
1.  **Clone o código do GitHub:**
    ```bash
    git clone 'URL'
    ```


2.  **Instale as dependências:**
    ```bash
    npm install
    ```
    ```bash
    npm install inversify reflect-metadata
    ```
    ```bash
    npm install -D vitest
    ```
    ```bash
    npm install -D supertest @types/supertest
    ```

## Execução

Para rodar o Teste do ReportService (Domínio):

```bash
npx vitest report-service.spec.ts
```
    
Para rodar o Teste do ReportHttpAdapter (Camada HTTP):

```bash
npx vitest report-http-adapter.spec.ts
```
