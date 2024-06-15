import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { Direction, Navigation } from "./robot/Negivation";
import { Robot, TurnDirection } from "./robot/Robot";

yargs(hideBin(process.argv))
  .command(
    'robot', 
    'Control the robot', 
    {
    move: {
        description: `
          R: Turn 90 degree to the right of MAQE Bot (clockwise)
          L: Turn 90 degree to the left of MAQE Bot (counterclockwise)
          WN: Walk straight for N point(s) where N can be any positive integers. For example, W1 means walking straight for 1 point.
        `,
        alias: 'm',
        type: 'string',
        demandOption: true
      }
    }, 
    (argv) => {

      console.info(`Your command is ${argv.move}`)
      
      const navigation = new Navigation({ x: 0, y: 0}, Direction.NORTH)
      const robot = new Robot(navigation)

      const startState = robot.getState()
      console.info(`Start -> X: ${startState.position.x} Y: ${startState.position.y} Direction: ${startState.direction}`)

      const walkRegex = /^W\d+/;
      let command = argv.move.slice()

      while (command) {

        const match = command.match(walkRegex)
        if (match) {
          const length = match[0].length
          const distance = Number(match[0].substring(1))
          if (distance) robot.walk(distance)
          command = command.substring(length)
          continue
        } 

        const _command = command.at(0)

        if (_command === 'R') {
          robot.turn(TurnDirection.RIGHT)
        }
        if (_command === 'L') {
          robot.turn(TurnDirection.LEFT)
        }

        command = command.substring(1)
      }

      const endState = robot.getState()
      console.info(`End -> X: ${endState.position.x} Y: ${endState.position.y} Direction: ${endState.direction}`)
    })
  .help()
  .argv

