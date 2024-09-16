import { PropsWithChildren } from 'react'
/*
* Всю логику переносим в кастомные хуки,
* соблюдая принцип "S" из S.O.L.I.D.
* */
import useDarkMode from "../hooks/useDarkMode"
import useFetchUsers, {IUser} from "../hooks/useFetchUsers"

export const UsersPage = () => {
  const {
    isDarkMode,
    switchTheme,
  } = useDarkMode()

  const {
    fetchUsers,
    users,
    isLoading,
    errorMessage,
  } = useFetchUsers()

  return (<>
    <App>
      <ErrorWrapper errorMessage={errorMessage}>
        <div className='panel-wrapper' style={{
          backgroundColor: isDarkMode? '#263238': '#eceff1',
          color: isDarkMode? '#eceff1': '#263238',
          display: 'flex',
          gap: "1rem",
        }}>
          <ThemeSwitcherBtn mode={isDarkMode} onClick={switchTheme} />
          <Panel isLoading={isLoading} title="Список зарегистрированных пользователей" />
          <RefreshBtn isLoading={isLoading} onClick={fetchUsers} />
        </div>
        <Users users={users} />
      </ErrorWrapper>
    </App>
  </>)
}

/*
* Добавим компонентам минимальную реализацию в демонстрационных целях
* */
export const App = ({ children }: PropsWithChildren) => (
  <>
    <div>
      {children}
    </div>
  </>
)

export const Users = (props: { users: IUser[] }) => (
  <>
    <ul>
      {props.users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  </>
)

export const Panel = ({ isLoading, title }: { isLoading: boolean, title: string }) => (
  <>
    <div>
      {isLoading? "...загрузка...": title}
    </div>
  </>
)

export const RefreshBtn = ({ isLoading, onClick }: { isLoading: boolean, onClick: () => Promise<void> }) => (
  <>
    <button disabled={isLoading} onClick={onClick}>
      Refresh
    </button>
  </>
)

export const ThemeSwitcherBtn = ({ mode, onClick }: { mode: boolean, onClick: () => void }) => (
  <>
    <button onClick={onClick}>
      Switch To {mode? "Light": "Dark"}
    </button>
  </>
)

export const ErrorWrapper = (
  { errorMessage, children }: PropsWithChildren<{ errorMessage: string }>
) => (
  <>
    {errorMessage
      ? <p style={{color: '#f44336'}}>{errorMessage}</p>
      : children
    }
  </>
)
