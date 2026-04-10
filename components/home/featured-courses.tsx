import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FeaturedClassroom, subscribeToFeaturedClassrooms } from '@/lib/firebase/classrooms';
import { MoreHorizontal } from 'lucide-react';

const HARDCODED_FEATURED = [
  {
    id: 'openclaw',
    title: 'Introduction to OpenClaw',
    topic: 'Course Introduction: Mastering OpenClaw',
    description: 'Welcome to the World of Python!',
    thumbnail: '/images/home_cards/openclaw.png',
    badge: 'CS',
    badgeColors: 'bg-emerald-500/30 text-emerald-200',
    isLarge: true,
  },
  {
    id: 'aigc',
    title: 'AIGC Content Strategy',
    topic: 'Future Content Ecology',
    description: 'AIGC Content System Introduction',
    thumbnail: '/images/home_cards/content-strategy.png',
    badge: 'AIGC',
    badgeColors: 'bg-indigo-500/30 text-indigo-200',
    isLarge: true,
  },
  {
    id: 'physics',
    title: 'Quantum Physics Basics',
    topic: 'Quantum Theory',
    description: 'From classical to quantum',
    thumbnail: '/images/home_cards/physics.png',
    badge: 'Physics',
    badgeColors: 'bg-blue-500/30 text-blue-200',
    isLarge: false,
  },
  {
    id: 'art',
    title: 'Modern Art Space',
    topic: 'Digital Art Core',
    description: 'Creative Expression Expression',
    thumbnail: '/images/home_cards/art.jpg',
    badge: 'Art',
    badgeColors: 'bg-rose-500/30 text-rose-200',
    isLarge: false,
  },
  {
    id: 'economy',
    title: 'Macro Economics',
    topic: 'Global Markets',
    description: 'Understanding trends',
    thumbnail: '/images/home_cards/economy.png',
    badge: 'Eco',
    badgeColors: 'bg-amber-500/30 text-amber-200',
    isLarge: false,
  },
  {
    id: 'philosophy',
    title: 'Ethics Today',
    topic: 'Moral Thinking',
    description: 'Modern dilemmas',
    thumbnail: '/images/home_cards/philosophy.png',
    badge: 'Phil',
    badgeColors: 'bg-purple-500/30 text-purple-200',
    isLarge: false,
  },
];

export function FeaturedCourses() {
  const router = useRouter();
  const [firebaseClassrooms, setFirebaseClassrooms] = useState<FeaturedClassroom[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToFeaturedClassrooms((data) => {
      setFirebaseClassrooms(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center text-white py-20">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4" />
          <p className="text-white/50 text-sm">Loading featured courses...</p>
        </div>
      </div>
    );
  }

  const topTwo = HARDCODED_FEATURED.filter((c) => c.isLarge);
  const remainingHardcoded = HARDCODED_FEATURED.filter((c) => !c.isLarge);

  return (
    <div className="w-full flex justify-center text-white pb-20 pt-4">
      <div className="w-[1200px] max-w-full space-y-8 flex flex-col justify-center mx-auto px-4 md:px-0">
        {/* Top 2 Big Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          {topTwo.map((course) => (
            <div
              key={course.id}
              className="group cursor-pointer"
              onClick={() => {
                if (course.id === 'openclaw') {
                  window.open(
                    'https://drive.google.com/file/d/1NT9OXx0_U80-JsRTUlgR4lmhhPd_zrOI/view?usp=share_link',
                    '_blank',
                  );
                } else {
                  router.push(`/classroom/${course.id}`);
                }
              }}
            >
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden transition-transform duration-200 group-hover:scale-[1.02] group-hover:shadow-[0_16px_40px_-28px_rgba(0,0,0,0.55)] border border-white/5 bg-slate-900">
                <div className="absolute inset-0">
                  <img
                    src={course.thumbnail}
                    className="w-full h-full object-cover object-top"
                    alt={course.title}
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-5 md:p-6 text-left">
                  <span
                    className={`inline-flex w-fit items-center rounded-full backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-medium mb-2 ${course.badgeColors}`}
                  >
                    {course.badge}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold leading-tight text-white mb-0 drop-shadow-md">
                    {course.title}
                  </h3>
                </div>
              </div>
              <div className="mt-2.5 px-1 flex items-center justify-between text-left">
                <div className="flex flex-col min-w-0 pr-4">
                  <span className="font-medium text-[15px] truncate text-white min-w-0">
                    {course.topic}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-white/40 text-[12px] truncate max-w-full">
                      {course.description}
                    </span>
                  </div>
                </div>
                <button
                  className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center shrink-0 hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-white"
                  aria-label="More options"
                >
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Remaining Smaller Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8 w-full">
          {remainingHardcoded.map((course) => (
            <div key={course.id} className="group cursor-pointer">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden transition-transform duration-200 group-hover:scale-[1.02] group-hover:shadow-[0_16px_40px_-28px_rgba(0,0,0,0.55)] border border-white/5 bg-slate-900">
                <div className="absolute inset-0">
                  <img
                    src={course.thumbnail}
                    className="w-full h-full object-cover object-top"
                    alt={course.title}
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-3 text-left">
                  <span
                    className={`inline-flex w-fit items-center rounded-full backdrop-blur-sm px-1.5 py-0.5 text-[10px] font-medium mb-1.5 ${course.badgeColors}`}
                  >
                    {course.badge}
                  </span>
                  <h3 className="text-sm font-bold leading-tight text-white line-clamp-2">
                    {course.title}
                  </h3>
                </div>
              </div>
              <div className="mt-2.5 px-1 flex flex-col min-w-0 text-left">
                <span className="font-medium text-[14px] truncate text-white min-w-0">
                  {course.topic}
                </span>
                <span className="text-white/40 text-[12px] truncate max-w-full mt-0.5">
                  {course.description}
                </span>
              </div>
            </div>
          ))}

          {/* Firebase dynamically added cards */}
          {firebaseClassrooms.map((course) => (
            <div
              key={course.id}
              onClick={() => router.push(`/classroom/${course.id}`)}
              className="group cursor-pointer block"
            >
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden transition-transform duration-200 group-hover:scale-[1.02] group-hover:shadow-[0_16px_40px_-28px_rgba(0,0,0,0.55)] border border-white/5 bg-slate-900">
                <div className="absolute inset-0">
                  <img
                    src={course.thumbnail || '/images/default-thumbnail.jpg'}
                    className="w-full h-full object-cover object-top"
                    alt={course.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=500&auto=format&fit=crop';
                    }}
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-3 text-left">
                  <span className="inline-flex w-fit items-center rounded-full backdrop-blur-sm px-1.5 py-0.5 text-[10px] font-medium mb-1.5 bg-emerald-500/30 text-emerald-200">
                    New
                  </span>
                  <h3 className="text-sm font-bold leading-tight text-white line-clamp-2">
                    {course.title}
                  </h3>
                </div>
              </div>
              <div className="mt-2.5 px-1 flex flex-col min-w-0 text-left">
                <span className="font-medium text-[14px] truncate text-white min-w-0">
                  {course.topic}
                </span>
                <span className="text-white/40 text-[12px] truncate max-w-full mt-0.5">
                  {course.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
