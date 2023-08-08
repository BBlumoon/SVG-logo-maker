const inquirer = require('inquirer')
const fs = require('fs')
const { Triangle, Square, Circle } = require('./lib/shapes')

function writeToFile(fileName, answers) {
  let svgString = ''
  svgString =
    "<svg version='1.1' width='300' height='200' xmlns='http://www.w3.org/2000/svg'>"
  svgString += '<g>'
  svgString += `${answers.shape}`
  let shapeChoice
  if (answers.shape === 'Triangle') {
    shapeChoice = new Triangle()
    svgString += `<polygon points='150, 18 244, 182 56, 182' fill='${answers.shapeColor}'/>`
  } else if (answers.shape === 'Square') {
    shapeChoice = new Square()
    svgString += `<rect x='73' y='40' width='160' height='160' fill='${answers.shapeColor}'/>`
  } else {
    shapeChoice = new Circle()
    svgString += `<circle cx='150' cy='115' r='80' fill='${answers.shapeColor}'/>`
  }
  svgString += `<text x='150' y='130' text-anchor='middle' font-size='40' fill='${answers.textColor}'>${answers.text}</text>`
  svgString += '</g>'
  svgString += '</svg>'
  fs.writeFile(fileName, svgString, (err) => {
    err ? console.log(err) : console.log('Generated logo.svg')
  })
}

function promptUser() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'text',
        message:'Please select up to 3 characters for your logo',
      },
      {
        type: 'input',
        name: 'textColor',
        message:'Please choose a text color',
      },
      {
        type: 'list',
        name: 'shape',
        message: 'What shape would you like the logo to be?',
        choices: ['Square', 'Triangle', 'Circle'],
      },
      {
        type: 'input',
        name: 'shapeColor',
        message:'Please choose a shape color',
      },
    ])
    .then((answers) => {
      if (answers.text.length > 3) {
        console.log('Must enter a value of no more than 3 characters')
        promptUser()
      } else {
        writeToFile('logo.svg', answers)
      }
    })
}

promptUser()