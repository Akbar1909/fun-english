import { DEFAULT_PAGE_SIZE } from "@/helpers/const";
import { useReducer } from "react";

const ACTION_TYPES = {
  SET_VALUES_TO_ROOT_LEVEL: "setValuesToRootLevel",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_VALUES_TO_ROOT_LEVEL:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const useInfinityScroll = () => {
  const [state, dispatch] = useReducer(reducer, {
    page: 0,
    size: DEFAULT_PAGE_SIZE,
    next: null,
    total: null,
    count: null,
    list: null,
  });

  const setPage = (newPage) =>
    dispatch({
      type: ACTION_TYPES.SET_VALUES_TO_ROOT_LEVEL,
      payload: { page: newPage },
    });

  const setSize = (newSize) =>
    dispatch({
      type: ACTION_TYPES.SET_VALUES_TO_ROOT_LEVEL,
      payload: { size: newSize },
    });

  const appendToList = (newItems) => {
    dispatch({
      type: ACTION_TYPES.SET_VALUES_TO_ROOT_LEVEL,
      payload: {
        list: {
          ...state.list,
          ...newItems.reduce((acc, cur) => ({ ...acc, [cur.wordId]: cur }), []),
        },
      },
    });
  };

  return {
    setSize,
    setPage,
    appendToList,
    ...state,
  };
};

export default useInfinityScroll;
