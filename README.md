# Consulta de CEP com Playwright

Suíte de testes de interface para o [formulário público do ViaCEP](https://viacep.com.br/exemplo/javascript/). A consulta começa quando o usuário sai do campo CEP. Os testes reproduzem essa ação com a tecla Tab e conferem o que aparece no formulário.

## Executar os testes

Use Node.js 22 ou 24, npm e uma conexão com a internet. Abra um terminal na raiz do projeto, onde está o arquivo `package.json`.

```sh
npm ci
npx playwright install chromium
npm test
```

Para acompanhar a execução no Chromium, execute `npm run test:headed`. Para rodar apenas o cenário de formato inválido, use `npm test -- -g "sete dígitos"`.

## Cobertura

| Cenário | Resultado esperado |
| --- | --- |
| Consultar `01001-000` | O formulário exibe Praça da Sé, bairro Sé, São Paulo, SP e código IBGE 3550308. |
| Consultar `0100100` (sete dígitos) | A página exibe o alerta “Formato de CEP inválido.” e o campo de rua permanece vazio. |
| Apagar o CEP após consultar um endereço | Os campos de rua, bairro, cidade, estado e IBGE ficam vazios ao sair do campo CEP. |

## Organização

Os [cenários em Gherkin](features/consulta-cep.feature) descrevem o comportamento esperado. O [arquivo de testes](tests/consulta-cep.spec.js) contém as massas, as ações de cada cenário e as verificações executadas pelo Playwright Test.

O [Page Object de consulta](pages/ConsultaCep.js) agrupa os campos pelos rótulos visíveis e concentra a ação de informar o CEP e sair do campo. Cada teste começa em um contexto de navegador isolado. A execução usa um worker para fazer uma consulta por vez ao serviço público.

## Relatório e evidências

A execução em Chromium registrou 3 cenários aprovados em 7,29 segundos. O [relatório dessa execução](evidencias/relatorio-viacep.html) está incluído no projeto. Para visualizar, abra o arquivo HTML no navegador após baixar o projeto.

Após a execução, abra o relatório HTML:

```sh
npm run report
```

Cada execução salva uma captura PNG ao final de cada cenário, inclusive quando passa. O cenário de limpeza também anexa a tela com o endereço preenchido antes de apagar o CEP, para comparação com a tela final. No cenário de CEP incompleto, o texto do alerta nativo fica em um anexo separado. Em caso de falha, o relatório inclui o trace com a sequência de ações.

Abra um cenário no relatório para consultar os anexos. Os arquivos da execução mais recente ficam em `test-results/`.

### Capturas do formulário

| Etapa | Captura |
| --- | --- |
| CEP informado antes de sair do campo | [Ver entrada](evidencias/01-cep-informado.jpg) |
| Endereço retornado para 01001-000 | [Ver endereço](evidencias/02-endereco-preenchido.jpg) |
| Campos limpos após apagar o CEP | [Ver formulário vazio](evidencias/03-apos-apagar-cep.jpg) |
| Entrada com sete dígitos, antes do alerta | [Ver CEP incompleto](evidencias/04-cep-incompleto.jpg) |
