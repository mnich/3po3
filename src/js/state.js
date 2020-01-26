const state = {
    playerChoice: '',
    aiChoice: '',
    summary: {
        games: 0,
        wins: 0,
        draws: 0,
        losses: 0
    }
}

const resetStateChoice = () => {
    state.playerChoice = '';
    state.aiChoice = '';
}

const resetAllState = () => {
    resetStateChoice();

    for (const key of Object.keys(state.summary)) {
        state.summary[key] = 0;
    }
}

export {
    state,
    resetAllState,
    resetStateChoice
};