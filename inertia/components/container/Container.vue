<template>
    <div id="">
        <!-- Navbar -->
        <Navbar @toggleSidebar="toggleSidebar" :sidebarOpen="sidebarOpen" :useSidebar="useSidebar"
            class="fixed top-0 left-0 right-0 z-40 transition-all duration-300" />

        <div class="flex pt-16">
            <!-- Sidebar -->
            <aside v-if="useSidebar" :class="[
                'fixed inset-y-0 left-0 bg-white text-primary transition-all transform duration-200 shadow-lg z-30 overflow-auto dark:bg-dark-secondary dark:text-white dark:shadow-gray-600 dark:shadow-md',
                sidebarOpen ? 'w-64' : 'w-16'
            ]">
                <div class="h-16 flex items-center justify-between px-4 bg-white border-b">
                    <div class="text-xl font-semibold">
                    </div>
                </div>
                <nav class="mt-5 hs-accordion-group" data-hs-accordion-always-open>
                    <Sidebar :sidebarOpen="sidebarOpen" @toggleSidebar="toggleSidebar" />
                </nav>
            </aside>

            <div
                :class="['transition-all duration-300 flex-1 w-full overflow-x-auto ', useSidebar ? sidebarOpen ? 'ml-16 md:ml-64' : 'ml-16' : '']">
                <div class="min-h-96 mx-0 mt-0" :class="{
                    'md:mx-4 md:mt-4': use_margin,
                    'space-y-3': use_space_y
                }">
                    <slot></slot>
                </div>

                <Footer />
            </div>
        </div>
    </div>

    <div class="fixed bottom-2 inset-e-3 p-4 z-999">
        <a href="https://api.whatsapp.com/send/?phone=6285174388804&text=Halo+UP3%2C&type=phone_number" target="_blank"
            id="speed-dial-menu-default"
            class="group flex flex-row items-center justify-center mb-4 space-y-2 group-hover:text-white bg-green-500 group-hover:bg-green-700 rounded-full border border-green-200 dark:border-green-600 shadow-sm dark:group-hover:text-white dark:text-gray-200  dark:bg-green-700 dark:group-hover:bg-green-600 animate-pulse animate-duration-[2s] text-gray-200 group-focus:outline-none">
            <p class="flex justify-center items-center my-0! ps-4 pe-4 group-hover:pe-2 h-13">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                    <path
                        d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                </svg>
            </p>
            <p class="hidden group-hover:block my-0! pe-4!">
                Hotline
            </p>
        </a>
    </div>
</template>
<script>
import { useAuth } from '~/composables';
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';
import Footer from './Footer.vue';

export default {
    components: {
        Navbar,
        Sidebar,
        Footer,
    },
    data() {
        const currUser = useAuth({ current: true })
        let useSidebar = !!currUser

        return {
            sidebarOpen: true,
            windowWidth: window.innerWidth,
            minWidth: 768,
            useSidebar: useSidebar
        };
    },
    props: {
        use_margin: {
            type: Boolean,
            default: true
        },
        use_space_y: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        toggleSidebar() {
            this.sidebarOpen = !this.sidebarOpen;
        },
        handleResize() {
            this.windowWidth = window.innerWidth;
            if (window.innerWidth < this.minWidth) {
                this.sidebarOpen = false;
            } else {
                this.sidebarOpen = true;
            }
        },
    },
    watch: {
        windowWidth(newWidth) {
            if (newWidth < this.minWidth) {
                this.sidebarOpen = false;
            } else {
                this.sidebarOpen = true;
            }
        }
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
    },
}
</script>

<style scoped>
/* Hide scrollbar but allow scrolling */
aside::-webkit-scrollbar {
    width: 0;
    background: transparent;
    /* For Webkit browsers */
}

aside {
    -ms-overflow-style: none;
    /* For Internet Explorer and Edge */
    scrollbar-width: none;
    /* For Firefox */
}
</style>
