import { faker } from '@faker-js/faker/locale/en'

describe('Sign up', () => {
	it('Deve efetuar o cadastro com sucesso com o código de confirmação enviado por e-mail', () => {
		const emailAddress = `${faker.datatype.uuid()}@${Cypress.env('MAILOSAUR_SERVER_ID')}.mailosaur.net`
		const password = Cypress.env('USER_PASSWORD')

		cy.intercept(
			'GET',
			'**/notes'
		).as('pegarNotas')

		cy.visit('/signup')
		cy.get('#email').type(emailAddress)
		cy.get('#password').type(password, { log: false })
		cy.get('#confirmPassword').type(password, { log: false })
		cy.contains('button', 'Signup').click()
		cy.get('#confirmationCode').should('be.visible')

		cy.mailosaurGetMessage(Cypress.env('MAILOSAUR_SERVER_ID'), {
			enviadoPara: emailAddress
		}).then(message => {
			const confirmationCode = message.html.body.match(/\d{6}/)[0]
			cy.get('#confirmationCode').type(`${confirmationCode}{enter}`)

			cy.wait('@pegarNotas')
			cy.contains('h1', 'Your Notes').should('be.visible')
		})
	})
})
