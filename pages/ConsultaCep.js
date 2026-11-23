class ConsultaCep {
  constructor(page) {
    this.page = page;
    this.cep = page.getByLabel(/^cep:/i);
    this.rua = page.getByLabel(/^rua:/i);
    this.bairro = page.getByLabel(/^bairro:/i);
    this.cidade = page.getByLabel(/^cidade:/i);
    this.estado = page.getByLabel(/^estado:/i);
    this.ibge = page.getByLabel(/^ibge:/i);
  }

  async abrir() {
    await this.page.goto('/exemplo/javascript/');
  }

  async consultar(cep) {
    await this.cep.fill(cep);
    await this.cep.press('Tab');
  }
}

module.exports = { ConsultaCep };
