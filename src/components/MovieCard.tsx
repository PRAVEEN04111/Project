import React from 'react';
import { Clock, Star } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}

export function MovieCard({ movie, onSelect }: MovieCardProps) {
  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
      onClick={() => onSelect(movie)}
    >
      <div className="relative">
        <img 
          src={movie.imageUrl} 
          alt={movie.title} 
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-lg text-sm">
          {movie.rating}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{movie.title}</h3>
        <div className="flex items-center gap-4 text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-orange-500" />
            <span>{movie.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-orange-500" />
            <span>{movie.rating}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {movie.genre.map((g) => (
            <span 
              key={g} 
              className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
            >
              {g}
            </span>
          ))}
        </div>
        <p className="text-gray-600 text-sm line-clamp-2">{movie.description}</p>
      </div>
    </div>
  );
}