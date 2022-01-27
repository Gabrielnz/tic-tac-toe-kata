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
        [new Coordinates(0, 0), [[Position.X, Position.Empty, Position.Empty], [Position.Empty, Position.Empty, Position.Empty], [Position.Empty, Position.Empty, Position.Empty]]],
        [new Coordinates(2, 2), [[Position.Empty, Position.Empty, Position.Empty], [Position.Empty, Position.Empty, Position.Empty], [Position.Empty, Position.Empty, Position.X]]],
        [new Coordinates(1, 0), [[Position.Empty, Position.Empty, Position.Empty], [Position.X, Position.Empty, Position.Empty], [Position.Empty, Position.Empty, Position.Empty]]],
        [new Coordinates(0, 2), [[Position.Empty, Position.Empty, Position.X], [Position.Empty, Position.Empty, Position.Empty], [Position.Empty, Position.Empty, Position.Empty]]],
        [new Coordinates(1, 1), [[Position.Empty, Position.Empty, Position.Empty], [Position.Empty, Position.X, Position.Empty], [Position.Empty, Position.Empty, Position.Empty]]]
    ])('start playing with X on coordinates (%i, %i)', (coordinates: Coordinates, expectedBoard: Position[][]) => {
        const game = new TicTacToe()

        game.play(coordinates)

        expect(game.getBoard().equalsTo(new Board(expectedBoard))).toBe(true)
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

    test('cannot play 2 times in the same position', () => {
        const game = new TicTacToe()
        game.play(new Coordinates(0, 0))

        const action = () => game.play(new Coordinates(0, 0))

        expect(action).toThrowError('Position already played')
    })
})