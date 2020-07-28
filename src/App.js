import React from 'react'
import './App.css'

import RegisterOrLogin from './components/RegisterOrLogin'
import ProfilePage from './components/ProfilePage'

class App extends React.Component {
  state = {
    user: null,
  }

  render() {
    const { user } = this.state
    return (
      <div className='App'>
        App
        {!user && (
          <RegisterOrLogin updateUser={(user) => this.setState({ user })} />
        )}
        {user && (
          <div>
            <ProfilePage user={user} />
          </div>
        )}
      </div>
    )
  }
}

export default App
