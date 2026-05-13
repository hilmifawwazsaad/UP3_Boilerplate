<template>
    <div class="mt-3">
        <div id="blank-flexmonster-container" class=""></div>
    </div>
</template>
<script>
import Flexmonster from 'flexmonster'

export default {
    name: 'ToolsView',
    props: {
        toolbar: {
            type: Boolean,
            default: true
        },
        data: {
            type: Array,
            default: function () { return [] }
        },
        slice: {
            type: Object,
            default: null
        },
        to_public: {
            type: Boolean,
            default: false
        }
    },
    mounted() {

        const pivot = new Flexmonster({
            container: "#blank-flexmonster-container",
            toolbar: this.toolbar,
            height: '800px',
            beforetoolbarcreated: customizeToolbar,
            licenseKey: import.meta.env.VITE_FLEXMONSTER_LICENSE,
            report: {
                dataSource: {
                    dataSourceType: 'json',
                    data: this.data
                },
                slice: this.slice,
                options: {
                    'grid': {
                        'type': 'flat',
                        'showGrandTotals': 'off'
                    }
                },
                formats: [],
            }
        })

        function customizeToolbar(toolbar) {
            let tabs = toolbar.getTabs();

            if (this.to_public) {
                delete tabs[0];
                delete tabs[1];
                delete tabs[2];
            }

            const layoutPivotHandler = function () {
                pivot.setOptions({ grid: { type: "compact" } });
                pivot.refresh();
            };

            var layoutFlatHandler = function () {
                pivot.setOptions({ grid: { type: "flat" } });
                pivot.refresh();
            };

            toolbar.getTabs = function () {
                tabs.unshift({
                    id: "fm-tab-pivotflattab",
                    title: "Layout",
                    icon: this.icons.grid,
                    menu: [
                        {
                            id: "fm-tab-flattab",
                            title: "Table",
                            handler: layoutFlatHandler,
                            icon: this.icons.grid
                        },
                        {
                            id: "fm-tab-pivottab",
                            title: "Pivot",
                            handler: layoutPivotHandler,
                            icon: this.icons.format_conditional
                        },
                    ],
                });
                return tabs;
            };
        }
    }

}
</script>

<style scoped>
.fm-one-arrow-scroll {
    scrollbar-width: thin !important;
}
</style>