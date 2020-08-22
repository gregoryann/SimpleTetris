import { waitForNextFrame } from './utils'
import { createRotateSound } from './Audio/Samples/Rotate'
import { TheAudioContext, setReverbDestination } from './Audio/Context'
import { createLandSound } from './Audio/Samples/Land'
import { createLockSound } from './Audio/Samples/Lock'
import { createShiftSound } from './Audio/Samples/Shift'
import {
    createTetrisSound,
    createSingleLineSound,
    createDoubleLineSound,
    createTripleLineSound,
    createAllClearSound
} from './Audio/Samples/Tetris'
import { createHardDropSound } from './Audio/Samples/HardDrop';
import { createReverbIR } from './Audio/Samples/ReverbIR';
import createHoldSound from './Audio/Samples/Hold';
import { createTSpinSound } from './Audio/Samples/TSpin';

async function createAudioSampleAsset(createSampleFunction) {
    const array = createSampleFunction()
    const result = TheAudioContext.createBuffer(1, array.length, TheAudioContext.sampleRate)
    result.getChannelData(0).set(array)

    await waitForNextFrame()

    return result
}

export let RotateSound = createAudioSampleAsset(createRotateSound)
export let LandSound = createAudioSampleAsset(createLandSound)
export let LockSound = createAudioSampleAsset(createLockSound)
export let ShiftSound = createAudioSampleAsset(createShiftSound)
export let LineClearSounds = [
    createAudioSampleAsset(createSingleLineSound),
    createAudioSampleAsset(createDoubleLineSound),
    createAudioSampleAsset(createTripleLineSound),
    createAudioSampleAsset(createTetrisSound),
]
export let HardDropSound = createAudioSampleAsset(createHardDropSound)
export let HoldSound = createAudioSampleAsset(createHoldSound)
export let TSpinSound = createAudioSampleAsset(createTSpinSound)
export let AllClearSound = createAudioSampleAsset(createAllClearSound)

async function createReverb() {
    const reverb = TheAudioContext.createConvolver()
    const ir = createReverbIR()
    const irBuffer = TheAudioContext.createBuffer(2, ir[0].length, TheAudioContext.sampleRate)
    irBuffer.getChannelData(0).set(ir[0])
    irBuffer.getChannelData(1).set(ir[1])

    reverb.buffer = irBuffer

    setReverbDestination(reverb)

    await waitForNextFrame()
}

export async function loadAssets() {
    await Promise.all(
        [
            ShiftSound,
            RotateSound,
            LandSound,
            LockSound,
            LineClearSounds[0],
            LineClearSounds[1],
            LineClearSounds[2],
            LineClearSounds[3],
            HardDropSound,
            HoldSound,
            TSpinSound,
            AllClearSound
        ]
    )

    await createReverb()

    document.body.classList.remove('loading')
}