export class TicTacToe {
    private board: string[][]
    private currentPlayer: BoardPlayers

    constructor() {
        this.board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ]
        this.currentPlayer = BoardPlayers.X
    }

    getBoard(): string [][] {
        return this.board
    }

    play(xCoordinate: number, yCoordinate: number) {
        this.board[xCoordinate][yCoordinate] = this.currentPlayer
        this.setNextPlayer()
    }

    private setNextPlayer() {
        this.currentPlayer = this.currentPlayer === BoardPlayers.X ? BoardPlayers.O : BoardPlayers.X
    }
}

export enum BoardPlayers {
    X = 'X',
    O = 'O'
}