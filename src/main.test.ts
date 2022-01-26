import { TicTacToe } from "./main"

describe('tic tac toe', () => {
    test('start a new game', () => {
        const game = new TicTacToe()

        const expectedBoard: string[][] = [['', '', ''], ['', '', ''], ['', '', '']]
        expect(game.board).toEqual(expectedBoard)
    })

    test.each([
        {xCoordinate: 0, yCoordinate: 0, expectedBoard: [['X', '', ''], ['', '', ''], ['', '', '']]},
        {xCoordinate: 2, yCoordinate: 2, expectedBoard: [['', '', ''], ['', '', ''], ['', '', 'X']]},
        {xCoordinate: 1, yCoordinate: 0, expectedBoard: [['', '', ''], ['X', '', ''], ['', '', '']]},
        {xCoordinate: 0, yCoordinate: 2, expectedBoard: [['', '', 'X'], ['', '', ''], ['', '', '']]},
        {xCoordinate: 1, yCoordinate: 1, expectedBoard: [['', '', ''], ['', 'X', ''], ['', '', '']]}
    ])('start playing with X on coordinates (%i, %i)', ({ xCoordinate, yCoordinate, expectedBoard }) => {
        const game = new TicTacToe()

        game.play(xCoordinate, yCoordinate)

        expect(game.board).toEqual(expectedBoard)
    })
})