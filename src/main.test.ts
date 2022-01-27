import { Position, TicTacToe } from "./main"

describe('tic tac toe', () => {
    test('start a new game', () => {
        const game = new TicTacToe()

        const expectedBoard: string[][] = [
            [Position.Empty, Position.Empty, Position.Empty],
            [Position.Empty, Position.Empty, Position.Empty],
            [Position.Empty, Position.Empty, Position.Empty]
        ]
        expect(game.getBoard()).toEqual(expectedBoard)
    })

    test.each([
        [0, 0, [[Position.X, Position.Empty, Position.Empty], [Position.Empty, Position.Empty, Position.Empty], [Position.Empty, Position.Empty, Position.Empty]]],
        [2, 2, [[Position.Empty, Position.Empty, Position.Empty], [Position.Empty, Position.Empty, Position.Empty], [Position.Empty, Position.Empty, Position.X]]],
        [1, 0, [[Position.Empty, Position.Empty, Position.Empty], [Position.X, Position.Empty, Position.Empty], [Position.Empty, Position.Empty, Position.Empty]]],
        [0, 2, [[Position.Empty, Position.Empty, Position.X], [Position.Empty, Position.Empty, Position.Empty], [Position.Empty, Position.Empty, Position.Empty]]],
        [1, 1, [[Position.Empty, Position.Empty, Position.Empty], [Position.Empty, Position.X, Position.Empty], [Position.Empty, Position.Empty, Position.Empty]]]
    ])('start playing with X on coordinates (%i, %i)', (xCoordinate: number, yCoordinate: number, expectedBoard: string[][]) => {
        const game = new TicTacToe()

        game.play(xCoordinate, yCoordinate)

        expect(game.getBoard()).toEqual(expectedBoard)
    })

    test('X and O play alternatively', () => {
        const game = new TicTacToe()

        game.play(0, 0)
        game.play(2, 2)
        game.play(1, 0)
        game.play(0, 2)
        game.play(2, 1)

        expect(game.getBoard()).toEqual([
            [Position.X, Position.Empty, Position.O],
            [Position.X, Position.Empty, Position.Empty],
            [Position.Empty, Position.X, Position.O]
        ])
    })
})