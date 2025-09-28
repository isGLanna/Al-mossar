import { createContext, useState, ReactNode } from 'react'

interface UserStateProps {
  login: boolean,
  client: boolean,
  setLogin: (value: boolean) => void,
  setClient: (value: boolean) => void
}

export const UserStateContext = createContext<UserStateProps>({
  login: false,
  client: false,
  setLogin: () => {},
  setClient: () => {}
})

export const UserStateProvider = ({children}: {children: ReactNode}) => {
  const [login, setLogin] = useState<boolean>(false)
  const [client, setClient] = useState<boolean>(false)

  return (
    <UserStateContext.Provider value={{login, client, setLogin, setClient}}>
      {children}
    </UserStateContext.Provider>
  )
}