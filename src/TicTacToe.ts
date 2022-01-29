import { Board } from "./Board";


export class TicTacToe {
    private gameBoard: Board;
    private currentPlayer: Player;

    constructor() {
        const newBoard = [
            [Player.Empty, Player.Empty, Player.Empty],
            [Player.Empty, Player.Empty, Player.Empty],
            [Player.Empty, Player.Empty, Player.Empty]
        ];
        this.gameBoard = new Board(newBoard);
        this.currentPlayer = Player.X;
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
        if (this.gameBoard.playerHasALine(Player.X)) {
            return `${Player.X} wins`;
        }
        if (this.gameBoard.playerHasALine(Player.O)) {
            return `${Player.O} wins`;
        }
        if (this.gameBoard.allPositionsAreFilled()) {
            return 'Tie';
        }
        throw new Error('There is no winner yet');
    }

    private checkIfThePositionIsValid(coordinates: Coordinates): void {
        if (this.gameBoard.getPosition(coordinates) !== Player.Empty) {
            throw new Error('Position already played');
        }
    }

    private setNextPlayer(): void {
        this.currentPlayer = this.currentPlayer === Player.X ? Player.O : Player.X;
    }
}

export enum Player {
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