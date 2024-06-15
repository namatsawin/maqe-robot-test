export interface Position { x: number; y: number; }

export enum Direction {
    NORTH = 'North',
    EAST = 'East',
    SOUTH = 'South',
    WEST = 'West'
}

export interface INavigation {
    getPosition: () => Position;
    setPosition: (value: Position) => void

    getAngleDirection: () => number;
    setAngleDirection: (value: number) => void

    getDirection: () => Direction;
    setDirection: (value: Direction) => void

    directionToAngle(direction: Direction): number;
    angleToDirection(angle: number): Direction
    degreesToRadians(degrees: number): number;
}

export class Navigation implements INavigation {
    private position: Position;
    private angleDirection: number;

    constructor(initialPosition: Position, initialDirection: Direction) {
        this.position = initialPosition;
        this.angleDirection = this.directionToAngle(initialDirection);
    }

    getPosition() {
        return this.position
    }

    setPosition(value: Position) {
        this.position = value
    }

    getAngleDirection() {
        return this.angleDirection
    }

    setAngleDirection(value: number) {
        this.angleDirection = value
        
        if (value < 0) this.angleDirection += 360
        else if (value >= 360) this.angleDirection -= 360
    }

    getDirection() {
        return this.angleToDirection(this.getAngleDirection())
    }

    setDirection(value: Direction) {
        this.angleDirection = this.directionToAngle(value)
    }

    degreesToRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
    }
    
    directionToAngle(direction: Direction): number {
        switch (direction) {
            case Direction.NORTH:
                return 90;
            case Direction.EAST:
                return 0;
            case Direction.SOUTH:
                return 270;
            case Direction.WEST:
                return 180;
            default:
                return 90;
        }
    }

    angleToDirection(angle: number): Direction {
        switch (angle) {
            case 90:
                return Direction.NORTH;
            case 0:
                return Direction.EAST;
            case 270:
                return Direction.SOUTH;
            case 180:
                return Direction.WEST;
            default:
                return Direction.NORTH;
        }
    }
}