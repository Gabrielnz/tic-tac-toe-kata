import { TicTacToe } from './TicTacToe'
import { Player } from './Player'
import { Coordinates } from './Coordinates'
import { Board } from './Board'

describe('tic tac toe', () => {
  test('start a new game', () => {
    const game = new TicTacToe()

    const expectedBoard: Board = new Board([
      [Player.Empty, Player.Empty, Player.Empty],
      [Player.Empty, Player.Empty, Player.Empty],
      [Player.Empty, Player.Empty, Player.Empty]
    ])
    expect(game.getBoard().equalsTo(expectedBoard)).toBe(true)
  })

  test.each([
    [new Coordinates(0, 0), new Board([[Player.X, Player.Empty, Player.Empty], [Player.Empty, Player.Empty, Player.Empty], [Player.Empty, Player.Empty, Player.Empty]])],
    [new Coordinates(2, 2), new Board([[Player.Empty, Player.Empty, Player.Empty], [Player.Empty, Player.Empty, Player.Empty], [Player.Empty, Player.Empty, Player.X]])],
    [new Coordinates(1, 0), new Board([[Player.Empty, Player.Empty, Player.Empty], [Player.X, Player.Empty, Player.Empty], [Player.Empty, Player.Empty, Player.Empty]])],
    [new Coordinates(0, 2), new Board([[Player.Empty, Player.Empty, Player.X], [Player.Empty, Player.Empty, Player.Empty], [Player.Empty, Player.Empty, Player.Empty]])],
    [new Coordinates(1, 1), new Board([[Player.Empty, Player.Empty, Player.Empty], [Player.Empty, Player.X, Player.Empty], [Player.Empty, Player.Empty, Player.Empty]])]
  ])('start playing with X on coordinates %o', (coordinates: Coordinates, expectedBoard: Board) => {
    const game = new TicTacToe()

    game.play(coordinates)

    expect(game.getBoard().equalsTo(expectedBoard)).toBe(true)
  })

  test('play with X and O alternatively', () => {
    const game = new TicTacToe()

    playSomeMoves(game)

    const expectedBoard: Board = new Board([
      [Player.X, Player.Empty, Player.O],
      [Player.X, Player.Empty, Player.Empty],
      [Player.Empty, Player.X, Player.O]
    ])
    expect(game.getBoard().equalsTo(expectedBoard)).toBe(true)
  })

  test.each([
    new Coordinates(0, 0),
    new Coordinates(2, 2),
    new Coordinates(1, 0),
    new Coordinates(0, 2),
    new Coordinates(1, 1)
  ])('cannot play 2 times in the same position on coordinates %o', (coordinates: Coordinates) => {
    const game = new TicTacToe()

    game.play(coordinates)

    expect(() => game.play(coordinates)).toThrowError('Position already played')
  })

  test.each([
    [Player.X, playForFirstHorizontalLine],
    [Player.X, playForFirstHorizontalLine],
    [Player.X, playForFirstHorizontalLine],
    [Player.O, playForSecondPlayerFirstHorizontalLine],
    [Player.O, playForSecondPlayerSecondHorizontalLine],
    [Player.O, playForSecondPlayerThirdHorizontalLine]
  ])('%s player with 3 positions in horizontal line wins', (player: Player, play: Function) => {
    const game = new TicTacToe()

    play(game)

    expect(game.getWinner()).toBe(`${player} wins`)
  })

  test.each([
    [Player.X, playForFirstVerticalLine],
    [Player.X, playForSecondVerticalLine],
    [Player.X, playForThirdVerticalLine],
    [Player.O, playForSecondPlayerFirstVerticalLine],
    [Player.O, playForSecondPlayerSecondVerticalLine],
    [Player.O, playForSecondPlayerThirdVerticalLine]
  ])('%s player with 3 positions in vertical line wins', (player: Player, play: Function) => {
    const game = new TicTacToe()

    play(game)

    expect(game.getWinner()).toBe(`${player} wins`)
  })

  test.each([
    [Player.X, playForFirstDiagonalLine],
    [Player.X, playForSecondDiagonalLine],
    [Player.O, playForSecondPlayerFirstDiagonalLine],
    [Player.O, playForSecondPlayerSecondDiagonalLine]
  ])('%s player with 3 positions in diagonal line wins', (player: Player, play: Function) => {
    const game = new TicTacToe()

    play(game)

    expect(game.getWinner()).toBe(`${player} wins`)
  })

  test('cannot get a winner when there is no winner yet', () => {
    const game = new TicTacToe()

    playSomeMoves(game)

    expect(() => game.getWinner()).toThrowError('There is no winner yet')
  })

  test('game ends with tie when all positions are played and there is no player with a line', () => {
    const game = new TicTacToe()

    playToFillTheBoard(game)

    expect(game.getWinner()).toBe('Tie')
  })
})

