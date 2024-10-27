import Cookies from 'js-cookie';
import { supabase } from './supabase';

export const signUpNewUser = async (
  email: string,
  password: string,
  name: string
) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });
};

export const signInUser = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const verifyUserEmail = async (email: string, token: string) => {
  return await supabase.auth.verifyOtp({
    email,
    token,
    type: 'signup',
  });
};

export const setToken = (token: string) => {
  Cookies.set('token', token, { expires: 7 });
};

export const logout = async () => {
  Cookies.remove('token');
  return await supabase.auth.signOut();
};
