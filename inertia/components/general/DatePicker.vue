<template>
    <div>
        <VueDatePicker v-model="inputValue" :placeholder="placeholder" text-input :dark="isDark"
            :enableTimePicker="isDateTime" :clearable="clearable" :format="computedFormat" :year-picker="isYear"
            :min-date="!isYear ? minDate : null" :max-date="!isYear ? maxDate : null"
            :min-year="isYear ? minYear : null" :max-year="isYear ? maxYear : null" :auto-apply="true" />
    </div>
</template>
<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import { useTheme } from '~/composables';
import { useDark } from '@vueuse/core';

export default {
    components: {
        VueDatePicker
    },
    props: {
        modelValue: {
            required: true
        },
        type: {
            type: String,
            default: 'date' // date | datetime | year
        },
        placeholder: {
            type: String,
            default: ''
        },
        clearable: {
            type: Boolean || null,
            default: null
        },

        minDate: {
            type: Date || String,
            default: null
        },

        maxDate: {
            type: Date || String,
            default: null
        },

        minYear: {
            type: Number,
            default: null
        },

        maxYear: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            isDark: useDark({
                selector: 'html',
                attribute: 'class',
                valueDark: 'dark',
                valueLight: 'light',
                storageKey: 'theme',
            })
        }
    },
    emits: ['update:modelValue'],

    computed: {
        inputValue: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', value)
            }
        },

        isDateTime() {
            return this.type === 'datetime'
        },

        isYear() {
            return this.type === 'year'
        },

        computedFormat() {
            if (this.type === 'datetime') return 'dd/MM/yyyy HH:mm'
            if (this.type === 'year') return 'yyyy'
            return 'dd/MM/yyyy'
        }
    }

}
</script>

<style>
.dp__theme_dark {
    --dp-background-color: #4e4e4e;
    --dp-text-color: #fff;
    --dp-hover-color: #747474;
    --dp-hover-text-color: #fff;
    --dp-hover-icon-color: #959595;
    --dp-primary-color: #005cb2;
    --dp-primary-disabled-color: #61a8ea;
    --dp-primary-text-color: #fff;
    --dp-secondary-color: #a9a9a9;
    --dp-border-color: #2d2d2d;
    --dp-menu-border-color: #706a6a;
    --dp-border-color-hover: #aaaeb7;
    --dp-border-color-focus: #aaaeb7;
    --dp-disabled-color: #737373;
    --dp-disabled-color-text: #d0d0d0;
    --dp-scroll-bar-background: #212121;
    --dp-scroll-bar-color: #484848;
    --dp-success-color: #00701a;
    --dp-success-color-disabled: #428f59;
    --dp-icon-color: #777777 --dp-danger-color: #e53935;
    --dp-marker-color: #e53935;
    --dp-tooltip-color: #3e3e3e;
    --dp-highlight-color: rgb(0 92 178 / 20%);
    --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
    --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
    --dp-range-between-border-color: var(--dp-hover-color, #fff);
}

.dp__input {
    padding-bottom: 0.5rem !important;
    padding-top: 0.5rem !important;
}
</style>