import { useEffect, useState } from 'react'

/* добавлям интерфейс */
export interface IUser  {
  id: number
  name: string
}

export const MockAPI = {
  async getUsers(): Promise<IUser[]> {
    const rnd = Math.random()
    console.log(rnd)
    return rnd > 0.5?
      Promise.resolve([
        { id: 1, name: 'user1' },
        { id: 2, name: 'user2' },
        { id: 3, name: 'user3' },
      ]):
      Promise.reject(new Error('some error'))
  }
}

const useFetchUsers = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const fetchUsers = async () => {
    /* очистка прежних значений */
    setIsLoading(true)
    setUsers([])
    setErrorMessage("")

    /* добавим задержку для демонстрации загрузки */
    await new Promise(resolve => setTimeout(resolve, 1000))

    MockAPI.getUsers()
      .then(setUsers)
      .catch((e) => setErrorMessage(e.message))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    /* трюк для предотвращения race condition */
    let ignore = false
    MockAPI.getUsers()
      .then(users => {
        if (!ignore) setUsers(users)
      })
      .catch(e => {
        if (!ignore) setErrorMessage(e.message)
      })
      .finally(() => {
        if (!ignore) setIsLoading(false)
      })
    return () => {
      ignore = true
    }
  }, [])

  return {
    fetchUsers,
    users,
    isLoading,
    errorMessage,
  }
}

export default useFetchUsers
