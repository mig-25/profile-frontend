import React from 'react'
import axios from 'axios'

class RegisterOrLogin extends React.Component {
  state = {
    email: '',
    password: '',
    mode: 'login',
  }

  handleChange = (event) => {
    // console.log(
    //   'RegisterOrLogin.handleChange event.target.name',
    //   event.target.name
    // )
    // console.log(
    //   'RegisterOrLogin.handleChange event.target.value',
    //   event.target.value
    // )

    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    console.log('RegisterOrLogin.handleSubmit')
    //Sign the user up with backend Strapi

    const { email, password, mode } = this.state

    const data = {
      email,
      password,
      username: email,
      identifier: email,
    }

    // const userCreationRes = await axios({
    //   method: 'POST',
    //   url: 'http://localhost:1337/auth/local/register',
    //   data,
    // })

    let url = ''
    if (mode === 'login') {
      url = 'http://localhost:1337/auth/local'
    }
    if (mode === 'signup') {
      url = 'http://localhost:1337/auth/local/register'
    }

    const userCreationRes = await axios({
      method: 'POST',
      url,
      data,
    })

    console.log('RegisterOrLogin.handleSubmit userCreationRes', userCreationRes)
    //if the following is true, then the user will be saved and moved to the Profile page
    if (this.props.updateUser && typeof this.props.updateUser === 'function') {
      this.props.updateUser(userCreationRes.data)
    }
  }

  render() {
    const { email, password, mode } = this.state
    return (
      <div className='RegisterOrLogin'>
        <h1>{mode}</h1>
        <form action='' onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              name='email'
              id='email'
              value={email}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={this.handleChange}
            />
          </div>
          <button type='submit'>{mode}</button>
        </form>
      </div>
    )
  }
}

export default RegisterOrLogin
