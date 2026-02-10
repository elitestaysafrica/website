'use client';

import { useState } from 'react';
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

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft') goPrev();
  };

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
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white transition-colors"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 text-white/80 text-sm">
            {currentIndex + 1} / {photos.length}
          </div>

          {/* Previous button */}
          {photos.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 p-2 text-white/80 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-10 w-10" />
            </button>
          )}

          {/* Image */}
          <div 
            className="relative w-full h-full max-w-5xl max-h-[85vh] mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[currentIndex].main}
              alt={`${name} - ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Next button */}
          {photos.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 p-2 text-white/80 hover:text-white transition-colors"
            >
              <ChevronRight className="h-10 w-10" />
            </button>
          )}

          {/* Thumbnails */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto p-2">
            {photos.map((photo, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                className={`relative w-16 h-12 flex-shrink-0 rounded overflow-hidden ${
                  idx === currentIndex ? 'ring-2 ring-white' : 'opacity-60 hover:opacity-100'
                } transition-opacity`}
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
