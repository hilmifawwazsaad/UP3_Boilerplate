<template>
    <div>
        <nav
            class="relative h-16 bg-white shadow flex justify-between dark:bg-dark-secondary dark:shadow-gray-600 dark:shadow-sm">
            <div class=" flex items-center w-full">
                <div class="h-16 flex items-center me-1" :class="[useSidebar ? sidebarOpen ? 'w-64' : 'w-16' : '']">
                    <SidebarIcon :sidebarOpen="sidebarOpen" />
                </div>
                <button v-if="useSidebar" @click="$emit('toggleSidebar')"
                    class="ms-2 p-2 focus:outline-none bg-slate-100 hover:bg-secondary hover:text-white rounded-lg cursor-pointer transition-colors duration-300 dark:bg-dark-field dark:hover:bg-secondary dark:hover:text-white">
                    <svg class="w-5 h-5"
                        :class="[sidebarOpen ? 'rotate-0' : 'rotate-180', 'transition-transform duration-200']"
                        ill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16m-7 6h7">
                        </path>
                    </svg>
                </button>
            </div>
            <div class="flex w-full justify-end items-center px-4 text-sm">
                <UserMenu v-if="useSidebar" />
                <ThemeToggle class="ms-4" />
            </div>
        </nav>
    </div>
</template>
<script>
import { usePage } from '@inertiajs/vue3';
import ThemeToggle from './navbar/ThemeToggle.vue'
import UserMenu from './navbar/UserMenu.vue';
import SidebarIcon from './navbar/SidebarIcon.vue';

export default {
    components: {
        SidebarIcon,
        ThemeToggle,
        UserMenu,
    },
    props: {
        sidebarOpen: Boolean,
        useSidebar: Boolean
    },
    emits: ['toggleSidebar'],
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>