import { TicTacToe } from "./main"

describe('tic tac toe', () => {
    test('start a new game', () => {
        const game = new TicTacToe()

        const expectedBoard: string[][] = [['', '', ''], ['', '', ''], ['', '', '']]
        expect(game.board).toEqual(expectedBoard)
    })

    test('start playing with X', () => {
        const game = new TicTacToe()

        game.play(0, 0)

        const expectedBoard: string[][] = [['X', '', ''], ['', '', ''], ['', '', '']]
    })
})