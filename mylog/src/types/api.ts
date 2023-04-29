type MarkerColor = 'RED' | 'YELLOW' | 'GREEN' | 'BLUE' | 'PURPLE';

interface Marker {
  id: number;
  latitude: number;
  longitude: number;
  color: MarkerColor;
  title: string;
  description: string;
  address: string;
  date: Date;
}

export type {MarkerColor, Marker};
