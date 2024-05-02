import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LoadingIndividualIssue = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6">
      <Skeleton className="h-12 w-[250px]" />
      <div className="flex gap-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
      <Card className="md:w-1/2 p-4">
        <CardContent className="prose">
          <Skeleton className="h-24" />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingIndividualIssue;
