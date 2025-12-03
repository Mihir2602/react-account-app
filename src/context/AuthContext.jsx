/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from 'react';

const USERS_KEY = 'ra_users';
const CURRENT_USER_KEY = 'ra_current_user';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

//Read users from localStorage - Helper Function.
/* 
Try read localStorage.getItem(USERS_KEY).

If nothing stored → return [].

If something stored → parse JSON.

If JSON.parse fails → log error, return [].
*/

const readUsersFromStorage = () => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading users from localStorage:', err);
    return [];
  }
};

//Write users to localStorage - Helper Function.
const writeUsersToStorage = (users) => {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Error writing users to localStorage:', err);
  }
};

//Read current user - Helper Function.
const readCurrentUserFromStorage = () => {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading current user from localStorage:', err);
    return null;
  }
};


export const AuthProvider = ({ children }) => {
    //Initialising state from localStorage (only once). - Lazy Initialisation!
  const [users, setUsers] = useState(() => readUsersFromStorage());
  const [currentUser, setCurrentUser] = useState(() => readCurrentUserFromStorage());
  const [loading, setLoading] = useState(false);

  //Register Function.
    const register = ({ name, email, password, phone = '', address = '' }) => {

        // Email checking, if exist or not.
    const emailExists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (emailExists) {
      return { success: false, message: 'Email already registered' };
    }

    // making entry of new user.
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      phone,
      address,
    };

    const nextUsers = [...users, newUser];
    setUsers(nextUsers);

    // aslo, setting the same as current user.
    setCurrentUser({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      address: newUser.address,
    });

    return { success: true };
  };

  //login function.
    const login = ({ email, password }) => {
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    if (user.password !== password) {
      return { success: false, message: 'Incorrect password' };
    }

    setCurrentUser({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
    });

    return { success: true };
  };

  const updateProfile = ({ id, name, phone, address, password }) => {
    setLoading(true);

// check for the user in users.
    try {
      const nextUsers = users.map((user) => {
        if (user.id !== id) return user;

     const updated = {
  ...user,    // 1. Copy all existing old data (id, email, old password)
  name,       // 2. Overwrite name with new name
  phone,      // 3. Overwrite phone no.
  address,    // 4. Overwrite address
};

//if password also provided, update it also.
        if (password) {
          updated.password = password;
        }

        return updated;
      });

      setUsers(nextUsers);

      //updating the currennt active session.
      const updatedUser = nextUsers.find((u) => u.id === id);

      if (updatedUser) {
        setCurrentUser({
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone,
          address: updatedUser.address,
        });
      }

      return { success: true };
    } catch (err) {
      console.error('Error updating profile:', err);
      return { success: false, message: 'Update failed' };
    } finally {
      setLoading(false);
    }
  };

  //logout function.
    const logout = () => {
    setCurrentUser(null);
  };


   const value = {
    users,
    currentUser,
    loading,
    register,
    login,
    updateProfile,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};