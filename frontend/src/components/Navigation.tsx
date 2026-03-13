import { Link, useLocation } from 'react-router-dom';
import { Bot, Search, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navigation() {
  const location = useLocation();

  return (
    <header className="nav-header">
      <Link to="/" className="logo">
        <Bot size={28} />
        <span>AgentHub</span>
      </Link>
      
      <nav className="nav-links">
        <Link 
          to="/" 
          className={`glass-button ${location.pathname === '/' ? 'primary' : ''}`}
        >
          <Search size={18} />
          Explore Skills
        </Link>
        <Link 
          to="/register" 
          className={`glass-button ${location.pathname === '/register' ? 'primary' : ''}`}
        >
          <UserPlus size={18} />
          Register
        </Link>
      </nav>
    </header>
  );
}
