import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';

const LocationAutocomplete = ({ value, onChange, placeholder, onSelectCoord, id }) => {
  const [query, setQuery] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const abortControllerRef = useRef(null);
  const isSelectingRef = useRef(false);
  const isMountedRef = useRef(true);

  // Sync external value changes (only when not caused by user interaction)
  useEffect(() => {
    if (!isSelectingRef.current) {
      setQuery(value || '');
    }
  }, [value]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search effect
  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // If query is empty, clear suggestions immediately
    if (!query || query.length < 1) {
      setSuggestions([]);
      setLoading(false);
      setShowDropdown(false);
      return;
    }

    // Set loading state immediately when user types
    setLoading(true);

    // Debounce the API call
    timeoutRef.current = setTimeout(async () => {
      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=sk&limit=5&addressdetails=1`,
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
        
        // Only update state if component is still mounted
        if (isMountedRef.current) {
          setSuggestions(data);
          if (data.length > 0) {
            setShowDropdown(true);
          }
          setLoading(false);
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          // Request was cancelled, don't update state
          return;
        }
        console.error('Error fetching locations:', error);
        if (isMountedRef.current) {
          setSuggestions([]);
          setShowDropdown(false);
          setLoading(false);
        }
      }
    }, 300); // 300ms debounce

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [query]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    // Don't call onChange here - only call it when a location is selected
  };

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
    }, 100);
  };

  const handleBlur = (e) => {
    // If the new focus is inside our own component (e.g. clicking a suggestion), don't blur
    if (e.relatedTarget && dropdownRef.current.contains(e.relatedTarget)) {
      return;
    }

    setTimeout(() => {
      if (isSelectingRef.current) return;
      // Reset to external value if user didn't select anything
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
          style={{ paddingLeft: '2.2rem' }}
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={() => query.length >= 1 && setShowDropdown(true)}
        />
        {loading && (
          <Loader2 size={14} className="animate-spin" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-primary)' }} />
        )}
      </div>

      {showDropdown && suggestions.length > 0 && (
        <div 
          className="glass" 
          style={{ 
            position: 'absolute', 
            top: '100%', 
            left: 0, 
            right: 0, 
            zIndex: 100, 
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
