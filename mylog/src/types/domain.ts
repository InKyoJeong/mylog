type MarkerColor = 'RED' | 'YELLOW' | 'GREEN' | 'BLUE' | 'PURPLE';

interface ImageUri {
  id?: number;
  uri: string;
}

interface Marker {
  id: number;
  latitude: number;
  longitude: number;
  color: MarkerColor;
  title: string;
  description: string;
  address: string;
  date: Date | string;
  score: number;
}

export type {MarkerColor, Marker, ImageUri};
