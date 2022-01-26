import { TicTacToe } from "./main"

describe('tic tac toe', () => {
    test('start a new game', () => {
        const game = new TicTacToe()

        const expectedBoard: string[][] = [['', '', ''], ['', '', ''], ['', '', '']]
        expect(game.board).toEqual(expectedBoard)
    })
})