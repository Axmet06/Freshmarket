import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import '../styles/login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (isLogin) {
      // Login logic
      try {
        await login(formData.email, formData.password);
        // Redirect to profile after successful login
        navigate('/profile');
      } catch (err) {
        setError(err.message);
      }
    } else {
      // Registration logic
      // Validation
      if (formData.password.length < 6) {
        setError('Пароль должен содержать минимум 6 символов');
        return;
      }

      try {
        await register(formData.name, formData.email, formData.password);
        setSuccess(true);
        // Reset form
        setFormData({
          email: '',
          password: '',
          name: ''
        });
        // Switch to login tab after successful registration
        setTimeout(() => {
          setIsLogin(true);
          setSuccess(false);
        }, 2000);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="auth-container glass">
          <div className="auth-tabs">
            <button 
              className={`tab-btn ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Вход
            </button>
            <button 
              className={`tab-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Регистрация
            </button>
          </div>

          {success && (
            <div className="success-message">
              Регистрация прошла успешно! Теперь вы можете войти.
            </div>
          )}
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Имя:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Пароль:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary auth-btn">
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {isLogin ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
              <button 
                className="link-btn"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Зарегистрируйтесь' : 'Войдите'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;