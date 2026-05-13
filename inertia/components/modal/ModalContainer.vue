<template>
    <div class="modal-window absolute bg-white pb-2 pt-2 w-full rounded-lg shadow-lg 
        dark:bg-dark-secondary dark:border dark:border-gray-700 dark:shadow-gray-800" :class="[
            sizeClass,
            {
                'max-w-full rounded-none': isFull,
                'top-5 lg:top-auto': !isFull
            }
        ]">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        size: {
            type: String,
            default: '2xl'
        },
        useToggleFullModal: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            isFull: false
        }
    },

    computed: {
        sizeClass() {
            return {
                'max-w-sm': this.size === 'sm',
                'max-w-md': this.size === 'md',
                'max-w-lg': this.size === 'lg',
                'max-w-xl': this.size === 'xl',
                'max-w-2xl': this.size === '2xl',
                'max-w-3xl': this.size === '3xl',
                'max-w-4xl': this.size === '4xl',
                'max-w-5xl': this.size === '5xl',
                'max-w-6xl': this.size === '6xl',
                'max-w-7xl': this.size === '7xl',
                'max-w-352': this.size === '8xl',
            }
        }
    },

    methods: {
        toggleFullModal() {
            this.isFull = !this.isFull
        },
        getIsFull() {
            return this.isFull
        }
    },

    provide() {
        return {
            toggleFullModal: this.toggleFullModal,
            useToggleFullModal: this.useToggleFullModal,
            getIsFull: this.getIsFull
        }
    }
}
</script>
