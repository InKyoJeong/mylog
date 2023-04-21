type MarkerColor = 'RED' | 'BLUE' | 'GREEN' | 'YELLOW';

interface Marker {
  id: number;
  latitude: number;
  longitude: number;
  color: MarkerColor;
  title: string;
  description: string;
}

export type {MarkerColor, Marker};
