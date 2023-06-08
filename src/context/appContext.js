import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const [user, setUser] = useState('')
  const [profile, setProfile] = useState()
  const [page, setPage] = useState('home')
  const history = useNavigate()

  useEffect(() =>  {
    history('/')
    setProfile(null)
  }, [user])

  return (
    <AppContext.Provider
      value={{
        history,
        user, setUser,
        profile, setProfile,
        page, setPage
      }}
    >
      {children}
    </AppContext.Provider>
  );
}