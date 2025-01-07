import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

function SkeletonCardNote() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <Skeleton className="h-6 w-2/3" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-20 w-full" />
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-20" />
      </CardFooter>
    </Card>
  );
}

export default SkeletonCardNote;
