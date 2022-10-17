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

  it("Should be create the first client", () => {
    cy.get("#closeModal").should("be.visible");
    cy.get("#saveClient").should("be.visible");
    cy.get("#name").type("Amanda").should("have.value", "Amanda");
    cy.get("#email")
      .type("amanda@email.com")
      .should("have.value", "amanda@email.com");
    cy.get("#birthDate").type("1998-12-27").should("have.value", "1998-12-27");
    cy.get("#saveClient").click();
    cy.get("#edit-0").click();
  });
  it("Should be edit the client", () => {
    cy.get("#name").should("have.value", "Amanda").type(" {backspace} Ramirez");
    cy.get("#email")
      .should("have.value", "amanda@email.com")
      .clear()
      .type("test-amanda@gmail.com")
      .should("have.value", "test-amanda@gmail.com");
    cy.get("#birthDate")
      .clear()
      .type("2022-10-17")
      .should("have.value", "2022-10-17");
    cy.get("#saveClient").click();
  });
  it("Should be confirm the edited client", () => {
    cy.get('[class="table__body"]').contains("Amanda Ramirez");
    cy.get('[class="table__body"]').contains("test-amanda@gmail.com");
    cy.get('[class="table__body"]').contains("17/10/2022");
  });
});
