const container = document.getElementById('input-container')
const inputDisplay = container.querySelector('.display-price')
const inputPrice = container.querySelector('.input-price')
const inputStep = inputPrice.getAttribute('step')

let mouseStatus = document.querySelector('#status span')
let mouseDirection = document.querySelector('#direction span')

let oldPageX

const formatCurrency = (value) => {
    const result = new Intl.NumberFormat('BRL', {
        style: 'currency',
        currency: 'BRL'
    }).format(value)
    return result
}

const updateInputDisplay = (value) => {
    return inputDisplay.value = formatCurrency(value)
}

const changeInputValue = (direction) => {
    inputPrice.value = Number(inputPrice.value) + (inputStep * direction)
    updateInputDisplay(inputPrice.value)
    return
}

const onMouseMove = (evt) => {
    if (!container.className.includes('focus')) return

    let direction

    if (evt.pageX < oldPageX) {
        mouseDirection.innerText = 'LEFT'
        direction = -1
    }
    else if (evt.pageX > oldPageX) {
        mouseDirection.innerText = 'RIGHT'
        direction = 1
    }
    else
        return

    oldPageX = evt.pageX

    return changeInputValue(direction)
}

const loadEvents = () => {

    container.addEventListener('mousedown', (evt) => {
        oldPageX = evt.pageX
        container.classList.add('mouse-focus')
        mouseStatus.innerText = 'DOWN'
    })

    container.addEventListener('mouseup', () => {
        container.classList.remove('mouse-focus')
        mouseStatus.innerText = 'UP'
    })

    container.addEventListener('mousemove', onMouseMove)

    inputPrice.addEventListener('input', () => {
        updateInputDisplay(inputPrice.value)
    })

    updateInputDisplay(inputPrice.value)
}

window.addEventListener('load', loadEvents)