import axios from 'axios'
import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { styles } from './styles'


const Login = ({setShouldShowLogin,myStorage,setCurrentUser,setShouldShowRegister}) => {


  const [error, setError] = useState(false)

  const nameRef = useRef()
  const passwordRef = useRef()


  const submit = async(e) => {

    e.preventDefault()
    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value
    }

    try{
      const res = await axios.post('https://prod-mapapp-1.onrender.com/api/users/login',user)
      console.log(res)
      myStorage.setItem('user',res.data.username)                     
      setCurrentUser(res.data.username)
      setShouldShowLogin(false)
      setError(false)
    }
    catch(err){
        setError(true)
    }

  }


  const handleLoginClose = () => {
    setShouldShowLogin(false);
  };
  
  const handleRegisterClick = () => {
    setShouldShowRegister(true);
    setShouldShowLogin(false);
  };
  
  return (
    <div className={styles.mainDiv}>
      <div className={`${styles.subDiv} w-[250px] h-[350px]`}>
        <div className={styles.subSubDiv}>
          <h1 className={styles.title}>Sign In</h1>
          <form onSubmit={submit} className={styles.form}>
            <input ref={nameRef} className={styles.inputBox} type='text' placeholder='username' />
            <input ref={passwordRef} className={styles.inputBox} type='password' placeholder='password' />
            <button className={styles.button}>Login</button>
            {error && <span className='text-[10px] text-red-500 '>Incorrect Username or Password</span>}
          </form>
          <div onClick={handleLoginClose} className={styles.closeButton}>x</div>      
          <div onClick={handleRegisterClick} className={styles.altLogin}>Don't have an Account? Sign Up</div>
        </div>
      </div>
    </div>
  );
  
}

export default Login
