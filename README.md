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

Em caso de falha, selecione o teste no relatório para ver a captura de tela e abrir o trace com a sequência de ações. Esses arquivos ficam em `test-results/`.
