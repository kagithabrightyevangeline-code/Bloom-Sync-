import React from 'react';

interface MapViewProps {
  mapInfo: {
    lat: number;
    lng: number;
    zoom: number;
  };
  place: string;
}

const MapView: React.FC<MapViewProps> = ({ mapInfo, place }) => {
  // We use picsum to generate a deterministic "satellite" image based on location info.
  // This simulates fetching a map tile for a given coordinate.
  const seed = Math.abs(Math.round(mapInfo.lat + mapInfo.lng));
  const imageUrl = `https://picsum.photos/seed/${seed}/800/600`;

  return (
    <div className="h-full min-h-[300px] lg:min-h-0 rounded-lg overflow-hidden relative group">
      <img
        src={imageUrl}
        alt={`Simulated satellite view of ${place}`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
       <div className="absolute bottom-0 left-0 p-4">
        <h3 className="text-lg font-semibold text-white shadow-lg">{place}</h3>
        <p className="text-sm text-gray-300">Lat: {mapInfo.lat.toFixed(4)}, Lng: {mapInfo.lng.toFixed(4)}</p>
      </div>
      <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
        NDVI BLOOM SIMULATION
      </div>
    </div>
  );
};

export default MapView;