function playToFillTheBoard (game: TicTacToe): void {
  game.play(new Coordinates(0, 0))
  game.play(new Coordinates(0, 2))
  game.play(new Coordinates(0, 1))
  game.play(new Coordinates(1, 0))
  game.play(new Coordinates(1, 2))
  game.play(new Coordinates(1, 1))
  game.play(new Coordinates(2, 0))
  game.play(new Coordinates(2, 1))
  game.play(new Coordinates(2, 2))
}

function playSomeMoves (game: TicTacToe): void {
  game.play(new Coordinates(0, 0))
  game.play(new Coordinates(2, 2))
  game.play(new Coordinates(1, 0))
  game.play(new Coordinates(0, 2))
  game.play(new Coordinates(2, 1))
}

function playForSecondPlayerFirstHorizontalLine (game: TicTacToe): void {
  game.play(new Coordinates(2, 2))
  playForFirstHorizontalLine(game)
}

function playForFirstHorizontalLine (game: TicTacToe): void {
  game.play(new Coordinates(0, 0))
  game.play(new Coordinates(1, 1))
  game.play(new Coordinates(0, 1))
  game.play(new Coordinates(2, 1))
  game.play(new Coordinates(0, 2))
}

function playForSecondPlayerSecondHorizontalLine (game: TicTacToe): void {
  game.play(new Coordinates(0, 0))
  playForSecondHorizontalLine(game)
}

function playForSecondHorizontalLine (game: TicTacToe): void {
  game.play(new Coordinates(1, 0))
  game.play(new Coordinates(0, 1))
  game.play(new Coordinates(1, 1))
  game.play(new Coordinates(2, 1))
  game.play(new Coordinates(1, 2))
}

function playForSecondPlayerThirdHorizontalLine (game: TicTacToe): void {
  game.play(new Coordinates(0, 0))
  playForThirdHorizontalLine(game)
}

function playForThirdHorizontalLine (game: TicTacToe): void {
  game.play(new Coordinates(2, 0))
  game.play(new Coordinates(1, 1))
  game.play(new Coordinates(2, 1))
  game.play(new Coordinates(1, 2))
  game.play(new Coordinates(2, 2))
}

function playForFirstVerticalLine (game: TicTacToe): void {
  game.play(new Coordinates(0, 0))
  game.play(new Coordinates(1, 2))
  game.play(new Coordinates(1, 0))
  game.play(new Coordinates(2, 2))
  game.play(new Coordinates(2, 0))
}

function playForSecondPlayerFirstVerticalLine (game: TicTacToe): void {
  game.play(new Coordinates(2, 1))
  playForFirstVerticalLine(game)
}

function playForSecondVerticalLine (game: TicTacToe): void {
  game.play(new Coordinates(0, 1))
  game.play(new Coordinates(1, 2))
  game.play(new Coordinates(1, 1))
  game.play(new Coordinates(2, 2))
  game.play(new Coordinates(2, 1))
}

function playForSecondPlayerSecondVerticalLine (game: TicTacToe): void {
  game.play(new Coordinates(0, 0))
  playForSecondVerticalLine(game)
}

function playForThirdVerticalLine (game: TicTacToe): void {
  game.play(new Coordinates(0, 2))
  game.play(new Coordinates(0, 0))
  game.play(new Coordinates(1, 2))
  game.play(new Coordinates(2, 1))
  game.play(new Coordinates(2, 2))
}

function playForSecondPlayerThirdVerticalLine (game: TicTacToe): void {
  game.play(new Coordinates(1, 1))
  playForThirdVerticalLine(game)
}

function playForFirstDiagonalLine (game: TicTacToe): void {
  game.play(new Coordinates(0, 0))
  game.play(new Coordinates(0, 2))
  game.play(new Coordinates(1, 1))
  game.play(new Coordinates(1, 0))
  game.play(new Coordinates(2, 2))
}

function playForSecondPlayerFirstDiagonalLine (game: TicTacToe): void {
  game.play(new Coordinates(0, 1))
  playForFirstDiagonalLine(game)
}

function playForSecondDiagonalLine (game: TicTacToe): void {
  game.play(new Coordinates(0, 2))
  game.play(new Coordinates(1, 0))
  game.play(new Coordinates(1, 1))
  game.play(new Coordinates(2, 1))
  game.play(new Coordinates(2, 0))
}

function playForSecondPlayerSecondDiagonalLine (game: TicTacToe): void {
  game.play(new Coordinates(0, 1))
  playForSecondDiagonalLine(game)
}
