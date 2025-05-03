import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface InputsBoxProps {
  classes?: string;
  label?: string;
  onChange?: (value: string) => void;
  value?: string;
  error?: string;
}

export default function InputsBox({
  classes = '',
  label = '',
  onChange = () => {},
  value = '',
  error = ''
}: InputsBoxProps): JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [password, setPassword] = useState<string>(value);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    onChange(e.target.value);
  };

  useEffect(() => {
    setPassword(value);
  }, [value]);

  return (
    <div className={`password-input-frame ${classes}`}>
      <label htmlFor="userName">{label}</label>
      <div className="input-box-wrapper">
        <input
          onChange={changeHandler}
          type={showPassword ? 'password' : 'text'}
          value={password}
          name="user"
          id="userName"
          placeholder=""
        />
        {showPassword ? (
          <FaEye className="eye-icon" onClick={() => setShowPassword(false)} />
        ) : (
          <FaEyeSlash className="eye-icon" onClick={() => setShowPassword(true)} />
        )}
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}
