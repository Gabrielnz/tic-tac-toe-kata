export class TicTacToe {
    _board: string[][]

    constructor() {
        this._board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
    }

    get board(): string [][] {
        return this._board
    }

    play(xCoordinate: number, yCoordinate: number) {
        this._board[xCoordinate][yCoordinate] = 'X'
    }
}