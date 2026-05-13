<template>
    <div>
        <SearchBox v-model="searchQuery" :sidebarOpen="sidebarOpen" @toggleSidebar="emitToggleSidebar" />

        <AddsButton :sidebarOpen="sidebarOpen" />

        <ul v-if="filteredMenu.length > 0">
            <MenuItem v-for="menu in filteredMenu" :key="menu.menu_name" :sidebarOpen="sidebarOpen" :menu="menu"
                :parent_url="menu.to" @toggleSidebar="emitToggleSidebar">
            </MenuItem>
        </ul>
        <div v-else class="text-center text-gray-500 text-sm py-2">
            Menu tidak ditemukan
        </div>
    </div>
</template>
<script>
import { usePage } from '@inertiajs/vue3';
import { useApi, useAuth } from '~/composables';
import { IconDeviceAnalytics, IconHexagonNumber6, IconLayersDifference } from '@tabler/icons-vue';

import menu from '@/data/navigation/sidebar';
import MenuItem from './sidebar/MenuItem.vue';
import SearchBox from './sidebar/SearchBox.vue';
import AddsButton from './sidebar/AddsButton.vue';

export default {
    data() {
        return {
            searchQuery: '',
            menuList: menu,
            currentUrl: this.$page.url,
            user: useAuth()
        }
    },
    components: {
        AddsButton,
        SearchBox,
        MenuItem,
        IconHexagonNumber6, IconLayersDifference, IconDeviceAnalytics,
    },
    props: {
        sidebarOpen: Boolean,
    },
    emits: ['toggleSidebar'],
    methods: {
        emitToggleSidebar() {
            this.$emit('toggleSidebar');
        },
        searchMenu(menu, searchTerm) {
            return menu
                .map((item) => {
                    // Jika ada children, lakukan rekursi untuk filter anak-anak
                    if (item.children) {
                        const filteredChildren = this.searchMenu(item.children, searchTerm);
                        if (filteredChildren.length > 0) {
                            return {
                                ...item,
                                children: filteredChildren,
                            };
                        }
                    }
                    if (item.menu_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return item;
                    }
                    return null;
                })
                .filter((item) => item !== null);
        },
    },
    computed: {
        filteredMenu() {
            if (!this.searchQuery) {
                return this.menuList;
            }
            const filteredMenu = this.searchMenu(this.menuList, this.searchQuery);

            return filteredMenu;
        },
    },
}
</script>
<style></style>