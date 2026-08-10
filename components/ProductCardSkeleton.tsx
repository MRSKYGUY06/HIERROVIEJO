export default function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-md border border-graphite/10 bg-white shadow-sm">
      <div className="aspect-[4/3] animate-pulse bg-steel-light" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="h-3 w-1/3 animate-pulse rounded bg-steel-light" />
        <div className="h-5 w-4/5 animate-pulse rounded bg-steel-light" />
        <div className="h-3 w-full animate-pulse rounded bg-steel-light" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-steel-light" />
        <div className="mt-auto flex justify-between pt-4">
          <div className="h-4 w-20 animate-pulse rounded bg-steel-light" />
          <div className="h-8 w-24 animate-pulse rounded bg-steel-light" />
        </div>
      </div>
    </div>
  );
}
