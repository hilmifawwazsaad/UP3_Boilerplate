<template>
    <div v-if="loading" class="skeleton border border-gray-300 rounded-lg w-full h-40 dark:border-gray-600"></div>
    <div v-else>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        loading: {
            type: Boolean,
            default: true
        },
    }
}
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