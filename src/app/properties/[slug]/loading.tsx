export default function PropertyLoading() {
  return (
    <div className="pt-24 pb-16 animate-pulse">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Back link skeleton */}
        <div className="h-5 w-32 bg-gray-200 rounded mb-6" />

        {/* Photo gallery skeleton */}
        <div className="grid grid-cols-4 gap-2 rounded-2xl overflow-hidden">
          <div className="col-span-4 md:col-span-2 md:row-span-2 bg-gray-200 aspect-[4/3] md:aspect-[4/3]" />
          <div className="hidden md:block bg-gray-200 aspect-[4/3]" />
          <div className="hidden md:block bg-gray-200 aspect-[4/3]" />
          <div className="hidden md:block bg-gray-200 aspect-[4/3]" />
          <div className="hidden md:block bg-gray-200 aspect-[4/3]" />
        </div>

        {/* Content skeleton */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Location & Title */}
            <div className="space-y-3">
              <div className="h-4 w-40 bg-gray-200 rounded" />
              <div className="h-8 w-3/4 bg-gray-200 rounded" />
            </div>

            {/* Stats */}
            <div className="flex gap-6 pb-6 border-b border-gray-200">
              <div className="h-5 w-24 bg-gray-200 rounded" />
              <div className="h-5 w-24 bg-gray-200 rounded" />
              <div className="h-5 w-24 bg-gray-200 rounded" />
            </div>

            {/* Description */}
            <div className="space-y-3">
              <div className="h-6 w-48 bg-gray-200 rounded" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
              </div>
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-gray-100 rounded-2xl p-6 space-y-4">
              <div className="h-8 w-32 bg-gray-200 rounded" />
              <div className="h-40 bg-gray-200 rounded" />
              <div className="h-12 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
