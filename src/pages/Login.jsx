import { useState } from 'react';
import '../styles/login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Вход:', formData);
      // Здесь будет логика входа через Supabase
    } else {
      console.log('Регистрация:', formData);
      // Здесь будет логика регистрации через Supabase
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