import { createContext } from 'react';
import { DEFAULT_FIRE_TOKEN, DEFAULT_USER, UserType } from '../types/user';

export type UserStateType = {
  user: UserType;
  fire_token: string;
};

export type UserActionsType = {
  type: 'login' | 'logout' | 'authenticate';
  payload: {
    user: UserType;
    fire_token: string;
  };
};

export const initialUserState: UserStateType = {
  user: DEFAULT_USER,
  fire_token: DEFAULT_FIRE_TOKEN,
};

export const userReducer = (state: UserStateType, action: UserActionsType) => {
  const { user } = action.payload;
  const { fire_token } = action.payload;

  switch (action.type) {
    case 'login':
      localStorage.setItem('fire_token', fire_token);

      return { user, fire_token };
    case 'logout':
      localStorage.removeItem('fire_token');

      return initialUserState;
    default:
      return state;
  }
};

export interface UserContextPropsTypes {
  userState: UserStateType;
  userDispatch: React.Dispatch<UserActionsType>;
}

const UserContext = createContext<UserContextPropsTypes>({
  userState: initialUserState,
  userDispatch: () => { },
});

export const UserContextConsumer = UserContext.Consumer;
export const UserContextProvider = UserContext.Provider;
export default UserContext;
