import { Coordinates, Player, TicTacToe } from "./TicTacToe"
import { Board } from "./Board"

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

        game.play(new Coordinates(0, 0))
        game.play(new Coordinates(2, 2))
        game.play(new Coordinates(1, 0))
        game.play(new Coordinates(0, 2))
        game.play(new Coordinates(2, 1))

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

        const action = () => game.play(coordinates)

        expect(action).toThrowError('Position already played')
    })

    test.each([
        [Player.X, playSoThatXHasFirstHorizontalLine],
        [Player.X, playSoThatXHasSecondHorizontalLine],
        [Player.X, playSoThatXHasThirdHorizontalLine],
        [Player.O, playSoThatYHasFirstHorizontalLine],
        [Player.O, playSoThatYHasSecondHorizontalLine],
        [Player.O, playSoThatYHasThirdHorizontalLine]
    ])('%s player with 3 positions in horizontal line wins', (player: Player, play: Function) => {
        const game = new TicTacToe()

        play(game)

        expect(game.getWinner()).toBe(`${player} wins`)
    })

    test.each([
        playSoThatXHasFirstVerticalLine,
        playSoThatXHasSecondVerticalLine,
        playSoThatXHasThirdVerticalLine
    ])('X player with 3 positions in vertical line wins', (play: Function) => {
        const game = new TicTacToe()

        play(game)

        expect(game.getWinner()).toBe('X wins')
    })

    test.each([
        playSoThatXHasFirstDiagonalLine,
        playSoThatXHasSecondDiagonalLine
    ])('X player with 3 positions in diagonal line wins', (play: Function) => {
        const game = new TicTacToe()

        play(game)

        expect(game.getWinner()).toBe('X wins')
    })

    test('cannot get a winner when there is no winner yet', () => {
        const game = new TicTacToe()
        game.play(new Coordinates(0, 0))
        game.play(new Coordinates(2, 2))
        game.play(new Coordinates(1, 0))
        game.play(new Coordinates(0, 2))
        game.play(new Coordinates(2, 1))

        const action = () => game.getWinner()
        expect(action).toThrowError('There is no winner yet')
    })
})

function playSoThatXHasFirstHorizontalLine(game: TicTacToe): void {
    playForFirstHorizontalLine(game)
}

function playSoThatYHasFirstHorizontalLine(game: TicTacToe): void {
    game.play(new Coordinates(2, 2))
    playForFirstHorizontalLine(game)
}

function playForFirstHorizontalLine(game: TicTacToe): void {
    game.play(new Coordinates(0, 0))
    game.play(new Coordinates(1, 1))
    game.play(new Coordinates(0, 1))
    game.play(new Coordinates(2, 1))
    game.play(new Coordinates(0, 2))
}

function playSoThatXHasSecondHorizontalLine(game: TicTacToe): void {
    playForSecondHorizontalLine(game)
}

function playSoThatYHasSecondHorizontalLine(game: TicTacToe): void {
    game.play(new Coordinates(0, 0))
    playForSecondHorizontalLine(game)
}

function playForSecondHorizontalLine(game: TicTacToe): void {
    game.play(new Coordinates(1, 0))
    game.play(new Coordinates(0, 1))
    game.play(new Coordinates(1, 1))
    game.play(new Coordinates(2, 1))
    game.play(new Coordinates(1, 2))
}

function playSoThatXHasThirdHorizontalLine(game: TicTacToe): void {
    playForThirdHorizontalLine(game)
}

function playSoThatYHasThirdHorizontalLine(game: TicTacToe): void {
    game.play(new Coordinates(0, 0))
    playForThirdHorizontalLine(game)
}

function playForThirdHorizontalLine(game: TicTacToe): void {
    game.play(new Coordinates(2, 0))
    game.play(new Coordinates(1, 1))
    game.play(new Coordinates(2, 1))
    game.play(new Coordinates(1, 2))
    game.play(new Coordinates(2, 2))
}

function playSoThatXHasFirstVerticalLine(game: TicTacToe): void {
    game.play(new Coordinates(0, 0))
    game.play(new Coordinates(1, 2))
    game.play(new Coordinates(1, 0))
    game.play(new Coordinates(2, 2))
    game.play(new Coordinates(2, 0))
}

function playSoThatXHasSecondVerticalLine(game: TicTacToe): void {
    game.play(new Coordinates(0, 1))
    game.play(new Coordinates(1, 2))
    game.play(new Coordinates(1, 1))
    game.play(new Coordinates(2, 2))
    game.play(new Coordinates(2, 1))
}

function playSoThatXHasThirdVerticalLine(game: TicTacToe): void {
    game.play(new Coordinates(0, 2))
    game.play(new Coordinates(0, 0))
    game.play(new Coordinates(1, 2))
    game.play(new Coordinates(2, 1))
    game.play(new Coordinates(2, 2))
}

function playSoThatXHasFirstDiagonalLine(game: TicTacToe): void {
    game.play(new Coordinates(0, 0))
    game.play(new Coordinates(0, 2))
    game.play(new Coordinates(1, 1))
    game.play(new Coordinates(1, 0))
    game.play(new Coordinates(2, 2))
}

function playSoThatXHasSecondDiagonalLine(game: TicTacToe): void {
    game.play(new Coordinates(0, 2))
    game.play(new Coordinates(1, 0))
    game.play(new Coordinates(1, 1))
    game.play(new Coordinates(2, 1))
    game.play(new Coordinates(2, 0))
}
