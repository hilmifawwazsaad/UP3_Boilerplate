<template>
    <div class="w-full">

        <div class="flex items-center justify-between mb-5">
            <h2 class="text-2xl font-semibold text-slate-800">
                {{ title }}
            </h2>
        </div>

        <div class="flex flex-col lg:flex-row justify-between mb-4 gap-3">

            <div class="flex-1">
                <div>
                    <slot name="header"></slot>
                </div>
            </div>

            <div>
                <div v-if="globalSearch" class="flex-1 flex justify-end">
                    <input v-model="search" type="text"
                        class="border bg-slate-50 border-slate-400 py-2.5 px-4 block w-full xl:w-72 rounded-md text-sm dark:text-white dark:bg-dark-field dark:border-dark-gray dark:placeholder:text-white"
                        placeholder="Search..." />
                </div>
            </div>
        </div>

        <vue3-datatable :rows="rows" :columns="cols" :totalRows="totalRows" :isServerMode="true"
            :currentPage="params.page" :pageSize="params.size" :sortColumn="params.sortColumn"
            :sortDirection="params.sortDirection" :loading="loading" :hasCheckbox="hasCheckbox" @change="handleChange" @rowSelect="rowSelect" :selectedRows="selectedRows">
            <template #actions="{ value }">
                <slot name="actions" :value="value"></slot>
            </template>
            
            <template #slot1="{ value }">
                <slot name="slot1" :value="value"></slot>
            </template>
            <template #slot2="{ value }">
                <slot name="slot2" :value="value"></slot>
            </template>
            <template #slot3="{ value }">
                <slot name="slot3" :value="value"></slot>
            </template>
            <template #slot4="{ value }">
                <slot name="slot4" :value="value"></slot>
            </template>
            <template #slot5="{ value }">
                <slot name="slot5" :value="value"></slot>
            </template>
            <template #slot6="{ value }">
                <slot name="slot6" :value="value"></slot>
            </template>

        </vue3-datatable>

    </div>
</template>

<script>

import Vue3Datatable from "@bhplugin/vue3-datatable"
import debounce from "lodash/debounce"

export default {

    components: {
        Vue3Datatable
    },

    props: {
        title: {
            type: String,
            default: ''
        },
        cols: {
            type: Array,
            required: true
        },
        rows: {
            type: Array,
            required: true
        },
        totalRows: {
            type: Number,
            required: true
        },
        params: {
            type: Object,
            required: true
        },
        primaryColumn: {
            type: String,
            required: true
        },
        loading: Boolean,
        globalSearch: {
            type: Boolean,
            default: true
        },
        hasCheckbox: {
            type: Boolean,
            default: false
        },
        selectedRows: {
            type: Array,
            default: () => []
        },
    },

    emits: ['change', 'rowSelect'],

    data() {
        return {
            search: this.params.search || ''
        }
    },

    watch: {
        search: {
            handler: debounce(function (val) {
                this.emitChange({
                    ...this.params,
                    page: 1,
                    search: val || null
                })
            }, 400)
        }
    },
    methods: {
        handleChange(e) {
            const params = {
                page: e.current_page,
                size: e.pagesize,
                sortColumn: e.sort_column || this.primaryColumn,
                sortDirection: e.sort_direction || 'asc',
                search: this.search || null
            }

            this.$emit('change', params)
        },

        emitChange(params) {
            this.$emit('change', params)
        },

        rowSelect(rows) {
            this.$emit('rowSelect', rows)
        }
    }
}
</script>