import { Board } from './Board'
import { Coordinates } from './Coordinates'
import { Player } from './Player'

export class TicTacToe {
  private readonly gameBoard: Board
  private currentPlayer: Player

  constructor () {
    const newBoard = [
      [Player.Empty, Player.Empty, Player.Empty],
      [Player.Empty, Player.Empty, Player.Empty],
      [Player.Empty, Player.Empty, Player.Empty]
    ]
    this.gameBoard = new Board(newBoard)
    this.currentPlayer = Player.X
  }

  public getBoard (): Board {
    return this.gameBoard
  }

  public play (coordinates: Coordinates): void {
    this.checkIfThePositionIsValid(coordinates)
    this.gameBoard.setPosition(coordinates, this.currentPlayer)
    this.setNextPlayer()
  }

  public getWinner (): string {
    if (this.isThereAWinner()) {
      return this.getWinnerText()
    }
    throw new Error('There is no winner yet')
  }

  private isThereAWinner (): boolean {
    return this.gameBoard.playerHasALine(Player.X) || this.gameBoard.playerHasALine(Player.O) || this.gameBoard.allPositionsAreFilled()
  }

  private getWinnerText (): string {
    if (this.gameBoard.playerHasALine(Player.X)) {
      return `${Player.X} wins`
    }
    if (this.gameBoard.playerHasALine(Player.O)) {
      return `${Player.O} wins`
    }
    return 'Tie'
  }

  private checkIfThePositionIsValid (coordinates: Coordinates): void {
    if (this.gameBoard.getPosition(coordinates) !== Player.Empty) {
      throw new Error('Position already played')
    }
  }

  private setNextPlayer (): void {
    this.currentPlayer = this.currentPlayer === Player.X ? Player.O : Player.X
  }
}
