<template>
    <div :class="width == 1 ? 'w-[18rem]' : width == 2 ? 'w-88' : width == 3 ? 'w-104' : 'w-120'"
        class="rounded-xl border border-gray-200 shadow-md overflow-hidden bg-white">
        <div class="skeleton bg-gray-200 relative overflow-hidden h-40 w-full rounded-t-xl"></div>

        <div class="p-4 space-y-3">
            <div class="skeleton bg-gray-200 relative overflow-hidden h-5 w-3/4 rounded"></div>
            <div class="skeleton bg-gray-200 relative overflow-hidden h-4 w-full rounded"></div>
            <div class="skeleton bg-gray-200 relative overflow-hidden h-4 w-5/6 rounded"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SkeletonCard",
    props: {
        width: {
            type: Number,
            default: 1,
        }
    },
};
</script>

<style scoped>
.skeleton {
    background: linear-gradient(90deg,
            #e5e7eb 25%,
            #f3f4f6 50%,
            #e5e7eb 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

.dark .skeleton {
    background: linear-gradient(90deg,
            #2f2f2f 25%,
            #3e464e 50%,
            #292f36 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
    0% {
        background-position: 200% 0;
    }

    100% {
        background-position: -200% 0;
    }
}
</style>
