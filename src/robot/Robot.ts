import { Direction, INavigation, Position } from "./Negivation";

export enum TurnDirection {
    LEFT = 'left',
    RIGHT = 'right'
}

interface IRobotState {
    position: Position;
    direction: Direction;
    angle: number;
}

interface IRobot {
    walk: (distance: number) => void;
    turn: (turnDirection: TurnDirection) => void;
    getState: () => IRobotState
}

export class Robot implements IRobot {

    private navigationSystem: INavigation;

    constructor(navigationSystem: INavigation) {
        this.navigationSystem = navigationSystem;
    }

    public walk(distance: number) {
        const angle = this.navigationSystem.getAngleDirection()
        const radianDirection = this.navigationSystem.degreesToRadians(angle);

        const position = this.navigationSystem.getPosition()
        const x = position.x + Math.round(distance * Math.cos(radianDirection));
        const y = position.y + Math.round(distance * Math.sin(radianDirection));

        this.navigationSystem.setPosition({ x, y })
    }

    public turn(turnDirection: TurnDirection): void {
        let currentAngleDirection = this.navigationSystem.getAngleDirection();

        if (turnDirection === TurnDirection.LEFT) {
            currentAngleDirection += 90;
        } else if (turnDirection === TurnDirection.RIGHT) {
            currentAngleDirection -= 90;
        }

        this.navigationSystem.setAngleDirection(currentAngleDirection);
    }

    public getState(){
        return {
            position: this.navigationSystem.getPosition(),
            angle: this.navigationSystem.getAngleDirection(),
            direction: this.navigationSystem.getDirection(),
        }
    }
}