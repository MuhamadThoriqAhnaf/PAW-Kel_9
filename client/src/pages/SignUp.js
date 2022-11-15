import React from 'react'

export default function SignUp() {
  return (
    <form>
        <label for="username">Username: </label>
        <input type="text" id="username" name="username"className='border-2'></input><br></br>
        <label for="password">Passsword: </label>
        <input type="password" id="password" name="password"className='border-2'></input><br></br>
        <input type="submit" value="Login" className='border-4 border-black '></input>

    </form>
  )
}