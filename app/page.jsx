"use client";
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { format, addMonths, subMonths, endOfMonth, startOfMonth } from 'date-fns';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Download, 
  Car, 
  MapPin, 
  Calendar as CalendarIcon,
  RefreshCw,
  Gauge,
  Route,
  Home as HomeIcon
} from 'lucide-react';
import * as XLSX from 'xlsx';
import SmartTimeInput from '../components/SmartTimeInput';
import LocationAutocomplete from '../components/LocationAutocomplete';
import SimpleAutocomplete from '../components/SimpleAutocomplete';

export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [activeDay, setActiveDay] = useState(new Date().getDate());
  const [allMonthsData, setAllMonthsData] = useState({}); // { '2026-02': { rides: {}, kmStartOfMonth: 0 } }
  const [kmStartOfMonth, setKmStartOfMonth] = useState(0);
  const [rides, setRides] = useState({}); // { [day]: [ride1, ride2] }
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
  const [showPurposeForRide, setShowPurposeForRide] = useState({}); // { rideId: boolean }
  const [homeAddress, setHomeAddress] = useState('');
  const [homeCoords, setHomeCoords] = useState(null);
  const [isEditingHome, setIsEditingHome] = useState(false);
  const [activeFieldId, setActiveFieldId] = useState(null);
  const [storedPurposes, setStoredPurposes] = useState([]);
  const calendarRef = useRef(null);
  const homeRef = useRef(null);
  const homeEditRef = useRef(null);
  const isLoadingMonthRef = useRef(false);
  const saveTimeoutRef = useRef(null);

  const currentMonthKey = format(currentMonth, 'yyyy-MM');

  // Load from Server on mount
  useEffect(() => {
    const loadFromServer = async () => {
      try {
        let serverData;
        if (typeof window !== 'undefined' && window.electronAPI) {
          serverData = await window.electronAPI.getData();
        } else {
          const response = await fetch('/api/data');
          if (response.ok) {
            serverData = await response.json();
          }
        }

        if (serverData) {
          const months = serverData.months || {};
          
          // Migrate legacy pointMiddle to waypoints array
          Object.keys(months).forEach(mkey => {
            const mData = months[mkey];
            if (mData.rides) {
              Object.keys(mData.rides).forEach(day => {
                mData.rides[day] = mData.rides[day].map(r => {
                  if (r.pointMiddle && (!r.waypoints || r.waypoints.length === 0)) {
                    return {
                      ...r,
                      waypoints: [{ id: Date.now(), name: r.pointMiddle, coords: r.coordsMiddle }],
                      pointMiddle: undefined,
                      coordsMiddle: undefined
                    };
                  }
                  // Ensure waypoints is always an array
                  if (!r.waypoints) r.waypoints = [];
                  return r;
                });
              });
            }
          });

          setAllMonthsData(months);
          setAllMonthsData(months);
          setHomeAddress(serverData.homeAddress || '');
          setHomeCoords(serverData.homeCoords || null);
          setStoredPurposes(serverData.purposes || []);
          
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
    isLoadingMonthRef.current = true;
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
      setRides({});
      setKmStartOfMonth(0);
    }
    // Reset loading flag after state updates
    setTimeout(() => {
      isLoadingMonthRef.current = false;
    }, 100);
  }, [currentMonthKey, allMonthsData]);

  // Auto-show PURPOSE field for rides with existing data
  useEffect(() => {
    const newShowPurpose = {};
    Object.keys(rides).forEach(day => {
      rides[day].forEach(ride => {
        if (ride.purpose) {
          newShowPurpose[ride.id] = true;
        }
      });
    });
    setShowPurposeForRide(newShowPurpose);
  }, [rides]);

  // Save to Server on change (debounced)
  useEffect(() => {
    // Skip save if we're currently loading month data
    if (isLoadingMonthRef.current || !isInitialLoadComplete) {
      return;
    }

    // Clear any pending save
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Debounce save to prevent rapid requests
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        let monthRidesTotal = 0;
        Object.values(rides).forEach(dayArr => {
          dayArr.forEach(r => monthRidesTotal += (parseFloat(r.distanceKm) || 0));
        });

        const updatedAllMonths = {
          ...allMonthsData,
          [currentMonthKey]: {
            ...allMonthsData[currentMonthKey],
            rides,
            kmStartOfMonth: parseFloat(kmStartOfMonth) || 0
          }
        };

        if (typeof window !== 'undefined' && window.electronAPI) {
          await window.electronAPI.saveData({ 
            months: updatedAllMonths,
            homeAddress,
            homeCoords,
            purposes: storedPurposes
          });
        } else {
          await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              months: updatedAllMonths,
              homeAddress,
              homeCoords,
              purposes: storedPurposes
            })
          });
        }
        
        // Update local cache to allow seamless month switching without reload
        setAllMonthsData(updatedAllMonths);
      } catch (e) {
        console.error('Save failed:', e);
      }
    }, 1000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [rides, kmStartOfMonth, currentMonthKey, isInitialLoadComplete, allMonthsData, homeAddress, homeCoords, storedPurposes]);

  // Click outside to close calendar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    };
    if (isCalendarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCalendarOpen]);

  // Click outside to close home editing
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isIconClick = homeRef.current && homeRef.current.contains(event.target);
      const isEditRowClick = homeEditRef.current && homeEditRef.current.contains(event.target);
      
      if (!isIconClick && !isEditRowClick) {
        setIsEditingHome(false);
      }
    };
    if (isEditingHome) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditingHome]);

  const fetchRouteInfo = async (coordsA, coordsB, waypoints = []) => {
    if (!coordsA || !coordsB) return { distance: 0, duration: 0 };
    try {
      // Build coordinate string with all points
      let coordsList = [`${coordsA.lon},${coordsA.lat}`];
      
      // Add valid waypoint coordinates
      if (waypoints && waypoints.length > 0) {
        waypoints.forEach(wp => {
          if (wp.coords) {
            coordsList.push(`${wp.coords.lon},${wp.coords.lat}`);
          }
        });
      }
      
      coordsList.push(`${coordsB.lon},${coordsB.lat}`);
      const coordString = coordsList.join(';');
      
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${coordString}?overview=false`
      );
      const data = await response.json();
      if (data.routes && data.routes[0]) {
        return {
          distance: Math.round(data.routes[0].distance / 1000),
          duration: Math.round(data.routes[0].duration / 60)
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

  // Sort rides for UI calculation (grouping order, added at the bottom)
  const ridesChronological = useMemo(() => {
    const flatRides = [];
    const days = Object.keys(rides);
    
    // We don't sort days globally for the UI if the user wants "as added"
    // But usually logbook days are expected to be in order.
    // However, the user said "do not sort anything inplace... always add it to the botom".
    // This implies that as they add rides across days, the cumulative KM continues.
    
    // Let's collect ALL rides first
    const allRidesRaw = [];
    Object.keys(rides).forEach(day => {
      (rides[day] || []).forEach(r => allRidesRaw.push({ ...r, day: parseInt(day) }));
    });
    
    // Separate parents and children
    const parents = allRidesRaw.filter(r => !r.parentId).sort((a, b) => a.id - b.id);
    const children = allRidesRaw.filter(r => r.parentId);

    parents.forEach(parent => {
      flatRides.push(parent);
      const child = children.find(c => c.parentId === parent.id);
      if (child) {
        flatRides.push(child);
      }
    });
    
    // Safety for orphans
    children.forEach(child => {
      if (!flatRides.find(r => r.id === child.id)) {
        flatRides.push(child);
      }
    });

    return flatRides;
  }, [rides]);

  // No longer calculating KM Before/After
  const activeDayTotalKm = useMemo(() => {
    return (rides[activeDay] || []).reduce((sum, r) => sum + (parseFloat(r.distanceKm) || 0), 0);
  }, [rides, activeDay]);

  const monthlyTotalKm = useMemo(() => {
    return ridesChronological.reduce((sum, r) => sum + (parseFloat(r.distanceKm) || 0), 0);
  }, [ridesChronological]);

  // Group by day and keep chronological order for display
  const chainedRidesMap = useMemo(() => {
    const map = {};
    
    ridesChronological.forEach(ride => {
      if (!map[ride.day]) map[ride.day] = [];
      map[ride.day].push(ride);
    });

    return map;
  }, [ridesChronological]);

  const handleAddPurpose = (newPurpose) => {
    if (!newPurpose || !newPurpose.trim()) return;
    const trimmed = newPurpose.trim();
    if (!storedPurposes.includes(trimmed)) {
      setStoredPurposes(prev => [...prev, trimmed].sort());
    }
  };

  const addRide = (day) => {
    const newRide = { 
      id: Date.now(), 
      from: '', 
      to: '', 
      pointA: '', 
      pointB: '', 
      waypoints: [], // Supports N waypoints
      purpose: '',
      distanceKm: 0,
      coordsA: null,
      coordsB: null,
      isManualDistance: false
    };
    setRides(prev => ({
      ...prev,
      [day]: [...(prev[day] || []), newRide] // Add to end (bottom)
    }));
  };

  const updateRide = async (day, id, field, value, coords = null) => {
    const currentDayRides = rides[day] || [];
    const rideIndex = currentDayRides.findIndex(r => r.id === id);
    if (rideIndex === -1) return;
    const currentRide = currentDayRides[rideIndex];
    
    let updates = {};

    // Handle discrete waypoint operations or general fields
    if (field === 'addWaypoint') {
      updates.waypoints = [...(currentRide.waypoints || []), { id: Date.now(), name: '', coords: null }];
    } else if (field === 'removeWaypoint') {
      const newWps = [...(currentRide.waypoints || [])];
      newWps.splice(value, 1); // value is the index
      updates.waypoints = newWps;
    } else if (field === 'updateWaypoint') {
      const { index, name, coords: wpCoords } = value;
      const newWps = [...(currentRide.waypoints || [])];
      newWps[index] = { ...newWps[index], name, coords: wpCoords };
      updates.waypoints = newWps;
    } else {
      updates[field] = value;
      if (field === 'pointA') updates.coordsA = coords;
      if (field === 'pointB') updates.coordsB = coords;
    }

    // Handle manual distance editing
    if (field === 'distanceKm') {
      updates.isManualDistance = true;
    }

    // Determine if we need to recalculate distance/duration
    const triggersRecalc = field === 'pointA' || field === 'pointB' || field === 'from' || 
                           field === 'addWaypoint' || field === 'removeWaypoint' || field === 'updateWaypoint';

    if (triggersRecalc) {
      const cA = updates.coordsA !== undefined ? updates.coordsA : currentRide.coordsA;
      const cB = updates.coordsB !== undefined ? updates.coordsB : currentRide.coordsB;
      const wps = updates.waypoints !== undefined ? updates.waypoints : (currentRide.waypoints || []);
      const startTime = field === 'from' ? value : currentRide.from;

      if (!cA || !cB) {
        // If start or end point is missing, reset distance
        updates.distanceKm = 0;
      } else if (!currentRide.isManualDistance) {
        const { distance, duration } = await fetchRouteInfo(cA, cB, wps);
        updates.distanceKm = distance;
        if (startTime) {
          updates.to = addMinutesToTime(startTime, duration);
        }
      } else if (field === 'from') {
         // If only 'from' changed, still need duration to update 'to'
         const { duration } = await fetchRouteInfo(cA, cB, wps);
         updates.to = addMinutesToTime(value, duration);
      }
    }

    setRides(prev => {
      const prevDayRides = [...(prev[day] || [])];
      const idx = prevDayRides.findIndex(r => r.id === id);
      if (idx === -1) return prev;
      prevDayRides[idx] = { ...prevDayRides[idx], ...updates };
      return { ...prev, [day]: prevDayRides };
    });
  };

  const handleSuggestReturn = (ride) => {
    const returnRide = {
      id: Date.now() + 1,
      from: '',
      to: '',
      pointA: ride.pointB,
      pointB: ride.pointA,
      waypoints: (ride.waypoints || []).map(wp => ({ ...wp, id: Date.now() + Math.random() })).reverse(),
      purpose: ride.purpose || '',
      coordsA: ride.coordsB,
      coordsB: ride.coordsA,
      distanceKm: ride.distanceKm,
      isManualDistance: false,
      parentId: ride.id
    };

    setRides(prev => ({
      ...prev,
      [activeDay]: [...(prev[activeDay] || []), returnRide]
    }));
  };

  const deleteRide = (day, id) => {
    setRides(prev => {
      const dayRides = prev[day] || [];
      const toDeleteIds = [id, ...dayRides.filter(r => r.parentId === id).map(r => r.id)];
      return {
        ...prev,
        [day]: dayRides.filter(ride => !toDeleteIds.includes(ride.id))
      };
    });
  };

  const exportExcel = () => {

    const monthStr = format(currentMonth, 'yyyy-MM');
    const monthName = format(currentMonth, 'MMMM yyyy');
    
    // Sort chronologically for export: by day, then by "from" time
    const exportRides = [];
    const sortedDays = Object.keys(rides).sort((a,b) => parseInt(a) - parseInt(b));
    
    sortedDays.forEach(day => {
      const dayRides = [...(rides[day] || [])];
      // Sort by "from" time within the day
      dayRides.sort((a, b) => {
        if (!a.from) return 1;
        if (!b.from) return -1;
        return a.from.localeCompare(b.from);
      });
      dayRides.forEach(r => exportRides.push({ ...r, day: parseInt(day) }));
    });

    let runningKm = parseFloat(kmStartOfMonth) || 0;
    const data = exportRides.map(ride => {
      const kmBefore = runningKm;
      const kmAfter = kmBefore + (parseFloat(ride.distanceKm) || 0);
      runningKm = kmAfter;

      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), ride.day);
      return {
        'Dátum': format(date, 'dd/MM/yyyy'),
        'Den': format(date, 'EEEE'),
        'Čas odjazdu': ride.from,
        'Čas príchodu': ride.to,
        'Miesto odjazdu': ride.pointA,
        'Miesto príchodu': ride.pointB,
        'Účel cesty': ride.purpose || '',
        'Vzdialenosť (km)': ride.distanceKm,
        'Stav tachometra pred jazdou': kmBefore.toFixed(1),
        'Stav tachometra po jazde': kmAfter.toFixed(1)
      };
    });

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    // Set column widths
    ws['!cols'] = [
      { wch: 12 }, // Date
      { wch: 12 }, // Day
      { wch: 8 },  // From
      { wch: 8 },  // To
      { wch: 30 }, // Start Point
      { wch: 30 }, // End Point
      { wch: 30 }, // Purpose
      { wch: 12 }, // Distance
      { wch: 12 }, // KM Before
      { wch: 12 }  // KM After
    ];

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, monthName);

    // Generate Excel file and download
    XLSX.writeFile(wb, `rides_${monthStr}.xlsx`);
  };

  const lastDay = endOfMonth(currentMonth).getDate();
  const daysArray = Array.from({ length: lastDay }, (_, i) => i + 1);

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '5rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h1 className="gradient-text" style={{ fontSize: '2rem' }}>Ride Evidence</h1>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div 
              ref={homeRef}
              className="glass" 
              style={{ 
                padding: '0.5rem', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                cursor: 'pointer',
                borderColor: homeAddress ? 'var(--success)' : (isEditingHome ? 'var(--accent-primary)' : 'var(--border-color)'),
                transition: 'all 0.2s ease',
                background: isEditingHome ? 'rgba(var(--accent-primary-rgb), 0.1)' : 'transparent',
                boxShadow: homeAddress ? '0 0 15px rgba(16, 185, 129, 0.2)' : 'none'
              }}
              onClick={() => setIsEditingHome(!isEditingHome)}
              title={homeAddress ? `Home: ${homeAddress}` : "Set Home Address"}
            >
              <MapPin size={18} style={{ color: homeAddress ? 'var(--success)' : 'var(--text-secondary)' }} />
            </div>

            <div className="glass" style={{ 
              padding: '0.4rem 0.75rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              border: !kmStartOfMonth ? '2px solid var(--danger)' : '1px solid var(--border-color)',
              background: !kmStartOfMonth ? 'rgba(239, 68, 68, 0.05)' : 'transparent'
            }}>
              <Gauge size={16} style={{ color: !kmStartOfMonth ? 'var(--danger)' : 'var(--accent-primary)' }} />
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
                placeholder="Odometer"
              />
              <span style={{ fontSize: '0.75rem', color: !kmStartOfMonth ? 'var(--danger)' : 'var(--text-secondary)', fontWeight: 600 }}>km</span>
            </div>
            <button 
              className="primary" 
              onClick={exportExcel}
              style={{ opacity: !kmStartOfMonth ? 0.5 : 1, cursor: !kmStartOfMonth ? 'not-allowed' : 'pointer' }}
              title={!kmStartOfMonth ? "Please fill KM Start first" : "Export to Excel"}
            >
              <Download size={18} /> Export
            </button>
          </div>
        </div>

        {isEditingHome && (
          <div 
            ref={homeEditRef}
            className="glass animate-fade-in" 
            style={{ 
              padding: '0.75rem 1rem', 
              marginBottom: '1.5rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem',
              maxWidth: '500px',
              marginLeft: 'auto',
              position: 'relative',
              zIndex: activeFieldId === 'home-address' ? 200 : 10
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)' }}>
              <MapPin size={18} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap' }}>SET HOME</span>
            </div>
            <div style={{ flex: 1 }}>
              <LocationAutocomplete 
                id="home-address"
                value={homeAddress}
                onChange={(val) => setHomeAddress(val)}
                onSelectCoord={(name, coords) => {
                  setHomeAddress(name);
                  setHomeCoords(coords);
                  setIsEditingHome(false);
                }}
                onFocus={() => setActiveFieldId('home-address')}
                onBlur={() => setActiveFieldId(null)}
                placeholder="Search address..."
              />
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div className="calendar-popover-container" ref={calendarRef} style={{ flex: 1 }}>
            <div 
              className="glass" 
              style={{ 
                height: '56px',
                padding: '0 1rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                cursor: 'pointer',
                borderColor: isCalendarOpen ? 'var(--accent-primary)' : 'var(--border-color)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            >
              <button className="secondary" style={{ padding: '0.3rem' }} onClick={(e) => { e.stopPropagation(); setCurrentMonth(subMonths(currentMonth, 1)); setActiveDay(1); }}>
                <ChevronLeft size={18} />
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, justifyContent: 'center' }}>
                <CalendarIcon size={18} style={{ color: isCalendarOpen ? 'var(--accent-primary)' : 'var(--text-secondary)' }} />
                <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                  {format(currentMonth, 'MMMM yyyy')}
                </h2>
              </div>
              <button className="secondary" style={{ padding: '0.3rem' }} onClick={(e) => { e.stopPropagation(); setCurrentMonth(addMonths(currentMonth, 1)); setActiveDay(1); }}>
                <ChevronRight size={18} />
              </button>
            </div>

            {isCalendarOpen && (
              <div className="calendar-popover" style={{ top: '65px', left: 0, right: 0, margin: '0 auto', maxWidth: '400px' }}>
                <div className="calendar-header-days">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div key={day} className="calendar-header-day">{day}</div>
                  ))}
                </div>

                <div className="calendar-grid">
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

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="glass" style={{ height: '56px', padding: '0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1px solid rgba(var(--accent-primary-rgb), 0.3)', background: 'rgba(var(--accent-primary-rgb), 0.05)' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 700, letterSpacing: '0.05em' }}>MONTH TOTAL</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{monthlyTotalKm.toFixed(1)}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>km</span>
                  {/* <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', opacity: 0.5, marginLeft: '0.5rem' }}>Start: {kmStartOfMonth}</span> */}
                </div>
              </div>
            </div>

            <div className="glass" style={{ height: '56px', padding: '0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1px solid rgba(var(--accent-secondary-rgb), 0.3)', background: 'rgba(var(--accent-secondary-rgb), 0.05)' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 700, letterSpacing: '0.05em' }}>DAY TOTAL</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>{activeDayTotalKm.toFixed(1)}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>km</span>
                </div>
              </div>
            </div>
          </div>
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

            {(chainedRidesMap[activeDay] || []).filter(r => !r.parentId).map((ride) => {
              const childRide = (chainedRidesMap[activeDay] || []).find(c => c.parentId === ride.id);
              
              return (
                <div key={ride.id} className="animate-fade-in" style={{ 
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '1.25rem',
                  border: '1px solid var(--border-color)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: '1rem' 
                }}>
                  {/* Parent Ride Section */}
                  <div style={{ padding: '1.25rem', position: 'relative' }}>
                    {/* Delete Button - Top Right */}
                    <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', zIndex: 10 }}>
                      <button 
                        className="secondary" 
                        onClick={() => deleteRide(activeDay, ride.id)}
                        style={{ color: 'var(--danger)', height: '28px', width: '28px', padding: 0, justifyContent: 'center', background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>

                    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {/* Row 1: Departure */}
                      <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-end', position: 'relative', zIndex: activeFieldId === `ride-${ride.id}-pointA` ? 100 : 2 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', width: '80px', flexShrink: 0 }}>
                          <label style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontWeight: 800, letterSpacing: '0.05em' }}>DEPARTURE</label>
                          <SmartTimeInput 
                            id={`from-${ride.id}`}
                            value={ride.from} 
                            onChange={(val) => updateRide(activeDay, ride.id, 'from', val)} 
                            onTab={() => document.getElementById(`pointA-${ride.id}`)?.focus()}
                          />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '18px' }}>
                            <label style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontWeight: 800, letterSpacing: '0.05em' }}>START POINT</label>
                          </div>
                          <LocationAutocomplete 
                            id={`pointA-${ride.id}`}
                            value={ride.pointA} 
                            onChange={(val) => updateRide(activeDay, ride.id, 'pointA', val)}
                            onSelectCoord={(name, coords) => updateRide(activeDay, ride.id, 'pointA', name, coords)}
                            onHomeClick={homeAddress ? () => updateRide(activeDay, ride.id, 'pointA', homeAddress, homeCoords) : null}
                            onFocus={() => setActiveFieldId(`ride-${ride.id}-pointA`)}
                            onBlur={() => setActiveFieldId(null)}
                            placeholder="Departure point..."
                          />
                        </div>
                      </div>

                      {/* Waypoints List */}
                      {(ride.waypoints || []).map((wp, index) => (
                        <div key={wp.id} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-end', position: 'relative', zIndex: activeFieldId === `waypoint-${ride.id}-${wp.id}` ? 100 : 1 }}>
                          <div style={{ width: '80px', flexShrink: 0 }}></div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '18px' }}>
                              <label style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontWeight: 800, letterSpacing: '0.05em' }}>VIA (WAYPOINT {index + 1})</label>
                              <button 
                                onClick={() => updateRide(activeDay, ride.id, 'removeWaypoint', index)}
                                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.7rem', padding: '0', opacity: 0.7 }}
                              >✕</button>
                            </div>
                            <LocationAutocomplete 
                              id={`waypoint-${ride.id}-${wp.id}`}
                              value={wp.name} 
                              onChange={(val) => updateRide(activeDay, ride.id, 'updateWaypoint', { index, name: val, coords: wp.coords })}
                              onSelectCoord={(name, coords) => updateRide(activeDay, ride.id, 'updateWaypoint', { index, name, coords })}
                              onHomeClick={homeAddress ? () => updateRide(activeDay, ride.id, 'updateWaypoint', { index, name: homeAddress, coords: homeCoords }) : null}
                              onFocus={() => setActiveFieldId(`waypoint-${ride.id}-${wp.id}`)}
                              onBlur={() => setActiveFieldId(null)}
                              placeholder="Stopover point..."
                            />
                          </div>
                        </div>
                      ))}

                      <div style={{ display: 'flex', paddingLeft: '80px' }}>
                        <button 
                          className="secondary"
                          onClick={() => updateRide(activeDay, ride.id, 'addWaypoint')}
                          style={{ 
                            padding: '0.15rem 0.5rem', 
                            fontSize: '0.6rem', 
                            borderStyle: 'dashed', 
                            opacity: 0.5,
                            marginLeft: '1.25rem'
                          }}
                        >+ Add Waypoint</button>
                      </div>

                      {/* Row 2: Arrival */}
                      <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-end', position: 'relative', zIndex: activeFieldId === `ride-${ride.id}-pointB` ? 100 : 1 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', width: '80px', flexShrink: 0 }}>
                          <label style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontWeight: 800, letterSpacing: '0.05em' }}>ARRIVAL</label>
                          <SmartTimeInput 
                            id={`to-${ride.id}`}
                            value={ride.to} 
                            onChange={(val) => updateRide(activeDay, ride.id, 'to', val)} 
                          />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '18px' }}>
                            <label style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontWeight: 800, letterSpacing: '0.05em' }}>END POINT</label>
                          </div>
                          <LocationAutocomplete 
                            id={`pointB-${ride.id}`}
                            value={ride.pointB} 
                            onChange={(val) => updateRide(activeDay, ride.id, 'pointB', val)}
                            onSelectCoord={(name, coords) => updateRide(activeDay, ride.id, 'pointB', name, coords)}
                            onHomeClick={homeAddress ? () => updateRide(activeDay, ride.id, 'pointB', homeAddress, homeCoords) : null}
                            onFocus={() => setActiveFieldId(`ride-${ride.id}-pointB`)}
                            onBlur={() => setActiveFieldId(null)}
                            placeholder="Destination point..."
                          />
                        </div>
                      </div>

                      {/* Conditional Row: Purpose */}
                      {showPurposeForRide[ride.id] && (
                        <div style={{ paddingLeft: '92.5px', position: 'relative', zIndex: activeFieldId === `ride-${ride.id}-purpose` ? 100 : 1 }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <label style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontWeight: 800, letterSpacing: '0.05em' }}>PURPOSE</label>
                              <button 
                                onClick={() => {
                                  setShowPurposeForRide(prev => ({ ...prev, [ride.id]: false }));
                                  updateRide(activeDay, ride.id, 'purpose', '');
                                }}
                                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.7rem', padding: '0', opacity: 0.7 }}
                              >✕</button>
                            </div>
                              <SimpleAutocomplete 
                                value={ride.purpose || ''}
                                onChange={(val) => updateRide(activeDay, ride.id, 'purpose', val)}
                                suggestions={storedPurposes}
                                placeholder="e.g., Client meeting..."
                                onFocus={() => setActiveFieldId(`ride-${ride.id}-purpose`)}
                                onBlur={() => setActiveFieldId(null)}
                                onSaveNew={handleAddPurpose}
                              />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer: Add Return (Left) and Distance (Right) */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        {!childRide && ride.pointA && ride.pointB && ride.from && ride.distanceKm > 0 && (
                          <button 
                            className="secondary"
                            onClick={() => handleSuggestReturn(ride)}
                            style={{ 
                              padding: '0.4rem 0.75rem',
                              fontSize: '0.7rem',
                              display: 'flex',
                              gap: '0.4rem',
                              alignItems: 'center',
                              borderColor: 'var(--accent-primary)',
                              background: 'rgba(var(--accent-primary-rgb), 0.1)',
                              color: 'var(--accent-primary)',
                              fontWeight: 700,
                              borderRadius: '0.75rem'
                            }}
                          >
                            <RefreshCw size={12} /> Add Return
                          </button>
                        )}
                        {!showPurposeForRide[ride.id] && (
                          <button 
                            className="secondary"
                            onClick={() => setShowPurposeForRide(prev => ({ ...prev, [ride.id]: true }))}
                            style={{ padding: '0.35rem 0.6rem', fontSize: '0.65rem', borderStyle: 'dashed', opacity: 0.7 }}
                          >+ Add Purpose</button>
                        )}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(var(--accent-secondary-rgb), 0.1)', padding: '0.35rem 0.6rem', borderRadius: '0.75rem', border: '1px solid rgba(var(--accent-secondary-rgb), 0.2)' }}>
                        <label style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontWeight: 800 }}>DISTANCE</label>
                        <input 
                          type="text" 
                          inputMode="decimal"
                          className="input-base" 
                          style={{ 
                            padding: '0.15rem 0.35rem', 
                            fontSize: '0.9rem',
                            border: 'none',
                            background: 'transparent',
                            width: '45px',
                            fontWeight: 800,
                            textAlign: 'right',
                            color: 'var(--accent-secondary)'
                          }}
                          value={ride.distanceKm || ''}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9.]/g, '');
                            updateRide(activeDay, ride.id, 'distanceKm', val === '' ? 0 : parseFloat(val));
                          }}
                        />
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 700 }}>km</span>
                      </div>
                    </div>
                  </div>

                  {/* Return Ride Section - Indented and Compact */}
                  {childRide ? (
                    <div style={{ 
                      background: 'rgba(255,255,255,0.03)', 
                      borderTop: '1px solid rgba(var(--accent-primary-rgb), 0.2)',
                      padding: '1rem',
                      marginLeft: '1.25rem',
                      marginRight: '1rem',
                      marginBottom: '1rem',
                      borderRadius: '1rem',
                      position: 'relative'
                    }}>
                      <div style={{ 
                        position: 'absolute', 
                        top: '-1px', 
                        left: '0.75rem', 
                        background: 'var(--accent-primary)', 
                        color: 'white', 
                        fontSize: '0.55rem', 
                        fontWeight: 900, 
                        padding: '0.15rem 0.5rem', 
                        borderRadius: '0 0 0.4rem 0.4rem',
                        letterSpacing: '0.05em',
                        zIndex: 5
                      }}>RETURN RIDE</div>

                      {/* Header Row: Delete Button for Return */}
                      <div style={{ position: 'absolute', top: '0.6rem', right: '0.6rem', zIndex: 10 }}>
                        <button 
                          className="secondary" 
                          onClick={() => deleteRide(activeDay, childRide.id)}
                          style={{ color: 'var(--danger)', height: '26px', width: '26px', padding: 0, justifyContent: 'center', background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                        >
                          <Trash2 size={10} />
                        </button>
                      </div>

                      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.6rem' }}>
                        {/* Row 1: Departure (Return) */}
                        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-end', position: 'relative', zIndex: activeFieldId === `ride-${childRide.id}-pointA` ? 100 : 2 }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', width: '80px', flexShrink: 0 }}>
                            <label style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontWeight: 800, letterSpacing: '0.05em' }}>DEPARTURE</label>
                            <SmartTimeInput 
                              id={`from-${childRide.id}`}
                              value={childRide.from} 
                              onChange={(val) => updateRide(activeDay, childRide.id, 'from', val)} 
                            />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '18px', paddingRight: '28px' }}>
                              <label style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontWeight: 800, letterSpacing: '0.05em' }}>START POINT</label>
                            </div>
                            <LocationAutocomplete 
                              id={`pointA-${childRide.id}`}
                              value={childRide.pointA} 
                              onChange={(val) => updateRide(activeDay, childRide.id, 'pointA', val)}
                              onSelectCoord={(name, coords) => updateRide(activeDay, childRide.id, 'pointA', name, coords)}
                              onHomeClick={homeAddress ? () => updateRide(activeDay, childRide.id, 'pointA', homeAddress, homeCoords) : null}
                              onFocus={() => setActiveFieldId(`ride-${childRide.id}-pointA`)}
                              onBlur={() => setActiveFieldId(null)}
                              placeholder="Departure point..."
                            />
                          </div>
                        </div>

                        {/* Waypoints List (Return) */}
                        {(childRide.waypoints || []).map((wp, index) => (
                          <div key={wp.id} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-end', position: 'relative', zIndex: activeFieldId === `waypoint-${childRide.id}-${wp.id}` ? 100 : 1 }}>
                            <div style={{ width: '80px', flexShrink: 0 }}></div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '18px' }}>
                                <label style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontWeight: 800, letterSpacing: '0.05em' }}>VIA (WAYPOINT {index + 1})</label>
                                <button 
                                  onClick={() => updateRide(activeDay, childRide.id, 'removeWaypoint', index)}
                                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.7rem', padding: '0', opacity: 0.7 }}
                                >✕</button>
                              </div>
                              <LocationAutocomplete 
                                id={`waypoint-${childRide.id}-${wp.id}`}
                                value={wp.name} 
                                onChange={(val) => updateRide(activeDay, childRide.id, 'updateWaypoint', { index, name: val, coords: wp.coords })}
                                onSelectCoord={(name, coords) => updateRide(activeDay, childRide.id, 'updateWaypoint', { index, name, coords })}
                                onHomeClick={homeAddress ? () => updateRide(activeDay, childRide.id, 'updateWaypoint', { index, name: homeAddress, coords: homeCoords }) : null}
                                onFocus={() => setActiveFieldId(`waypoint-${childRide.id}-${wp.id}`)}
                                onBlur={() => setActiveFieldId(null)}
                                placeholder="Stopover point..."
                              />
                            </div>
                          </div>
                        ))}

                        <div style={{ display: 'flex', paddingLeft: '80px' }}>
                          <button 
                            className="secondary"
                            onClick={() => updateRide(activeDay, childRide.id, 'addWaypoint')}
                            style={{ 
                              padding: '0.15rem 0.5rem', 
                              fontSize: '0.6rem', 
                              borderStyle: 'dashed', 
                              opacity: 0.5,
                              marginLeft: '1.25rem'
                            }}
                          >+ Add Waypoint</button>
                        </div>

                        {/* Row 2: Arrival (Return) */}
                        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-end', position: 'relative', zIndex: activeFieldId === `ride-${childRide.id}-pointB` ? 100 : 1 }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', width: '80px', flexShrink: 0 }}>
                            <label style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontWeight: 800, letterSpacing: '0.05em' }}>ARRIVAL</label>
                            <SmartTimeInput 
                              id={`to-${childRide.id}`}
                              value={childRide.to} 
                              onChange={(val) => updateRide(activeDay, childRide.id, 'to', val)} 
                            />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '18px' }}>
                              <label style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontWeight: 800, letterSpacing: '0.05em' }}>END POINT</label>
                            </div>
                            <LocationAutocomplete 
                              id={`pointB-${childRide.id}`}
                              value={childRide.pointB} 
                              onChange={(val) => updateRide(activeDay, childRide.id, 'pointB', val)}
                              onSelectCoord={(name, coords) => updateRide(activeDay, childRide.id, 'pointB', name, coords)}
                              onHomeClick={homeAddress ? () => updateRide(activeDay, childRide.id, 'pointB', homeAddress, homeCoords) : null}
                              onFocus={() => setActiveFieldId(`ride-${childRide.id}-pointB`)}
                              onBlur={() => setActiveFieldId(null)}
                              placeholder="Destination point..."
                            />
                          </div>
                        </div>
                      </div>

                      {/* Conditional Row: Purpose (Return) */}
                      {showPurposeForRide[childRide.id] && (
                        <div style={{ paddingLeft: '92.5px', position: 'relative', zIndex: activeFieldId === `ride-${childRide.id}-purpose` ? 100 : 1 }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <label style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontWeight: 800, letterSpacing: '0.05em' }}>PURPOSE</label>
                              <button 
                                onClick={() => {
                                  setShowPurposeForRide(prev => ({ ...prev, [childRide.id]: false }));
                                  updateRide(activeDay, childRide.id, 'purpose', '');
                                }}
                                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.7rem', padding: '0', opacity: 0.7 }}
                              >✕</button>
                            </div>
                              <SimpleAutocomplete 
                                value={childRide.purpose || ''}
                                onChange={(val) => updateRide(activeDay, childRide.id, 'purpose', val)}
                                suggestions={storedPurposes}
                                placeholder="e.g., Client meeting..."
                                onFocus={() => setActiveFieldId(`ride-${childRide.id}-purpose`)}
                                onBlur={() => setActiveFieldId(null)}
                                onSaveNew={handleAddPurpose}
                              />
                          </div>
                        </div>
                      )}

                      {/* Footer for Return Ride */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.75rem' }}>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          {!showPurposeForRide[childRide.id] && (
                            <button 
                              className="secondary"
                              onClick={() => setShowPurposeForRide(prev => ({ ...prev, [childRide.id]: true }))}
                              style={{ padding: '0.3rem 0.5rem', fontSize: '0.6rem', borderStyle: 'dashed', opacity: 0.7 }}
                            >+ Add Purpose</button>
                          )}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(var(--accent-secondary-rgb), 0.1)', padding: '0.3rem 0.5rem', borderRadius: '0.6rem', border: '1px solid rgba(var(--accent-secondary-rgb), 0.2)' }}>
                          <label style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontWeight: 800 }}>DISTANCE</label>
                          <input 
                            type="text" 
                            inputMode="decimal"
                            className="input-base" 
                            style={{ 
                              padding: '0.15rem 0.3rem', 
                              fontSize: '0.9rem',
                              border: 'none',
                              background: 'transparent',
                              width: '45px',
                              fontWeight: 800,
                              textAlign: 'right',
                              color: 'var(--accent-secondary)'
                            }}
                            value={childRide.distanceKm || ''}
                            onChange={(e) => {
                              const val = e.target.value.replace(/[^0-9.]/g, '');
                              updateRide(activeDay, childRide.id, 'distanceKm', val === '' ? 0 : parseFloat(val));
                            }}
                          />
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 700 }}>km</span>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
            {(rides[activeDay] || []).length > 0 && (
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

      <footer style={{ marginTop: '3rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem', opacity: 0.5 }}>
        Total KM this month: {Math.round(monthlyTotalKm)} km
      </footer>
    </div>
  );
}
