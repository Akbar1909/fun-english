import {
  findSpecialCharIndexes,
  removeEmptySpace,
  shuffle,
} from "@/helpers/common";
import { useReducer } from "react";

export const FIND_WORD_GAME_ACTION_TYPES = {
  SET_SELECTED_WORD: "setSelectedWord",
  SET_NEW_VALUE_TO_WORD_PROPERTY: "setNewValueToWordProperty",
};

const prepareInitialState = (words) =>
  words.reduce((acc, { word }) => {
    const textWithoutEmptySpace = removeEmptySpace(word);

    return {
      ...acc,
      [word.trim()]: {
        word,
        history: [],
        shuffledWord: shuffle(textWithoutEmptySpace),
        input: " ".repeat(word.length),
        answerStatus: "initial",
        textWithoutEmptySpace,
        emptySpaceIndexes: findSpecialCharIndexes(word),
      },
    };
  }, {});

const reducer = (state, { type, payload }) => {
  switch (type) {
    case FIND_WORD_GAME_ACTION_TYPES.SET_SELECTED_WORD:
      return {
        ...state,
        selectedWord: payload,
      };
    case FIND_WORD_GAME_ACTION_TYPES.SET_NEW_VALUE_TO_WORD_PROPERTY:
      return {
        ...state,
        words: {
          ...state.words,
          [state.selectedWord]: {
            ...state.words[state.selectedWord],
            ...payload,
          },
        },
      };
    default:
      return state;
  }
};

const useFindWordGameController = (words) => {
  const [state, dispatch] = useReducer(reducer, {
    words: prepareInitialState(words),
    selectedWord: words[0].word.trim(),
  });

  return {
    state,
    dispatch,
    currentWordState: state.words[state.selectedWord],
  };
};

export default useFindWordGameController;
