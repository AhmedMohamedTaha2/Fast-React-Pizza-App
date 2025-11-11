import React, { useMemo, useRef, useState } from "react";

function Locations() {
  const [query, setQuery] = useState("");
  const branches = [
    {
      id: 1,
      name: "Downtown Branch",
      address: "123 Main St, City Center",
      phone: "+1 (555) 123-4567",
      hours: "10:00 AM – 11:00 PM",
    },
    {
      id: 2,
      name: "Riverside Branch",
      address: "45 River Ave, Riverside Park",
      phone: "+1 (555) 987-6543",
      hours: "09:00 AM – 10:00 PM",
    },
    {
      id: 3,
      name: "Uptown Branch",
      address: "789 North Rd, Uptown District",
      phone: "+1 (555) 222-3344",
      hours: "11:00 AM – 12:00 AM",
    },
    {
      id: 4,
      name: "Tech Park Branch",
      address: "550 Silicon Blvd, Tech Park",
      phone: "+1 (555) 777-8888",
      hours: "24/7",
    },
    {
      id: 5,
      name: "Seaside Branch",
      address: "12 Ocean Drive, Seaside District",
      phone: "+1 (555) 333-1212",
      hours: "10:30 AM – 10:00 PM",
    },
  ];

  const markers = useMemo(
    () => [
      { id: 1, x: 520, y: 310 },
      { id: 2, x: 250, y: 420 },
      { id: 3, x: 780, y: 180 },
      { id: 4, x: 640, y: 120 },
      { id: 5, x: 130, y: 520 },
    ],
    []
  );

  const filtered = branches.filter((b) =>
    (b.name + b.address + b.phone).toLowerCase().includes(query.toLowerCase())
  );

  const mapRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const lastOffset = useRef({ x: 0, y: 0 });

  function startDrag(e) {
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragStart.current = { x: clientX, y: clientY };
    lastOffset.current = { ...offset };
  }

  function onDrag(e) {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const dx = clientX - dragStart.current.x;
    const dy = clientY - dragStart.current.y;
    setOffset({ x: lastOffset.current.x + dx, y: lastOffset.current.y + dy });
  }

  function endDrag() {
    setIsDragging(false);
  }

  function zoomIn() {
    setScale((s) => Math.min(2.5, parseFloat((s + 0.2).toFixed(2))));
  }

  function zoomOut() {
    setScale((s) => Math.max(0.6, parseFloat((s - 0.2).toFixed(2))));
  }

  function resetView() {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }

  function onWheel(e) {
    e.preventDefault();
    const direction = e.deltaY > 0 ? -1 : 1;
    if (direction > 0) zoomIn();
    else zoomOut();
  }

  return (
    <section className="min-h-screen bg-white px-4 sm:px-6 lg:px-12 py-10">
      <div className="text-center mb-8">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-red-700 tracking-wide">
          Find Your Nearest Fast React Pizza
        </h2>
        <p className="mt-2 text-gray-700">Search by area or browse branches.</p>
        <div className="mt-6 max-w-xl mx-auto">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search locations..."
            aria-label="Search locations"
            className="w-full rounded-lg border-2 border-gray-300 focus:border-red-500 focus:ring-0 px-4 py-3"
          />
        </div>
      </div>

      <div className="mb-10 overflow-hidden rounded-xl border-4 border-black shadow-[4px_4px_0_#000]">
        <div
          ref={mapRef}
          className="relative h-64 sm:h-80 select-none bg-cover bg-center cursor-grab active:cursor-grabbing"
          style={{
            backgroundImage:
              "url('/images/7b6dbdd434b3367b57775a5b886c995b.jpg')",
          }}
          onMouseDown={startDrag}
          onMouseMove={onDrag}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onTouchStart={startDrag}
          onTouchMove={onDrag}
          onTouchEnd={endDrag}
          onWheel={onWheel}
          role="region"
          aria-label="Interactive map"
        >
          <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
            <button
              onClick={zoomIn}
              className="bg-white/90 hover:bg-white text-gray-900 border-2 border-black rounded-md w-10 h-10 font-extrabold shadow-[2px_2px_0_#000]"
              aria-label="Zoom in"
            >
              +
            </button>
            <button
              onClick={zoomOut}
              className="bg-white/90 hover:bg-white text-gray-900 border-2 border-black rounded-md w-10 h-10 font-extrabold shadow-[2px_2px_0_#000]"
              aria-label="Zoom out"
            >
              −
            </button>
            <button
              onClick={resetView}
              className="bg-red-600 hover:bg-red-700 text-white border-2 border-black rounded-md px-2 py-1 font-bold shadow-[2px_2px_0_#000]"
              aria-label="Reset view"
            >
              Reset
            </button>
          </div>

          <div
            className="absolute inset-0 z-10"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
              transformOrigin: "center center",
            }}
          >
            <img
              src="/images/aa.svg"
              alt="Decorative map grid"
              className="absolute inset-0 m-auto opacity-20 w-64 h-64 pointer-events-none"
              loading="lazy"
            />

            {markers.map((m) => {
              const branch = branches.find((b) => b.id === m.id);
              const isVisible = filtered.some((b) => b.id === m.id);
              if (!isVisible) return null;
              return (
                <button
                  key={m.id}
                  className="group absolute -translate-x-1/2 -translate-y-full"
                  style={{
                    left: `${(m.x / 1000) * 100}%`,
                    top: `${(m.y / 600) * 100}%`,
                  }}
                  aria-label={`Marker: ${branch?.name || "Branch"}`}
                  onClick={() => {
                    setScale((s) => Math.min(2, s < 1.2 ? 1.2 : s));
                  }}
                >
                  <span className="block text-2xl drop-shadow">📍</span>
                  <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap rounded-md bg-white/95 px-2 py-1 text-xs font-bold text-gray-900 border-2 border-black shadow-[2px_2px_0_#000] opacity-0 group-hover:opacity-100 transition-opacity">
                    {branch?.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="absolute left-3 bottom-3 z-20 rounded-md bg-white/90 px-3 py-1 border-2 border-black shadow-[2px_2px_0_#000] text-sm font-bold text-gray-900">
            Zoom: {scale.toFixed(1)} · Offset: {offset.x}px, {offset.y}px
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filtered.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-xl border-4 border-black shadow-[4px_4px_0_#000] p-6"
          >
            <h3 className="text-2xl font-extrabold text-gray-900">{b.name}</h3>
            <p className="mt-2 text-gray-700">{b.address}</p>
            <p className="mt-1 text-gray-700">{b.phone}</p>
            <p className="mt-1 text-gray-700">Hours: {b.hours}</p>
            <button className="mt-5 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-full shadow transition-transform hover:scale-105">
              Get Directions
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Locations;
