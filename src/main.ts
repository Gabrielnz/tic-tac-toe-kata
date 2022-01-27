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

    public getBoard(): Board {
        return this.gameBoard
    }

    public play(coordinates: Coordinates): void {
        this.checkIfThePositionIsValid(coordinates)
        this.gameBoard.setPosition(coordinates, this.currentPlayer)
        this.setNextPlayer()
    }

    public getWinner(): string {
        if (this.gameBoard.positionHasALine(Position.X)) {
            return 'X wins'
        }
        throw new Error('There is no winner yet')
    }

    private checkIfThePositionIsValid(coordinates: Coordinates): void {
        if (this.gameBoard.getPosition(coordinates) !== Position.Empty) {
            throw new Error('Position already played')
        }
    }

    private setNextPlayer(): void {
        this.currentPlayer = this.currentPlayer === Position.X ? Position.O : Position.X
    }
}

export class Board {
    private board: Position[][]

    constructor(board: Position[][]) {
        this.board = board
    }

    public setPosition(coordinates: Coordinates, position: Position): void {
        this.board[coordinates.getXCoordinate()][coordinates.getYCoordinate()] = position
    }

    public getPosition(coordinates: Coordinates): Position {
        return this.board[coordinates.getXCoordinate()][coordinates.getYCoordinate()]
    }

    public positionHasALine(position: Position): boolean {
        return this.positionHasHorizontalLine(position) || this.positionHasVerticalLine(position) || this.positionHasDiagonalLine(position)
    }

    private positionHasHorizontalLine(position: Position): boolean {
        if (this.board[0][0] === position && this.board[0][1] === position && this.board[0][2] === position) {
            return true
        }
        return false
    }

    private positionHasVerticalLine(position: Position): boolean {
        if (this.board[0][0] === position && this.board[1][0] === position && this.board[2][0] === position) {
            return true
        }
        return false
    }

    private positionHasDiagonalLine(position: Position): boolean {
        if (this.board[0][0] === position && this.board[1][1] === position && this.board[2][2] === position) {
            return true
        }
        return false
    }

    public equalsTo(otherBoard: Board): boolean {
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

    public getXCoordinate(): number {
        return this.x
    }

    public getYCoordinate(): number {
        return this.y
    }
}