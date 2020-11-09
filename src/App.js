import React from 'react';
import './App.css';
import GuessedWords from './GuessedWords';
import Congrats from './Congrats';
import Input from './Input';
import {getSecretWord} from './actions'
import {connect} from 'react-redux';
class App extends React.Component {

  render() {
    return (
      <div className="container">
        <h1>Jotto</h1>
        <Congrats success={this.props.success} />
        <Input />
        <GuessedWords 
          guessedWords={this.props.guessedWords} />
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    success: state.success,
    secretWord: state.secretWord,
    guessedWords: state.guessedWords
  }
}

export default connect(mapStateToProps, {getSecretWord})(App);
