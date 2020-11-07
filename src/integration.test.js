import {storeFactory} from '../test/testUtils';
import {guessWord} from './actions';

describe('guessWord action dispatcher', () => {
    const secretWord = 'party';
    const unsuccessfulGuess = 'train';

    describe('no guessed words', () => {
        let store;

        const initialState = { secretWord }
        beforeEach(() => {
            store = storeFactory(initialState);
        });

        test('updates state correctly for unsuccesful guess', () => {
            store.dispatch(guessWord(unsuccessfulGuess));
            const expectedState = {
                ...initialState,
                success: false,
                guessedWords: [{
                    guessedWord:  unsuccessfulGuess,
                    letterMatchCount: 3
                }]
            };

            const newState = store.getState();

            expect(newState).toEqual(expectedState);
        });

        test('updates state correctly for succesful guess', () => {
            store.dispatch(guessWord('party'));
            const expectedState = {
                ...initialState,
                success: true,
                guessedWords: [{
                    guessedWord: 'party',
                    letterMatchCount: 5
                }]
            };

            const newState = store.getState();
            expect(newState).toEqual(expectedState)

        });
    });

    describe('some guessed words', () => {
        let store;

        const initialState = { secretWord }
        const unsuccessfulGuess1 = 'train';
        const unsuccessfulGuess2 = 'spain';

        beforeEach(() => {
            store = storeFactory(initialState);
        });

        test('updates state correctly for unsuccesful guess', () => {
            store.dispatch(guessWord(unsuccessfulGuess1));
            store.dispatch(guessWord(unsuccessfulGuess2));

            const expectedState = {
                ...initialState,
                success: false,
                guessedWords: 
                [{
                    guessedWord:  unsuccessfulGuess1,
                    letterMatchCount: 3
                },
                {
                    guessedWord:  unsuccessfulGuess2,
                    letterMatchCount: 2
                }]
            };

            const newState = store.getState();

            expect(newState).toEqual(expectedState);

        });
        test('updates state correctly for succesful guess', () => {
            store.dispatch(guessWord(unsuccessfulGuess1));
            store.dispatch(guessWord(unsuccessfulGuess2));
            store.dispatch(guessWord(secretWord));

            const expectedState = {
                ...initialState,
                success: true,
                guessedWords: 
                [{
                    guessedWord:  unsuccessfulGuess1,
                    letterMatchCount: 3
                },
                {
                    guessedWord:  unsuccessfulGuess2,
                    letterMatchCount: 2
                },
                {
                    guessedWord:  secretWord,
                    letterMatchCount: 5
                }
            ]
            };

            const newState = store.getState();

            expect(newState).toEqual(expectedState);

        });
    });

})