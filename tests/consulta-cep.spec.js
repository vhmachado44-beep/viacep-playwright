const { test, expect } = require('@playwright/test');
const { ConsultaCep } = require('../pages/ConsultaCep');

const cepDaSe = '01001-000';

test('preenche o endereço da Praça da Sé pelo CEP', async ({ page }) => {
  const consulta = new ConsultaCep(page);
  await consulta.abrir();
  await consulta.consultar(cepDaSe);

  await expect(consulta.rua).toHaveValue('Praça da Sé');
  await expect(consulta.bairro).toHaveValue('Sé');
  await expect(consulta.cidade).toHaveValue('São Paulo');
  await expect(consulta.estado).toHaveValue('SP');
  await expect(consulta.ibge).toHaveValue('3550308');
});

test('avisa quando o CEP tem apenas sete dígitos', async ({ page }) => {
  const consulta = new ConsultaCep(page);
  await consulta.abrir();

  const aviso = page.waitForEvent('dialog').then(async dialog => {
    const mensagem = dialog.message();
    await dialog.accept();
    return mensagem;
  });
  const [mensagem] = await Promise.all([aviso, consulta.consultar('0100100')]);

  expect(mensagem).toBe('Formato de CEP inválido.');
  await expect(consulta.rua).toBeEmpty();
});

test('limpa o endereço anterior ao apagar o CEP', async ({ page }) => {
  const consulta = new ConsultaCep(page);
  await consulta.abrir();
  await consulta.consultar(cepDaSe);
  await expect(consulta.rua).toHaveValue('Praça da Sé');

  await consulta.consultar('');

  await expect(consulta.rua).toBeEmpty();
  await expect(consulta.bairro).toBeEmpty();
  await expect(consulta.cidade).toBeEmpty();
  await expect(consulta.estado).toBeEmpty();
  await expect(consulta.ibge).toBeEmpty();
});
