import clsx from 'clsx'

export function Skeleton({ className }) {
  return (
    <div
      className={clsx(
        'animate-shimmer rounded-lg bg-shimmer-light bg-[length:200%_100%] dark:bg-shimmer-dark',
        className
      )}
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="card space-y-3">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-3 w-20" />
    </div>
  )
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full rounded-lg" />
      ))}
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="card">
      <Skeleton className="mb-4 h-4 w-40" />
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  )
}
