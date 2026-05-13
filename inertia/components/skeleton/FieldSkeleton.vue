<template>
    <div v-if="loading" class="skeleton-field space-y-2">
        <div v-if="showTitle" class="skeleton relative overflow-hidden h-4 w-24 rounded"></div>
        <div class="skeleton relative overflow-hidden h-10 w-full rounded-md"></div>
    </div>
    <div v-else>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        showTitle: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        }
    }
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
