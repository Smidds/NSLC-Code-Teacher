/**
 * Generates mock data.
 *
 * Credit goes to Cory House, found here:
 * https://medium.freecodecamp.org/rapid-development-via-mock-apis-e559087be066
 */

var jsf = require('json-schema-faker')
var chaptersSchema = require('./schemas/chapters')
var fs = require('fs')

jsf.extend('faker', () => require('faker'))

var chaptersJSON = JSON.stringify(jsf.generate(chaptersSchema))

fs.writeFile('./src/store/chapters/state.js', chaptersJSON, (err) => {
  if (err) {
    console.log('Error in generating chaptersSchema:')
    console.log(err)
  } else {
    console.log('Mock chapter data generated.')
  }
})
