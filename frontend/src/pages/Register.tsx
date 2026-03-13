import { useState } from 'react';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/api/register', formData);
      setSuccess('Account created successfully! Welcome to AgentHub.');
      setFormData({ username: '', email: '', password: '' });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="auth-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-panel auth-card">
        <h2>Join AgentHub</h2>
        <p>Unlock the power of autonomous AI skills</p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="search-input-wrapper">
              <User size={18} className="search-icon" />
              <input 
                type="text" 
                id="username"
                name="username"
                className="glass-input" 
                placeholder="eg. ai_engineer_42"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="search-input-wrapper">
              <Mail size={18} className="search-icon" />
              <input 
                type="email" 
                id="email"
                name="email"
                className="glass-input" 
                placeholder="hello@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="search-input-wrapper">
              <Lock size={18} className="search-icon" />
              <input 
                type="password" 
                id="password"
                name="password"
                className="glass-input" 
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="glass-button primary auth-submit"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
