export default function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return action.payload; // reset to initialAuthState
    default:
      return state;
  }
}