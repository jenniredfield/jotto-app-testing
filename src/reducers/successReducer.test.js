import {actionTypes, correctGuess} from '../actions';
import successReducer from './successReducer';

describe('successReducer', () => {
    test('returns default initial state of `false` when no action', () => {
        const newState = successReducer(undefined, {});
        expect(newState).toBe(false);
    });

    test('returns state true upon receiving action of type `CORRECT_GUESS`', () => {
        const newState = successReducer(undefined, {type: actionTypes.CORRECT_GUESS});
        expect(newState).toBe(true);
    });
})