import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png?url';
import markerIcon from 'leaflet/dist/images/marker-icon.png?url';
import markerShadow from 'leaflet/dist/images/marker-shadow.png?url';
import 'leaflet/dist/leaflet.css';
import { Search } from 'lucide-react';
import { useEffect, useId, useState } from 'react';
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { Button } from '@/components/ui/button';
import { Field, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const defaultCenter: [number, number] = [42.3601, -71.0589];

// Vite rewrites asset URLs; Leaflet's default icon path resolver still points at
// broken relative paths, so build an explicit icon from the bundled files.
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })
  ._getIconUrl;

const crossSectionMarkerIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

type NominatimResult = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
};

function MapClickHandler({
  onSelect,
}: {
  onSelect: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(event) {
      onSelect(event.latlng.lat, event.latlng.lng);
    },
  });
  return null;
}

function Recenter({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
  }, [center, map]);

  return null;
}

function formatCoordinate(value: number) {
  return value.toFixed(5);
}

export function CrossSectionLocationMap({
  value,
  onChange,
  invalid = false,
  error,
}: {
  value: { lat: number; lng: number } | null;
  onChange: (value: { lat: number; lng: number } | null) => void;
  invalid?: boolean;
  error?: { message?: string };
}) {
  const searchId = useId();
  const resultsId = useId();
  const statusId = useId();
  const [center, setCenter] = useState<[number, number]>(
    value ? [value.lat, value.lng] : defaultCenter,
  );
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<NominatimResult[]>([]);
  const [statusMessage, setStatusMessage] = useState(
    value
      ? `Selected location at latitude ${formatCoordinate(value.lat)}, longitude ${formatCoordinate(value.lng)}.`
      : 'No cross section location selected yet.',
  );
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  useEffect(() => {
    if (value) {
      setCenter([value.lat, value.lng]);
      return;
    }

    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter([position.coords.latitude, position.coords.longitude]);
      },
      () => {
        // Keep the MassDOT-area default if permission is denied or unavailable.
      },
      { enableHighAccuracy: false, timeout: 10_000 },
    );
  }, [value]);

  function selectLocation(lat: number, lng: number, label?: string) {
    onChange({ lat, lng });
    setCenter([lat, lng]);
    setStatusMessage(
      label
        ? `Selected location: ${label}. Latitude ${formatCoordinate(lat)}, longitude ${formatCoordinate(lng)}.`
        : `Selected location at latitude ${formatCoordinate(lat)}, longitude ${formatCoordinate(lng)}.`,
    );
  }

  async function searchLocation() {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setSearchError('Enter a place name or address to search.');
      setResults([]);
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const url = new URL('https://nominatim.openstreetmap.org/search');
      url.searchParams.set('format', 'json');
      url.searchParams.set('q', trimmedQuery);
      url.searchParams.set('addressdetails', '0');
      url.searchParams.set('limit', '5');

      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Search request failed.');
      }

      const nextResults = (await response.json()) as NominatimResult[];
      setResults(nextResults);
      setStatusMessage(
        nextResults.length
          ? `Found ${nextResults.length} location${nextResults.length === 1 ? '' : 's'}. Use the results list to choose one.`
          : 'No locations matched that search.',
      );
      if (!nextResults.length) {
        setSearchError('No locations matched that search.');
      }
    } catch {
      setResults([]);
      setSearchError('Unable to search locations right now. Try again.');
      setStatusMessage('Location search failed.');
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <Field className="mt-8 max-w-3xl gap-4" data-invalid={invalid}>
      <div>
        <h2 className="text-lg font-semibold tracking-tight">
          Cross section location
        </h2>
        <p className="mt-1 text-muted-foreground">
          Click the map to mark where this cross section is located. You can
          also search for an address or place name, then choose a result.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor={searchId}>Search for a location</Label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            id={searchId}
            className="max-w-150"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                void searchLocation();
              }
            }}
            placeholder="Address, intersection, or place name"
            autoComplete="street-address"
            aria-describedby={`${statusId}${searchError ? ` ${searchId}-error` : ''}`}
            aria-controls={resultsId}
            aria-invalid={invalid}
          />
          <Button
            type="button"
            disabled={isSearching}
            onClick={() => void searchLocation()}
          >
            <Search aria-hidden />
            {isSearching ? 'Searching…' : 'Search'}
          </Button>
        </div>
        {searchError ? (
          <p id={`${searchId}-error`} className="text-sm text-destructive">
            {searchError}
          </p>
        ) : null}
      </div>

      <div
        id={statusId}
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {statusMessage}
      </div>

      {results.length ? (
        <ul
          id={resultsId}
          className="divide-y rounded-lg border"
          aria-label="Location search results"
        >
          {results.map((result) => (
            <li key={result.place_id}>
              <button
                type="button"
                className="w-full px-3 py-2 text-left text-sm hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-none"
                onClick={() => {
                  const lat = Number(result.lat);
                  const lng = Number(result.lon);
                  selectLocation(lat, lng, result.display_name);
                  setResults([]);
                  setQuery(result.display_name);
                }}
              >
                {result.display_name}
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {value ? (
        <p className="text-sm text-muted-foreground" aria-live="polite">
          Selected coordinates: {formatCoordinate(value.lat)},{' '}
          {formatCoordinate(value.lng)}
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">
          No location selected yet. Use search or the map to choose one.
        </p>
      )}

      <div aria-hidden="true" className="overflow-hidden rounded-lg border">
        <MapContainer
          center={center}
          zoom={14}
          scrollWheelZoom
          className="h-80 w-full !cursor-crosshair [&_.leaflet-interactive]:!cursor-crosshair"
          attributionControl
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Recenter center={center} />
          <MapClickHandler onSelect={selectLocation} />
          {value ? (
            <Marker
              position={[value.lat, value.lng]}
              icon={crossSectionMarkerIcon}
            />
          ) : null}
        </MapContainer>
      </div>

      {invalid ? <FieldError errors={[error]} /> : null}
    </Field>
  );
}
