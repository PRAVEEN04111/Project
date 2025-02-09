import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { SportEvent } from '../types';

interface SportCardProps {
  event: SportEvent;
  onSelect: (event: SportEvent) => void;
}

export function SportCard({ event, onSelect }: SportCardProps) {
  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
      onClick={() => onSelect(event)}
    >
      <div className="relative">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          {event.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{event.title}</h3>
        <div className="flex items-center gap-4 text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-orange-500" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span>{event.venue.split(',')[0]}</span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600">Starting from</span>
          <span className="text-lg font-bold text-orange-600">₹{event.price}</span>
        </div>
      </div>
    </div>
  );
}