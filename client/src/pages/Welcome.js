import React from 'react'

export default function Welcome() {
  return (
    <>
        <a href='/list'>BOOKLIST</a>
        <img src="https://atjehwatch.com/wp-content/uploads/2021/02/upin-tak-lagi-botak.jpg"></img>
        <form>
          <label for="username">Username: </label>
          <input type="text" id="username" name="username"></input><br></br>
          <label for="password">Passsword: </label>
          <input type="password" id="password" name="password"></input><br></br>
          <input type="submit" value="Submit"></input>
        </form>
        <a href='/signup'>Sign Up</a>
    </>
  )
}
