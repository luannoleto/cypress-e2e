const { defineConfig } = require('cypress')

module.exports = defineConfig({
	e2e: {
		baseUrl: 'https://notes-serverless-app.com',
		defaultCommandTimeout: 30000,
		experimentalStudio: true,
		//setupNodeEvents(on, config) {
		//implement node event listeners here
		//},
	},
})
