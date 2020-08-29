import { Input } from './Input'
import { Level } from './Level'
import { PauseScreen } from './PauseScreen'
import { nextScene, setScene } from './globals'
import { StartScreen } from './StartScreen'
import { setScene, currentScene } from './globals'


export let Game = {
    scene: new PauseScreen(new Level()),


    start() {
        setScene(new StartScreen(new Level()))
        Game.tick()
    },

    tick() {

        requestAnimationFrame(Game.tick)
        let scene = currentScene
        Input.preUpdate()
        scene.step()


        Input.postUpdate()
        scene.render()

    }
}