import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function LiveTracking() {
  return (
    <div className="h-[500px] rounded-lg overflow-hidden border">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            <div>
              <h3 className="font-medium">Vegetable Curry</h3>
              <p>Green Restaurant → Food Bank NGO</p>
              <p className="text-sm text-gray-500">Estimated arrival: 14:30</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
