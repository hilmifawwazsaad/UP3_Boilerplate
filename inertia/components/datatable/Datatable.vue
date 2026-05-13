<template>
    <div class="w-full">
        <div v-if="title" class="flex items-center justify-between mb-5">
            <h2 class="text-3xl text-slate-800 dark:text-white">
                {{ title }}
            </h2>
        </div>

        <div :class="usePadding ? 'px-4' : ''">
            <div class="flex items-center gap-2 flex-1 w-full mb-1">
                <slot name="header"></slot>
            </div>
        </div>
        <div class="flex flex-col lg:flex-row justify-between items-start gap-3 w-full mb-2"
            :class="usePadding ? 'px-4' : ''">
            <div class="flex-1 w-full">
                <slot name="addButtons-1"></slot>
            </div>

            <div class="w-full flex-1 flex flex-row items-center gap-x-2">
                <div v-if="globalSearch" class="flex-1 flex h-fit w-full justify-end max-w-full ">
                    <input v-model="search" type="text"
                        class="border bg-slate-50 border-slate-400 py-2.5 px-4 block w-full lg:w-3/4 rounded-md text-sm dark:text-white dark:bg-dark-field dark:border-dark-gray dark:placeholder:text-white"
                        placeholder="Search..." />
                </div>

                <div class="shrink">
                    <el-tooltip v-if="useExport" content="Export to Excel">
                        <button @click="exportTable2Excel()"
                            class="flex flex-row items-center gap-x-1.5 hover:bg-slate-200 text-slate-700 p-2.5 rounded-md text-sm cursor-pointer dark:text-slate-200 dark:hover:bg-dark-gray">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round"
                                class="icon icon-tabler icons-tabler-outline icon-tabler-file-type-xls">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                                <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
                                <path d="M4 15l4 6" />
                                <path d="M4 21l4 -6" />
                                <path
                                    d="M17 20.25c0 .414 .336 .75 .75 .75h1.25a1 1 0 0 0 1 -1v-1a1 1 0 0 0 -1 -1h-1a1 1 0 0 1 -1 -1v-1a1 1 0 0 1 1 -1h1.25a.75 .75 0 0 1 .75 .75" />
                                <path d="M11 15v6h3" />
                            </svg>
                        </button>
                    </el-tooltip>
                    <slot name="addButtons-2"></slot>
                </div>
            </div>
        </div>

        <div class="" v-if="loading">
            <TableSkeleton :columns="cols" />
        </div>
        <vue3-datatable v-else id="printableTable" ref="tableToPrint" :rows="data" :columns="cols" :isServerMode="false"
            :columnFilter="columnFilter" :stickyFirstColumn="stickyFirstColumn" :sortable="sortable"
            class="overflow-x-scroll column-filter bg-white dark:bg-transparent dark:text-white! hide-scrollbar"
            :class="usePadding ? ' px-4 py-1' : ''" skin="bh-table-striped bh-table-hover bh-table-bordered"
            :search="search" :hasCheckbox="hasCheckbox" :pageSize="pageSize" @rowSelect="rowSelect"
            :pagination="pagination">
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
import Vue3Datatable from '@bhplugin/vue3-datatable';
import TableSkeleton from '../skeleton/TableSkeleton.vue';
import { utils, writeFile } from 'xlsx';
import { useExcel } from '~/composables';

export default {
    components: {
        Vue3Datatable,
        TableSkeleton
    },
    props: {
        cols: Array,
        rows: Array | Function,
        globalSearch: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: ''
        },
        columnFilter: {
            type: Boolean,
            default: false
        },
        sortable: {
            type: Boolean,
            default: true
        },
        currentPage: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 10
        },
        stickyFirstColumn: {
            type: Boolean,
            default: false
        },
        hasCheckbox: {
            type: Boolean,
            default: false
        },
        usePadding: {
            type: Boolean,
            default: true
        },
        pagination: {
            type: Boolean,
            default: true
        },
        useExport: {
            type: Boolean,
            default: false
        }
    },
    created() {
        if (typeof this.rows === 'function') {
            this.loading = true
            this.rows().then(data => {
                this.data = data
            }).finally(() => {
                setTimeout(() => {
                    this.loading = false
                }, 250)
            })
        } else {
            this.data = this.rows
            this.loading = false
        }
    },
    watch: {
        rows() {
            this.data = this.rows
        }
    },
    data() {
        return {
            data: [],
            search: '',
            loading: true,
        }
    },
    emits: ['rowSelect'],
    methods: {
        rowSelect(data) {
            this.$emit('rowSelect', data)
        },

        exportTable2Excel() {
            useExcel().exportToExcel(this.data, this.cols, 'export')
        },
    },
}
</script>
