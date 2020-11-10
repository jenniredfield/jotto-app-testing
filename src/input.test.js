import React from 'react';
import {shallow} from 'enzyme';

import {findByTestAttr, storeFactory} from '../test/testUtils';
import Input, {UnconnectedInput} from './Input';

const setup = (initialState={}) => {
    const store = storeFactory(initialState);
    const wrapper = shallow(<Input store={store}/>).dive().dive();
    return wrapper;
};

describe('render', () => {
    describe('word has not been guessed', () => {
        let wrapper;
        beforeEach(() => {
            const initialState = {success: false};
            wrapper = setup(initialState)
        });

        test('renders component without error', () => {
            const component = findByTestAttr(wrapper, 'component-input');
            expect(component.length).toBe(1);
        });

        test('renders input box', () => {
            const inputBox = findByTestAttr(wrapper, 'input-box');
            expect(inputBox.length).toBe(1);
        });

        test('renders submit button', () => {
            const submitButton = findByTestAttr(wrapper, 'submit-button');
            expect(submitButton.length).toBe(1);
        });

    });
    describe('word has been guessed', () => {
        let wrapper;

        beforeEach(() => {
            const initialState = {success: true};
            wrapper = setup(initialState)
        });

        test('renders component without error', () => {
            const component = findByTestAttr(wrapper, 'component-input');
            expect(component.length).toBe(1);
        });

        test('does not render input box', () => {
            const inputBox = findByTestAttr(wrapper, 'input-box');
            expect(inputBox.length).toBe(0);
        });

        test('does not render submit button', () => {
            const submitButton = findByTestAttr(wrapper,'submit-button');
            expect(submitButton.length).toBe(0);
        });
    });
});

describe('redux props', () => {

    test('has success pece of state as prop', () => {
        const success = true;
        const wrapper = setup({success});

        const successProp = wrapper.instance().props.success;
        expect(successProp).toBe(success);
    });

    test('`guessWord` action creator is a function prop', () => {
        const wrapper = setup();
        const guessWordProp = wrapper.instance().props.guessWord;
        expect(guessWordProp).toBeInstanceOf(Function);
    });
});

// export unconnect
// mock guessWord
// with mock as prop
// simulate click on submit button
describe('Click on submit calls action creator', () => {
    let guessWordMock;
    let wrapper; 
    const guessedWord = 'train';
    let button = null;

    beforeEach(() => {
        guessWordMock = jest.fn();

        const props = {
            guessWord: guessWordMock
        }

        wrapper = shallow(<UnconnectedInput {...props}/>);

        wrapper.setState({currentGuess: guessedWord});

        button = findByTestAttr(wrapper, 'submit-button');

        button.simulate('click', {preventDefault() {}});

    })
    test('Calls submit function when clicked', () => {
        const callCount = guessWordMock.mock.calls.length;

        expect(callCount).toBe(1);
    });

    test('Calls submit function when clicked with correct argument', () => {
        const guessWordArg = guessWordMock.mock.calls[0][0];

        expect(guessWordArg).toBe(guessedWord);
    });

    test('input box clears on submit', () => {
        expect(wrapper.state('currentGuess')).toBe('');
    });
});
