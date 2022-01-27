export class TicTacToe {
    _board: string[][]
    private currentPlayer: string

    constructor() {
        this._board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
        this.currentPlayer = 'X'
    }

    get board(): string [][] {
        return this._board
    }

    play(xCoordinate: number, yCoordinate: number) {
        this._board[xCoordinate][yCoordinate] = this.currentPlayer
        this.setNextPlayer()
    }

    private setNextPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'
    }
}