import { Position, Coordinates } from "./TicTacToe";

export class Board {
    private board: Position[][];

    constructor(board: Position[][]) {
        this.board = board;
    }

    public setPosition(coordinates: Coordinates, position: Position): void {
        this.board[coordinates.getXCoordinate()][coordinates.getYCoordinate()] = position;
    }

    public getPosition(coordinates: Coordinates): Position {
        return this.board[coordinates.getXCoordinate()][coordinates.getYCoordinate()];
    }

    public positionHasALine(position: Position): boolean {
        return this.positionHasHorizontalLine(position) || this.positionHasVerticalLine(position) || this.positionHasDiagonalLine(position);
    }

    private positionHasHorizontalLine(position: Position): boolean {
        if (this.board[0][0] === position && this.board[0][1] === position && this.board[0][2] === position) {
            return true;
        }
        return false;
    }

    private positionHasVerticalLine(position: Position): boolean {
        if (this.board[0][0] === position && this.board[1][0] === position && this.board[2][0] === position) {
            return true;
        }
        return false;
    }

    private positionHasDiagonalLine(position: Position): boolean {
        if (this.board[0][0] === position && this.board[1][1] === position && this.board[2][2] === position) {
            return true;
        }
        return false;
    }

    public equalsTo(otherBoard: Board): boolean {
        return this.board.every((row, rowIndex) => row.every((position, columnIndex) => position === otherBoard.board[rowIndex][columnIndex]));
    }
}
