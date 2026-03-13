import { useState, useEffect } from 'react';
import { Search as SearchIcon, Star, User, Hash, Box } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

interface Skill {
  id: string;
  name: string;
  description: string;
  author: string;
  tags: string[];
  rating: number;
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSkills = async (searchQuery: string = '') => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/skills?query=${encodeURIComponent(searchQuery)}`);
      setSkills(response.data);
      setError('');
    } catch (err: any) {
      console.error(err);
      setError('Failed to fetch agent skills.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSkills(query);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="search-page-wrapper"
    >
      <div className="page-header">
        <h1>Discover Agent Skills</h1>
        <p>Find the perfect autonomous agent skill to automate your workflow, analyze data, and build the future.</p>
      </div>

      <form onSubmit={handleSearch} className="search-container">
        <div className="search-input-wrapper">
          <SearchIcon size={20} className="search-icon" />
          <input 
            type="text" 
            className="glass-input" 
            placeholder="Search by skill name, description, author, or tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button type="submit" className="glass-button primary search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message" style={{textAlign: 'center'}}>{error}</div>}

      <div className="skills-grid">
        <AnimatePresence>
          {skills.map((skill, index) => (
            <motion.div 
              key={skill.id}
              className="glass-panel skill-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="skill-header">
                <div>
                  <h3 className="skill-title">{skill.name}</h3>
                  <div className="skill-author">
                    <User size={14} /> {skill.author}
                  </div>
                </div>
                <div className="skill-rating">
                  <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
                  {skill.rating > 0 ? skill.rating.toFixed(1) : 'New'}
                </div>
              </div>
              
              <div className="skill-description">
                {skill.description}
              </div>
              
              <div className="skill-tags">
                {skill.tags.map(tag => (
                  <span key={tag} className="tag">
                    <Hash size={10} style={{display: 'inline', marginRight: 2}}/>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="skill-footer">
                <button className="glass-button" style={{padding: '6px 12px', fontSize: '0.85rem'}}>
                  <Box size={14} /> View Details
                </button>
                <button className="glass-button primary" style={{padding: '6px 12px', fontSize: '0.85rem'}}>
                  Add Skill
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!isLoading && skills.length === 0 && (
        <motion.div 
          className="empty-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <SearchIcon size={48} />
          <h3>No skills found</h3>
          <p>We couldn't find any agent skills matching "{query}"</p>
        </motion.div>
      )}
    </motion.div>
  );
}
