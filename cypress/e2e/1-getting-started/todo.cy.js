/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Break it Down app', () => {
	beforeEach(() => {
		// Cypress starts out with a blank slate for each test
		// so we must tell it to visit our website with the `cy.visit()` command.
		// Since we want to visit the same URL at the start of all our tests,
		// we include it in our beforeEach function so that it runs before each test
		cy.visit('http://localhost:3000/');
	});

	it('should allow filling in the project details and breaking it down into tasks', () => {
		cy.get('input[name="project-name"]').type('New Project');
		cy.get('textarea[name="project-description"]').type('Project Description');
		cy.get('button').contains('Break it down').click();

		//cy.get('.tasks-container').should('contain', 'Step');
	});

	// it('should allow deleting a task', () => {

	// 	cy.get('.delete-task-button').first().click();

	// 	cy.get('.tasks-container').should('not.contain', 'Deleted Task Identifier');
	// });
});
