import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

export const AppContext = React.createContext();

export default function AppProvider({ children, theme, setTheme }) {
  const [user, setUser] = useState('')
  const [profile, setProfile] = useState()
  const [page, setPage] = useState({route: 'home', info: null})
  const [searchInfo, setSearchInfo] = useState({})
  // const [theme, setTheme] = useState('dark')
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
        page, setPage,
        theme, setTheme,
        searchInfo, setSearchInfo
      }}
    >
      {children}
    </AppContext.Provider>
  );
}