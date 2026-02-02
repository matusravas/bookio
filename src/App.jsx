import React, { useState, useEffect, useMemo, useRef } from 'react';
import { format, addMonths, subMonths, endOfMonth, startOfMonth, eachDayOfInterval } from 'date-fns';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Download, 
  Car, 
  MapPin, 
  Calendar as CalendarIcon,
  ArrowRightLeft,
  RefreshCw,
  Gauge,
  Home
} from 'lucide-react';
import SmartTimeInput from './components/SmartTimeInput';
import LocationAutocomplete from './components/LocationAutocomplete';

const App = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [activeDay, setActiveDay] = useState(new Date().getDate());
  const [allMonthsData, setAllMonthsData] = useState({}); // { '2026-02': { rides: {}, kmStartOfMonth: 0 } }
  const [kmStartOfMonth, setKmStartOfMonth] = useState(0);
  const [rides, setRides] = useState({}); // { [day]: [ride1, ride2] }
  const [returnSuggestion, setReturnSuggestion] = useState(null); // { day, rideId }
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
  const [homeLocation, setHomeLocation] = useState({ name: '', coords: null }); // User's home location
  const [isEditingHome, setIsEditingHome] = useState(false);
  const calendarRef = useRef(null);

  const currentMonthKey = format(currentMonth, 'yyyy-MM');

  // Load from Server on mount
  useEffect(() => {
    const loadFromServer = async () => {
      try {
        const response = await fetch('/api/data');
        if (response.ok) {
          const serverData = await response.json();
          const months = serverData.months || {};
          setAllMonthsData(months);
          
          // Load home location
          if (serverData.homeLocation) {
            setHomeLocation(serverData.homeLocation);
          }
          
          // Initial load for current month
          const currentData = months[currentMonthKey];
          if (currentData) {
            setRides(currentData.rides || {});
            setKmStartOfMonth(currentData.kmStartOfMonth || 0);
          }
        }
      } catch (e) {
        console.error('Backend load failed:', e);
      } finally {
        setIsInitialLoadComplete(true);
      }
    };
    loadFromServer();
  }, []);

  // Switch month data
  useEffect(() => {
    const monthData = allMonthsData[currentMonthKey];
    if (monthData) {
      setRides(monthData.rides || {});
      setKmStartOfMonth(monthData.kmStartOfMonth || 0);
    } else {
      // If no data for this month, try to chain from previous month
      const monthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
      const prevMonthKey = format(subMonths(monthDate, 1), 'yyyy-MM');
      const prevMonthData = allMonthsData[prevMonthKey];
      
      let inheritedKm = 0;
      if (prevMonthData) {
        // Favor stored kmEndOfMonth if it exists
        if (prevMonthData.kmEndOfMonth !== undefined) {
          inheritedKm = prevMonthData.kmEndOfMonth;
        } else {
          // Fallback to manual calculation
          const prevRides = prevMonthData.rides || {};
          const prevKmStart = prevMonthData.kmStartOfMonth || 0;
          let runningKm = prevKmStart;
          
          const flatPrevRides = [];
          Object.keys(prevRides).forEach(day => {
            prevRides[day].forEach(r => flatPrevRides.push({ ...r, day: parseInt(day) }));
          });
          flatPrevRides.sort((a,b) => (a.day !== b.day ? a.day - b.day : (a.from || '').localeCompare(b.from || '')));
          flatPrevRides.forEach(r => runningKm += (parseFloat(r.distanceKm) || 0));
          inheritedKm = runningKm;
        }
      }

      setRides({});
      setKmStartOfMonth(inheritedKm);
    }
  }, [currentMonthKey, allMonthsData]);

  // Save to Server on change
  useEffect(() => {
    const saveToServer = async () => {
      try {
        // Calculate current month total
        let monthRidesTotal = 0;
        Object.values(rides).forEach(dayArr => {
          dayArr.forEach(r => monthRidesTotal += (parseFloat(r.distanceKm) || 0));
        });
        const kmEndOfMonth = kmStartOfMonth + monthRidesTotal;

        const updatedAllMonths = {
          ...allMonthsData,
          [currentMonthKey]: { rides, kmStartOfMonth, kmEndOfMonth }
        };
        
        await fetch('/api/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ months: updatedAllMonths, homeLocation })
        });
        
        // Update local cache to allow seamless month switching without reload
        setAllMonthsData(updatedAllMonths);
      } catch (e) {
        console.error('Failed to sync to disk:', e);
      }
    };

    // Only save if it's the current month, initial load is done, and we have active state
    if (currentMonthKey && isInitialLoadComplete) {
      saveToServer();
    }
  }, [rides, kmStartOfMonth, currentMonthKey, isInitialLoadComplete, homeLocation]);

  // Click outside to close calendar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
      // Close home location editing if clicking outside
      if (isEditingHome && !event.target.closest('#home-location')) {
        setIsEditingHome(false);
      }
    };
    if (isCalendarOpen || isEditingHome) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCalendarOpen, isEditingHome]);

  // Calculate Distance & Duration via OSRM with optional waypoints
  const fetchRouteInfo = async (coordsA, coordsB, waypoints = []) => {
    if (!coordsA || !coordsB) return { distance: 0, duration: 0 };
    try {
      // Build coordinate string: start, waypoints, end
      const validWaypoints = waypoints.filter(w => w.coords);
      const coordsString = [
        `${coordsA.lon},${coordsA.lat}`,
        ...validWaypoints.map(w => `${w.coords.lon},${w.coords.lat}`),
        `${coordsB.lon},${coordsB.lat}`
      ].join(';');
      
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${coordsString}?overview=false`
      );
      const data = await response.json();
      if (data.routes && data.routes[0]) {
        return {
          distance: Math.round(data.routes[0].distance / 1000 * 10) / 10,
          duration: Math.round(data.routes[0].duration / 60) // minutes
        };
      }
    } catch (error) {
      console.error('Error fetching route:', error);
    }
    return { distance: 0, duration: 0 };
  };

  const addMinutesToTime = (timeStr, minutes) => {
    if (!timeStr || !timeStr.includes(':')) return '';
    const [h, m] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(h);
    date.setMinutes(m + minutes);
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  // KM Chaining Logic
  const allRidesSorted = useMemo(() => {
    const flatRides = [];
    Object.keys(rides).forEach(day => {
      rides[day].forEach(ride => {
        flatRides.push({ ...ride, day: parseInt(day, 10) });
      });
    });

    // Sort by day, then by "from" time, then by ID (stable insertion order)
    return flatRides.sort((a, b) => {
      if (a.day !== b.day) return a.day - b.day;
      const timeCompare = (a.from || '00:00').localeCompare(b.from || '00:00');
      if (timeCompare !== 0) return timeCompare;
      return a.id - b.id;
    });
  }, [rides]);

  const chainedRidesMap = useMemo(() => {
    let currentKm = parseFloat(kmStartOfMonth) || 0;
    const map = {};

    allRidesSorted.forEach(ride => {
      const kmBefore = currentKm;
      const kmAfter = kmBefore + (parseFloat(ride.distanceKm) || 0);
      currentKm = kmAfter;

      if (!map[ride.day]) map[ride.day] = [];
      map[ride.day].push({ ...ride, kmBefore, kmAfter });
    });

    return map;
  }, [allRidesSorted, kmStartOfMonth]);

  const addRide = (day) => {
    const newRide = { 
      id: Date.now(), 
      from: '', 
      to: '', 
      pointA: homeLocation.name || '', // Use home location as default
      pointB: '', 
      waypoints: [], // Array of { id, name, coords }
      distanceKm: 0,
      coordsA: homeLocation.coords || null, // Use home coords as default
      coordsB: null
    };
    setRides(prev => ({
      ...prev,
      [day]: [...(prev[day] || []), newRide]
    }));
  };

  const updateRide = async (day, id, field, value, coords = null) => {
    // 1. Prepare the updated fields
    let updates = { [field]: value };
    
    // 2. Fetch external data if needed (OSRM)
    const currentDayRides = rides[day] || [];
    const rideIndex = currentDayRides.findIndex(r => r.id === id);
    if (rideIndex === -1) return;
    const currentRide = currentDayRides[rideIndex];

    if (coords) {
      if (field === 'pointA') updates.coordsA = coords;
      if (field === 'pointB') updates.coordsB = coords;
      
      const cA = field === 'pointA' ? coords : currentRide.coordsA;
      const cB = field === 'pointB' ? coords : currentRide.coordsB;

      if (cA && cB) {
        const waypoints = currentRide.waypoints || [];
        const { distance, duration } = await fetchRouteInfo(cA, cB, waypoints);
        updates.distanceKm = distance;
        
        const startTime = field === 'from' ? value : currentRide.from;
        if (startTime) {
          updates.to = addMinutesToTime(startTime, duration);
        }
        setReturnSuggestion({ day, rideId: id });
      }
    } else if (field === 'from') {
      if (currentRide.coordsA && currentRide.coordsB) {
        const waypoints = currentRide.waypoints || [];
        const { duration } = await fetchRouteInfo(currentRide.coordsA, currentRide.coordsB, waypoints);
        updates.to = addMinutesToTime(value, duration);
      }
    }

    // 3. Apply updates functionally
    setRides(prev => {
      const prevDayRides = [...(prev[day] || [])];
      const idx = prevDayRides.findIndex(r => r.id === id);
      if (idx === -1) return prev;

      prevDayRides[idx] = { ...prevDayRides[idx], ...updates };
      return { ...prev, [day]: prevDayRides };
    });
  };

  const addWaypoint = (day, rideId) => {
    setRides(prev => {
      const prevDayRides = [...(prev[day] || [])];
      const idx = prevDayRides.findIndex(r => r.id === rideId);
      if (idx === -1) return prev;

      const ride = prevDayRides[idx];
      const newWaypoint = { id: Date.now(), name: '', coords: null };
      prevDayRides[idx] = { 
        ...ride, 
        waypoints: [...(ride.waypoints || []), newWaypoint] 
      };
      return { ...prev, [day]: prevDayRides };
    });
  };

  const removeWaypoint = async (day, rideId, waypointId) => {
    const currentDayRides = rides[day] || [];
    const rideIndex = currentDayRides.findIndex(r => r.id === rideId);
    if (rideIndex === -1) return;
    const currentRide = currentDayRides[rideIndex];

    // Remove waypoint and recompute route
    const newWaypoints = (currentRide.waypoints || []).filter(w => w.id !== waypointId);
    
    let updates = { waypoints: newWaypoints };
    
    // Recompute route if we have start and end points
    if (currentRide.coordsA && currentRide.coordsB) {
      const { distance, duration } = await fetchRouteInfo(
        currentRide.coordsA, 
        currentRide.coordsB, 
        newWaypoints
      );
      updates.distanceKm = distance;
      if (currentRide.from) {
        updates.to = addMinutesToTime(currentRide.from, duration);
      }
    }

    setRides(prev => {
      const prevDayRides = [...(prev[day] || [])];
      const idx = prevDayRides.findIndex(r => r.id === rideId);
      if (idx === -1) return prev;

      prevDayRides[idx] = { ...prevDayRides[idx], ...updates };
      return { ...prev, [day]: prevDayRides };
    });
  };

  const updateWaypoint = async (day, rideId, waypointId, name, coords) => {
    const currentDayRides = rides[day] || [];
    const rideIndex = currentDayRides.findIndex(r => r.id === rideId);
    if (rideIndex === -1) return;
    const currentRide = currentDayRides[rideIndex];

    // Update waypoint
    const newWaypoints = (currentRide.waypoints || []).map(w => 
      w.id === waypointId ? { ...w, name, coords } : w
    );
    
    let updates = { waypoints: newWaypoints };
    
    // Recompute route if we have start and end points
    if (currentRide.coordsA && currentRide.coordsB) {
      const { distance, duration } = await fetchRouteInfo(
        currentRide.coordsA, 
        currentRide.coordsB, 
        newWaypoints
      );
      updates.distanceKm = distance;
      if (currentRide.from) {
        updates.to = addMinutesToTime(currentRide.from, duration);
      }
    }

    setRides(prev => {
      const prevDayRides = [...(prev[day] || [])];
      const idx = prevDayRides.findIndex(r => r.id === rideId);
      if (idx === -1) return prev;

      prevDayRides[idx] = { ...prevDayRides[idx], ...updates };
      return { ...prev, [day]: prevDayRides };
    });
  };

  const handleSuggestReturn = (ride) => {
    const dayRides = [...(rides[activeDay] || [])];
    const index = dayRides.findIndex(r => r.id === ride.id);
    
    const returnRide = {
      id: Date.now() + 1,
      from: ride.to || '', // Use end time of current as start of return
      to: '',
      pointA: ride.pointB,
      pointB: ride.pointA,
      coordsA: ride.coordsB,
      coordsB: ride.coordsA,
      distanceKm: ride.distanceKm
    };

    if (index !== -1) {
      dayRides.splice(index + 1, 0, returnRide);
    } else {
      dayRides.push(returnRide);
    }

    setRides(prev => ({
      ...prev,
      [activeDay]: dayRides
    }));
    setReturnSuggestion(null);
  };

  const deleteRide = (day, id) => {
    setRides(prev => ({
      ...prev,
      [day]: (prev[day] || []).filter(ride => ride.id !== id)
    }));
  };

  const exportCSV = () => {
    const monthStr = format(currentMonth, 'yyyy-MM');
    let csv = 'Month,Day,From,To,Point A,Point B,Distance (km),KM Before,KM After\n';
    
    allRidesSorted.forEach(ride => {
      const chained = (chainedRidesMap[ride.day] || []).find(r => r.id === ride.id);
      csv += `${monthStr},${ride.day},"${ride.from}","${ride.to}","${ride.pointA}","${ride.pointB}",${ride.distanceKm},${chained?.kmBefore.toFixed(1)},${chained?.kmAfter.toFixed(1)}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `rides_detailed_${monthStr}.csv`);
    link.click();
  };

  const lastDay = endOfMonth(currentMonth).getDate();
  const daysArray = Array.from({ length: lastDay }, (_, i) => i + 1);

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '5rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <h1 className="gradient-text" style={{ fontSize: '2rem' }}>Ride Evidence</h1>
            
            {/* Home Location Setting */}
            <div 
              id="home-location" 
              className="glass" 
              style={{ 
                padding: '0.6rem 1rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                minWidth: '250px',
                borderColor: isEditingHome ? 'var(--accent-primary)' : 'var(--border-color)',
                transition: 'all 0.3s',
                cursor: !isEditingHome ? 'pointer' : 'default'
              }}
              onClick={() => !isEditingHome && setIsEditingHome(true)}
            >
              <Home size={18} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
              {!isEditingHome ? (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ 
                    fontSize: '0.9rem', 
                    color: homeLocation.name ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: homeLocation.name ? 600 : 400,
                    opacity: homeLocation.name ? 1 : 0.7
                  }}>
                    {homeLocation.name || '🏠 Click to set home'}
                  </span>
                </div>
              ) : (
                <div style={{ flex: 1 }} onClick={(e) => e.stopPropagation()}>
                  <LocationAutocomplete 
                    id="home-location-input"
                    value={homeLocation.name} 
                    onChange={(val) => setHomeLocation({ ...homeLocation, name: val })}
                    onSelectCoord={(name, coords) => {
                      setHomeLocation({ name, coords });
                      setIsEditingHome(false);
                    }}
                    placeholder="Search home location..."
                  />
                </div>
              )}
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="glass" style={{ padding: '0.4rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Gauge size={16} style={{ color: 'var(--accent-primary)' }} />
              <input 
                type="text" 
                inputMode="decimal"
                className="input-base" 
                style={{ width: '80px', border: 'none', background: 'transparent', padding: '0.25rem', fontSize: '1rem', fontWeight: 600 }}
                value={kmStartOfMonth === 0 ? '' : kmStartOfMonth}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9.]/g, '');
                  if (val === '' || val === '.') {
                    setKmStartOfMonth(0);
                  } else {
                    const parsed = parseFloat(val) || 0;
                    setKmStartOfMonth(parsed);
                  }
                }}
                placeholder="0"
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>km</span>
            </div>
            <button className="primary" onClick={exportCSV}>
              <Download size={18} /> Export
            </button>
          </div>
        </div>

        <div className="calendar-popover-container" ref={calendarRef}>
          <div 
            className="glass" 
            style={{ 
              padding: '1rem', 
              marginBottom: '1.5rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem', 
              cursor: 'pointer',
              borderColor: isCalendarOpen ? 'var(--accent-primary)' : 'var(--border-color)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          >
            <button className="secondary" style={{ padding: '0.4rem' }} onClick={(e) => { e.stopPropagation(); setCurrentMonth(subMonths(currentMonth, 1)); setActiveDay(1); }}>
              <ChevronLeft size={20} />
            </button>
            <div style={{ flex: 1, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <CalendarIcon size={18} style={{ color: isCalendarOpen ? 'var(--accent-primary)' : 'var(--text-secondary)' }} />
              <h2 style={{ fontSize: '1.2rem', transition: 'color 0.3s' }}>
                {format(currentMonth, 'MMMM yyyy')}
              </h2>
            </div>
            <button className="secondary" style={{ padding: '0.4rem' }} onClick={(e) => { e.stopPropagation(); setCurrentMonth(addMonths(currentMonth, 1)); setActiveDay(1); }}>
              <ChevronRight size={20} />
            </button>
          </div>

          {isCalendarOpen && (
            <div className="calendar-popover">
              <div className="calendar-header-days">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <div key={day} className="calendar-header-day">{day}</div>
                ))}
              </div>

              <div className="calendar-grid">
                {/* Adjust getDay() (0=Sun, 1=Mon...) to Mon-start (0=Mon, 1=Tue...6=Sun) */}
                {Array.from({ length: (startOfMonth(currentMonth).getDay() + 6) % 7 }).map((_, i) => (
                  <div key={`empty-${i}`} style={{ background: 'transparent', border: 'none' }} />
                ))}
                
                {daysArray.map(day => {
                  const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                  const dayName = format(date, 'EEE');
                  return (
                    <div 
                      key={day} 
                      className={`day-cell ${day === activeDay ? 'active' : ''} ${rides[day]?.length > 0 ? 'has-data' : ''}`}
                      onClick={() => { 
                        setActiveDay(day); 
                        setReturnSuggestion(null); 
                        setIsCalendarOpen(false);
                      }}
                    >
                      <span className="day-name">{dayName}</span>
                      <span className="day-number">{day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </header>

      <main>
        <div className="glass animate-fade-in" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ background: 'var(--accent-primary)', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {activeDay}
              </span>
              {format(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), activeDay), 'EEEE, MMMM do')}
            </h3>
            <button className="secondary" onClick={() => addRide(activeDay)} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Plus size={18} /> Add Ride
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {(!rides[activeDay] || rides[activeDay].length === 0) && (
              <div style={{ textAlign: 'center', padding: '3rem', opacity: 0.5 }}>
                <Car size={48} style={{ margin: '0 auto 1rem' }} />
                <p>No rides for this day. Click "Add Ride" to begin.</p>
              </div>
            )}

            {(chainedRidesMap[activeDay] || []).map((ride) => (
              <div key={ride.id} className="animate-fade-in" style={{ 
                background: 'rgba(255,255,255,0.02)',
                padding: '1.5rem',
                borderRadius: '1.5rem',
                border: '1px solid var(--border-color)',
                position: 'relative'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 120px 1fr 1fr auto', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 700 }}>FROM</label>
                    <SmartTimeInput 
                      id={`from-${ride.id}`}
                      value={ride.from} 
                      onChange={(val) => updateRide(activeDay, ride.id, 'from', val)} 
                      onTab={() => document.getElementById(`pointA-${ride.id}`)?.focus()}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 700 }}>TO</label>
                    <SmartTimeInput 
                      id={`to-${ride.id}`}
                      value={ride.to} 
                      onChange={(val) => updateRide(activeDay, ride.id, 'to', val)} 
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 700 }}>START POINT</label>
                    <LocationAutocomplete 
                      id={`pointA-${ride.id}`}
                      value={ride.pointA} 
                      onChange={(val) => updateRide(activeDay, ride.id, 'pointA', val)}
                      onSelectCoord={(name, coords) => updateRide(activeDay, ride.id, 'pointA', name, coords)}
                      placeholder="Search location..."
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 700 }}>END POINT</label>
                    <LocationAutocomplete 
                      id={`pointB-${ride.id}`}
                      value={ride.pointB} 
                      onChange={(val) => updateRide(activeDay, ride.id, 'pointB', val)}
                      onSelectCoord={(name, coords) => updateRide(activeDay, ride.id, 'pointB', name, coords)}
                      placeholder="Search location..."
                    />
                  </div>
                  <button 
                    className="secondary" 
                    onClick={() => deleteRide(activeDay, ride.id)}
                    style={{ marginTop: '1.5rem', color: 'var(--danger)', height: '42px', width: '42px', padding: 0, justifyContent: 'center' }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Waypoints Section */}
                {(ride.waypoints && ride.waypoints.length > 0) || true ? (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 700 }}>WAYPOINTS</label>
                      <button 
                        className="secondary" 
                        onClick={() => addWaypoint(activeDay, ride.id)}
                        style={{ padding: '0.3rem 0.6rem', fontSize: '0.7rem', display: 'flex', gap: '0.3rem', alignItems: 'center' }}
                      >
                        <Plus size={14} /> Add Waypoint
                      </button>
                    </div>
                    
                    {ride.waypoints && ride.waypoints.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {ride.waypoints.map((waypoint, index) => (
                          <div key={waypoint.id} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, minWidth: '60px' }}>
                              Via {index + 1}:
                            </span>
                            <LocationAutocomplete 
                              id={`waypoint-${waypoint.id}`}
                              value={waypoint.name} 
                              onChange={(val) => {
                                // Just update the name, don't recompute yet
                                const newWaypoints = ride.waypoints.map(w => 
                                  w.id === waypoint.id ? { ...w, name: val } : w
                                );
                                setRides(prev => {
                                  const prevDayRides = [...(prev[activeDay] || [])];
                                  const idx = prevDayRides.findIndex(r => r.id === ride.id);
                                  if (idx === -1) return prev;
                                  prevDayRides[idx] = { ...prevDayRides[idx], waypoints: newWaypoints };
                                  return { ...prev, [activeDay]: prevDayRides };
                                });
                              }}
                              onSelectCoord={(name, coords) => updateWaypoint(activeDay, ride.id, waypoint.id, name, coords)}
                              placeholder="Search waypoint..."
                            />
                            <button 
                              className="secondary" 
                              onClick={() => removeWaypoint(activeDay, ride.id, waypoint.id)}
                              style={{ color: 'var(--danger)', height: '42px', width: '42px', padding: 0, justifyContent: 'center', flexShrink: 0 }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : null}

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '0.75rem 1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>KM Before:</span>
                    <span className="km-badge">{ride.kmBefore.toFixed(1)}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Distance:</span>
                    <span style={{ fontWeight: 600, color: 'var(--accent-secondary)' }}>{ride.distanceKm} km</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>KM After:</span>
                    <span className="km-badge" style={{ color: 'var(--success)', borderColor: 'var(--success)' }}>{ride.kmAfter.toFixed(1)}</span>
                  </div>
                </div>

                {returnSuggestion?.rideId === ride.id && (
                  <div className="suggestion-banner animate-fade-in">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <RefreshCw size={18} style={{ color: 'var(--accent-primary)' }} />
                      <span style={{ fontSize: '0.9rem' }}>Instant return ride suggested?</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => setReturnSuggestion(null)}>Decline</button>
                      <button className="primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => handleSuggestReturn(ride)}>Accept Return</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {rides[activeDay]?.length > 0 && (
              <button 
                className="secondary" 
                onClick={() => addRide(activeDay)} 
                style={{ 
                  display: 'flex', 
                  gap: '0.5rem', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  padding: '1rem',
                  marginTop: '1.5rem',
                  borderStyle: 'dashed',
                  opacity: 0.8,
                  width: '100%'
                }}
              >
                <Plus size={18} /> Add Another Ride
              </button>
            )}
          </div>
        </div>
      </main>

      {/* <footer style={{ marginTop: '3rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem', opacity: 0.5 }}>
        Total KM this month: {allRidesSorted.reduce((sum, r) => sum + (parseFloat(r.distanceKm) || 0), 0).toFixed(1)} km
      </footer> */}
    </div>
  );
};

export default App;
