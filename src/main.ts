export class TicTacToe {
    private gameBoard: Board
    private currentPlayer: Position

    constructor() {
        const newBoard = [
            [Position.Empty, Position.Empty, Position.Empty],
            [Position.Empty, Position.Empty, Position.Empty],
            [Position.Empty, Position.Empty, Position.Empty]
        ]
        this.gameBoard = new Board(newBoard)
        this.currentPlayer = Position.X
    }

    getBoard(): Board {
        return this.gameBoard
    }

    play(xCoordinate: number, yCoordinate: number) {
        this.gameBoard.setPosition(xCoordinate, yCoordinate, this.currentPlayer)
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

export class Board {
    private board: Position[][]

    constructor(board: Position[][]) {
        this.board = board
    }

    setPosition(xCoordinate: number, yCoordinate: number, position: Position) {
        this.board[xCoordinate][yCoordinate] = position
    }

    equalsTo(otherBoard: Board): boolean {
        return this.board.every((row, rowIndex) => row.every((position, columnIndex) => position === otherBoard.board[rowIndex][columnIndex]))
    }
}