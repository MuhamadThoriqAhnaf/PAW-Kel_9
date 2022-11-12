import React from 'react'

export default function SignUp() {
  return (
    <form>
        <label for="username">Username: </label>
        <input type="text" id="username" name="username"></input><br></br>
        <label for="password">Passsword: </label>
        <input type="password" id="password" name="password"></input><br></br>
        <input type="submit" value="Submit"></input>
    </form>
  )
}