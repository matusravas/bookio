(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/SmartTimeInput.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const SmartTimeInput = ({ value, onChange, placeholder, id, onTab })=>{
    _s();
    const [displayValue, setDisplayValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(value || '');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SmartTimeInput.useEffect": ()=>{
            setDisplayValue(value || '');
        }
    }["SmartTimeInput.useEffect"], [
        value
    ]);
    const formatTime = (raw)=>{
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
    const handleBlur = ()=>{
        const formatted = formatTime(displayValue);
        setDisplayValue(formatted);
        onChange(formatted);
    };
    const handleChange = (e)=>{
        const val = e.target.value;
        // Allow typing numbers and colon
        if (/^[0-9:]*$/.test(val)) {
            setDisplayValue(val);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        id: id,
        type: "text",
        className: "input-base",
        style: {
            textAlign: 'center',
            maxWidth: '100px'
        },
        placeholder: placeholder,
        value: displayValue,
        onChange: handleChange,
        onBlur: handleBlur,
        onKeyDown: (e)=>{
            if (e.key === 'Enter') handleBlur();
            if (e.key === 'Tab' && !e.shiftKey && onTab) {
                e.preventDefault();
                handleBlur(); // Ensure formatting is applied before moving on
                onTab();
            }
        }
    }, void 0, false, {
        fileName: "[project]/components/SmartTimeInput.jsx",
        lineNumber: 55,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(SmartTimeInput, "BcX9Lpl40wMhx7brCfhPrBe+p7U=");
_c = SmartTimeInput;
const __TURBOPACK__default__export__ = SmartTimeInput;
var _c;
__turbopack_context__.k.register(_c, "SmartTimeInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/LocationAutocomplete.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.js [app-client] (ecmascript) <export default as Home>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const LocationAutocomplete = ({ value, onChange, placeholder, onSelectCoord, onHomeClick, id, onFocus, onBlur })=>{
    _s();
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(value || '');
    const [suggestions, setSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showDropdown, setShowDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const timeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LocationAutocomplete.useEffect": ()=>{
            setQuery(value || '');
            if (!value) setSuggestions([]);
        }
    }["LocationAutocomplete.useEffect"], [
        value
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LocationAutocomplete.useEffect": ()=>{
            const handleClickOutside = {
                "LocationAutocomplete.useEffect.handleClickOutside": (event)=>{
                    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                        setShowDropdown(false);
                    }
                }
            }["LocationAutocomplete.useEffect.handleClickOutside"];
            document.addEventListener('mousedown', handleClickOutside);
            return ({
                "LocationAutocomplete.useEffect": ()=>document.removeEventListener('mousedown', handleClickOutside)
            })["LocationAutocomplete.useEffect"];
        }
    }["LocationAutocomplete.useEffect"], []);
    const abortControllerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fetchSuggestions = async (searchQuery)=>{
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
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&countrycodes=sk&limit=5&addressdetails=1`, {
                headers: {
                    'Accept-Language': 'sk',
                    'User-Agent': 'BookioRideEvidence/1.0'
                },
                signal: abortControllerRef.current.signal
            });
            if (!response.ok) throw new Error('Search failed');
            const data = await response.json();
            setSuggestions(data);
            setShowDropdown(true);
        } catch (error) {
            if (error.name === 'AbortError') return;
            console.error('Error fetching locations:', error);
            setSuggestions([]);
        } finally{
            if (abortControllerRef.current?.signal.aborted) return;
            setLoading(false);
        }
    };
    // Debounce logic for fetching suggestions
    const handleInputChange = (e)=>{
        const val = e.target.value;
        setQuery(val);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(()=>{
            fetchSuggestions(val);
        }, 300); // 300ms delay
    };
    const isSelectingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const handleSelect = (item)=>{
        isSelectingRef.current = true;
        const name = item.display_name.split(',').slice(0, 3).join(',');
        setQuery(name);
        onChange(name);
        setShowDropdown(false);
        if (onSelectCoord) {
            onSelectCoord(name, {
                lat: item.lat,
                lon: item.lon
            });
        }
        setTimeout(()=>{
            isSelectingRef.current = false;
        }, 500);
    };
    const handleBlur = (e)=>{
        // If the new focus is inside our own component (e.g. clicking a suggestion), don't blur
        if (e.relatedTarget && dropdownRef.current && dropdownRef.current.contains(e.relatedTarget)) {
            return;
        }
        // Call prop onBlur if provided
        if (onBlur) onBlur(e);
        setTimeout(()=>{
            if (isSelectingRef.current) return;
            if (query !== value) {
                setQuery(value || '');
            }
            setShowDropdown(false);
        }, 250);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'relative',
            width: '100%'
        },
        ref: dropdownRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'relative'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                        size: 14,
                        style: {
                            position: 'absolute',
                            left: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--text-secondary)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/LocationAutocomplete.jsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: id,
                        type: "text",
                        className: "input-base",
                        style: {
                            paddingLeft: '2.2rem',
                            paddingRight: '2.5rem'
                        },
                        placeholder: placeholder,
                        value: query,
                        onChange: handleInputChange,
                        onBlur: handleBlur,
                        onFocus: (e)=>{
                            if (query.length >= 1) setShowDropdown(true);
                            if (onFocus) onFocus(e);
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/LocationAutocomplete.jsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        },
                        children: [
                            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                size: 14,
                                className: "animate-spin",
                                style: {
                                    color: 'var(--accent-primary)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/LocationAutocomplete.jsx",
                                lineNumber: 136,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            !query && onHomeClick && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onHomeClick,
                                className: "home-chip",
                                style: {
                                    padding: '4px',
                                    borderRadius: '6px',
                                    background: 'rgba(var(--accent-primary-rgb), 0.1)',
                                    border: '1px solid rgba(var(--accent-primary-rgb), 0.2)',
                                    color: 'var(--accent-primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                },
                                title: "Use Home Address",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"], {
                                    size: 14
                                }, void 0, false, {
                                    fileName: "[project]/components/LocationAutocomplete.jsx",
                                    lineNumber: 154,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/LocationAutocomplete.jsx",
                                lineNumber: 139,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            query && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setQuery('');
                                    onChange('');
                                    if (onSelectCoord) onSelectCoord('', null);
                                    setSuggestions([]);
                                    setShowDropdown(false);
                                },
                                style: {
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
                                },
                                onMouseEnter: (e)=>e.target.style.background = 'rgba(255,255,255,0.1)',
                                onMouseLeave: (e)=>e.target.style.background = 'transparent',
                                title: "Clear",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: '14px',
                                        lineHeight: 1,
                                        fontWeight: 800
                                    },
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/components/LocationAutocomplete.jsx",
                                    lineNumber: 182,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/LocationAutocomplete.jsx",
                                lineNumber: 158,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LocationAutocomplete.jsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/LocationAutocomplete.jsx",
                lineNumber: 118,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            showDropdown && suggestions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass",
                style: {
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
                },
                children: suggestions.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '0.75rem',
                            cursor: 'pointer',
                            borderRadius: '0.5rem',
                            borderBottom: index !== suggestions.length - 1 ? '1px solid var(--border-color)' : 'none'
                        },
                        className: "suggestion-item",
                        onMouseDown: (e)=>{
                            e.preventDefault(); // Prevent input blur
                            handleSelect(item);
                        },
                        onMouseEnter: (e)=>e.target.style.background = 'rgba(255,255,255,0.05)',
                        onMouseLeave: (e)=>e.target.style.background = 'transparent',
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '0.9rem'
                            },
                            children: item.display_name
                        }, void 0, false, {
                            fileName: "[project]/components/LocationAutocomplete.jsx",
                            lineNumber: 222,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, index, false, {
                        fileName: "[project]/components/LocationAutocomplete.jsx",
                        lineNumber: 206,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/components/LocationAutocomplete.jsx",
                lineNumber: 189,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/LocationAutocomplete.jsx",
        lineNumber: 117,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(LocationAutocomplete, "FYtzyfvYKWVp0ufS9WSx9v45ZZs=");
_c = LocationAutocomplete;
const __TURBOPACK__default__export__ = LocationAutocomplete;
var _c;
__turbopack_context__.k.register(_c, "LocationAutocomplete");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/addMonths.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subMonths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/subMonths.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$endOfMonth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/endOfMonth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfMonth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/startOfMonth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/car.js [app-client] (ecmascript) <export default as Car>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gauge$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gauge.js [app-client] (ecmascript) <export default as Gauge>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/xlsx/xlsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SmartTimeInput$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SmartTimeInput.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LocationAutocomplete$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/LocationAutocomplete.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function Home() {
    _s();
    const [currentMonth, setCurrentMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date());
    const [activeDay, setActiveDay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date().getDate());
    const [allMonthsData, setAllMonthsData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({}); // { '2026-02': { rides: {}, kmStartOfMonth: 0 } }
    const [kmStartOfMonth, setKmStartOfMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [rides, setRides] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({}); // { [day]: [ride1, ride2] }
    const [isCalendarOpen, setIsCalendarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isInitialLoadComplete, setIsInitialLoadComplete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showPurposeForRide, setShowPurposeForRide] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({}); // { rideId: boolean }
    const [homeAddress, setHomeAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [homeCoords, setHomeCoords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isEditingHome, setIsEditingHome] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeFieldId, setActiveFieldId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const calendarRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const homeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const homeEditRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isLoadingMonthRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const saveTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const currentMonthKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(currentMonth, 'yyyy-MM');
    // Load from Server on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const loadFromServer = {
                "Home.useEffect.loadFromServer": async ()=>{
                    try {
                        let serverData;
                        if (("TURBOPACK compile-time value", "object") !== 'undefined' && window.electronAPI) {
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
                            Object.keys(months).forEach({
                                "Home.useEffect.loadFromServer": (mkey)=>{
                                    const mData = months[mkey];
                                    if (mData.rides) {
                                        Object.keys(mData.rides).forEach({
                                            "Home.useEffect.loadFromServer": (day)=>{
                                                mData.rides[day] = mData.rides[day].map({
                                                    "Home.useEffect.loadFromServer": (r)=>{
                                                        if (r.pointMiddle && (!r.waypoints || r.waypoints.length === 0)) {
                                                            return {
                                                                ...r,
                                                                waypoints: [
                                                                    {
                                                                        id: Date.now(),
                                                                        name: r.pointMiddle,
                                                                        coords: r.coordsMiddle
                                                                    }
                                                                ],
                                                                pointMiddle: undefined,
                                                                coordsMiddle: undefined
                                                            };
                                                        }
                                                        // Ensure waypoints is always an array
                                                        if (!r.waypoints) r.waypoints = [];
                                                        return r;
                                                    }
                                                }["Home.useEffect.loadFromServer"]);
                                            }
                                        }["Home.useEffect.loadFromServer"]);
                                    }
                                }
                            }["Home.useEffect.loadFromServer"]);
                            setAllMonthsData(months);
                            setHomeAddress(serverData.homeAddress || '');
                            setHomeCoords(serverData.homeCoords || null);
                            // Initial load for current month
                            const currentData = months[currentMonthKey];
                            if (currentData) {
                                setRides(currentData.rides || {});
                                setKmStartOfMonth(currentData.kmStartOfMonth || 0);
                            }
                        }
                    } catch (e) {
                        console.error('Backend load failed:', e);
                    } finally{
                        setIsInitialLoadComplete(true);
                    }
                }
            }["Home.useEffect.loadFromServer"];
            loadFromServer();
        }
    }["Home.useEffect"], []);
    // Switch month data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            isLoadingMonthRef.current = true;
            const monthData = allMonthsData[currentMonthKey];
            if (monthData) {
                setRides(monthData.rides || {});
                setKmStartOfMonth(monthData.kmStartOfMonth || 0);
            } else {
                // If no data for this month, try to chain from previous month
                const monthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
                const prevMonthKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subMonths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subMonths"])(monthDate, 1), 'yyyy-MM');
                const prevMonthData = allMonthsData[prevMonthKey];
                let inheritedKm = 0;
                setRides({});
                setKmStartOfMonth(0);
            }
            // Reset loading flag after state updates
            setTimeout({
                "Home.useEffect": ()=>{
                    isLoadingMonthRef.current = false;
                }
            }["Home.useEffect"], 100);
        }
    }["Home.useEffect"], [
        currentMonthKey,
        allMonthsData
    ]);
    // Auto-show PURPOSE field for rides with existing data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const newShowPurpose = {};
            Object.keys(rides).forEach({
                "Home.useEffect": (day)=>{
                    rides[day].forEach({
                        "Home.useEffect": (ride)=>{
                            if (ride.purpose) {
                                newShowPurpose[ride.id] = true;
                            }
                        }
                    }["Home.useEffect"]);
                }
            }["Home.useEffect"]);
            setShowPurposeForRide(newShowPurpose);
        }
    }["Home.useEffect"], [
        rides
    ]);
    // Save to Server on change (debounced)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            // Skip save if we're currently loading month data
            if (isLoadingMonthRef.current || !isInitialLoadComplete) {
                return;
            }
            // Clear any pending save
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
            // Debounce save to prevent rapid requests
            saveTimeoutRef.current = setTimeout({
                "Home.useEffect": async ()=>{
                    try {
                        let monthRidesTotal = 0;
                        Object.values(rides).forEach({
                            "Home.useEffect": (dayArr)=>{
                                dayArr.forEach({
                                    "Home.useEffect": (r)=>monthRidesTotal += parseFloat(r.distanceKm) || 0
                                }["Home.useEffect"]);
                            }
                        }["Home.useEffect"]);
                        const updatedAllMonths = {
                            ...allMonthsData,
                            [currentMonthKey]: {
                                ...allMonthsData[currentMonthKey],
                                rides,
                                kmStartOfMonth: parseFloat(kmStartOfMonth) || 0
                            }
                        };
                        if (("TURBOPACK compile-time value", "object") !== 'undefined' && window.electronAPI) {
                            await window.electronAPI.saveData({
                                months: updatedAllMonths,
                                homeAddress,
                                homeCoords
                            });
                        } else {
                            await fetch('/api/data', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    months: updatedAllMonths,
                                    homeAddress,
                                    homeCoords
                                })
                            });
                        }
                        // Update local cache to allow seamless month switching without reload
                        setAllMonthsData(updatedAllMonths);
                    } catch (e) {
                        console.error('Save failed:', e);
                    }
                }
            }["Home.useEffect"], 1000);
            return ({
                "Home.useEffect": ()=>{
                    if (saveTimeoutRef.current) {
                        clearTimeout(saveTimeoutRef.current);
                    }
                }
            })["Home.useEffect"];
        }
    }["Home.useEffect"], [
        rides,
        kmStartOfMonth,
        currentMonthKey,
        isInitialLoadComplete,
        allMonthsData,
        homeAddress,
        homeCoords
    ]);
    // Click outside to close calendar
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const handleClickOutside = {
                "Home.useEffect.handleClickOutside": (event)=>{
                    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                        setIsCalendarOpen(false);
                    }
                }
            }["Home.useEffect.handleClickOutside"];
            if (isCalendarOpen) {
                document.addEventListener('mousedown', handleClickOutside);
            }
            return ({
                "Home.useEffect": ()=>{
                    document.removeEventListener('mousedown', handleClickOutside);
                }
            })["Home.useEffect"];
        }
    }["Home.useEffect"], [
        isCalendarOpen
    ]);
    // Click outside to close home editing
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const handleClickOutside = {
                "Home.useEffect.handleClickOutside": (event)=>{
                    const isIconClick = homeRef.current && homeRef.current.contains(event.target);
                    const isEditRowClick = homeEditRef.current && homeEditRef.current.contains(event.target);
                    if (!isIconClick && !isEditRowClick) {
                        setIsEditingHome(false);
                    }
                }
            }["Home.useEffect.handleClickOutside"];
            if (isEditingHome) {
                document.addEventListener('mousedown', handleClickOutside);
            }
            return ({
                "Home.useEffect": ()=>{
                    document.removeEventListener('mousedown', handleClickOutside);
                }
            })["Home.useEffect"];
        }
    }["Home.useEffect"], [
        isEditingHome
    ]);
    const fetchRouteInfo = async (coordsA, coordsB, waypoints = [])=>{
        if (!coordsA || !coordsB) return {
            distance: 0,
            duration: 0
        };
        try {
            // Build coordinate string with all points
            let coordsList = [
                `${coordsA.lon},${coordsA.lat}`
            ];
            // Add valid waypoint coordinates
            if (waypoints && waypoints.length > 0) {
                waypoints.forEach((wp)=>{
                    if (wp.coords) {
                        coordsList.push(`${wp.coords.lon},${wp.coords.lat}`);
                    }
                });
            }
            coordsList.push(`${coordsB.lon},${coordsB.lat}`);
            const coordString = coordsList.join(';');
            const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${coordString}?overview=false`);
            const data = await response.json();
            if (data.routes && data.routes[0]) {
                return {
                    distance: Math.round(data.routes[0].distance / 1000 * 10) / 10,
                    duration: Math.round(data.routes[0].duration / 60)
                };
            }
        } catch (error) {
            console.error('Error fetching route:', error);
        }
        return {
            distance: 0,
            duration: 0
        };
    };
    const addMinutesToTime = (timeStr, minutes)=>{
        if (!timeStr || !timeStr.includes(':')) return '';
        const [h, m] = timeStr.split(':').map(Number);
        const date = new Date();
        date.setHours(h);
        date.setMinutes(m + minutes);
        return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    };
    // Sort rides for UI calculation (grouping order, added at the bottom)
    const ridesChronological = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[ridesChronological]": ()=>{
            const flatRides = [];
            const days = Object.keys(rides);
            // We don't sort days globally for the UI if the user wants "as added"
            // But usually logbook days are expected to be in order.
            // However, the user said "do not sort anything inplace... always add it to the botom".
            // This implies that as they add rides across days, the cumulative KM continues.
            // Let's collect ALL rides first
            const allRidesRaw = [];
            Object.keys(rides).forEach({
                "Home.useMemo[ridesChronological]": (day)=>{
                    (rides[day] || []).forEach({
                        "Home.useMemo[ridesChronological]": (r)=>allRidesRaw.push({
                                ...r,
                                day: parseInt(day)
                            })
                    }["Home.useMemo[ridesChronological]"]);
                }
            }["Home.useMemo[ridesChronological]"]);
            // Separate parents and children
            const parents = allRidesRaw.filter({
                "Home.useMemo[ridesChronological].parents": (r)=>!r.parentId
            }["Home.useMemo[ridesChronological].parents"]).sort({
                "Home.useMemo[ridesChronological].parents": (a, b)=>a.id - b.id
            }["Home.useMemo[ridesChronological].parents"]);
            const children = allRidesRaw.filter({
                "Home.useMemo[ridesChronological].children": (r)=>r.parentId
            }["Home.useMemo[ridesChronological].children"]);
            parents.forEach({
                "Home.useMemo[ridesChronological]": (parent)=>{
                    flatRides.push(parent);
                    const child = children.find({
                        "Home.useMemo[ridesChronological].child": (c)=>c.parentId === parent.id
                    }["Home.useMemo[ridesChronological].child"]);
                    if (child) {
                        flatRides.push(child);
                    }
                }
            }["Home.useMemo[ridesChronological]"]);
            // Safety for orphans
            children.forEach({
                "Home.useMemo[ridesChronological]": (child)=>{
                    if (!flatRides.find({
                        "Home.useMemo[ridesChronological]": (r)=>r.id === child.id
                    }["Home.useMemo[ridesChronological]"])) {
                        flatRides.push(child);
                    }
                }
            }["Home.useMemo[ridesChronological]"]);
            return flatRides;
        }
    }["Home.useMemo[ridesChronological]"], [
        rides
    ]);
    // No longer calculating KM Before/After
    const activeDayTotalKm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[activeDayTotalKm]": ()=>{
            return (rides[activeDay] || []).reduce({
                "Home.useMemo[activeDayTotalKm]": (sum, r)=>sum + (parseFloat(r.distanceKm) || 0)
            }["Home.useMemo[activeDayTotalKm]"], 0);
        }
    }["Home.useMemo[activeDayTotalKm]"], [
        rides,
        activeDay
    ]);
    const monthlyTotalKm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[monthlyTotalKm]": ()=>{
            return ridesChronological.reduce({
                "Home.useMemo[monthlyTotalKm]": (sum, r)=>sum + (parseFloat(r.distanceKm) || 0)
            }["Home.useMemo[monthlyTotalKm]"], 0);
        }
    }["Home.useMemo[monthlyTotalKm]"], [
        ridesChronological
    ]);
    // Group by day and keep chronological order for display
    const chainedRidesMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[chainedRidesMap]": ()=>{
            const map = {};
            ridesChronological.forEach({
                "Home.useMemo[chainedRidesMap]": (ride)=>{
                    if (!map[ride.day]) map[ride.day] = [];
                    map[ride.day].push(ride);
                }
            }["Home.useMemo[chainedRidesMap]"]);
            return map;
        }
    }["Home.useMemo[chainedRidesMap]"], [
        ridesChronological
    ]);
    const addRide = (day)=>{
        const newRide = {
            id: Date.now(),
            from: '',
            to: '',
            pointA: '',
            pointB: '',
            waypoints: [],
            purpose: '',
            distanceKm: 0,
            coordsA: null,
            coordsB: null,
            isManualDistance: false
        };
        setRides((prev)=>({
                ...prev,
                [day]: [
                    ...prev[day] || [],
                    newRide
                ] // Add to end (bottom)
            }));
    };
    const updateRide = async (day, id, field, value, coords = null)=>{
        const currentDayRides = rides[day] || [];
        const rideIndex = currentDayRides.findIndex((r)=>r.id === id);
        if (rideIndex === -1) return;
        const currentRide = currentDayRides[rideIndex];
        let updates = {};
        // Handle discrete waypoint operations or general fields
        if (field === 'addWaypoint') {
            updates.waypoints = [
                ...currentRide.waypoints || [],
                {
                    id: Date.now(),
                    name: '',
                    coords: null
                }
            ];
        } else if (field === 'removeWaypoint') {
            const newWps = [
                ...currentRide.waypoints || []
            ];
            newWps.splice(value, 1); // value is the index
            updates.waypoints = newWps;
        } else if (field === 'updateWaypoint') {
            const { index, name, coords: wpCoords } = value;
            const newWps = [
                ...currentRide.waypoints || []
            ];
            newWps[index] = {
                ...newWps[index],
                name,
                coords: wpCoords
            };
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
        const triggersRecalc = field === 'pointA' || field === 'pointB' || field === 'from' || field === 'addWaypoint' || field === 'removeWaypoint' || field === 'updateWaypoint';
        if (triggersRecalc) {
            const cA = updates.coordsA !== undefined ? updates.coordsA : currentRide.coordsA;
            const cB = updates.coordsB !== undefined ? updates.coordsB : currentRide.coordsB;
            const wps = updates.waypoints !== undefined ? updates.waypoints : currentRide.waypoints || [];
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
        setRides((prev)=>{
            const prevDayRides = [
                ...prev[day] || []
            ];
            const idx = prevDayRides.findIndex((r)=>r.id === id);
            if (idx === -1) return prev;
            prevDayRides[idx] = {
                ...prevDayRides[idx],
                ...updates
            };
            return {
                ...prev,
                [day]: prevDayRides
            };
        });
    };
    const handleSuggestReturn = (ride)=>{
        const returnRide = {
            id: Date.now() + 1,
            from: '',
            to: '',
            pointA: ride.pointB,
            pointB: ride.pointA,
            waypoints: (ride.waypoints || []).map((wp)=>({
                    ...wp,
                    id: Date.now() + Math.random()
                })).reverse(),
            purpose: ride.purpose || '',
            coordsA: ride.coordsB,
            coordsB: ride.coordsA,
            distanceKm: ride.distanceKm,
            isManualDistance: false,
            parentId: ride.id
        };
        setRides((prev)=>({
                ...prev,
                [activeDay]: [
                    ...prev[activeDay] || [],
                    returnRide
                ]
            }));
    };
    const deleteRide = (day, id)=>{
        setRides((prev)=>{
            const dayRides = prev[day] || [];
            const toDeleteIds = [
                id,
                ...dayRides.filter((r)=>r.parentId === id).map((r)=>r.id)
            ];
            return {
                ...prev,
                [day]: dayRides.filter((ride)=>!toDeleteIds.includes(ride.id))
            };
        });
    };
    const exportExcel = ()=>{
        const monthStr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(currentMonth, 'yyyy-MM');
        const monthName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(currentMonth, 'MMMM yyyy');
        // Sort chronologically for export: by day, then by "from" time
        const exportRides = [];
        const sortedDays = Object.keys(rides).sort((a, b)=>parseInt(a) - parseInt(b));
        sortedDays.forEach((day)=>{
            const dayRides = [
                ...rides[day] || []
            ];
            // Sort by "from" time within the day
            dayRides.sort((a, b)=>{
                if (!a.from) return 1;
                if (!b.from) return -1;
                return a.from.localeCompare(b.from);
            });
            dayRides.forEach((r)=>exportRides.push({
                    ...r,
                    day: parseInt(day)
                }));
        });
        let runningKm = parseFloat(kmStartOfMonth) || 0;
        const data = exportRides.map((ride)=>{
            const kmBefore = runningKm;
            const kmAfter = kmBefore + (parseFloat(ride.distanceKm) || 0);
            runningKm = kmAfter;
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), ride.day);
            return {
                'Date': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(date, 'dd/MM/yyyy'),
                'Day': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(date, 'EEEE'),
                'From': ride.from,
                'To': ride.to,
                'Start Point': ride.pointA,
                'End Point': ride.pointB,
                'Travel Purpose': ride.purpose || '',
                'Distance (km)': ride.distanceKm,
                'KM Before': kmBefore.toFixed(1),
                'KM After': kmAfter.toFixed(1)
            };
        });
        // Create workbook and worksheet
        const wb = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].book_new();
        const ws = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].json_to_sheet(data);
        // Set column widths
        ws['!cols'] = [
            {
                wch: 12
            },
            {
                wch: 12
            },
            {
                wch: 8
            },
            {
                wch: 8
            },
            {
                wch: 30
            },
            {
                wch: 30
            },
            {
                wch: 30
            },
            {
                wch: 12
            },
            {
                wch: 12
            },
            {
                wch: 12
            } // KM After
        ];
        // Add worksheet to workbook
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].book_append_sheet(wb, ws, monthName);
        // Generate Excel file and download
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeFile"](wb, `rides_${monthStr}.xlsx`);
    };
    const lastDay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$endOfMonth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endOfMonth"])(currentMonth).getDate();
    const daysArray = Array.from({
        length: lastDay
    }, (_, i)=>i + 1);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "animate-fade-in",
        style: {
            paddingBottom: '5rem'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                style: {
                    marginBottom: '2rem'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '1.5rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "gradient-text",
                                style: {
                                    fontSize: '2rem'
                                },
                                children: "Ride Evidence"
                            }, void 0, false, {
                                fileName: "[project]/app/page.jsx",
                                lineNumber: 526,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: '0.75rem',
                                    alignItems: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: homeRef,
                                        className: "glass",
                                        style: {
                                            padding: '0.5rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            borderColor: homeAddress ? 'var(--success)' : isEditingHome ? 'var(--accent-primary)' : 'var(--border-color)',
                                            transition: 'all 0.2s ease',
                                            background: isEditingHome ? 'rgba(var(--accent-primary-rgb), 0.1)' : 'transparent',
                                            boxShadow: homeAddress ? '0 0 15px rgba(16, 185, 129, 0.2)' : 'none'
                                        },
                                        onClick: ()=>setIsEditingHome(!isEditingHome),
                                        title: homeAddress ? `Home: ${homeAddress}` : "Set Home Address",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                            size: 18,
                                            style: {
                                                color: homeAddress ? 'var(--success)' : 'var(--text-secondary)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.jsx",
                                            lineNumber: 545,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.jsx",
                                        lineNumber: 528,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "glass",
                                        style: {
                                            padding: '0.4rem 0.75rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            border: !kmStartOfMonth ? '2px solid var(--danger)' : '1px solid var(--border-color)',
                                            background: !kmStartOfMonth ? 'rgba(239, 68, 68, 0.05)' : 'transparent'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gauge$3e$__["Gauge"], {
                                                size: 16,
                                                style: {
                                                    color: !kmStartOfMonth ? 'var(--danger)' : 'var(--accent-primary)'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.jsx",
                                                lineNumber: 556,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                inputMode: "decimal",
                                                className: "input-base",
                                                style: {
                                                    width: '80px',
                                                    border: 'none',
                                                    background: 'transparent',
                                                    padding: '0.25rem',
                                                    fontSize: '1rem',
                                                    fontWeight: 600
                                                },
                                                value: kmStartOfMonth === 0 ? '' : kmStartOfMonth,
                                                onChange: (e)=>{
                                                    const val = e.target.value.replace(/[^0-9.]/g, '');
                                                    if (val === '' || val === '.') {
                                                        setKmStartOfMonth(0);
                                                    } else {
                                                        const parsed = parseFloat(val) || 0;
                                                        setKmStartOfMonth(parsed);
                                                    }
                                                },
                                                placeholder: "Required"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.jsx",
                                                lineNumber: 557,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: '0.75rem',
                                                    color: !kmStartOfMonth ? 'var(--danger)' : 'var(--text-secondary)',
                                                    fontWeight: 600
                                                },
                                                children: "km"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.jsx",
                                                lineNumber: 574,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.jsx",
                                        lineNumber: 548,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "primary",
                                        onClick: exportExcel,
                                        style: {
                                            opacity: !kmStartOfMonth ? 0.5 : 1,
                                            cursor: !kmStartOfMonth ? 'not-allowed' : 'pointer'
                                        },
                                        title: !kmStartOfMonth ? "Please fill KM Start first" : "Export to Excel",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.jsx",
                                                lineNumber: 582,
                                                columnNumber: 15
                                            }, this),
                                            " Export"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.jsx",
                                        lineNumber: 576,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.jsx",
                                lineNumber: 527,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.jsx",
                        lineNumber: 525,
                        columnNumber: 9
                    }, this),
                    isEditingHome && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: homeEditRef,
                        className: "glass animate-fade-in",
                        style: {
                            padding: '0.75rem 1rem',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            maxWidth: '500px',
                            marginLeft: 'auto',
                            position: 'relative',
                            zIndex: activeFieldId === 'home-address' ? 200 : 10
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: 'var(--accent-primary)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.jsx",
                                        lineNumber: 604,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            whiteSpace: 'nowrap'
                                        },
                                        children: "SET HOME"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.jsx",
                                        lineNumber: 605,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.jsx",
                                lineNumber: 603,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LocationAutocomplete$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    id: "home-address",
                                    value: homeAddress,
                                    onChange: (val)=>setHomeAddress(val),
                                    onSelectCoord: (name, coords)=>{
                                        setHomeAddress(name);
                                        setHomeCoords(coords);
                                        setIsEditingHome(false);
                                    },
                                    onFocus: ()=>setActiveFieldId('home-address'),
                                    onBlur: ()=>setActiveFieldId(null),
                                    placeholder: "Search address..."
                                }, void 0, false, {
                                    fileName: "[project]/app/page.jsx",
                                    lineNumber: 608,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.jsx",
                                lineNumber: 607,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.jsx",
                        lineNumber: 588,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: '1rem',
                            alignItems: 'center',
                            marginBottom: '1.5rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "calendar-popover-container",
                                ref: calendarRef,
                                style: {
                                    flex: 1
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "glass",
                                        style: {
                                            height: '56px',
                                            padding: '0 1rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            cursor: 'pointer',
                                            borderColor: isCalendarOpen ? 'var(--accent-primary)' : 'var(--border-color)',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                        },
                                        onClick: ()=>setIsCalendarOpen(!isCalendarOpen),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "secondary",
                                                style: {
                                                    padding: '0.3rem'
                                                },
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    setCurrentMonth((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subMonths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subMonths"])(currentMonth, 1));
                                                    setActiveDay(1);
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.jsx",
                                                    lineNumber: 642,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.jsx",
                                                lineNumber: 641,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    flex: 1,
                                                    justifyContent: 'center'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                        size: 18,
                                                        style: {
                                                            color: isCalendarOpen ? 'var(--accent-primary)' : 'var(--text-secondary)'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.jsx",
                                                        lineNumber: 645,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        style: {
                                                            fontSize: '1.1rem',
                                                            fontWeight: 600
                                                        },
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(currentMonth, 'MMMM yyyy')
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.jsx",
                                                        lineNumber: 646,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.jsx",
                                                lineNumber: 644,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "secondary",
                                                style: {
                                                    padding: '0.3rem'
                                                },
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    setCurrentMonth((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(currentMonth, 1));
                                                    setActiveDay(1);
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.jsx",
                                                    lineNumber: 651,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.jsx",
                                                lineNumber: 650,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.jsx",
                                        lineNumber: 627,
                                        columnNumber: 13
                                    }, this),
                                    isCalendarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "calendar-popover",
                                        style: {
                                            top: '65px',
                                            left: 0,
                                            right: 0,
                                            margin: '0 auto',
                                            maxWidth: '400px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "calendar-header-days",
                                                children: [
                                                    'Mon',
                                                    'Tue',
                                                    'Wed',
                                                    'Thu',
                                                    'Fri',
                                                    'Sat',
                                                    'Sun'
                                                ].map((day)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "calendar-header-day",
                                                        children: day
                                                    }, day, false, {
                                                        fileName: "[project]/app/page.jsx",
                                                        lineNumber: 659,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.jsx",
                                                lineNumber: 657,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "calendar-grid",
                                                children: [
                                                    Array.from({
                                                        length: ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfMonth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfMonth"])(currentMonth).getDay() + 6) % 7
                                                    }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                background: 'transparent',
                                                                border: 'none'
                                                            }
                                                        }, `empty-${i}`, false, {
                                                            fileName: "[project]/app/page.jsx",
                                                            lineNumber: 665,
                                                            columnNumber: 21
                                                        }, this)),
                                                    daysArray.map((day)=>{
                                                        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                                                        const dayName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(date, 'EEE');
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `day-cell ${day === activeDay ? 'active' : ''} ${rides[day]?.length > 0 ? 'has-data' : ''}`,
                                                            onClick: ()=>{
                                                                setActiveDay(day);
                                                                setIsCalendarOpen(false);
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "day-name",
                                                                    children: dayName
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.jsx",
                                                                    lineNumber: 680,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "day-number",
                                                                    children: day
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.jsx",
                                                                    lineNumber: 681,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, day, true, {
                                                            fileName: "[project]/app/page.jsx",
                                                            lineNumber: 672,
                                                            columnNumber: 23
                                                        }, this);
                                                    })
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.jsx",
                                                lineNumber: 663,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.jsx",
                                        lineNumber: 656,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.jsx",
                                lineNumber: 626,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: '1rem',
                                    alignItems: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "glass",
                                        style: {
                                            height: '56px',
                                            padding: '0 1.25rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            border: '1px solid rgba(var(--accent-primary-rgb), 0.3)',
                                            background: 'rgba(var(--accent-primary-rgb), 0.05)'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                flexDirection: 'column'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: '0.65rem',
                                                        color: 'var(--text-secondary)',
                                                        fontWeight: 700,
                                                        letterSpacing: '0.05em'
                                                    },
                                                    children: "MONTH TOTAL"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.jsx",
                                                    lineNumber: 693,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'baseline',
                                                        gap: '0.4rem'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: '1.25rem',
                                                                fontWeight: 800,
                                                                color: 'var(--accent-primary)'
                                                            },
                                                            children: monthlyTotalKm.toFixed(1)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.jsx",
                                                            lineNumber: 695,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: '0.75rem',
                                                                color: 'var(--text-secondary)',
                                                                fontWeight: 600
                                                            },
                                                            children: "km"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.jsx",
                                                            lineNumber: 696,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.jsx",
                                                    lineNumber: 694,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.jsx",
                                            lineNumber: 692,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.jsx",
                                        lineNumber: 691,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "glass",
                                        style: {
                                            height: '56px',
                                            padding: '0 1.25rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            border: '1px solid rgba(var(--accent-secondary-rgb), 0.3)',
                                            background: 'rgba(var(--accent-secondary-rgb), 0.05)'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                flexDirection: 'column'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: '0.65rem',
                                                        color: 'var(--text-secondary)',
                                                        fontWeight: 700,
                                                        letterSpacing: '0.05em'
                                                    },
                                                    children: "DAY TOTAL"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.jsx",
                                                    lineNumber: 704,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'baseline',
                                                        gap: '0.4rem'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: '1.25rem',
                                                                fontWeight: 800,
                                                                color: 'var(--accent-secondary)'
                                                            },
                                                            children: activeDayTotalKm.toFixed(1)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.jsx",
                                                            lineNumber: 706,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: '0.75rem',
                                                                color: 'var(--text-secondary)',
                                                                fontWeight: 600
                                                            },
                                                            children: "km"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.jsx",
                                                            lineNumber: 707,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.jsx",
                                                    lineNumber: 705,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.jsx",
                                            lineNumber: 703,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.jsx",
                                        lineNumber: 702,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.jsx",
                                lineNumber: 690,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.jsx",
                        lineNumber: 625,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.jsx",
                lineNumber: 524,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "glass animate-fade-in",
                    style: {
                        padding: '2rem'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '2rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    style: {
                                        fontSize: '1.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                background: 'var(--accent-primary)',
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            },
                                            children: activeDay
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.jsx",
                                            lineNumber: 719,
                                            columnNumber: 15
                                        }, this),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), activeDay), 'EEEE, MMMM do')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.jsx",
                                    lineNumber: 718,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "secondary",
                                    onClick: ()=>addRide(activeDay),
                                    style: {
                                        display: 'flex',
                                        gap: '0.5rem',
                                        alignItems: 'center'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.jsx",
                                            lineNumber: 725,
                                            columnNumber: 15
                                        }, this),
                                        " Add Ride"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.jsx",
                                    lineNumber: 724,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.jsx",
                            lineNumber: 717,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.5rem'
                            },
                            children: [
                                (!rides[activeDay] || rides[activeDay].length === 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        textAlign: 'center',
                                        padding: '3rem',
                                        opacity: 0.5
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__["Car"], {
                                            size: 48,
                                            style: {
                                                margin: '0 auto 1rem'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.jsx",
                                            lineNumber: 732,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: 'No rides for this day. Click "Add Ride" to begin.'
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.jsx",
                                            lineNumber: 733,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.jsx",
                                    lineNumber: 731,
                                    columnNumber: 15
                                }, this),
                                (chainedRidesMap[activeDay] || []).filter((r)=>!r.parentId).map((ride)=>{
                                    const childRide = (chainedRidesMap[activeDay] || []).find((c)=>c.parentId === ride.id);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "animate-fade-in",
                                        style: {
                                            background: 'rgba(255,255,255,0.02)',
                                            borderRadius: '1.25rem',
                                            border: '1px solid var(--border-color)',
                                            position: 'relative',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            marginBottom: '1rem'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    padding: '1.25rem',
                                                    position: 'relative'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            position: 'absolute',
                                                            top: '0.75rem',
                                                            right: '0.75rem',
                                                            zIndex: 10
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "secondary",
                                                            onClick: ()=>deleteRide(activeDay, ride.id),
                                                            style: {
                                                                color: 'var(--danger)',
                                                                height: '28px',
                                                                width: '28px',
                                                                padding: 0,
                                                                justifyContent: 'center',
                                                                background: 'rgba(239, 68, 68, 0.1)',
                                                                borderColor: 'rgba(239, 68, 68, 0.2)'
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                size: 12
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.jsx",
                                                                lineNumber: 759,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.jsx",
                                                            lineNumber: 754,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.jsx",
                                                        lineNumber: 753,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            position: 'relative',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: '0.75rem'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    gap: '1.25rem',
                                                                    alignItems: 'flex-end',
                                                                    position: 'relative',
                                                                    zIndex: activeFieldId === `ride-${ride.id}-pointA` ? 100 : 2
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            display: 'flex',
                                                                            flexDirection: 'column',
                                                                            gap: '0.3rem',
                                                                            width: '80px',
                                                                            flexShrink: 0
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                style: {
                                                                                    fontSize: '0.6rem',
                                                                                    color: 'var(--text-secondary)',
                                                                                    fontWeight: 800,
                                                                                    letterSpacing: '0.05em'
                                                                                },
                                                                                children: "DEPARTURE"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.jsx",
                                                                                lineNumber: 767,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SmartTimeInput$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                                id: `from-${ride.id}`,
                                                                                value: ride.from,
                                                                                onChange: (val)=>updateRide(activeDay, ride.id, 'from', val),
                                                                                onTab: ()=>document.getElementById(`pointA-${ride.id}`)?.focus()
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.jsx",
                                                                                lineNumber: 768,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.jsx",
                                                                        lineNumber: 766,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            display: 'flex',
                                                                            flexDirection: 'column',
                                                                            gap: '0.3rem',
                                                                            flex: 1
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                style: {
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'space-between',
                                                                                    minHeight: '18px'
                                                                                },
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    style: {
                                                                                        fontSize: '0.6rem',
                                                                                        color: 'var(--text-secondary)',
                                                                                        fontWeight: 800,
                                                                                        letterSpacing: '0.05em'
                                                                                    },
                                                                                    children: "START POINT"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/page.jsx",
                                                                                    lineNumber: 777,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.jsx",
                                                                                lineNumber: 776,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LocationAutocomplete$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                                id: `pointA-${ride.id}`,
                                                                                value: ride.pointA,
                                                                                onChange: (val)=>updateRide(activeDay, ride.id, 'pointA', val),
                                                                                onSelectCoord: (name, coords)=>updateRide(activeDay, ride.id, 'pointA', name, coords),
                                                                                onHomeClick: homeAddress ? ()=>updateRide(activeDay, ride.id, 'pointA', homeAddress, homeCoords) : null,
                                                                                onFocus: ()=>setActiveFieldId(`ride-${ride.id}-pointA`),
                                                                                onBlur: ()=>setActiveFieldId(null),
                                                                                placeholder: "Departure point..."
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.jsx",
                                                                                lineNumber: 779,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.jsx",
                                                                        lineNumber: 775,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.jsx",
                                                                lineNumber: 765,
                                                                columnNumber: 23
                                                            }, this),
                                                            (ride.waypoints || []).map((wp, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        display: 'flex',
                                                                        gap: '1.25rem',
                                                                        alignItems: 'flex-end',
                                                                        position: 'relative',
                                                                        zIndex: activeFieldId === `waypoint-${ride.id}-${wp.id}` ? 100 : 1
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                width: '80px',
                                                                                flexShrink: 0
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.jsx",
                                                                            lineNumber: 795,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                display: 'flex',
                                                                                flexDirection: 'column',
                                                                                gap: '0.3rem',
                                                                                flex: 1
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    style: {
                                                                                        display: 'flex',
                                                                                        alignItems: 'center',
                                                                                        justifyContent: 'space-between',
                                                                                        minHeight: '18px'
                                                                                    },
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                            style: {
                                                                                                fontSize: '0.6rem',
                                                                                                color: 'var(--text-secondary)',
                                                                                                fontWeight: 800,
                                                                                                letterSpacing: '0.05em'
                                                                                            },
                                                                                            children: [
                                                                                                "VIA (WAYPOINT ",
                                                                                                index + 1,
                                                                                                ")"
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/page.jsx",
                                                                                            lineNumber: 798,
                                                                                            columnNumber: 31
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                            onClick: ()=>updateRide(activeDay, ride.id, 'removeWaypoint', index),
                                                                                            style: {
                                                                                                background: 'none',
                                                                                                border: 'none',
                                                                                                color: 'var(--text-secondary)',
                                                                                                cursor: 'pointer',
                                                                                                fontSize: '0.7rem',
                                                                                                padding: '0',
                                                                                                opacity: 0.7
                                                                                            },
                                                                                            children: "✕"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/page.jsx",
                                                                                            lineNumber: 799,
                                                                                            columnNumber: 31
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/page.jsx",
                                                                                    lineNumber: 797,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LocationAutocomplete$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                                    id: `waypoint-${ride.id}-${wp.id}`,
                                                                                    value: wp.name,
                                                                                    onChange: (val)=>updateRide(activeDay, ride.id, 'updateWaypoint', {
                                                                                            index,
                                                                                            name: val,
                                                                                            coords: wp.coords
                                                                                        }),
                                                                                    onSelectCoord: (name, coords)=>updateRide(activeDay, ride.id, 'updateWaypoint', {
                                                                                            index,
                                                                                            name,
                                                                                            coords
                                                                                        }),
                                                                                    onHomeClick: homeAddress ? ()=>updateRide(activeDay, ride.id, 'updateWaypoint', {
                                                                                            index,
                                                                                            name: homeAddress,
                                                                                            coords: homeCoords
                                                                                        }) : null,
                                                                                    onFocus: ()=>setActiveFieldId(`waypoint-${ride.id}-${wp.id}`),
                                                                                    onBlur: ()=>setActiveFieldId(null),
                                                                                    placeholder: "Stopover point..."
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/page.jsx",
                                                                                    lineNumber: 804,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/page.jsx",
                                                                            lineNumber: 796,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, wp.id, true, {
                                                                    fileName: "[project]/app/page.jsx",
                                                                    lineNumber: 794,
                                                                    columnNumber: 25
                                                                }, this)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    paddingLeft: '80px'
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: "secondary",
                                                                    onClick: ()=>updateRide(activeDay, ride.id, 'addWaypoint'),
                                                                    style: {
                                                                        padding: '0.15rem 0.5rem',
                                                                        fontSize: '0.6rem',
                                                                        borderStyle: 'dashed',
                                                                        opacity: 0.5,
                                                                        marginLeft: '1.25rem'
                                                                    },
                                                                    children: "+ Add Waypoint"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.jsx",
                                                                    lineNumber: 819,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.jsx",
                                                                lineNumber: 818,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    gap: '1.25rem',
                                                                    alignItems: 'flex-end',
                                                                    position: 'relative',
                                                                    zIndex: activeFieldId === `ride-${ride.id}-pointB` ? 100 : 1
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            display: 'flex',
                                                                            flexDirection: 'column',
                                                                            gap: '0.3rem',
                                                                            width: '80px',
                                                                            flexShrink: 0
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                style: {
                                                                                    fontSize: '0.6rem',
                                                                                    color: 'var(--text-secondary)',
                                                                                    fontWeight: 800,
                                                                                    letterSpacing: '0.05em'
                                                                                },
                                                                                children: "ARRIVAL"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.jsx",
                                                                                lineNumber: 835,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SmartTimeInput$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                                id: `to-${ride.id}`,
                                                                                value: ride.to,
                                                                                onChange: (val)=>updateRide(activeDay, ride.id, 'to', val)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.jsx",
                                                                                lineNumber: 836,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.jsx",
                                                                        lineNumber: 834,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            display: 'flex',
                                                                            flexDirection: 'column',
                                                                            gap: '0.3rem',
                                                                            flex: 1
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                style: {
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'space-between',
                                                                                    minHeight: '18px'
                                                                                },
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    style: {
                                                                                        fontSize: '0.6rem',
                                                                                        color: 'var(--text-secondary)',
                                                                                        fontWeight: 800,
                                                                                        letterSpacing: '0.05em'
                                                                                    },
                                                                                    children: "END POINT"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/page.jsx",
                                                                                    lineNumber: 844,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.jsx",
                                                                                lineNumber: 843,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LocationAutocomplete$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                                id: `pointB-${ride.id}`,
                                                                                value: ride.pointB,
                                                                                onChange: (val)=>updateRide(activeDay, ride.id, 'pointB', val),
                                                                                onSelectCoord: (name, coords)=>updateRide(activeDay, ride.id, 'pointB', name, coords),
                                                                                onHomeClick: homeAddress ? ()=>updateRide(activeDay, ride.id, 'pointB', homeAddress, homeCoords) : null,
                                                                                onFocus: ()=>setActiveFieldId(`ride-${ride.id}-pointB`),
                                                                                onBlur: ()=>setActiveFieldId(null),
                                                                                placeholder: "Destination point..."
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.jsx",
                                                                                lineNumber: 846,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.jsx",
                                                                        lineNumber: 842,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.jsx",
                                                                lineNumber: 833,
                                                                columnNumber: 23
                                                            }, this),
                                                            showPurposeForRide[ride.id] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    paddingLeft: '92.5px'
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        gap: '0.3rem'
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'space-between'
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    style: {
                                                                                        fontSize: '0.6rem',
                                                                                        color: 'var(--text-secondary)',
                                                                                        fontWeight: 800,
                                                                                        letterSpacing: '0.05em'
                                                                                    },
                                                                                    children: "PURPOSE"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/page.jsx",
                                                                                    lineNumber: 864,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                    onClick: ()=>{
                                                                                        setShowPurposeForRide((prev)=>({
                                                                                                ...prev,
                                                                                                [ride.id]: false
                                                                                            }));
                                                                                        updateRide(activeDay, ride.id, 'purpose', '');
                                                                                    },
                                                                                    style: {
                                                                                        background: 'none',
                                                                                        border: 'none',
                                                                                        color: 'var(--text-secondary)',
                                                                                        cursor: 'pointer',
                                                                                        fontSize: '0.7rem',
                                                                                        padding: '0',
                                                                                        opacity: 0.7
                                                                                    },
                                                                                    children: "✕"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/page.jsx",
                                                                                    lineNumber: 865,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/page.jsx",
                                                                            lineNumber: 863,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "text",
                                                                            className: "input-base",
                                                                            style: {
                                                                                padding: '0.45rem 0.6rem',
                                                                                fontSize: '0.8rem'
                                                                            },
                                                                            value: ride.purpose || '',
                                                                            onChange: (e)=>updateRide(activeDay, ride.id, 'purpose', e.target.value),
                                                                            placeholder: "e.g., Client meeting..."
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.jsx",
                                                                            lineNumber: 873,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/page.jsx",
                                                                    lineNumber: 862,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.jsx",
                                                                lineNumber: 861,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.jsx",
                                                        lineNumber: 763,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            marginTop: '1.25rem',
                                                            borderTop: '1px solid rgba(255,255,255,0.05)',
                                                            paddingTop: '1rem'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    gap: '0.5rem',
                                                                    alignItems: 'center'
                                                                },
                                                                children: [
                                                                    !childRide && ride.pointA && ride.pointB && ride.from && ride.distanceKm > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        className: "secondary",
                                                                        onClick: ()=>handleSuggestReturn(ride),
                                                                        style: {
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
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                                                size: 12
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.jsx",
                                                                                lineNumber: 906,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            " Add Return"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.jsx",
                                                                        lineNumber: 890,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    !showPurposeForRide[ride.id] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        className: "secondary",
                                                                        onClick: ()=>setShowPurposeForRide((prev)=>({
                                                                                    ...prev,
                                                                                    [ride.id]: true
                                                                                })),
                                                                        style: {
                                                                            padding: '0.35rem 0.6rem',
                                                                            fontSize: '0.65rem',
                                                                            borderStyle: 'dashed',
                                                                            opacity: 0.7
                                                                        },
                                                                        children: "+ Add Purpose"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.jsx",
                                                                        lineNumber: 910,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.jsx",
                                                                lineNumber: 888,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '0.4rem',
                                                                    background: 'rgba(var(--accent-secondary-rgb), 0.1)',
                                                                    padding: '0.35rem 0.6rem',
                                                                    borderRadius: '0.75rem',
                                                                    border: '1px solid rgba(var(--accent-secondary-rgb), 0.2)'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        style: {
                                                                            fontSize: '0.6rem',
                                                                            color: 'var(--text-secondary)',
                                                                            fontWeight: 800
                                                                        },
                                                                        children: "DISTANCE"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.jsx",
                                                                        lineNumber: 919,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "text",
                                                                        inputMode: "decimal",
                                                                        className: "input-base",
                                                                        style: {
                                                                            padding: '0.15rem 0.35rem',
                                                                            fontSize: '0.9rem',
                                                                            border: 'none',
                                                                            background: 'transparent',
                                                                            width: '45px',
                                                                            fontWeight: 800,
                                                                            textAlign: 'right',
                                                                            color: 'var(--accent-secondary)'
                                                                        },
                                                                        value: ride.distanceKm || '',
                                                                        onChange: (e)=>{
                                                                            const val = e.target.value.replace(/[^0-9.]/g, '');
                                                                            updateRide(activeDay, ride.id, 'distanceKm', val === '' ? 0 : parseFloat(val));
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.jsx",
                                                                        lineNumber: 920,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: '0.7rem',
                                                                            color: 'var(--text-secondary)',
                                                                            fontWeight: 700
                                                                        },
                                                                        children: "km"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.jsx",
                                                                        lineNumber: 940,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.jsx",
                                                                lineNumber: 918,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.jsx",
                                                        lineNumber: 887,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.jsx",
                                                lineNumber: 751,
                                                columnNumber: 19
                                            }, this),
                                            childRide ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: 'rgba(255,255,255,0.03)',
                                                    borderTop: '1px solid rgba(var(--accent-primary-rgb), 0.2)',
                                                    padding: '1rem',
                                                    marginLeft: '1.25rem',
                                                    marginRight: '1rem',
                                                    marginBottom: '1rem',
                                                    borderRadius: '1rem',
                                                    position: 'relative'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
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
                                                        },
                                                        children: "RETURN RIDE"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.jsx",
                                                        lineNumber: 957,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            position: 'absolute',
                                                            top: '0.6rem',
                                                            right: '0.6rem',
                                                            zIndex: 10
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "secondary",
                                                            onClick: ()=>deleteRide(activeDay, childRide.id),
                                                            style: {
                                                                color: 'var(--danger)',
                                                                height: '26px',
                                                                width: '26px',
                                                                padding: 0,
                                                                justifyContent: 'center',
                                                                background: 'rgba(239, 68, 68, 0.1)',
                                                                borderColor: 'rgba(239, 68, 68, 0.2)'
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                size: 10
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.jsx",
                                                                lineNumber: 978,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.jsx",
                                                            lineNumber: 973,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.jsx",
                                                        lineNumber: 972,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            position: 'relative',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: '0.6rem',
                                                            marginTop: '0.6rem'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    gap: '1.25rem',
                                                                    alignItems: 'flex-end',
                                                                    position: 'relative',
                                                                    zIndex: activeFieldId === `ride-${childRide.id}-pointA` ? 100 : 2
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            display: 'flex',
                                                                            flexDirection: 'column',
                                                                            gap: '0.3rem',
                                                                            width: '80px',
                                                                            flexShrink: 0
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                style: {
                                                                                    fontSize: '0.6rem',
                                                                                    color: 'var(--text-secondary)',
                                                                                    fontWeight: 800,
                                                                                    letterSpacing: '0.05em'
                                                                                },
                                                                                children: "DEPARTURE"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.jsx",
                                                                                lineNumber: 986,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SmartTimeInput$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                                id: `from-${childRide.id}`,
                                                                                value: childRide.from,
                                                                                onChange: (val)=>updateRide(activeDay, childRide.id, 'from', val)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.jsx",
                                                                                lineNumber: 987,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.jsx",
                                                                        lineNumber: 985,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            display: 'flex',
                                                                            flexDirection: 'column',
                                                                            gap: '0.3rem',
                                                                            flex: 1
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                style: {
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'space-between',
                                                                                    minHeight: '18px',
                                                                                    paddingRight: '28px'
                                                                                },
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    style: {
                                                                                        fontSize: '0.6rem',
                                                                                        color: 'var(--text-secondary)',
                                                                                        fontWeight: 800,
                                                                                        letterSpacing: '0.05em'
                                                                                    },
                                                                                    children: "START POINT"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/page.jsx",
                                                                                    lineNumber: 995,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.jsx",
                                                                                lineNumber: 994,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LocationAutocomplete$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                                id: `pointA-${childRide.id}`,
                                                                                value: childRide.pointA,
                                                                                onChange: (val)=>updateRide(activeDay, childRide.id, 'pointA', val),
                                                                                onSelectCoord: (name, coords)=>updateRide(activeDay, childRide.id, 'pointA', name, coords),
                                                                                onHomeClick: homeAddress ? ()=>updateRide(activeDay, childRide.id, 'pointA', homeAddress, homeCoords) : null,
                                                                                onFocus: ()=>setActiveFieldId(`ride-${childRide.id}-pointA`),
                                                                                onBlur: ()=>setActiveFieldId(null),
                                                                                placeholder: "Departure point..."
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.jsx",
                                                                                lineNumber: 997,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.jsx",
                                                                        lineNumber: 993,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.jsx",
                                                                lineNumber: 984,
                                                                columnNumber: 25
                                                            }, this),
                                                            (childRide.waypoints || []).map((wp, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        display: 'flex',
                                                                        gap: '1.25rem',
                                                                        alignItems: 'flex-end',
                                                                        position: 'relative',
                                                                        zIndex: activeFieldId === `waypoint-${childRide.id}-${wp.id}` ? 100 : 1
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                width: '80px',
                                                                                flexShrink: 0
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.jsx",
                                                                            lineNumber: 1013,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                display: 'flex',
                                                                                flexDirection: 'column',
                                                                                gap: '0.3rem',
                                                                                flex: 1
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    style: {
                                                                                        display: 'flex',
                                                                                        alignItems: 'center',
                                                                                        justifyContent: 'space-between',
                                                                                        minHeight: '18px'
                                                                                    },
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                            style: {
                                                                                                fontSize: '0.6rem',
                                                                                                color: 'var(--text-secondary)',
                                                                                                fontWeight: 800,
                                                                                                letterSpacing: '0.05em'
                                                                                            },
                                                                                            children: [
                                                                                                "VIA (WAYPOINT ",
                                                                                                index + 1,
                                                                                                ")"
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/page.jsx",
                                                                                            lineNumber: 1016,
                                                                                            columnNumber: 33
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                            onClick: ()=>updateRide(activeDay, childRide.id, 'removeWaypoint', index),
                                                                                            style: {
                                                                                                background: 'none',
                                                                                                border: 'none',
                                                                                                color: 'var(--text-secondary)',
                                                                                                cursor: 'pointer',
                                                                                                fontSize: '0.7rem',
                                                                                                padding: '0',
                                                                                                opacity: 0.7
                                                                                            },
                                                                                            children: "✕"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/page.jsx",
                                                                                            lineNumber: 1017,
                                                                                            columnNumber: 33
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/page.jsx",
                                                                                    lineNumber: 1015,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LocationAutocomplete$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                                    id: `waypoint-${childRide.id}-${wp.id}`,
                                                                                    value: wp.name,
                                                                                    onChange: (val)=>updateRide(activeDay, childRide.id, 'updateWaypoint', {
                                                                                            index,
                                                                                            name: val,
                                                                                            coords: wp.coords
                                                                                        }),
                                                                                    onSelectCoord: (name, coords)=>updateRide(activeDay, childRide.id, 'updateWaypoint', {
                                                                                            index,
                                                                                            name,
                                                                                            coords
                                                                                        }),
                                                                                    onHomeClick: homeAddress ? ()=>updateRide(activeDay, childRide.id, 'updateWaypoint', {
                                                                                            index,
                                                                                            name: homeAddress,
                                                                                            coords: homeCoords
                                                                                        }) : null,
                                                                                    onFocus: ()=>setActiveFieldId(`waypoint-${childRide.id}-${wp.id}`),
                                                                                    onBlur: ()=>setActiveFieldId(null),
                                                                                    placeholder: "Stopover point..."
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/page.jsx",
                                                                                    lineNumber: 1022,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/page.jsx",
                                                                            lineNumber: 1014,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, wp.id, true, {
                                                                    fileName: "[project]/app/page.jsx",
                                                                    lineNumber: 1012,
                                                                    columnNumber: 27
                                                                }, this)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    paddingLeft: '80px'
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: "secondary",
                                                                    onClick: ()=>updateRide(activeDay, childRide.id, 'addWaypoint'),
                                                                    style: {
                                                                        padding: '0.15rem 0.5rem',
                                                                        fontSize: '0.6rem',
                                                                        borderStyle: 'dashed',
                                                                        opacity: 0.5,
                                                                        marginLeft: '1.25rem'
                                                                    },
                                                                    children: "+ Add Waypoint"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.jsx",
                                                                    lineNumber: 1037,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.jsx",
                                                                lineNumber: 1036,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    gap: '1.25rem',
                                                                    alignItems: 'flex-end',
                                                                    position: 'relative',
                                                                    zIndex: activeFieldId === `ride-${childRide.id}-pointB` ? 100 : 1
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            display: 'flex',
                                                                            flexDirection: 'column',
                                                                            gap: '0.3rem',
                                                                            width: '80px',
                                                                            flexShrink: 0
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                style: {
                                                                                    fontSize: '0.6rem',
                                                                                    color: 'var(--text-secondary)',
                                                                                    fontWeight: 800,
                                                                                    letterSpacing: '0.05em'
                                                                                },
                                                                                children: "ARRIVAL"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.jsx",
                                                                                lineNumber: 1053,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SmartTimeInput$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                                id: `to-${childRide.id}`,
                                                                                value: childRide.to,
                                                                                onChange: (val)=>updateRide(activeDay, childRide.id, 'to', val)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.jsx",
                                                                                lineNumber: 1054,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.jsx",
                                                                        lineNumber: 1052,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            display: 'flex',
                                                                            flexDirection: 'column',
                                                                            gap: '0.3rem',
                                                                            flex: 1
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                style: {
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'space-between',
                                                                                    minHeight: '18px'
                                                                                },
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    style: {
                                                                                        fontSize: '0.6rem',
                                                                                        color: 'var(--text-secondary)',
                                                                                        fontWeight: 800,
                                                                                        letterSpacing: '0.05em'
                                                                                    },
                                                                                    children: "END POINT"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/page.jsx",
                                                                                    lineNumber: 1062,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.jsx",
                                                                                lineNumber: 1061,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LocationAutocomplete$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                                id: `pointB-${childRide.id}`,
                                                                                value: childRide.pointB,
                                                                                onChange: (val)=>updateRide(activeDay, childRide.id, 'pointB', val),
                                                                                onSelectCoord: (name, coords)=>updateRide(activeDay, childRide.id, 'pointB', name, coords),
                                                                                onHomeClick: homeAddress ? ()=>updateRide(activeDay, childRide.id, 'pointB', homeAddress, homeCoords) : null,
                                                                                onFocus: ()=>setActiveFieldId(`ride-${childRide.id}-pointB`),
                                                                                onBlur: ()=>setActiveFieldId(null),
                                                                                placeholder: "Destination point..."
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.jsx",
                                                                                lineNumber: 1064,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.jsx",
                                                                        lineNumber: 1060,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.jsx",
                                                                lineNumber: 1051,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.jsx",
                                                        lineNumber: 982,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            marginTop: '1rem',
                                                            borderTop: '1px solid rgba(255,255,255,0.05)',
                                                            paddingTop: '0.75rem'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    gap: '0.4rem'
                                                                },
                                                                children: !showPurposeForRide[childRide.id] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: "secondary",
                                                                    onClick: ()=>setShowPurposeForRide((prev)=>({
                                                                                ...prev,
                                                                                [childRide.id]: true
                                                                            })),
                                                                    style: {
                                                                        padding: '0.3rem 0.5rem',
                                                                        fontSize: '0.6rem',
                                                                        borderStyle: 'dashed',
                                                                        opacity: 0.7
                                                                    },
                                                                    children: "+ Add Purpose"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.jsx",
                                                                    lineNumber: 1082,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.jsx",
                                                                lineNumber: 1080,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '0.4rem',
                                                                    background: 'rgba(var(--accent-secondary-rgb), 0.1)',
                                                                    padding: '0.3rem 0.5rem',
                                                                    borderRadius: '0.6rem',
                                                                    border: '1px solid rgba(var(--accent-secondary-rgb), 0.2)'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        style: {
                                                                            fontSize: '0.6rem',
                                                                            color: 'var(--text-secondary)',
                                                                            fontWeight: 800
                                                                        },
                                                                        children: "DISTANCE"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.jsx",
                                                                        lineNumber: 1091,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "text",
                                                                        inputMode: "decimal",
                                                                        className: "input-base",
                                                                        style: {
                                                                            padding: '0.15rem 0.3rem',
                                                                            fontSize: '0.9rem',
                                                                            border: 'none',
                                                                            background: 'transparent',
                                                                            width: '45px',
                                                                            fontWeight: 800,
                                                                            textAlign: 'right',
                                                                            color: 'var(--accent-secondary)'
                                                                        },
                                                                        value: childRide.distanceKm || '',
                                                                        onChange: (e)=>{
                                                                            const val = e.target.value.replace(/[^0-9.]/g, '');
                                                                            updateRide(activeDay, childRide.id, 'distanceKm', val === '' ? 0 : parseFloat(val));
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.jsx",
                                                                        lineNumber: 1092,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: '0.7rem',
                                                                            color: 'var(--text-secondary)',
                                                                            fontWeight: 700
                                                                        },
                                                                        children: "km"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.jsx",
                                                                        lineNumber: 1112,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.jsx",
                                                                lineNumber: 1090,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.jsx",
                                                        lineNumber: 1079,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.jsx",
                                                lineNumber: 947,
                                                columnNumber: 21
                                            }, this) : null
                                        ]
                                    }, ride.id, true, {
                                        fileName: "[project]/app/page.jsx",
                                        lineNumber: 741,
                                        columnNumber: 17
                                    }, this);
                                }),
                                (rides[activeDay] || []).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "secondary",
                                    onClick: ()=>addRide(activeDay),
                                    style: {
                                        display: 'flex',
                                        gap: '0.5rem',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '1rem',
                                        marginTop: '1.5rem',
                                        borderStyle: 'dashed',
                                        opacity: 0.8,
                                        width: '100%'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.jsx",
                                            lineNumber: 1136,
                                            columnNumber: 17
                                        }, this),
                                        " Add Another Ride"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.jsx",
                                    lineNumber: 1121,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.jsx",
                            lineNumber: 729,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.jsx",
                    lineNumber: 716,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.jsx",
                lineNumber: 715,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                style: {
                    marginTop: '3rem',
                    textAlign: 'center',
                    color: 'var(--text-secondary)',
                    fontSize: '0.8rem',
                    opacity: 0.5
                },
                children: [
                    "Total KM this month: ",
                    monthlyTotalKm.toFixed(1),
                    " km"
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.jsx",
                lineNumber: 1143,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.jsx",
        lineNumber: 523,
        columnNumber: 5
    }, this);
}
_s(Home, "05XFGem7BmSp4rYOjVLdJIU7A6A=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_a09ed271._.js.map