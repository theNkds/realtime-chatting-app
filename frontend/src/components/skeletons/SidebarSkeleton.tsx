import { Users } from "lucide-react";

const SidebarSkeleton = () => {
    const skeletonsContacts: null[] = Array(8).fill(null);
    return (
        <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
            {/* Header */}
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                    <Users className="w-6 h-6" />
                    <span className="font-medium hidden lg:block">Contact</span>
                </div>
            </div>

            {/* Skeleton Contacts */}
            <div className="overflow-y-auto w-full py-3">
                {skeletonsContacts.map((_, idx) => (
                    <div key={idx} className="w-full p-3 flex items-center gap-3">
                        {/* Avatar Skeleton */}
                        <div className="relative mx-auto lg:mx-0">
                            <div className="skeleton size-12 rounded-full" />
                        </div>

                        {/* User info skeleton - only visible on large screens */}
                        <div className="hidden lg:block text-left min-w-0 flex-1">
                            <div className="h-4 skeleton w-32 mb-2" />
                            <div className="h-3 skeleton w-32 mb-2" />
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    )
}

export default SidebarSkeleton