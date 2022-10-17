describe("visit the application and confirm", () => {
  beforeEach(() => {
    cy.visit("https://crud-simbiose.vercel.app/");
  });

  it("should visit application", () => {
    cy.contains("Cadastro de clientes");
    cy.get("#registerClient").should("be.visible");
  });
  it("should be visible table", () => {
    cy.get("#table").should("be.visible");
  });
});
