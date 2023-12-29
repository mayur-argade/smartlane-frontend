// globalReducer.js
const initialState = {
  chat1: [
    {
      name: "Varun Dusane",
      message: "what it leads to? new page?",
      time: "8 days ago",
    },
  ],
  chat2: [
    {
      name: "Varun Dusane",
      message: "here also new page ?",
      time: "8 days ago",
    },
  ],
  chat3: [
    {
      name: "Varun Dusane",
      message: "it will be email with selected answer right to admin right?",
      time: "8 days ago",
    },
  ],
  // Add more pieces of state as needed
};

export const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_CHAT_!":
      return {
        ...state,
        char1: action.payload,
      };
    case "UPDATE_CHAT_2":
      return {
        ...state,
        chat2: action.payload,
      };
     default:
      return state;
  }
};

export const updateChat = (newArray, number) => {
  if (number === 1) {
    return {
      type: "UPDATE_CHAT_1",
      payload: newArray,
    };
  } else if (number === 2) {
    return {
      type: "UPDATE_CHAT_2",
      payload: newArray,
    };
  } else {
    return {
      type: "UPDATE_CHAT_3",
      payload: newArray,
    };
  }
};
