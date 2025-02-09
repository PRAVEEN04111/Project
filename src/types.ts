export interface Movie {
  id: string;
  title: string;
  imageUrl: string;
  duration: string;
  genre: string[];
  rating: string;
  description: string;
}

export interface ShowTime {
  id: string;
  time: string;
  price: number;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  isBooked: boolean;
  isSelected: boolean;
}

export interface SportEvent {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  venue: string;
  category: string;
  price: number;
  description: string;
}

export interface TrainRoute {
  id: string;
  trainNumber: string;
  name: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  price: {
    sleeper: number;
    ac3tier: number;
    ac2tier: number;
  };
}

export interface BusRoute {
  id: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  busType: string;
  price: number;
}

export interface FlightRoute {
  id: string;
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  imageUrl: string;
}