class Calculator{
    constructor(currentOperandStr, previousOperandStr) {
        this.currentOperandStr = currentOperandStr
        this.previousOperandStr = previousOperandStr
        this.clear()

    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operator = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    calculate(){
        let firstNum = parseFloat(this.currentOperand)
        let secondNum = parseFloat(this.previousOperand)
        let result
        switch(this.operator){
            case '/':
                if(firstNum == 0){
                    result = "Syntax Error"
                }
                else{
                    result = secondNum / firstNum
                }
                break
            case '*':
                result = secondNum * firstNum
                break
            case '-':
                result = secondNum - firstNum
                break
            case '+':
                result = secondNum + firstNum
                break
        }
        this.operator = undefined
        this.currentOperand = result.toString()
        this.previousOperand = ''
    }

    chooseOperator(operator){
        if(this.currentOperand == '') return
        if(this.previousOperand !== ''){
            this.calculate()
        }
        this.operator = operator
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    updateDisplay(){
        this.currentOperandStr.innerText = this.currentOperand;
        if(this.operator != null){
            this.previousOperandStr.innerText = `${this.previousOperand}  ${this.operator}`
        }
        else{
            this.previousOperandStr.innerText = ''
        }
    }
}

const numbers = document.querySelectorAll('[data-number]')
const clear = document.querySelector('[data-clear]')
const operators = document.querySelectorAll('[data-function]')
const equal = document.querySelector('[data-equal]')
const del = document.querySelector('[data-del]')

const currentOperandStr = document.querySelector('[data-current]')
const previousOperandStr = document.querySelector('[data-previous]')


const calculator = new Calculator(currentOperandStr, previousOperandStr)

numbers.forEach(button => button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
}))

operators.forEach(button => button.addEventListener('click', () => {
    calculator.chooseOperator(button.innerText)
    calculator.updateDisplay()
}))

equal.addEventListener('click', () => {
    calculator.calculate()
    calculator.updateDisplay()
})

del.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

clear.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

window.addEventListener('keydown', () => {
    
})