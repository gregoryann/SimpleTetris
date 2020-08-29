import {
    KEY_LEFT,
    KEY_RIGHT,
    KEY_UP,
    KEY_DOWN,
    KEY_ROTATE_CCW,
    KEY_ROTATE_CW,
    INPUT_MAPPING,
    PAUSE

} from './constants'

export let Input = {
        current: {},
        previous: {},

        gamepad: null,
        reset() {
            Input.current = {}
            Input.previous = {}
        },


        isPressed(button) {
            return Input.gamepad.buttons[button].pressed
        },

        getAnyKey() {
            return Object.values(Input.current).some(val => val)
        },

        getNoKeyPress() {
            return Object.values(Input.current).every(val => !val)
        },

        getKey(input) {
            return !!Input.current[input]
        },

        getKeyDown(input) {
            return !!Input.current[input] && !Input.previous[input]
        },

        getKeyUp(input) {
            return !Input.current[input] && !!Input.previous[input]
        },

        preUpdate() {
            Object.entries(Input.current).forEach(([key, value]) => { Input.previous[key] = value })
        }
    },

    postUpdate() {
        Object.entries(Input.current).forEach(([key, value]) => { Input.previous[key] = value })
    }
}

document.addEventListener('keydown', ({ repeat, keyCode }) => {
    if (repeat) {
        return
    }

    let target = INPUT_MAPPING[keyCode] || keyCode
    Input.previous[target] = Input.current[target]
    Input.current[target] = true
}, false)

document.addEventListener('keyup', ({ keyCode }) => {
    let target = INPUT_MAPPING[keyCode] || keyCode
    Input.previous[target] = Input.current[target]
    Input.current[target] = false
}, false)


window.addEventListener('gamepadconnected', event => {
    if (!Input.gamepad) {
        // So that closure compiler recognizes it as an extern
        Input.gamepad = event['gamepad']
    }
})