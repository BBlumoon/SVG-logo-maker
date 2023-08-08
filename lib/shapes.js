class Validate {
    isValidLogo(logo) {
      if(logo.length < 3) {
        return false
      }
      if(logo.length > 3) {
        return false
      }
      if(logo.length === 3) {
        return true
      }
      const arr = logo.split('')
  
      const uppercases = arr.filter(c => 
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(c)
      )
  
      const lowercases = arr.filter(c => 
        'abcdefghijklmnopqrstuvwxyz'.includes(c)
      )
      return (uppercases.length > 0 && lowercases.length > 0) ? true: false
    }
  }

class Shape {
    constructor({ logoName, textColour, logoColour, logoShape }) {
      this.logoShape = logoShape;
  
      this.vaildTextInput(logoName);
      this.logoName = logoName;
  
      this.vaildColourInput(textColour);
      this.textColour = textColour;
  
      this.vaildColourInput(logoColour);
      this.logoColour = logoColour;
    }
  
    ifInputEmpty(input) {
      if (!input) throw new Error('Input cannot be empty');
    }
  
    vaildTextInput(input) {
      this.ifInputEmpty(input);
  
      if (input.length > 3) {
        throw new Error('Logo text cannot be more than 3 characters');
      }
    }
  
    render() {
      throw new Error('Child shapes must implement a render() method');
    }
  }

  class Circle extends Shape {
    constructor(data) {
      super(data);
    }
    render() {
      return `<circle cx="50" cy="50" r="50" fill="${this.logoColour}" />`;
    }
  }

  class Square extends Shape {
    constructor(data) {
      super(data);
    }
    render() {
      return `<rect width="100" height="100" rx="15" fill="${this.logoColour}" />`;
    }
  }
  
  class Triangle extends Shape {
    constructor(data) {
      super(data);
    }
    render() {
      return `<polygon points="100 0, 0 ,0 50, 100" fill="${this.logoColour}" />`;
    }
  }

  module.exports = {
    Validate,
    Shape,
    Triangle,
    Circle,
    Square,
  }