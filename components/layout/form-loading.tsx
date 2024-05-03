import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LoadingForm = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center gap-2 w-1/2 mt-12">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    </div>
  );
};

export default LoadingForm;
