<template>
    <span :data-popover-target="'popover-' + id" :data-popover-placement="placement"
        class="cursor-pointer underline decoration-dotted inline-block">
        <slot></slot>
    </span>

    <div data-popover :id="'popover-' + id" role="tooltip"
        class="absolute z-120 invisible inline-block min-w-42 max-w-72 text-sm transition-opacity duration-300 bg-white border border-slate-100 rounded-lg shadow-lg opacity-0 dark:bg-dark-secondary dark:border-dark-primary">
        <div class="px-3 py-2 font-normal text-black! dark:text-white!">
            <slot name="content"></slot>
        </div>
        <div data-popper-arrow></div>
    </div>

</template>
<script>
import { initPopovers } from 'flowbite';

export default {
    data() {
        return {
            id: this.$generate.uid()
        }
    },
    props: {
        placement: {
            type: String,
            default: 'bottom'
        }
    },
    mounted() {
        this.$nextTick(() => {
            initPopovers()
        })
    }
}
</script>