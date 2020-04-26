// NOTE: 
// This is the starter file for a blog post "How to build a calculator". You can follow the lesson at https://zellwk.com/blog/calculator-part-1

// # START EDITING YOUR JAVASCRIPT HERE
// ===============
const calculator = document.body.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = document.body.querySelector('.calculator__display')

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        // Do something
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType

        // Remove .is-depressed class from all keys
        Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove('is-depressed'))

        if (!action) {
            if (displayedNum == '0' || 
                previousKeyType == 'operator' ||
                previousKeyType == 'calculate' || 
                previousKeyType == 'trig_operator') {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            }
            calculator.dataset.previousKeyType = 'number'
        } 
        else if (action == 'decimal') {
            if (previousKeyType == 'operator' ||  
                previousKeyType == 'calculate' ||
                previousKeyType == 'trig_operator') {
                display.textContent = '0.'
            }
            else if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.'
            }
            calculator.dataset.previousKeyType = 'decimal'
        }
        else if (action == 'add' ||
            action == 'subtract' ||
            action == 'multiply' ||
            action == 'divide') {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            let trig_operator = calculator.dataset.modOperator
            let secondValue = displayedNum
            if (trig_operator) {
                secondValue = trig_func(trig_operator, secondValue)
                display.textContent = secondValue
                calculator.dataset.modOperator = ""
            }
            if (firstValue && operator &&
                previousKeyType !== 'operator' &&
                previousKeyType != 'calculate' &&
                previousKeyType != 'trig_operator') {
                // secondValue always exist
                display.textContent = calculate(
                    firstValue, operator, secondValue)
                calculator.dataset.firstValue = display.textContent
            } else {
                calculator.dataset.firstValue = secondValue
            }

            key.classList.add('is-depressed')
            // Add custom attribute
            calculator.dataset.operator = action
            calculator.dataset.previousKeyType = 'operator'
        }
        else if (action == 'sin' || 
            action == 'cos' ||
            action == 'tan') {
            if (previousKeyType != 'number' && 
                previousKeyType != 'calculate' && 
                previousKeyType != 'decimal') {
                key.classList.add('is-depressed')
                calculator.dataset.modOperator = action
                calculator.dataset.previousKeyType = 'trig_operator'
            }
        }
        else if (action == 'calculate') {
            let firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            let secondValue = displayedNum
            let trig_operator = calculator.dataset.modOperator
            if (trig_operator) {
                secondValue = trig_func(trig_operator, secondValue)
                display.textContent = secondValue
                calculator.dataset.modOperator = ""
            }
            if (firstValue) {
                if (previousKeyType == 'calculate') {
                    firstValue = displayedNum
                    secondValue = calculator.dataset.modValue
                }
                display.textContent = calculate(
                    firstValue, operator, secondValue)
            }
            calculator.dataset.modValue = secondValue
            calculator.dataset.previousKeyType = 'calculate'
        }
    }
})


keys.addEventListener('click', e => {
    const key = e.target
    const action = key.dataset.action
    if (key.matches('button')) {
        if (action !== 'clear') {
            const clearButton = calculator.querySelector('[data-action=clear]')
            clearButton.textContent = 'CE'
        }
        if (action == 'clear') {
            if (key.textContent == 'AC') {
                // Clear state
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue = ''
                calculator.dataset.modOperator = ''
                calculator.dataset.operator = ''
                calculator.dataset.previousKeyType = ''
            }
            else {
                key.textContent = 'AC'
            }
            display.textContent = 0
            calculator.dataset.previousKeyType = 'clear'
        }
        if (action == 'del') {
            // Remove the last digit enter
            // Doesn't care about the operator
            const displayedNum = display.textContent
            const previousKeyType = calculator.dataset.previousKeyType
            if (previousKeyType == 'number') {
                newDisplayNum = displayedNum.slice(0, -1)
                if (newDisplayNum == '') {
                    newDisplayNum = 0
                }
                display.textContent = newDisplayNum
            }

        }
    }
})


const calculate = (n1, operator, n2) => {
    // Perform calculation and return calculated value
    let result = 0.
    const first_num = parseFloat(n1)
    const second_num = parseFloat(n2)

    if (operator == 'add') {
        result = first_num + second_num
    } else if (operator == 'subtract') {
        result = first_num - second_num
    } else if (operator == 'multiply') {
        result = first_num * second_num
    } else if (operator == 'divide') {
        result = first_num / second_num
    }
    return +(result).toFixed(8)
}


const trig_func = (operator, n1) => {
    // Perform calculation and return calculated value
    let result = 0.
    const first_num = parseFloat(n1)

    if (operator == 'sin') {
        result = Math.sin(first_num)
    } else if (operator == 'cos') {
        result = Math.cos(first_num) 
    } else if (operator == 'tan') {
        result = Math.tan(first_num)
    }
    return +(result).toFixed(8)
}
