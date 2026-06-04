import { Card } from '../ui/Card.jsx'
import { Skeleton } from '../ui/Skeleton.jsx'

export function PostCardSkeleton() {
  return (
    <Card className="flex gap-0 overflow-hidden p-0">
      <div className="flex w-12 flex-col items-center gap-2 border-r border-white/[0.06] bg-[#0f1117]/50 py-4">
        <Skeleton className="h-6 w-6 rounded" />
        <Skeleton className="h-4 w-6" />
      </div>
      <div className="flex-1 space-y-3 p-4 sm:p-5">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-8 w-2/5" />
      </div>
    </Card>
  )
}
