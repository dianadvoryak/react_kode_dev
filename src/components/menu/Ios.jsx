import React, { useEffect, useState } from 'react'
import { UsersService } from '../../services/Services'
import { ItemUser } from '../userItem/ItemUser'
import { Input } from '../UI/input/Input';
import { Users } from '../users/Users';
import { useFetching } from '../hooks/useFetching';
import { Loading } from '../UI/loading/Loading';
import { ServerError } from '../UI/serverError/ServerError';


export const Ios = () => {

  const [users, setUsers] = useState([])
  const [fetchUsers, isUsersLoading, usersError] = useFetching( async () =>{
    const response = await UsersService.GetCurrentUsers('ios')
    setUsers(response.items)
  })
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <div>
      <Input searchValue={searchValue} onChangeSearchValue={onChangeSearchValue} />
      <Users />
      {
        usersError && <ServerError />
      }
      {
        isUsersLoading
        ? <Loading />
        : (
          users
            .filter(person => {
              const fullName = (person.firstName + ' ' + person.lastName).toLowerCase()
              return fullName.includes((searchValue).toLowerCase()) 
            })
            .map(person => <ItemUser key={person.id + Math.floor(Math.random()*1000)} person={person} />) 
        )
      }
    </div>
  )
}