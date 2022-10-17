describe("The user will be create a client", () => {
  it("Should be visit application", () => {
    cy.visit("https://crud-simbiose.vercel.app/");
  });

  it("Should be confirm the application", () => {
    cy.get("#registerClient").should("be.visible").click();
    cy.get("#name").should("be.visible");
    cy.get("#email").should("be.visible");
    cy.get("#birthDate").should("be.visible");
  });

  it("Should be remove the first client", () => {
    cy.get("#closeModal").should("be.visible");
    cy.get("#saveClient").should("be.visible");
    cy.get("#name").type("Amanda").should("have.value", "Amanda");
    cy.get("#email")
      .type("amanda@email.com")
      .should("have.value", "amanda@email.com");
    cy.get("#birthDate").type("1998-12-27").should("have.value", "1998-12-27");
    cy.get("#saveClient").click();
    cy.get("#delete-0").click();
  });
});
