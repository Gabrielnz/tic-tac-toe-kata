import { Board } from "./Board";


export class TicTacToe {
    private gameBoard: Board;
    private currentPlayer: Position;

    constructor() {
        const newBoard = [
            [Position.Empty, Position.Empty, Position.Empty],
            [Position.Empty, Position.Empty, Position.Empty],
            [Position.Empty, Position.Empty, Position.Empty]
        ];
        this.gameBoard = new Board(newBoard);
        this.currentPlayer = Position.X;
    }

    public getBoard(): Board {
        return this.gameBoard;
    }

    public play(coordinates: Coordinates): void {
        this.checkIfThePositionIsValid(coordinates);
        this.gameBoard.setPosition(coordinates, this.currentPlayer);
        this.setNextPlayer();
    }

    public getWinner(): string {
        if (this.gameBoard.positionHasALine(Position.X)) {
            return 'X wins';
        }
        throw new Error('There is no winner yet');
    }

    private checkIfThePositionIsValid(coordinates: Coordinates): void {
        if (this.gameBoard.getPosition(coordinates) !== Position.Empty) {
            throw new Error('Position already played');
        }
    }

    private setNextPlayer(): void {
        this.currentPlayer = this.currentPlayer === Position.X ? Position.O : Position.X;
    }
}

export enum Position {
    X = 'X',
    O = 'O',
    Empty = ' '
}

export class Coordinates {
    private x: number
    private y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    public getXCoordinate(): number {
        return this.x
    }

    public getYCoordinate(): number {
        return this.y
    }
}