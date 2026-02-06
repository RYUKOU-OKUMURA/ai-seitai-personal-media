import React, { useRef } from 'react';
import type { EventListItem } from '../types';

interface EventBoardProps {
  events: EventListItem[];
}

const EventBoard: React.FC<EventBoardProps> = ({ events }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 bg-white border-b border-gray-100" id="events">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">Events & Seminars</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#111418]">イベント・セミナー情報</h2>
          </div>
          {events.length > 4 && (
            <div className="hidden md:flex gap-2">
              <button 
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-primary/50 text-gray-700 transition-all"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-primary/50 text-gray-700 transition-all"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          )}
        </div>

        {events.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-xl text-gray-500">
            現在、予定されているイベントはありません。
          </div>
        ) : (
          /* Scroll Container */
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {events.map((event) => (
              <a 
                key={event.slug}
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex-shrink-0 w-[280px] snap-start cursor-pointer"
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-4 relative shadow-md group-hover:shadow-xl transition-all duration-300 bg-gray-100">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/e2e8f0/64748b?text=No+Image';
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#111418] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {event.tag}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-4 right-4 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                    <span className="material-symbols-outlined">arrow_outward</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-primary font-bold text-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">calendar_month</span>
                    {event.dateLabel}
                  </p>
                  <h3 className="font-bold text-[#111418] text-lg leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventBoard;
