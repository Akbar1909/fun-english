const joinArray = (array = [], splitter = " ") => {
  if (!Array.isArray(array) || array.length < 1) return "";

  return array.filter(Boolean).join(splitter);
};

export const camelCaseToCapitalize = (str) => {
  if (typeof str !== "string") {
    return "";
  }
  const result = str.replace(/([a-z])([A-Z])/g, "$1 $2");
  return joinArray([result.charAt(0)?.toUpperCase(), result.slice(1)], "");
};

export const isObject = (value) =>
  Object.prototype.toString.call(value) === "[object Object]";

export function factoryReducer(actionType) {
  return (state, action) => {
    switch (action.type) {
      case actionType:
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  };
}

export async function forceWait(wait = 3000) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve("");
    }, wait)
  );
}
