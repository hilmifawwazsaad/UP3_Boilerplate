<template>
    <div class="bg-white shadow-sm rounded-lg p-4 dark:bg-dark-slate" :class="useHover ? 'hover:bg-slate-50 dark:hover:bg-dark-slate/80' : ''">
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        useHover: {
            type: Boolean,
            default: false
        }
    }
}
</script>