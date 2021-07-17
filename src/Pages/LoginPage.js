import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import {Link} from 'react-router-dom'

const SignUp = () =>
{
    return (
        <div></div>
    )
}


function LoginPage()
{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = () =>
    {
    
}
    return (
        <div className="login-container">
            <div className="login__upper-container">
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" className="header-image" />
            <form className="login__form">
                <input placeholder=" Phone number, username, or  email" type="text" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                <input placeholder="Password" type="text" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                <Button onClick={login} >Log In</Button>
            </form>
                <br /><p>or</p><br />
                <p>forgot password ?</p>
          </div>
          
            
            <div className="login__lower-container">
                <p>Don't have an account? <strong><Link to="/signUp">SignUp</Link></strong></p>
          
            </div>  
            
        </div>
    )
}

export default LoginPage;

