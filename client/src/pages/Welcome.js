import React from 'react'

export default function Welcome() {
  return (
    <>
        <a href='/list'>BOOKLIST</a>
        <img src="https://atjehwatch.com/wp-content/uploads/2021/02/upin-tak-lagi-botak.jpg"></img>
        <form>
          <label>
            Username:
              <input type="text" name="Username" />
          </label>
          
          <label>
            Password:
              <input type="text" name="Password" />
          </label>

          <input type="submit" value="Submit" />
        </form>
    </>
  )
}
