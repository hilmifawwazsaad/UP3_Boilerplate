<template>
    <div>
        <h2 :id="'accordion-card-heading-' + id">
            <button type="button"
                class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-body rounded-lg shadow-xs border border-slate-400 dark:border-gray-500 hover:font-semibold hover:bg-slate-50 dark:hover:bg-dark-slate/80 cursor-pointer gap-3 aria-expanded:rounded-b-none aria-expanded:shadow-none"
                :data-accordion-target="'#accordion-card-body-' + id" aria-expanded="true"
                :aria-controls="'accordion-card-body-' + id">
                <span>
                    <slot name="title"></slot>
                </span>
                <svg data-accordion-icon class="w-5 h-5 rotate-180 shrink-0" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m5 15 7-7 7 7" />
                </svg>
            </button>
        </h2>
        <div :id="'accordion-card-body-' + id"
            class="hidden border border-t-0 border-slate-400 dark:border-gray-500 rounded-b shadow-xs"
            :aria-labelledby="'accordion-card-heading-' + id">
            <div class="p-4 md:p-5">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            id: this.$generate.uid(5),
        }
    },
}
</script>