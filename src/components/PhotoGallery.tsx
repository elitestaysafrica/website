'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

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

  // Preload adjacent images
  useEffect(() => {
    if (lightboxOpen && photos.length > 1) {
      const toPreload = [
        currentIndex - 1,
        currentIndex + 1,
        currentIndex - 2,
        currentIndex + 2,
      ].filter(i => i >= 0 && i < photos.length && !loadedImages.has(i));

      toPreload.forEach(idx => {
        const img = new window.Image();
        img.src = photos[idx].main;
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, idx]));
        };
      });
    }
  }, [currentIndex, lightboxOpen, photos, loadedImages]);

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
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

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

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 text-white/80 text-sm font-medium">
            {currentIndex + 1} / {photos.length}
          </div>

          {/* Previous button */}
          {photos.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-2 md:left-4 p-2 text-white/80 hover:text-white transition-colors z-10 bg-black/20 rounded-full hover:bg-black/40"
              aria-label="Previous"
            >
              <ChevronLeft className="h-8 w-8 md:h-10 md:w-10" />
            </button>
          )}

          {/* Image Container */}
          <div 
            className="relative w-full h-full flex items-center justify-center px-16"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Current Image */}
            <div className="relative w-full h-[70vh] md:h-[80vh]">
              <Image
                src={photos[currentIndex].main}
                alt={`${name} - ${currentIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
                quality={90}
              />
            </div>
          </div>

          {/* Next button */}
          {photos.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-2 md:right-4 p-2 text-white/80 hover:text-white transition-colors z-10 bg-black/20 rounded-full hover:bg-black/40"
              aria-label="Next"
            >
              <ChevronRight className="h-8 w-8 md:h-10 md:w-10" />
            </button>
          )}

          {/* Thumbnails */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto p-2 bg-black/30 rounded-lg">
            {photos.map((photo, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                className={`relative w-14 h-10 md:w-16 md:h-12 flex-shrink-0 rounded overflow-hidden transition-all ${
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
        </div>
      )}
    </>
  );
}
