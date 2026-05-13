<template>
    <div class="flex items-center justify-between px-4 py-2 md:px-5 md:py-3 border-b rounded-t 
        border-gray-600">

        <slot></slot>

        <div class="flex items-center gap-2">
            <slot name="extendButton"></slot>

            <!-- Tombol Fullscreen -->
            <el-tooltip v-if="useToggleFullModal" content="Fullscreen">
                <button type="button" @click="toggleFullModal"
                    class="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center  hover:bg-gray-600 hover:text-white cursor-pointer">
                    <svg v-if="useToggleFullModal" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round"
                        class="icon icon-tabler icons-tabler-outline icon-tabler-arrows-maximize">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M16 4l4 0l0 4" />
                        <path d="M14 10l6 -6" />
                        <path d="M8 20l-4 0l0 -4" />
                        <path d="M4 20l6 -6" />
                        <path d="M16 20l4 0l0 -4" />
                        <path d="M14 14l6 6" />
                        <path d="M8 4l-4 0l0 4" />
                        <path d="M4 4l6 6" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round"
                        class="icon icon-tabler icons-tabler-outline icon-tabler-arrows-minimize">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 9l4 0l0 -4" />
                        <path d="M3 3l6 6" />
                        <path d="M5 15l4 0l0 4" />
                        <path d="M3 21l6 -6" />
                        <path d="M19 9l-4 0l0 -4" />
                        <path d="M15 9l6 -6" />
                        <path d="M19 15l-4 0l0 4" />
                        <path d="M15 15l6 6" />
                    </svg>
                </button>
            </el-tooltip>

            <!-- Tombol Close -->
            <button type="button" @click="popModal" class="text-gray-400 bg-transparent 
                rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center 
                hover:bg-gray-500 hover:text-white cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-xbox-x">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 21a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9a9 9 0 0 0 9 9" />
                    <path d="M9 8l6 8" />
                    <path d="M15 8l-6 8" />
                </svg>
            </button>

        </div>
    </div>
</template>

<script>
import { popModal } from 'jenesius-vue-modal';

export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        useEmit: {
            type: Function,
            default: null
        }
    },
    inject: ['toggleFullModal', 'useToggleFullModal'],
    methods: {
        popModal() {
            if (!this.useEmit) {
                popModal()
            } else {
                this.useEmit()
            }
        }
    }
}
</script>
