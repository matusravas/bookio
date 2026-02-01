import React, { useState, useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';

const SimpleAutocomplete = ({ value, onChange, placeholder, suggestions = [], onFocus, onBlur, onSaveNew }) => {
  const [query, setQuery] = useState(value || '');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    onChange(val);

    if (val.trim()) {
      const filtered = suggestions.filter(s => 
        s.toLowerCase().includes(val.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowDropdown(true);
    } else {
      setFilteredSuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleFocus = (e) => {
    if (onFocus) onFocus(e);
    if (query.trim()) {
       const filtered = suggestions.filter(s => 
        s.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowDropdown(true);
    } else {
       // Show all suggestions if query is empty (optional, but "offer stored" might imply showing recent/all)
       // Let's show all unique history if empty
       setFilteredSuggestions(suggestions);
       setShowDropdown(true);
    }
  };

  const handleSelect = (item) => {
    setQuery(item);
    onChange(item);
    setShowDropdown(false);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }} ref={dropdownRef}>
      <input
        type="text"
        className="input-base"
        style={{ padding: '0.45rem 0.6rem', fontSize: '0.8rem' }}
        value={query}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={(e) => {
           if (onBlur) onBlur(e);
           setTimeout(() => setShowDropdown(false), 200);
        }}
        placeholder={placeholder}
      />
      
      {onSaveNew && query && !suggestions.includes(query) && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSaveNew(query);
          }}
          className="glass"
          style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: '4px',
            padding: '2px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--success)',
            zIndex: 10
          }}
          title="Save to list"
        >
          <Plus size={14} />
        </button>
      )}

      {showDropdown && filteredSuggestions.length > 0 && (
        <div 
          className="glass"
          style={{ 
            position: 'absolute', 
            top: '100%', 
            left: 0, 
            right: 0, 
            zIndex: 9999, 
            marginTop: '0.5rem', 
            maxHeight: '150px', 
            overflowY: 'auto',
            padding: '0.5rem',
            background: 'var(--bg-color)',
            borderColor: 'var(--accent-primary)'
          }}
        >
          {filteredSuggestions.map((item, index) => (
            <div
              key={index}
              style={{ 
                padding: '0.5rem', 
                cursor: 'pointer', 
                borderRadius: '0.25rem',
                fontSize: '0.8rem',
                borderBottom: index !== filteredSuggestions.length - 1 ? '1px solid var(--border-color)' : 'none'
              }}
              onMouseDown={(e) => {
                e.preventDefault(); 
                handleSelect(item);
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimpleAutocomplete;
