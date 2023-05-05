type MarkerColor =
  | 'RED'
  | 'YELLOW'
  | 'GREEN'
  | 'BLUE'
  | 'PURPLE'
  | 'GRAY'
  | 'PINK';

interface ImageUri {
  id?: number;
  uri: string;
}

interface Marker {
  id: number;
  latitude: number;
  longitude: number;
  color: MarkerColor;
  score: number;
}

interface Post extends Marker {
  title: string;
  address: string;
  date: Date | string;
  description: string;
}

export type {MarkerColor, Marker, Post, ImageUri};
