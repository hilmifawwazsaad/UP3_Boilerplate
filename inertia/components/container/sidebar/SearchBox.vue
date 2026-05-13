<template>
    <div class="relative mb-4 mx-2">
        <div class="absolute inset-y-0 inset-s-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
        </div>

        <input type="search" id="search-menu" v-model="searchQuery" @click="!sidebarOpen ? emitToggleSidebar() : ''"
            class="block w-full px-4 py-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-white dark:bg-dark-field dark:border-dark-secondary dark:placeholder:text-white"
            autosave="off" autocomplete="off" placeholder="Cari Menu" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            searchQuery: this.modelValue
        }
    },
    props: {
        modelValue: String,
        sidebarOpen: Boolean,
    },
    emits: ['update:modelValue', 'toggleSidebar'],
    watch: {
        searchQuery(value) {
            this.$emit('update:modelValue', value)
        }
    },
    methods: {
        emitToggleSidebar() {
            this.$emit('toggleSidebar')
        }
    },
}
</script>