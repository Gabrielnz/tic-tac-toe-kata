export class TicTacToe {
    private board: string[][]
    private currentPlayer: string

    constructor() {
        this.board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ]
        this.currentPlayer = 'X'
    }

    getBoard(): string [][] {
        return this.board
    }

    play(xCoordinate: number, yCoordinate: number) {
        this.board[xCoordinate][yCoordinate] = this.currentPlayer
        this.setNextPlayer()
    }

    private setNextPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'
    }
}