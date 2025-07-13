import { Skeleton } from "@/components/ui/skeleton";

export default function EventCardSkeleton() {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col">
      {/* Image skeleton */}
      <Skeleton className="h-48 w-full" />

      <div className="p-4 flex flex-col flex-grow">
        {/* Title skeleton */}
        <Skeleton className="h-6 w-3/4 mb-1" />

        {/* Date skeleton */}
        <div className="flex items-center gap-1 mb-2">
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Location skeleton */}
        <div className="flex items-center gap-1 mb-3">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Price and organizer skeleton */}
        <div className="flex items-center justify-between">
          {/* Price skeleton */}
          <Skeleton className="h-6 w-20" />

          {/* Organizer info skeleton */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
