// src/pages/Profile.jsx
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!currentUser) {
    return (
      <div className="login-page">
        <div className="container">
          <div className="auth-container glass">
            <h2>Профиль</h2>
            <p>Пользователь не авторизован</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="container">
        <div className="auth-container glass">
          <h2>Профиль пользователя</h2>
          
          <div className="profile-info">
            <div className="form-group">
              <label>Имя:</label>
              <div className="profile-value">{currentUser.name}</div>
            </div>
            
            <div className="form-group">
              <label>Email:</label>
              <div className="profile-value">{currentUser.email}</div>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="btn btn-secondary auth-btn"
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;