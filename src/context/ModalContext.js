import { createContext, useReducer } from "react";

export const ModalContext = createContext();

export const ModalReducer = (state, action) => {
  switch (action.type) {
    case "SET_MODAL":
      return {
        modal: action.payload,
      };

    case "SHOW_MODAL":
      return {
        modal: true,
      };

    case "CLOSE_MODAL":
      return {
        modal: false,
      };

    case "SET_CHECKED":
      return {
        checked: action.payload,
      };

    case "CHECK":
      return {
        checked: true,
      };

    case "UNCHECK":
      return {
        checked: false,
      };

    case "TOGGLE":
      return {
        checked: !state.checked,
      };

    default:
      return state;
  }
};

export const ModalContextProvider = ({ children }) => {
  const [state, modalDispatch] = useReducer(ModalReducer, {
    modal: false,
    checked: null,
  });
  return (
    <ModalContext.Provider
      value={{
        ...state,
        modalDispatch,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
