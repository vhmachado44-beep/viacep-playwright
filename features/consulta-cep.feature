# language: pt
Funcionalidade: Consultar endereço pelo CEP

  Contexto:
    Dado que estou no formulário de consulta do ViaCEP

  Cenário: Preencher o endereço da Praça da Sé pelo CEP
    Quando informo o CEP "01001-000" e saio do campo
    Então a rua deve ser "Praça da Sé" e o bairro deve ser "Sé"
    E a cidade deve ser "São Paulo", no estado "SP", com código IBGE "3550308"

  Cenário: Avisar quando o CEP tem apenas sete dígitos
    Quando informo o CEP "0100100" e saio do campo
    Então devo receber o aviso "Formato de CEP inválido."
    E o campo de rua deve continuar vazio

  Cenário: Limpar o endereço anterior ao apagar o CEP
    Dado que consultei o CEP "01001-000" e o endereço foi preenchido
    Quando apago o CEP e saio do campo
    Então os campos de rua, bairro, cidade, estado e IBGE devem ficar vazios
