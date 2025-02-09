import React, { useState } from 'react';
import { Film, Train, Bus, Plane, Trophy } from 'lucide-react';
import { movies, sportsEvents, trainRoutes, busRoutes, flightRoutes } from './data';
import { MovieCard } from './components/MovieCard';
import { SportCard } from './components/SportCard';
import { TransportCard } from './components/TransportCard';
import { BookingModal } from './components/BookingModal';

type BookingType = 'movies' | 'sports' | 'trains' | 'buses' | 'flights';

function App() {
  const [activeTab, setActiveTab] = useState<BookingType>('movies');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const tabs = [
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'sports', label: 'Sports', icon: Trophy },
    { id: 'trains', label: 'Trains', icon: Train },
    { id: 'buses', label: 'Buses', icon: Bus },
    { id: 'flights', label: 'Flights', icon: Plane },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-rose-50">
      <header className="bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Film className="w-8 h-8" />
              <h1 className="text-2xl font-bold">BookMyIndia</h1>
            </div>
            <nav className="flex gap-4">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as BookingType)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                    ${activeTab === id 
                      ? 'bg-white text-orange-600' 
                      : 'text-white hover:bg-white/10'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            {activeTab === 'movies' && 'Now Showing'}
            {activeTab === 'sports' && 'Upcoming Events'}
            {activeTab === 'trains' && 'Train Routes'}
            {activeTab === 'buses' && 'Bus Routes'}
            {activeTab === 'flights' && 'Flight Routes'}
          </h2>
          <p className="text-gray-600">
            {activeTab === 'movies' && 'Book your tickets for the latest blockbusters'}
            {activeTab === 'sports' && 'Experience the thrill of live sports'}
            {activeTab === 'trains' && 'Travel across India by train'}
            {activeTab === 'buses' && 'Comfortable bus journeys to your destination'}
            {activeTab === 'flights' && 'Quick flights to major cities'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeTab === 'movies' && movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={setSelectedItem}
            />
          ))}
          
          {activeTab === 'sports' && sportsEvents.map((event) => (
            <SportCard
              key={event.id}
              event={event}
              onSelect={setSelectedItem}
            />
          ))}
          
          {activeTab === 'trains' && trainRoutes.map((route) => (
            <TransportCard
              key={route.id}
              type="train"
              data={route}
              onSelect={setSelectedItem}
            />
          ))}
          
          {activeTab === 'buses' && busRoutes.map((route) => (
            <TransportCard
              key={route.id}
              type="bus"
              data={route}
              onSelect={setSelectedItem}
            />
          ))}
          
          {activeTab === 'flights' && flightRoutes.map((route) => (
            <TransportCard
              key={route.id}
              type="flight"
              data={route}
              onSelect={setSelectedItem}
            />
          ))}
        </div>
      </main>

      {selectedItem && (
        <BookingModal
          type={activeTab}
          data={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}

export default App;