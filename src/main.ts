export class TicTacToe {
    private board: string[][]
    private currentPlayer: Position

    constructor() {
        this.board = [
            [Position.Empty, Position.Empty, Position.Empty],
            [Position.Empty, Position.Empty, Position.Empty],
            [Position.Empty, Position.Empty, Position.Empty]
        ]
        this.currentPlayer = Position.X
    }

    getBoard(): string [][] {
        return this.board
    }

    play(xCoordinate: number, yCoordinate: number) {
        this.board[xCoordinate][yCoordinate] = this.currentPlayer
        this.setNextPlayer()
    }

    private setNextPlayer() {
        this.currentPlayer = this.currentPlayer === Position.X ? Position.O : Position.X
    }
}

export enum Position {
    X = 'X',
    O = 'O',
    Empty = ' '
}