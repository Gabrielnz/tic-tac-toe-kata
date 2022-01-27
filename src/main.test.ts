import { Board, Coordinates, Position, TicTacToe } from "./main"

describe('tic tac toe', () => {
    test('start a new game', () => {
        const game = new TicTacToe()

        const expectedBoard: Board = new Board([
            [Position.Empty, Position.Empty, Position.Empty],
            [Position.Empty, Position.Empty, Position.Empty],
            [Position.Empty, Position.Empty, Position.Empty]
        ])
        expect(game.getBoard().equalsTo(expectedBoard)).toBe(true)
    })

    test.each([
        [new Coordinates(0, 0), new Board([[Position.X, Position.Empty, Position.Empty], [Position.Empty, Position.Empty, Position.Empty], [Position.Empty, Position.Empty, Position.Empty]])],
        [new Coordinates(2, 2), new Board([[Position.Empty, Position.Empty, Position.Empty], [Position.Empty, Position.Empty, Position.Empty], [Position.Empty, Position.Empty, Position.X]])],
        [new Coordinates(1, 0), new Board([[Position.Empty, Position.Empty, Position.Empty], [Position.X, Position.Empty, Position.Empty], [Position.Empty, Position.Empty, Position.Empty]])],
        [new Coordinates(0, 2), new Board([[Position.Empty, Position.Empty, Position.X], [Position.Empty, Position.Empty, Position.Empty], [Position.Empty, Position.Empty, Position.Empty]])],
        [new Coordinates(1, 1), new Board([[Position.Empty, Position.Empty, Position.Empty], [Position.Empty, Position.X, Position.Empty], [Position.Empty, Position.Empty, Position.Empty]])]
    ])('start playing with X on coordinates %o', (coordinates: Coordinates, expectedBoard: Board) => {
        const game = new TicTacToe()

        game.play(coordinates)

        expect(game.getBoard().equalsTo(expectedBoard)).toBe(true)
    })

    test('X and O play alternatively', () => {
        const game = new TicTacToe()

        game.play(new Coordinates(0, 0))
        game.play(new Coordinates(2, 2))
        game.play(new Coordinates(1, 0))
        game.play(new Coordinates(0, 2))
        game.play(new Coordinates(2, 1))

        const expectedBoard: Board = new Board([
            [Position.X, Position.Empty, Position.O],
            [Position.X, Position.Empty, Position.Empty],
            [Position.Empty, Position.X, Position.O]
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

    test('X player with 3 positions in horizontal line wins', () => {
        const game = new TicTacToe()

        game.play(new Coordinates(0, 0))
        game.play(new Coordinates(1, 0))
        game.play(new Coordinates(0, 1))
        game.play(new Coordinates(2, 1))
        game.play(new Coordinates(0, 2))

        expect(game.getWinner()).toBe('X wins')
    })
})