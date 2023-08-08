const fs = require('fs')
const inquirer = require('inquirer')
const { Triangle, Square, Circle } = require('./lib/shapes')

inquirer
    .prompt([
        {
            type: 'input',
            name: 'letters',
            message: 'Please select 3 characters for your logo.',
        },
        {
            type: 'list',
            name: 'text_color',
            message: 'Please select the color for the text',
            choices: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'White', 'Black',]
        },
        {
            type: 'list',
            name: 'shape',
            message: 'What shape would you like your logo to be?',
            choices: ['Circle', 'Square', 'Triangle']
        },
        {
            type: 'list',
            name: 'shape_color',
            message: 'Please select the color for the shape',
            choices: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'White', 'Black',]
        }
    ])


function writeToFile(fileName, answers) {
    let svgString = ''
    svgString =
        '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">'
    svgString += '<g>'
    svgString += `${answers.shape}`
    let shapeChoice
    if (answers.shape === 'Triangle') {
        shapeChoice = new Triangle()
        svgString += `<polygon points='150, 18 244, 182 56, 182' fill='${answers.shapeBackgroundColor}'/>`
    } else if (answers.shape === 'Square') {
        shapeChoice = new Square()
        svgString += `<rect x='73' y='40' width='160' height='160' fill='${answers.shapeBackgroundColor}'/>`
    } else {
        shapeChoice = new Circle()
        svgString += `<circle cx='150' cy='115' r='80' fill='${answers.shapeBackgroundColor}'/>`
    }
    svgString += `<text x='150' y='130' text-anchor='middle' font-size='40' fill='${answers.textColor}'>${answers.text}</text>`
    svgString += '</g>'
    svgString += '</svg>'
    fs.writeFile(fileName, svgString, (err) => {
        err ? console.log(err) : console.log('Generated logo.svg')
    })
}