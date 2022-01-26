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
}