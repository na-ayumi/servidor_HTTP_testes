# servidor_HTTP_testes
## Servidor HTTP com InversifyJS
O trabalho anterior precisou ser refeito para que os testes funcionassem, tivemos dificuldades na hora de fazer o trabalho anterior. Porém, refizemos o servidor e agora está funcionando corretamente.

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
## Qualidade de Código e Testes Automatizados
A implementação de testes visa assegurar a estabilidade das regras de negócio e a facilidade de manutenção a longo prazo. A estratégia adotada prioriza a rapidez na execução e a precisão no diagnóstico de falhas, dividindo-se em:

### Testes de Unidade e Lógica de Negócio

- **Isolamento:** Testamos as regras de negócio de forma isolada, sem precisar de banco de dados ou serviços de e-mail reais.

- **Uso de Mocks:** Criamos "versões falsas" de ferramentas externas (como o Mailer e o Logger) para validar se o sistema está enviando as informações corretas e registrando os logs nos momentos certos.

- **Validação de Exceções:** Garantimos que o sistema saiba lidar com erros, como tamanhos de relatórios inválidos, lançando mensagens de erro específicas em vez de simplesmente travar.

### Testes da Camada HTTP (Controllers)

- **Simulação de Requisições:** Testamos como a API responde às chamadas sem precisar subir o servidor inteiro.

- **Garantia de Status Codes:** Verificamos se a API retorna os códigos de status corretos para cada situação:

    - **400 (Erro do Usuário):** Quando faltam informações ou os dados enviados estão fora das regras.

    - **500 (Erro do Servidor):** Quando acontece uma falha inesperada, garantindo que o sistema responda de forma segura.
