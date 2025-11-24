// src/api/authApi.js
// API functions for user authentication using localStorage

// Helper function to hash password (base64 encoding for simplicity)
const hashPassword = (password) => {
  return btoa(password); // Base64 encoding
};

// Helper function to verify password
const verifyPassword = (password, hashedPassword) => {
  return btoa(password) === hashedPassword;
};

// Get all users from localStorage
export const getUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

// Save users to localStorage
export const saveUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

// Get current user from localStorage
export const getCurrentUser = () => {
  const currentUser = localStorage.getItem('currentUser');
  return currentUser ? JSON.parse(currentUser) : null;
};

// Save current user to localStorage
export const saveCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

// Remove current user from localStorage
export const removeCurrentUser = () => {
  localStorage.removeItem('currentUser');
};

// Register a new user
export const registerUser = (name, email, password) => {
  const users = getUsers();
  
  // Check if email is already taken
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    throw new Error('Пользователь с таким email уже существует');
  }
  
  // Create new user with hashed password
  const newUser = {
    id: Date.now(), // Simple ID generation
    name,
    email,
    password: hashPassword(password) // Hash the password
  };
  
  // Save user
  users.push(newUser);
  saveUsers(users);
  
  return newUser;
};

// Login user
export const loginUser = (email, password) => {
  const users = getUsers();
  
  // Find user by email
  const user = users.find(user => user.email === email);
  if (!user) {
    throw new Error('Пользователь с таким email не найден');
  }
  
  // Verify password
  if (!verifyPassword(password, user.password)) {
    throw new Error('Неверный пароль');
  }
  
  // Remove password from user object before returning
  const { password: _, ...userWithoutPassword } = user;
  
  // Save current user
  saveCurrentUser(userWithoutPassword);
  
  return userWithoutPassword;
};

// Logout user
export const logoutUser = () => {
  removeCurrentUser();
};