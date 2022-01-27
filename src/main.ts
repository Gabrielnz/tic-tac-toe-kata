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

    play(coordinates: Coordinates): void {
        this.checkIfThePositionIsValid(coordinates)
        this.gameBoard.setPosition(coordinates, this.currentPlayer)
        this.setNextPlayer()
    }

    private checkIfThePositionIsValid(coordinates: Coordinates) {
        if (this.gameBoard.getPosition(coordinates) !== Position.Empty) {
            throw new Error('Position already played')
        }
    }

    private setNextPlayer() {
        this.currentPlayer = this.currentPlayer === Position.X ? Position.O : Position.X
    }
}

export class Board {
    private board: Position[][]

    constructor(board: Position[][]) {
        this.board = board
    }

    setPosition(coordinates: Coordinates, position: Position) {
        this.board[coordinates.getXCoordinate()][coordinates.getYCoordinate()] = position
    }

    getPosition(coordinates: Coordinates): Position {
        return this.board[coordinates.getXCoordinate()][coordinates.getYCoordinate()]
    }

    equalsTo(otherBoard: Board): boolean {
        return this.board.every((row, rowIndex) => row.every((position, columnIndex) => position === otherBoard.board[rowIndex][columnIndex]))
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

    getXCoordinate(): number {
        return this.x
    }

    getYCoordinate(): number {
        return this.y
    }
}