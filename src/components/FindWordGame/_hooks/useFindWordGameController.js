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
    const trimmedWord = word.trim();
    const textWithoutEmptySpace = removeEmptySpace(trimmedWord);

    return {
      ...acc,
      [trimmedWord]: {
        word,
        trimmedWord: trimmedWord,
        history: [],
        firstBox: [],
        secondBox: [],
        emptySpaceIndexes: findSpecialCharIndexes(word),
        textWithoutEmptySpace,
        shuffledWord: shuffle(textWithoutEmptySpace),
        input: " ".repeat(word.length),
        answerStatus: "initial",
        dirty: false,
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
          [payload.word]: {
            ...state.words[payload.word],
            ...payload,
          },
        },
      };
    default:
      return state;
  }
};

const useFindWordGameController = (words, index) => {
  const [state, dispatch] = useReducer(reducer, {
    words: prepareInitialState(words),
    selectedWord: words[index].word.trim(),
  });

  return {
    state,
    dispatch,
    currentWordState: state.words[state.selectedWord],
  };
};

export default useFindWordGameController;
