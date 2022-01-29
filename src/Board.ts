import { Player, Coordinates } from "./TicTacToe";

export class Board {
    private board: Player[][];

    constructor(board: Player[][]) {
        this.board = board;
    }

    public setPosition(coordinates: Coordinates, player: Player): void {
        this.board[coordinates.getXCoordinate()][coordinates.getYCoordinate()] = player;
    }

    public getPosition(coordinates: Coordinates): Player {
        return this.board[coordinates.getXCoordinate()][coordinates.getYCoordinate()];
    }

    public positionHasALine(player: Player): boolean {
        return this.positionHasHorizontalLine(player) || this.positionHasVerticalLine(player) || this.positionHasDiagonalLine(player);
    }

    private positionHasHorizontalLine(player: Player): boolean {
        return this.board.some(row => row.every(p => p === player))
    }

    private positionHasVerticalLine(player: Player): boolean {
        const columns = [0, 1, 2]
        return columns.some(columnIndex => this.board[0][columnIndex] === player && this.board[1][columnIndex] === player && this.board[2][columnIndex] === player)
    }

    private positionHasDiagonalLine(player: Player): boolean {
        if (this.board[0][0] === player && this.board[1][1] === player && this.board[2][2] === player) {
            return true;
        }
        if (this.board[0][2] === player && this.board[1][1] === player && this.board[2][0] === player) {
            return true;
        }
        return false;
    }

    public equalsTo(otherBoard: Board): boolean {
        return this.board.every((row, rowIndex) => row.every((position, columnIndex) => position === otherBoard.board[rowIndex][columnIndex]));
    }
}
