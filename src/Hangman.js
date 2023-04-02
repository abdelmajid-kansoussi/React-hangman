import React, { Component } from "react";
import { randomWord } from "./words";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = {
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.restart = this.restart.bind(this);
  }

  guessedWord() {
    return this.state.answer
      .split("")
      .map((ltr) => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }));
  }

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr, idx) => (
      <button
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
        key={idx}
      >
        {ltr}
      </button>
    ));
  }

  restart() {
    this.setState(() => {
      return {
        answer: randomWord(),
        guessed: new Set(),
        nWrong: 0,
      };
    });
  }

  render() {
    const { nWrong, answer } = this.state;
    const { maxWrong } = this.props;
    const altText = `${nWrong} wrong guesses`;
    const gameOver = nWrong >= maxWrong;
    const isWinner = this.guessedWord().join("") === answer;
    let gameState = this.generateButtons();
    if (gameOver) gameState = "You Lose!";
    if (isWinner) gameState = "You Win!";

    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <img src={this.props.images[nWrong]} alt={altText} />
        <p>Wrong guesses: {nWrong}</p>
        <p className="Hangman-word">{gameOver ? answer : this.guessedWord()}</p>
        <p className="Hangman-btns">{gameState}</p>
        <button id="Hangman-restart" onClick={this.restart}>
          restart
        </button>
      </div>
    );
  }
}

export default Hangman;
