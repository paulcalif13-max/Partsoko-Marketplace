'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { POPULAR_VEHICLE_MAKES, VEHICLE_YEARS, VehicleSelection } from '@/lib/vehicleData';

interface PartScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVehicle?: VehicleSelection;
}

export default function PartScannerModal({ isOpen, onClose, initialVehicle }: PartScannerModalProps) {
  const { addToCart } = useCart();

  // Mode: 'UPLOAD' or 'CAMERA'
  const [activeTab, setActiveTab] = useState<'UPLOAD' | 'CAMERA'>('UPLOAD');
  
  // Image state
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  // Inputs
  const [partNumber, setPartNumber] = useState('');
  const [selectedMake, setSelectedMake] = useState(initialVehicle?.make || '');
  const [selectedModel, setSelectedModel] = useState(initialVehicle?.model || '');
  const [selectedYear, setSelectedYear] = useState(initialVehicle?.year || '');
  const [engineTrim, setEngineTrim] = useState(initialVehicle?.engineTrim || '');
  const [notes, setNotes] = useState('');
  const [rememberVehicle, setRememberVehicle] = useState(true);

  // Search Results
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any | null>(null);
  const [addedItemKey, setAddedItemKey] = useState<string | null>(null);

  // DOM Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Load saved vehicle on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('calree_saved_vehicle');
        if (saved && !selectedMake) {
          const parsed = JSON.parse(saved);
          if (parsed.make) setSelectedMake(parsed.make);
          if (parsed.model) setSelectedModel(parsed.model);
          if (parsed.year) setSelectedYear(parsed.year);
          if (parsed.engineTrim) setEngineTrim(parsed.engineTrim);
        }
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Update models list when make changes
  const availableModels = React.useMemo(() => {
    const found = POPULAR_VEHICLE_MAKES.find((m) => m.make.toLowerCase() === selectedMake.toLowerCase());
    return found ? found.popularModels : [];
  }, [selectedMake]);

  // Handle Camera activation
  useEffect(() => {
    if (isOpen && activeTab === 'CAMERA' && !capturedImage) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, activeTab, capturedImage]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraActive(true);
      }
    } catch (err: any) {
      console.error('Camera error:', err);
      setCameraError('Camera access unavailable or blocked. Please upload a photo instead.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const handleCaptureSnapshot = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setCapturedImage(dataUrl);
      stopCamera();
      
      // Auto-extract possible hints if partNumber empty
      if (!partNumber) {
        setNotes('Scanned part via camera viewfinder');
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setCapturedImage(dataUrl);

      // Check filename for part number patterns
      const filenameMatch = file.name.match(/\b([0-9]{5}-[0-9]{5}|[0-9A-Z]{6,12})\b/i);
      if (filenameMatch && !partNumber) {
        setPartNumber(filenameMatch[1].toUpperCase());
      }
    };
    reader.readAsDataURL(file);
  };

  const handleExecuteSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSearching(true);
    setSearchResults(null);

    // Save vehicle preference if checked
    if (rememberVehicle && selectedMake) {
      try {
        localStorage.setItem(
          'calree_saved_vehicle',
          JSON.stringify({
            make: selectedMake,
            model: selectedModel,
            year: selectedYear,
            engineTrim,
          })
        );
      } catch (err) {
        // ignore
      }
    }

    try {
      const res = await fetch('/api/parts/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: capturedImage,
          partNumber: partNumber.trim(),
          make: selectedMake,
          model: selectedModel,
          year: selectedYear,
          engineTrim,
          notes,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSearchResults(data);
        if (data.detectedPartNumber && !partNumber) {
          setPartNumber(data.detectedPartNumber);
        }
      } else {
        alert(data.message || 'Error scanning part');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while searching for part fitment.');
    } finally {
      setIsSearching(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fade-in">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-3xl w-full overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-slate-900 px-5 sm:px-6 py-4 flex items-center justify-between border-b border-slate-800 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-calreeGreen/20 border border-calreeGreen/40 flex items-center justify-center text-calreeGreen">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                CALREE Smart Part Scanner
                <span className="text-[10px] font-bold uppercase tracking-wider bg-calreeGreen/20 text-calreeGreen border border-calreeGreen/30 px-2 py-0.5 rounded">
                  Fitment Matcher
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Scan or upload a part photo, enter part number, and lock in exact vehicle compatibility.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            aria-label="Close Modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5">

          {/* STEP 1: SCAN OR UPLOAD PHOTO */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-calreeGreen text-[11px] inline-flex items-center justify-center font-black">
                  1
                </span>
                Scan or Upload Part Photo
              </label>

              {/* Mode Toggle Pills */}
              <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('UPLOAD');
                    stopCamera();
                  }}
                  className={`px-3 py-1 rounded-md transition ${
                    activeTab === 'UPLOAD' ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  📁 Upload Photo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('CAMERA');
                    setCapturedImage(null);
                  }}
                  className={`px-3 py-1 rounded-md transition flex items-center gap-1 ${
                    activeTab === 'CAMERA' ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-calreeGreen animate-pulse"></span>
                  📷 Live Scanner
                </button>
              </div>
            </div>

            {/* Viewfinder or Upload Area */}
            {activeTab === 'CAMERA' && !capturedImage ? (
              <div className="relative rounded-xl overflow-hidden bg-slate-950 border-2 border-dashed border-calreeGreen/60 aspect-video flex flex-col items-center justify-center shadow-inner">
                {cameraError ? (
                  <div className="p-4 text-center">
                    <p className="text-sm text-red-400 font-medium mb-2">{cameraError}</p>
                    <button
                      type="button"
                      onClick={() => setActiveTab('UPLOAD')}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-white font-bold px-3 py-1.5 rounded-lg"
                    >
                      Switch to File Upload
                    </button>
                  </div>
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Viewfinder Target Graphic */}
                    <div className="absolute inset-4 sm:inset-10 border-2 border-white/40 rounded-xl pointer-events-none flex flex-col justify-between p-2">
                      <div className="flex justify-between">
                        <span className="w-5 h-5 border-t-2 border-l-2 border-calreeGreen"></span>
                        <span className="w-5 h-5 border-t-2 border-r-2 border-calreeGreen"></span>
                      </div>
                      <div className="text-center">
                        <span className="bg-slate-950/70 text-calreeGreen text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase border border-calreeGreen/30">
                          Align part or part number label
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="w-5 h-5 border-b-2 border-l-2 border-calreeGreen"></span>
                        <span className="w-5 h-5 border-b-2 border-r-2 border-calreeGreen"></span>
                      </div>
                    </div>

                    {/* Animated Scanning Beam */}
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-calreeGreen to-transparent animate-pulse pointer-events-none top-1/2 -translate-y-1/2"></div>

                    {/* Snap Button */}
                    <div className="absolute bottom-3 inset-x-0 flex justify-center">
                      <button
                        type="button"
                        onClick={handleCaptureSnapshot}
                        className="bg-calreeGreen hover:bg-emerald-400 text-slate-950 font-black text-xs px-5 py-2 rounded-full shadow-lg flex items-center gap-1.5 active:scale-95 transition"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="9" strokeWidth="2"></circle>
                          <circle cx="12" cy="12" r="4" fill="currentColor"></circle>
                        </svg>
                        Snap &amp; Analyze Part
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : capturedImage ? (
              <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-700 aspect-video sm:h-52 w-full flex items-center justify-center group">
                <img
                  src={capturedImage}
                  alt="Scanned Spare Part"
                  className="max-h-full max-w-full object-contain"
                />
                <div className="absolute top-2 right-2 flex gap-1.5">
                  <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-1 rounded shadow">
                    ✓ Photo Loaded
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setCapturedImage(null);
                      if (activeTab === 'CAMERA') startCamera();
                    }}
                    className="bg-slate-950/80 hover:bg-red-600 text-white text-xs px-2.5 py-1 rounded font-bold transition shadow"
                  >
                    Retake / Change
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 hover:border-calreeGreen rounded-xl p-6 text-center cursor-pointer transition bg-gray-50/60 hover:bg-emerald-50/20 group"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <div className="w-12 h-12 mx-auto rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center text-gray-500 group-hover:text-calreeGreen group-hover:border-calreeGreen transition mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <p className="text-sm font-bold text-slate-800">
                  Click to upload or drag &amp; drop part photo
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Upload a clear picture of the spare part, stamped part number, or original packaging (JPG, PNG, WebP)
                </p>
              </div>
            )}
          </div>

          {/* STEP 2: PART NUMBER INPUT */}
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5 mb-1.5">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-calreeGreen text-[11px] inline-flex items-center justify-center font-black">
                2
              </span>
              Part Number (OEM or Manufacturer Code)
            </label>
            <div className="relative">
              <input
                type="text"
                value={partNumber}
                onChange={(e) => setPartNumber(e.target.value.toUpperCase())}
                placeholder="e.g. 04465-60320, 104210-4990, 23670-30050, 339114..."
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-slate-900 focus:bg-white focus:ring-2 focus:ring-calreeGreen focus:border-calreeGreen outline-none uppercase tracking-wider"
              />
              {partNumber && (
                <button
                  type="button"
                  onClick={() => setPartNumber('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
            
            {/* Quick Part Number Suggestions */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="text-[10px] text-gray-400 font-bold uppercase">Popular Examples:</span>
              {[
                { label: 'Prado Brake Pads', code: '04465-60320' },
                { label: 'Denso Alternator', code: '104210-4990' },
                { label: 'Hilux Injector', code: '23670-30050' },
                { label: 'KYB Strut', code: '339114' },
                { label: 'X-Trail Hub', code: '40202-4BA0A' }
              ].map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setPartNumber(item.code)}
                  className="text-[10px] bg-gray-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 border border-gray-200 px-2 py-0.5 rounded text-gray-600 font-mono transition"
                >
                  {item.label} ({item.code})
                </button>
              ))}
            </div>
          </div>

          {/* STEP 3: SPECIFIC VEHICLE FITMENT */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-calreeGreen text-[11px] inline-flex items-center justify-center font-black">
                  3
                </span>
                Specific Vehicle Type for Fitment
              </label>

              <label className="flex items-center gap-1 text-[11px] text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberVehicle}
                  onChange={(e) => setRememberVehicle(e.target.checked)}
                  className="rounded border-gray-300 text-calreeGreen focus:ring-calreeGreen w-3.5 h-3.5"
                />
                Remember this vehicle
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Make */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Make / Brand *</label>
                <select
                  value={selectedMake}
                  onChange={(e) => {
                    setSelectedMake(e.target.value);
                    setSelectedModel('');
                  }}
                  className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-calreeGreen focus:border-calreeGreen outline-none"
                >
                  <option value="">-- Select Make --</option>
                  {POPULAR_VEHICLE_MAKES.map((m) => (
                    <option key={m.make} value={m.make}>{m.make}</option>
                  ))}
                </select>
              </div>

              {/* Model */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Model *</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  disabled={!selectedMake}
                  className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-calreeGreen focus:border-calreeGreen outline-none disabled:bg-gray-100 disabled:text-gray-400"
                >
                  <option value="">{selectedMake ? '-- Select Model --' : 'Select Make First'}</option>
                  {availableModels.map((mod) => (
                    <option key={mod} value={mod}>{mod}</option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Year of Manufacture</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-calreeGreen focus:border-calreeGreen outline-none"
                >
                  <option value="">Any Year</option>
                  {VEHICLE_YEARS.map((yr) => (
                    <option key={yr} value={yr}>{yr}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Optional Engine / Chassis / VIN */}
            <div className="mt-3">
              <input
                type="text"
                value={engineTrim}
                onChange={(e) => setEngineTrim(e.target.value)}
                placeholder="Optional: Engine code or Chassis/VIN (e.g. 1KD-FTV, KDJ150, 2.8L Diesel, EJ20)"
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:ring-2 focus:ring-calreeGreen outline-none"
              />
            </div>
          </div>

          {/* Action Trigger Button */}
          <div>
            <button
              type="button"
              disabled={isSearching}
              onClick={handleExecuteSearch}
              className="w-full bg-calreeGreen hover:bg-emerald-400 text-slate-950 font-black py-3 px-6 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm tracking-wide active:scale-95 disabled:opacity-50"
            >
              {isSearching ? (
                <>
                  <svg className="animate-spin w-4 h-4 text-slate-950" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  Scanning Catalog &amp; Verifying Fitment...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  Scan Part &amp; Verify Fitment Matches
                </>
              )}
            </button>
          </div>

          {/* SEARCH RESULTS & MATCHES */}
          {searchResults && (
            <div className="pt-4 border-t border-gray-200 animate-fade-in space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    Fitment Match Results
                    <span className="bg-slate-900 text-calreeGreen text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {searchResults.totalMatches} Available
                    </span>
                  </h3>
                  <p className="text-xs text-gray-500">
                    Target Vehicle: <strong className="text-slate-800">{searchResults.vehicleSummary}</strong>
                    {searchResults.detectedPartNumber && (
                      <> &bull; Part #: <strong className="text-slate-800 font-mono">{searchResults.detectedPartNumber}</strong></>
                    )}
                  </p>
                </div>
              </div>

              {searchResults.matches && searchResults.matches.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {searchResults.matches.map((item: any) => (
                    <div
                      key={item.id}
                      className="bg-white border border-gray-200 hover:border-calreeGreen rounded-xl p-3.5 shadow-sm transition flex flex-col justify-between relative group"
                    >
                      <div>
                        {/* Compatibility Badge */}
                        <div className="mb-2">
                          {item.fitmentStatus === 'EXACT_FIT' ? (
                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              ✓ Verified Exact Fit
                            </span>
                          ) : item.fitmentStatus === 'UNIVERSAL' ? (
                            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              Universal Application
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              {item.matchReason || 'Compatible'}
                            </span>
                          )}
                        </div>

                        <div className="flex gap-3">
                          <div className="w-16 h-16 rounded-lg bg-gray-50 border border-gray-100 p-1 flex-shrink-0 flex items-center justify-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                              {item.name}
                            </h4>
                            <div className="text-[10px] font-mono text-gray-500 mt-0.5">
                              OEM #: <span className="font-bold text-slate-700">{item.partNumber}</span>
                            </div>
                            <div className="text-[10px] text-gray-400">
                              Vendor: {item.seller}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-gray-400 block">Price</span>
                          <span className="text-sm font-black text-slate-900">
                            KES {item.price.toLocaleString()}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            addToCart({
                              id: item.id,
                              name: item.name,
                              price: item.price,
                              image: item.image,
                              seller: item.seller,
                            });
                            setAddedItemKey(item.id);
                            setTimeout(() => setAddedItemKey(null), 1800);
                          }}
                          className={`text-xs px-3.5 py-1.5 rounded-lg font-black transition tracking-wide ${
                            addedItemKey === item.id
                              ? 'bg-slate-950 text-calreeGreen border border-calreeGreen'
                              : 'bg-calreeGreen text-slate-950 hover:bg-emerald-400 shadow-sm active:scale-95'
                          }`}
                        >
                          {addedItemKey === item.id ? 'Added! ✓' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* No Stock Found -> Immediate Sourcing Concierge */
                <div className="bg-slate-900 rounded-xl p-5 text-white border border-slate-800">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-calreeGreen/20 border border-calreeGreen/40 flex items-center justify-center text-calreeGreen flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-black text-white">
                        Special Order / Global Sourcing Available
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        We did not find immediate off-the-shelf local inventory for <strong className="text-calreeGreen">{partNumber || 'this part'}</strong> on <strong className="text-white">{searchResults.vehicleSummary}</strong>, but CALREE can source it directly from regional and global OEM distributors within 48–72 hours.
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2.5">
                        <a
                          href={`https://wa.me/254702420404?text=${encodeURIComponent(
                            `Habari CALREE, I scanned spare part (OEM: ${partNumber || 'N/A'}) for my ${searchResults.vehicleSummary}. Please provide a landed quote & delivery time.`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition shadow"
                        >
                          💬 WhatsApp Sourcing Desk (+254 702 420 404)
                        </a>

                        <a
                          href={`/services/import?partNumber=${encodeURIComponent(partNumber)}&vehicle=${encodeURIComponent(searchResults.vehicleSummary)}`}
                          className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition border border-slate-700"
                        >
                          Submit Formal Sourcing Proforma Request &rarr;
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-calreeGreen"></span>
            <span>CALREE Genuine Parts Multi-Point Guarantee</span>
          </div>

          <button
            onClick={onClose}
            className="text-gray-600 hover:text-slate-900 font-bold transition"
          >
            Done / Close
          </button>
        </div>
      </div>
    </div>
  );
}
