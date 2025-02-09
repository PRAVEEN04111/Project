import React from 'react';
import { Clock, ArrowRight, Plane, Train, Bus } from 'lucide-react';
import { TrainRoute, BusRoute, FlightRoute } from '../types';

interface TransportCardProps {
  type: 'train' | 'bus' | 'flight';
  data: TrainRoute | BusRoute | FlightRoute;
  onSelect: (data: any) => void;
}

export function TransportCard({ type, data, onSelect }: TransportCardProps) {
  const getLowestPrice = () => {
    if (type === 'train') {
      const trainData = data as TrainRoute;
      return Math.min(trainData.price.sleeper, trainData.price.ac3tier, trainData.price.ac2tier);
    }
    return (data as BusRoute | FlightRoute).price;
  };

  const getIcon = () => {
    switch (type) {
      case 'train':
        return Train;
      case 'bus':
        return Bus;
      case 'flight':
        return Plane;
    }
  };

  const Icon = getIcon();

  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
      onClick={() => onSelect(data)}
    >
      {type === 'flight' && (
        <img 
          src={(data as FlightRoute).imageUrl} 
          alt={(data as FlightRoute).airline} 
          className="w-full h-40 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Icon className="w-5 h-5 text-orange-500" />
          {type === 'train' && (
            <div className="text-sm font-medium text-gray-500">
              {(data as TrainRoute).trainNumber} • {(data as TrainRoute).name}
            </div>
          )}
          {type === 'flight' && (
            <div className="text-sm font-medium text-gray-500">
              {(data as FlightRoute).airline} • {(data as FlightRoute).flightNumber}
            </div>
          )}
          {type === 'bus' && (
            <div className="text-sm font-medium text-gray-500">
              {(data as BusRoute).busType}
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{data.departure}</div>
            <div className="text-sm text-gray-600">{data.from}</div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{data.arrival}</div>
            <div className="text-sm text-gray-600">{data.to}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-orange-500" />
            <span>{data.duration}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-600">Starting from</span>
          <span className="text-lg font-bold text-orange-600">₹{getLowestPrice()}</span>
        </div>
      </div>
    </div>
  );
}