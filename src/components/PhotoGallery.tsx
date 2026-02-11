'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, Loader2 } from 'lucide-react';

interface Photo {
  main: string;
  thumb: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  name: string;
}

export function PhotoGallery({ photos, name }: PhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Touch handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  // Preload ALL images when lightbox opens
  useEffect(() => {
    if (lightboxOpen && photos.length > 1) {
      photos.forEach((photo, idx) => {
        if (!loadedImages.has(idx)) {
          const img = new window.Image();
          img.src = photo.main;
          img.onload = () => {
            setLoadedImages(prev => new Set([...prev, idx]));
          };
        }
      });
    }
  }, [lightboxOpen, photos, loadedImages]);

  if (photos.length === 0) {
    return (
      <div className="aspect-[16/9] bg-gray-100 rounded-2xl flex items-center justify-center">
        <span className="text-gray-400">No photos available</span>
      </div>
    );
  }

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const goNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
    setTimeout(() => setIsTransitioning(false), 200);
  }, [photos.length, isTransitioning]);

  const goPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    setTimeout(() => setIsTransitioning(false), 200);
  }, [photos.length, isTransitioning]);

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goNext();
    } else if (isRightSwipe) {
      goPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, goNext, goPrev]);

  // Get indices for prev, current, next for smooth transitions
  const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
  const nextIndex = (currentIndex + 1) % photos.length;

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-4 gap-2 rounded-2xl overflow-hidden">
        {/* Main image */}
        <button
          onClick={() => openLightbox(0)}
          className="col-span-4 md:col-span-2 md:row-span-2 relative aspect-[4/3] md:aspect-auto cursor-pointer group"
        >
          <Image
            src={photos[0].main}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </button>
        
        {/* Secondary images */}
        {photos.slice(1, 5).map((photo, idx) => (
          <button
            key={idx}
            onClick={() => openLightbox(idx + 1)}
            className="relative aspect-[4/3] hidden md:block cursor-pointer group"
          >
            <Image
              src={photo.thumb || photo.main}
              alt={`${name} - ${idx + 2}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            {idx === 3 && photos.length > 5 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/60 transition-colors">
                <span className="text-white font-semibold">+{photos.length - 5} more</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Show all photos button on mobile */}
      {photos.length > 1 && (
        <button
          onClick={() => openLightbox(0)}
          className="md:hidden mt-2 w-full py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          View all {photos.length} photos
        </button>
      )}

      {/* Lightbox - Full Screen */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black flex flex-col"
          style={{ zIndex: 99999 }}
        >
          {/* Header with close button - safe area for notch */}
          <div className="flex items-center justify-between p-4 relative" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>
            <div className="text-white font-medium bg-black/60 px-3 py-1 rounded-full">
              {currentIndex + 1} / {photos.length}
            </div>
            <button
              onClick={closeLightbox}
              className="flex items-center gap-2 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-full transition-colors font-medium shadow-lg"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
              <span>Close</span>
            </button>
          </div>

          {/* Image Container with Swipe */}
          <div 
            className="flex-1 relative overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Slider container */}
            <div 
              className="absolute inset-0 flex transition-transform duration-200 ease-out"
              style={{ transform: `translateX(-100%)` }}
            >
              {/* Previous Image */}
              <div className="w-full h-full flex-shrink-0 relative flex items-center justify-center">
                {loadedImages.has(prevIndex) ? (
                  <Image
                    src={photos[prevIndex].main}
                    alt={`${name} - ${prevIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                ) : (
                  <Loader2 className="h-8 w-8 text-white animate-spin" />
                )}
              </div>

              {/* Current Image */}
              <div className="w-full h-full flex-shrink-0 relative flex items-center justify-center">
                {loadedImages.has(currentIndex) ? (
                  <Image
                    src={photos[currentIndex].main}
                    alt={`${name} - ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                ) : (
                  <Loader2 className="h-8 w-8 text-white animate-spin" />
                )}
              </div>

              {/* Next Image */}
              <div className="w-full h-full flex-shrink-0 relative flex items-center justify-center">
                {loadedImages.has(nextIndex) ? (
                  <Image
                    src={photos[nextIndex].main}
                    alt={`${name} - ${nextIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                ) : (
                  <Loader2 className="h-8 w-8 text-white animate-spin" />
                )}
              </div>
            </div>

            {/* Tap zones for navigation */}
            <button
              onClick={goPrev}
              className="absolute left-0 top-0 bottom-0 w-1/4 z-10"
              aria-label="Previous"
            />
            <button
              onClick={goNext}
              className="absolute right-0 top-0 bottom-0 w-1/4 z-10"
              aria-label="Next"
            />

            {/* Desktop nav buttons */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white bg-black/40 hover:bg-black/60 rounded-full transition-colors z-10"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={goNext}
                  className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white bg-black/40 hover:bg-black/60 rounded-full transition-colors z-10"
                  aria-label="Next"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}
          </div>

          {/* Swipe hint on mobile */}
          <div className="md:hidden text-center text-white/50 text-sm py-2">
            Swipe or tap edges to navigate
          </div>

          {/* Thumbnails - desktop only */}
          <div className="hidden md:flex justify-center gap-2 p-4 bg-black/50 overflow-x-auto">
            {photos.map((photo, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-16 h-12 flex-shrink-0 rounded overflow-hidden transition-all ${
                  idx === currentIndex ? 'ring-2 ring-white scale-110' : 'opacity-50 hover:opacity-80'
                }`}
              >
                <Image
                  src={photo.thumb || photo.main}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>

          {/* Mobile dots indicator */}
          <div className="md:hidden flex justify-center gap-1.5 py-4 bg-black/50">
            {photos.length <= 15 ? (
              photos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-white w-4' : 'bg-white/40'
                  }`}
                  aria-label={`Go to photo ${idx + 1}`}
                />
              ))
            ) : (
              <span className="text-white/70 text-sm">
                {currentIndex + 1} of {photos.length}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}
