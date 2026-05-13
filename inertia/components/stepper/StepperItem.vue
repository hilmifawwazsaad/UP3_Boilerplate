<template>
    <div @click="$emit('click')" class="flex items-center relative cursor-pointer" :class="isActive ? 'text-white' : 'text-primary dark:text-white'">
        <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-primary"
            :class="isActive ? 'bg-primary animate-pulse' : 'bg-transparent hover:bg-slate-300 hover:text-slate-700'">
            <slot name="icon"></slot>
        </div>
        <div class="absolute top-0 -ml-18 text-center mt-16 w-48 text-sm font-medium uppercase text-primary dark:text-white">
            <slot></slot>
        </div>
    </div>
    <div v-if="hasNext" class="flex-auto border-t-2 transition duration-500 ease-in-out mx-4" :class="isActive ? 'border-primary' : 'border-slate-400'"></div>
</template>
<script>
export default {
    props: {
        hasNext: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: false
        }
    },
    emits: ['click']
}
</script>