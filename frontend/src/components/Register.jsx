import axios from 'axios'
import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { styles } from './styles'


const Register = ({setShouldShowRegister,myStorage,setCurrentUser}) => {


  const [success,setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()


  const submit = async(e) => {

    e.preventDefault()

    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    try{
      const res = await axios.post('https://prod-mapapp-1.onrender.com/api/users/register',newUser)  
      console.log(res)
      setError(false)
      setSuccess(true)
      myStorage.setItem('user',res.data.username)
      setCurrentUser(res.data.username)
      setTimeout(() => {
        setShouldShowRegister(false)
      }, 1000);     
    }
    catch(err){
        setError(true)
    }

  }


  return (
    <div className={styles.mainDiv}>

      <div className={`${styles.subDiv} w-[300px] h-[400px]`}  >

        <div className={styles.subSubDiv}>
          <h1 className={styles.title}>Sign Up</h1>
          <form onSubmit={submit} className={styles.form}>
            <input ref={nameRef} className={styles.inputBox} type='text' placeholder='username'></input>
            <input ref={emailRef} className={styles.inputBox} type='email' placeholder='email'></input>
            <input ref={passwordRef} className={styles.inputBox} type='password' placeholder='password'></input>
            <button className={styles.button}>REGISTER</button>
            {success && <span className='text-[12px] text-green-500 '>Successfully Registered</span>}            
            {error && <span className='text-[12px] text-red-500 '>Something's Wrong!</span>}
          </form>
          <div onClick={()=>setShouldShowRegister(false)} className={styles.closeButton}>x</div>      
        </div>
      
      </div>

    </div>
  )
}

export default Register
