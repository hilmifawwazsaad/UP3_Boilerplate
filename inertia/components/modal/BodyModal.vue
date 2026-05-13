<template>
    <div :class="{
        'overflow-y-auto lg:overflow-y-hidden': overflowMobile && overflow,
        'overflow-y-auto': overflow && !overflowMobile,
        'px-4 py-2 md:px-8 mb-4 ': useMargin,
        'hide-scrollbar': hideScrollbar,
        'max-h-[calc(100vh-250px)]': !getIsFull(),
        'h-screen max-h-[calc(100vh-200px)]': getIsFull()
    }">
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        overflow: {
            type: Boolean,
            default: false
        },
        overflowMobile: {
            type: Boolean,
            default: false
        },
        useMargin: {
            type: Boolean,
            default: true
        },
        hideScrollbar: {
            type: Boolean,
            default: true
        }
    },
    inject: ['getIsFull']
}
</script>
