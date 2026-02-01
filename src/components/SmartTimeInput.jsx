import React, { useState, useEffect } from 'react';

const SmartTimeInput = ({ value, onChange, placeholder, id, onTab }) => {
  const [displayValue, setDisplayValue] = useState(value || '');

  useEffect(() => {
    setDisplayValue(value || '');
  }, [value]);

  const formatTime = (raw) => {
    // Remove non-numeric
    const digits = raw.replace(/\D/g, '');
    
    if (digits.length === 0) return '';
    
    let hours = '';
    let minutes = '00';

    if (digits.length <= 2) {
      hours = digits.padStart(2, '0');
    } else if (digits.length === 3) {
      hours = '0' + digits[0];
      minutes = digits.slice(1);
    } else {
      hours = digits.slice(0, 2);
      minutes = digits.slice(2, 4);
    }

    // Clamp values
    let h = parseInt(hours, 10);
    let m = parseInt(minutes, 10);
    
    if (h > 23) h = 23;
    if (m > 59) m = 59;

    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  const handleBlur = () => {
    const formatted = formatTime(displayValue);
    setDisplayValue(formatted);
    onChange(formatted);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    // Allow typing numbers and colon
    if (/^[0-9:]*$/.test(val)) {
      setDisplayValue(val);
    }
  };

  return (
    <input
      id={id}
      type="text"
      className="input-base"
      style={{ textAlign: 'center', maxWidth: '100px' }}
      placeholder={placeholder}
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleBlur();
        if (e.key === 'Tab' && !e.shiftKey && onTab) {
          e.preventDefault();
          handleBlur(); // Ensure formatting is applied before moving on
          onTab();
        }
      }}
    />
  );
};

export default SmartTimeInput;
