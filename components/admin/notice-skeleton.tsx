
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function NoticesTableSkeleton() {
    return (
        <Card className="p-6">
            <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-start space-x-4">
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-[300px]" />
                            <div className="flex space-x-2">
                                <Skeleton className="h-16 w-16 rounded-md" />
                                <Skeleton className="h-16 w-16 rounded-md" />
                            </div>
                        </div>
                        <Skeleton className="h-8 w-16" />
                    </div>
                ))}
            </div>
        </Card>
    );
}