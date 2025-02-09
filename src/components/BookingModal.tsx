import React, { useState } from 'react';
import { X, Calendar, MapPin, Clock, Train, Bus, Plane } from 'lucide-react';
import { Movie, ShowTime, Seat, SportEvent, TrainRoute, BusRoute, FlightRoute } from '../types';
import { showTimes } from '../data';

interface BookingModalProps {
  type: 'movies' | 'sports' | 'trains' | 'buses' | 'flights';
  data: Movie | SportEvent | TrainRoute | BusRoute | FlightRoute;
  onClose: () => void;
}

export function BookingModal({ type, data, onClose }: BookingModalProps) {
  const [selectedTime, setSelectedTime] = useState<ShowTime | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [selectedClass, setSelectedClass] = useState<'sleeper' | 'ac3tier' | 'ac2tier'>('sleeper');

  const generateSeats = (row: string, count: number): Seat[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: `${row}${i + 1}`,
      row,
      number: i + 1,
      isBooked: Math.random() > 0.8,
      isSelected: false,
    }));
  };

  const seats: Seat[] = [
    ...generateSeats('A', 12),
    ...generateSeats('B', 12),
    ...generateSeats('C', 12),
    ...generateSeats('D', 12),
    ...generateSeats('E', 12),
  ];

  const toggleSeat = (seat: Seat) => {
    if (seat.isBooked) return;
    
    setSelectedSeats(prev => {
      const isSelected = prev.some(s => s.id === seat.id);
      if (isSelected) {
        return prev.filter(s => s.id !== seat.id);
      } else {
        return [...prev, seat];
      }
    });
  };

  const getPrice = () => {
    if (type === 'movies') {
      return selectedTime ? selectedSeats.length * selectedTime.price : 0;
    } else if (type === 'sports') {
      return selectedSeats.length * (data as SportEvent).price;
    } else if (type === 'trains') {
      const trainData = data as TrainRoute;
      return selectedSeats.length * trainData.price[selectedClass];
    } else {
      return selectedSeats.length * (data as BusRoute | FlightRoute).price;
    }
  };

  const renderIcon = () => {
    switch (type) {
      case 'trains': return <Train className="w-6 h-6 text-orange-500" />;
      case 'buses': return <Bus className="w-6 h-6 text-orange-500" />;
      case 'flights': return <Plane className="w-6 h-6 text-orange-500" />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              {renderIcon()}
              <h2 className="text-3xl font-bold text-gray-800">
                {type === 'movies' ? (data as Movie).title :
                 type === 'sports' ? (data as SportEvent).title :
                 `${data.from} to ${data.to}`}
              </h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>

          {type === 'movies' && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Select Show Time</h3>
              <div className="flex flex-wrap gap-3">
                {showTimes.map((time) => (
                  <button
                    key={time.id}
                    onClick={() => setSelectedTime(time)}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      selectedTime?.id === time.id
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'border-gray-300 hover:border-orange-500 hover:text-orange-500'
                    }`}
                  >
                    <div className="font-semibold">{time.time}</div>
                    <div className="text-sm">₹{time.price}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {type === 'trains' && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Select Class</h3>
              <div className="flex flex-wrap gap-3">
                {Object.entries((data as TrainRoute).price).map(([cls, price]) => (
                  <button
                    key={cls}
                    onClick={() => setSelectedClass(cls as 'sleeper' | 'ac3tier' | 'ac2tier')}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      selectedClass === cls
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'border-gray-300 hover:border-orange-500 hover:text-orange-500'
                    }`}
                  >
                    <div className="font-semibold">
                      {cls === 'sleeper' ? 'Sleeper' :
                       cls === 'ac3tier' ? 'AC 3 Tier' :
                       'AC 2 Tier'}
                    </div>
                    <div className="text-sm">₹{price}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {(type === 'movies' ? selectedTime : true) && (
            <>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Select Seats</h3>
                <div className="w-full bg-gray-50 p-8 rounded-xl mb-4">
                  {type === 'movies' && (
                    <div className="w-full h-2 bg-gradient-to-r from-orange-500 to-rose-500 mx-auto mb-12 rounded-full" />
                  )}
                  <div className="grid grid-cols-12 gap-2 max-w-4xl mx-auto">
                    {seats.map((seat) => (
                      <button
                        key={seat.id}
                        onClick={() => toggleSeat(seat)}
                        disabled={seat.isBooked}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                          seat.isBooked
                            ? 'bg-gray-300 cursor-not-allowed'
                            : selectedSeats.some(s => s.id === seat.id)
                            ? 'bg-orange-500 text-white'
                            : 'bg-white border-2 border-orange-200 hover:border-orange-500'
                        }`}
                      >
                        {seat.row}{seat.number}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-white border-2 border-orange-200 rounded-lg" />
                      <span>Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-orange-500 rounded-lg" />
                      <span>Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-300 rounded-lg" />
                      <span>Booked</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-lg text-gray-600">Total Amount</span>
                    <div className="text-sm text-gray-500">
                      ({selectedSeats.length} seats × ₹{
                        type === 'movies' ? selectedTime?.price :
                        type === 'sports' ? (data as SportEvent).price :
                        type === 'trains' ? (data as TrainRoute).price[selectedClass] :
                        (data as BusRoute | FlightRoute).price
                      })
                    </div>
                  </div>
                  <span className="text-3xl font-bold text-gray-800">₹{getPrice()}</span>
                </div>
                <button
                  disabled={selectedSeats.length === 0 || (type === 'trains' && !selectedClass)}
                  className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-600 hover:to-rose-600 transition-all"
                >
                  Proceed to Payment
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}