const faker = require('faker')

global.chai = require('chai')

chai.use(require('chai-http'))

global.faker = faker
global.should = chai.should()
