import { useState } from "react";

const useAsyncReducer = (reducer: any, initialState: any) => {
  const [state, setState] = useState(initialState);

  const dispatch = async (action: any) => {
    const result = reducer(state, action);
    if (typeof result.then === "function") {
      try {
        const newState = await result;
        setState(newState);
      } catch (err) {
        setState({ ...state, error: err });
      }
    } else {
      setState(result);
    }
  };

  return [state, dispatch];
};

export default useAsyncReducer;