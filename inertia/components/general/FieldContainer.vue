<template>
    <div class="">
        <label class="font-bold text mb-0.5 block w-fit" :for="id">
            <slot name="label"></slot>
            <span v-if="required" class="text-red-500">*</span>
        </label>
        <p class="mb-2 block w-fit text-sm">
            <slot name="description"></slot>
        </p>

        <multiselect :class="{ 'invalid': isError }" :id="id" v-if="type == 'multiselect'" v-model="inputValue"
            :options="multiselect.options" :multiple="multiselect.multiple ?? true"
            :taggable="multiselect.taggable ?? false" @tag="$emit('tag', $event)"
            :tag-placeholder="multiselect.tagPlaceholder ?? null" :group-values="multiselect.groupValues ?? null"
            :group-label="multiselect.groupLabel ?? null" :group-select="multiselect.groupSelect ?? false"
            :close-on-select="multiselect.closeOnSelect ?? false" :clear-on-select="multiselect.clearOnSelect ?? false"
            :preserve-search="multiselect.preserveSearch ?? true" :placeholder="placeholder"
            :label="multiselect.label ?? null" :track-by="multiselect.trackBy ?? null"
            :searchable="multiselect.searchable ?? true" :allowEmpty="multiselect.allowEmpty ?? true"
            :show-labels="multiselect.showLabels ?? false" :disabled="disabled" useTeleport :blockKeys="['Delete']"
            :openDirection="multiselect.openDirection">
            <template #selection="{ values, isOpen }">
                <span class="multiselect__single" v-if="values.length" v-show="!isOpen">
                    {{ values.length }} data selected
                </span>
            </template>
        </multiselect>

        <DatePicker :id="id" v-else-if="type == 'datetime'" v-model="inputValue" :placeholder="placeholder"
            type="datetime" :minDate="dateOptions.min" :maxDate="dateOptions.max" :clearable="!required" />
        <DatePicker :id="id" v-else-if="type == 'date'" v-model="inputValue" :placeholder="placeholder" type="date"
            :minDate="dateOptions.min" :maxDate="dateOptions.max" :clearable="!required" />
        <DatePicker :id="id" v-else-if="type == 'year'" v-model="inputValue" :placeholder="placeholder" type="year"
            :minYear="dateOptions.min" :maxYear="dateOptions.max" :clearable="!required" />

        <textarea :id="id" v-else-if="type == 'textarea'" v-model="inputValue" :disabled="disabled"
            class="py-2.5 px-3 block w-full rounded text focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none disabled:dark:bg-dark-gray disabled:dark:text-white dark:text-white dark:bg-dark-slate dark:border-dark-gray dark:placeholder:text-gray-400"
            :class="isError ? 'border-red-500' : 'border-gray-200 '" :placeholder="placeholder"></textarea>

        <!-- ✅ INPUT RUPIAH -->
        <input :id="id" v-else-if="type == 'rupiah'" type="text" :value="formattedRupiah" @input="onRupiahInput"
            :disabled="disabled" class="py-2.5 px-3 block w-full rounded text
                   focus:border-blue-500 focus:ring-blue-500
                   disabled:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none disabled:dark:bg-dark-gray disabled:dark:text-white dark:text-white
                   dark:bg-dark-slate dark:border-dark-gray dark:placeholder:text-gray-400"
            :class="isError ? 'border-red-500' : 'border-gray-200'" :placeholder="placeholder" />


        <ModelSelect v-else-if="type == 'select'" class="flex-1 dark:bg-dark-field! dark:border-slate-500! dark:text-white!"
            :options="selectOptions" v-model="inputValue" />

        <input :id="id" v-else :type="type" v-model="inputValue" :disabled="disabled"
            class="py-2 px-3 block w-full rounded text-slate-900 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none disabled:dark:bg-dark-gray disabled:dark:text-white dark:text-white dark:bg-dark-slate dark:border-dark-gray dark:placeholder:text-gray-400"
            :class="isError ? 'border-red-500' : 'border-gray-200 '" :placeholder="placeholder">

        <span v-if="isError" class="text-red-500 text-xs">
            <slot name="error"></slot>
        </span>
    </div>
</template>
<script>
import Multiselect from 'vue-multiselect'
import DatePicker from './DatePicker.vue';
import { ModelSelect } from 'vue-search-select';

export default {
    components: {
        Multiselect,
        DatePicker,
        ModelSelect
    },
    props: {
        modelValue: {
            required: true
        },
        isError: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        multiselect: {
            type: Object,
            default: {
                options: [],
                groupValues: null,
                groupLabel: null,
                groupSelect: null,
                closeOnSelect: null,
                clearOnSelect: null,
                preserveSearch: null,
                label: null,
                trackBy: null,
                openDirection: 'bottom',
            }
        },
        dateOptions: {
            type: Object,
            default: {
                min: null,
                max: null
            }
        },
        selectOptions: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            inputValue: this.modelValue,
            id: this.$generate.uid()
        }
    },
    computed: {
        formattedRupiah() {
            return this.formatRupiah(this.inputValue)
        }
    },

    emits: ['update:modelValue', 'tag'],
    watch: {
        inputValue(value) {
            this.$emit('update:modelValue', value)
        },
        modelValue(value) {
            this.inputValue = value
        }
    },
    methods: {
        formatRupiah(value) {
            if (value === null || value === undefined || value === '') return ''

            const numberString = value
                .toString()
                .replace(/[^0-9]/g, '')

            return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        },

        unformatRupiah(value) {
            if (!value) return 0

            return parseInt(
                value.toString().replace(/[^0-9]/g, ''),
                10
            ) || 0
        },

        onRupiahInput(e) {
            const raw = e.target.value
            this.inputValue = this.unformatRupiah(raw)
        }
    }
}
</script>
