import { useEffect, useMemo, useState } from 'react';

const HOME_BACKGROUND_IMAGES = [
  '/gallery/Home background 1.jpeg',
  '/gallery/Home background 2.jpeg',
  '/gallery/Home background 3.jpeg',
  '/gallery/Home background 4.jpeg',
  '/gallery/Home background 5.jpeg',
];

export default function HomeBackgroundSlideshow() {
  const images = useMemo(() => HOME_BACKGROUND_IMAGES, []);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [images.length]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((src, idx) => {
        const isActive = idx === activeIndex;
        return (
          <img
            key={src}
            src={src}
            alt="Home background"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: isActive ? 1 : 0,
              transition: 'opacity 900ms ease-in-out',
            }}
            aria-hidden={!isActive}
          />
        );
      })}
    </div>
  );
}

