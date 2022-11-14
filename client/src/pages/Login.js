import React from 'react'

export default function Login() {
  return (
    <form>
        <label for="username">Username: </label>
        <input type="text" id="username" name="username"></input><br></br>
        <label for="password">Passsword: </label>
        <input type="password" id="password" name="password"></input><br></br>
        <a href='/adminpage'><input type="button" value="Masuk"></input></a>

    </form>
  )
}