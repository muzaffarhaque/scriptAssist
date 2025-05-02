import React, { useEffect } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
export default function InputsBox({classes='',label='',onChange=()=>{},value='',error=""}) {
  const [showPassword, setShowPassword] = React.useState(true);
  const [password, setPassword] = React.useState(value);
  const changeHandler = (e) => {
    setPassword(e.target.value);
    onChange(e.target.value);
  }
  useEffect(() => {
    setPassword(value);
  }, [value])
  return (
    <div className={`password-input-frame  ${classes}`}>
    <label htmlFor="userName">{label}</label>
    <div className="input-box-wrapper">
      <input onChange={changeHandler} type={showPassword ?"password":'text'} value={password}  name="user" id="userName" placeholder="" />
      {showPassword ?  <FaEye className='eye-icon' onClick={()=>setShowPassword(false)} />  : <FaEyeSlash onClick={()=>setShowPassword(true)} className='eye-icon' /> }
    </div>
    {error && <span className="error-message">{error}</span>}
  </div>
  )
}
