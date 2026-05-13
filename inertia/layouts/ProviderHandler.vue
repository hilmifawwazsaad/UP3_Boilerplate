<template>
    <slot></slot>
</template>
<script>
import { usePage } from '@inertiajs/vue3';
import { pushModal } from 'jenesius-vue-modal';

export default {
    data() {
        return {
        }
    },
    async mounted() {
        if (usePage().url == '/') {
            // push modal
        }
    }
} 
</script>