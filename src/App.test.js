import React from 'react';
import {shallow} from 'enzyme'
import { storeFactory } from '../test/testUtils';
import App, {UnconnectedApp} from './App';
// redux prop test for App
// what state? success state, needs guessedWords
// what action creators? // needs to get secretWord
// what tests?
// setup a setupComponent function with two dives

describe('App', () => {
    const setup = (initialState={}) => {
       const store = storeFactory(initialState);
       const wrapper = shallow(<App store={store}/>).dive().dive();
       return wrapper;
    }

    describe('Pieces of state', () => {
        test('it should have a success prop from redux', () => {
            const wrapper = setup({success: true});
            const successProp = wrapper.instance().props.success;

            expect(successProp).toBe(true);
        });

        test('it should have secretWord prop from redux', () => {
            const propsToBeTested = 'party';
            const wrapper = setup({secretWord: propsToBeTested});
            const secretWordProp = wrapper.instance().props.secretWord;
            expect(secretWordProp).toEqual(propsToBeTested);
        });
    
        test('it should have guessedWords prop from redux', () => {
            const propsToBeTested = {guessedWords: [{guessedWord: 'train', letterCountMatch: 3}]}
            const wrapper = setup(propsToBeTested);
            const guessedWordsProp = wrapper.instance().props.guessedWords;
            expect(guessedWordsProp).toEqual(propsToBeTested.guessedWords);
        });
    });

    describe('Actions', () => {
        test('it should have a action to get secretWord', () => {
            const wrapper = setup();
            const getSecretWordProp = wrapper.instance().props.getSecretWord;
            expect(getSecretWordProp).toBeInstanceOf(Function);
        });
    });

    describe('Unconnected App', () => {
        test('triggers getSecretWord on Did Mount', () => {
            const getSecretWordMock = jest.fn();
            const props = {
                getSecretWord: getSecretWordMock,
                sucess: false,
                guessedWord: []
            }
            const wrapper = shallow(<UnconnectedApp {...props}/>);

            // run lifecycle method
            wrapper.instance().componentDidMount();

            // check if function ran

            const getSecretWordCallCount = getSecretWordMock.mock.calls.length;

            expect(getSecretWordCallCount).toBe(1);
        });
    });
})