import { TicTacToe } from "./main"

describe('tic tac toe', () => {
    test('start a new game', () => {
        const game = new TicTacToe()

        const expectedBoard: string[][] = [['', '', ''], ['', '', ''], ['', '', '']]
        expect(game.board).toEqual(expectedBoard)
    })

    test.each([
        [0, 0, [['X', '', ''], ['', '', ''], ['', '', '']]],
        [2, 2, [['', '', ''], ['', '', ''], ['', '', 'X']]],
        [1, 0, [['', '', ''], ['X', '', ''], ['', '', '']]],
        [0, 2, [['', '', 'X'], ['', '', ''], ['', '', '']]],
        [1, 1, [['', '', ''], ['', 'X', ''], ['', '', '']]]
    ])('start playing with X on coordinates (%i, %i)', (xCoordinate: number, yCoordinate: number, expectedBoard: string[][]) => {
        const game = new TicTacToe()

        game.play(xCoordinate, yCoordinate)

        expect(game.board).toEqual(expectedBoard)
    })
})