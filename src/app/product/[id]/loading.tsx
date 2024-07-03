import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {

  return (
    <div className="grid grid-cols-1 grid-rows-1 items-stretch gap-10 max-w-screen-lg lg:grid-cols-2 lg:gap-16">
      <Skeleton className="h-[380px] w-[90vw] md:h-[480px] lg:h-[530px] lg:w-[460px]"/>

      <div className="flex gap-6 flex-col justify-between">
        <div className="space-y-6">
          <Skeleton className="h-8 w-1/2"/>
          <Skeleton className="h-8 w-2/5"/>
          <Skeleton className="h-24 w-full"/>
        </div>

        <Skeleton className="h-10 w-full"/>
      </div>
    </div>
  )
}