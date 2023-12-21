import { FIRST_PAGE_SIZE } from "@/helpers/const";
import { useCallback, useMemo, useReducer } from "react";

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
  const [{ list, ...rest }, dispatch] = useReducer(reducer, {
    page: 0,
    size: FIRST_PAGE_SIZE,
    next: null,
    total: null,
    count: null,
    list: {},
  });

  const array = useMemo(() => Object.values(list), [list]);

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

  const appendToList = useCallback(
    (newItems, key) => {
      dispatch({
        type: ACTION_TYPES.SET_VALUES_TO_ROOT_LEVEL,
        payload: {
          list: {
            ...list,
            ...newItems.reduce((acc, cur) => ({ ...acc, [cur[key]]: cur }), []),
          },
        },
      });
    },
    [list]
  );

  return {
    setSize,
    setPage,
    appendToList,
    array,
    ...rest,
  };
};

export default useInfinityScroll;
