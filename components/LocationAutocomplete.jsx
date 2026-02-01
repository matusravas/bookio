"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2, Home } from 'lucide-react';

const LocationAutocomplete = ({ value, onChange, placeholder, onSelectCoord, onHomeClick, id, onFocus, onBlur }) => {
  const [query, setQuery] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setQuery(value || '');
    if (!value) setSuggestions([]);
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

  const abortControllerRef = useRef(null);

  const fetchSuggestions = async (searchQuery) => {
    if (!searchQuery || searchQuery.length < 1) {
      setSuggestions([]);
      return;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&countrycodes=sk&limit=5&addressdetails=1`,
        { 
          headers: { 
            'Accept-Language': 'sk',
            'User-Agent': 'BookioRideEvidence/1.0'
          },
          signal: abortControllerRef.current.signal
        }
      );
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      setSuggestions(data);
      setShowDropdown(true);
    } catch (error) {
      if (error.name === 'AbortError') return;
      console.error('Error fetching locations:', error);
      setSuggestions([]);
    } finally {
      if (abortControllerRef.current?.signal.aborted) return;
      setLoading(false);
    }
  };

  // Debounce logic for fetching suggestions
  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      fetchSuggestions(val);
    }, 300); // 300ms delay
  };

  const isSelectingRef = useRef(false);

  const handleSelect = (item) => {
    isSelectingRef.current = true;
    const name = item.display_name.split(',').slice(0, 3).join(',');
    setQuery(name);
    onChange(name);
    setShowDropdown(false);
    if (onSelectCoord) {
      onSelectCoord(name, { lat: item.lat, lon: item.lon });
    }
    setTimeout(() => {
      isSelectingRef.current = false;
    }, 500);
  };

  const handleBlur = (e) => {
    // If the new focus is inside our own component (e.g. clicking a suggestion), don't blur
    if (e.relatedTarget && dropdownRef.current && dropdownRef.current.contains(e.relatedTarget)) {
      return;
    }

    // Call prop onBlur if provided
    if (onBlur) onBlur(e);

    setTimeout(() => {
      if (isSelectingRef.current) return;
      if (query !== value) {
        setQuery(value || '');
      }
      setShowDropdown(false);
    }, 250);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }} ref={dropdownRef}>
      <div style={{ position: 'relative' }}>
        <MapPin size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
        <input
          id={id}
          type="text"
          className="input-base"
          style={{ paddingLeft: '2.2rem', paddingRight: '2.5rem' }}
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={(e) => {
            if (query.length >= 1) setShowDropdown(true);
            if (onFocus) onFocus(e);
          }}
        />
        <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {loading && (
            <Loader2 size={14} className="animate-spin" style={{ color: 'var(--accent-primary)' }} />
          )}
          {!query && onHomeClick && (
            <button
              onClick={onHomeClick}
              className="home-chip"
              style={{
                padding: '4px',
                borderRadius: '6px',
                background: 'rgba(var(--accent-primary-rgb), 0.1)',
                border: '1px solid rgba(var(--accent-primary-rgb), 0.2)',
                color: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Use Home Address"
            >
              <Home size={14} />
            </button>
          )}
          {query && (
            <button
              onClick={() => {
                setQuery('');
                onChange('');
                if (onSelectCoord) onSelectCoord('', null);
                setSuggestions([]);
                setShowDropdown(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
              title="Clear"
            >
              <div style={{ fontSize: '14px', lineHeight: 1, fontWeight: 800 }}>✕</div>
            </button>
          )}
        </div>
      </div>

      {showDropdown && suggestions.length > 0 && (
        <div 
          className="glass" 
          style={{ 
            position: 'absolute', 
            top: '100%', 
            left: 0, 
            right: 0, 
            zIndex: 9999, 
            marginTop: '0.5rem', 
            maxHeight: '200px', 
            overflowY: 'auto',
            padding: '0.5rem',
            background: 'var(--bg-color)',
            borderColor: 'var(--accent-primary)'
          }}
        >
          {suggestions.map((item, index) => (
            <div
              key={index}
              style={{ 
                padding: '0.75rem', 
                cursor: 'pointer', 
                borderRadius: '0.5rem',
                borderBottom: index !== suggestions.length - 1 ? '1px solid var(--border-color)' : 'none'
              }}
              className="suggestion-item"
              onMouseDown={(e) => {
                e.preventDefault(); // Prevent input blur
                handleSelect(item);
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              <div style={{ fontSize: '0.9rem' }}>{item.display_name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationAutocomplete;
