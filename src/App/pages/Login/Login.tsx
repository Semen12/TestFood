import { observer, useLocalStore } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@components/Button';
import { ErrorMessage } from '@components/ErrorMessage';
import { useAuth } from '@context/UseAuthContext';
import { Meta } from '@store/types';
import styles from './Login.module.scss';
import Input from '@components/Input';
import EyeIcon  from '@assets/eye.svg?react';
import EyeOffIcon  from '@assets/eye-off.svg?react';

const Login = observer(() => {
  const authStore = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    password: '',
    email: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'password':
        if (value.trim().length < 3) {
          return 'Пароль должен быть не менее 3 символов';
        }
        break;
      case 'email':
        if (!value.trim()) {
          return 'Email обязателен';
        }
        break;
    }
    return '';
  };

  const handleInputChange = (value: string, name: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await authStore.login(formData);
    if (authStore.isAuthenticated) {
      navigate('/profile');
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const isFormValid = formData.email.trim() !== '' && 
                     formData.password.trim().length >= 3 && 
                     !Object.values(errors).some(error => error !== '');

  return (
    <div className={styles.login}>
      <div className={styles.login__container}>
        <div className={styles.login__content}>
          <h1 className={styles.login__title}>Вход</h1>

          <form className={styles.login__form} onSubmit={handleSubmit} autoComplete='off'>
            <div className={styles.input_wrapper}>
              <Input
                className={styles.login__input}
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={(value) => handleInputChange(value, 'email')}
              />
              {errors.email && <p className={styles.error_text}>{errors.email}</p>}
            </div>
            
            <div className={styles.input_wrapper}>
              <div className={styles.login__passwordWrapper}>
                <Input
                  className={styles.login__input}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={(value) => handleInputChange(value, 'password')}
              /> 
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.passwordToggle}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button> 
              </div>
              {errors.password && <p className={styles.error_text}>{errors.password}</p>}
            </div>
            {authStore.meta === Meta.error && <ErrorMessage title="Ошибка входа" message={authStore.errorMessage} />}
            <Button 
              type="submit" 
              className={styles.login__button}
              disabled={!isFormValid}
            >
              Войти
            </Button>
          </form>
          <p className={styles.login__footer}>
            Уже есть аккаунт?
            <Link className={styles.login__link} to="/register">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
});

export default Login;