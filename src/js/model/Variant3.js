import { state, Statuses } from "../state";
import { Variant } from "./Variant";

class Variant3 extends Variant {
  constructor(config) {
    super();

    this.config = config;
  }

  AIChoice() {
    if (state.gameResults.length === 0) {
      state.randomIndex = 1;
      return;
    }

    if (state.gameResults.length === 1) {
      switch (state.gameResults[0]) {
        case Statuses.Win:
          const playerIndex = this.generateIndex(state.playerChoice[0]);
          const AIIndex = this.opositeSymbol(playerIndex);

          state.randomIndex = AIIndex;
          return;
        case Statuses.Draw:
          state.randomIndex = this.randomNumber();
          return;
        case Statuses.Loss:
          state.randomIndex = this.generateIndex(state.playerChoice[0]);
          return;
      }
    }

    if (state.gameResults.length > 1) {
      if (
        state.gameResults[0] === Statuses.Win &&
        state.gameResults[1] === Statuses.Win
      ) {
        state.randomIndex = this.generateIndex(state.playerChoice[0]);
      } else if (
        state.gameResults[0] === Statuses.Draw &&
        state.gameResults[1] === Statuses.Draw
      ) {
        state.randomIndex = this.randomNumber();
      } else if (
        state.gameResults[0] === Statuses.Loss &&
        state.gameResults[1] === Statuses.Loss
      ) {
        const aiSymbolIndex = this.generateIndex(state.AIChoice[0]);
        state.randomIndex = this.opositeSymbol(aiSymbolIndex);
      } else if (
        state.gameResults[0] === Statuses.Win &&
        state.gameResults[1] !== Statuses.Win
      ) {
        const playerSymbolIndex = this.generateIndex(state.playerChoice[0]);
        state.randomIndex = this.opositeSymbol(playerSymbolIndex);
      } else if (
        state.gameResults[0] === Statuses.Draw &&
        state.gameResults[1] !== Statuses.Draw
      ) {
        state.randomIndex = this.randomNumber();
      } else if (
        state.gameResults[0] === Statuses.Loss &&
        state.gameResults[1] !== Statuses.Loss
      ) {
        const aiSymbolIndex = this.generateIndex(state.AIChoice[0]);
        state.randomIndex = this.opositeSymbol(aiSymbolIndex);
      } else {
        state.randomIndex = this.randomNumber();
      }
    }
  }

  getMessage() {
    const headline = `3IQ - tryb 3`;
    const copy = `Runda ${state.summary.games + 1}. Wybierz symbol!`;

    return {
      headline,
      copy
    };
  }
}

export default Variant3;
