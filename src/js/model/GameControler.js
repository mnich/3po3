import { DOMclasses, updateScoresView, assets } from "../base";
import {
  state,
  Symbols,
  stateIncrementation,
  stateSaveToArray,
  Statuses
} from "../state";

import { Winner } from "./Winner";
import { renderWinnerView, renderMessage, playAgain } from "../view/winnerView";
import { Sound } from "./Sound";

export class GameControler {
  constructor() {
    this.currentVariant = null;
    this.playAgainSubscribers = [];
    this.sound = new Sound(new Audio(assets.click2));
  }

  stopSymbolInterval() {
    if (state.intervals) clearInterval(state.intervals);
  }

  saveAIChoiceToState(symbol) {
    let choice = "";

    switch (symbol) {
      case 0:
        choice = Symbols.Rock;
        break;
      case 1:
        choice = Symbols.Paper;
        break;
      case 2:
        choice = Symbols.Scissors;
        break;
    }

    if (state.AIChoice.length === 3) state.AIChoice.pop();
    state.AIChoice.unshift(choice);
  }

  playerChoice(symbol) {
    state.keyBlocked = true;

    if (state.playerChoice.length === 3) state.playerChoice.pop();
    state.playerChoice.unshift(symbol);

    this.sound.playSound();
    this.finishGame();
  }

  playerChoiceListener() {
    this.playerSymbols = [
      ...document.querySelectorAll(`.${DOMclasses.playerSymbols}`)
    ];

    this.playerSymbols.forEach(symbol => {
      symbol.addEventListener("mousedown", () => {
        this.playerChoice(symbol.dataset.symbol);
      });
    });

    document.addEventListener("keydown", ({ keyCode, which }) => {
      if (state.keyBlocked) return;

      switch (keyCode || which) {
        case 37:
          this.playerChoice(Symbols.Rock);
          break;
        case 40:
          this.playerChoice(Symbols.Paper);
          break;
        case 39:
          this.playerChoice(Symbols.Scissors);
          break;
      }
    });
  }

  startGame() {
    this.stopSymbolInterval();
    state.keyBlocked = false;

    this.currentVariant.AIChoice();
    this.playerChoiceListener();
  }

  finishGame() {
    state.enterBlocked = false;

    this.stopSymbolInterval();
    this.saveAIChoiceToState(state.randomIndex);

    const winner = new Winner(state.playerChoice[0], state.AIChoice[0]);
    const gameResult = winner.checkGameResult();

    stateIncrementation(gameResult);
    stateIncrementation(Statuses.Game);
    stateSaveToArray(state.gameResults, gameResult);

    renderMessage(state.gameResults[0]);
    renderWinnerView(state.gameResults[0]);

    updateScoresView(state.gameResults[0], state.summary);

    playAgain(() => {
      this.sound.playSound();
      this.playAgainSubscribers.forEach(sub => sub());
    });
  }

  getPlayAgainSubscribers(subscriber) {
    this.playAgainSubscribers.push(subscriber);
  }

  changeCurrentVariant(variant) {
    this.currentVariant = variant;
  }
}
