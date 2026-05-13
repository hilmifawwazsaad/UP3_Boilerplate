<template>
  <div>
    <div v-if="loading" class="p-4">
      <div class="flex flex-col sm:flex-row justify-between mb-3">
        <div class="w-full h-16 animate-pulse flex flex-row gap-x-3">
          <div class="w-full bg-slate-200 rounded dark:bg-dark-gray"></div>
          <div class="w-full bg-slate-200 rounded dark:bg-dark-gray"></div>
        </div>
        <div class="w-full"></div>
        <div class="w-full h-16 animate-pulse flex flex-row gap-x-3">
          <div class="w-full sm:w-3/4 bg-slate-200 rounded dark:bg-dark-gray"></div>
          <div class="w-full sm:w-1/4 bg-slate-200 rounded dark:bg-dark-gray"></div>
        </div>
      </div>

      <div class="w-full h-100 bg-slate-200 animate-pulse px-3 py-4 rounded space-y-3  dark:bg-dark-gray">
        <div class="h-6 bg-slate-50 animate-pulse rounded dark:bg-dark-slate"></div>
        <div class="py-0.5"></div>
        <div v-for="i in 10" :key="i" class="h-4 bg-slate-50 animate-pulse rounded dark:bg-dark-slate"></div>
      </div>
    </div>
    <div v-if="!error">
      <div id="flexmonster-container" class="" :class="loading ? 'invisible' : 'visible'"></div>
      <slot v-if="use_accessor && !loaded && !loading"></slot>
    </div>
    <div v-else class="text-center w-full text-red-500 py-3">
      {{ error_message }}
    </div>
  </div>
</template>
<script>
import Flexmonster from 'flexmonster'
// import("flexmonster/theme/macos/flexmonster.min.css")
// import "flexmonster/theme/softdefault/flexmonster.min.css";
// import "flexmonster/theme/midnight/flexmonster.min.css";

import { useApi } from '~/composables';

export default {
  name: 'FlexMonsterComponent',
  components: {
  },
  data() {
    return {
      loading: true,
      loaded: false,
      error: false,
      toolbar_tools: {
        'toolbar_open': this.toolbar_open,
        'toolbar_save': this.toolbar_save,
        'toolbar_connect': this.toolbar_connect
      },
    }
  },
  props: {
    api: {
      type: String,
      default: null
    },
    data: {
      type: Object,
      default: null
    },
    toolbar: {
      type: Boolean,
      default: true
    },
    option: {
      type: Object,
      default: function () {
        return {
          'grid': {
            'type': 'flat',
            'showGrandTotals': 'off'
          }
        }
      }
    },
    formats: {
      type: Array,
      default: function () {
        return []
      }
    },
    slice: {
      type: Object,
      default: null
    },
    api_method: {
      type: String,
      default: 'get'
    },
    height_table: {
      type: Number,
      default: 700
    },
    toolbar_connect: {
      type: Boolean,
      default: false
    },
    toolbar_open: {
      type: Boolean,
      default: false
    },
    toolbar_save: {
      type: Boolean,
      default: false
    },
    use_accessor: {
      type: Boolean,
      default: false
    },
    error_message: {
      type: String,
      default: ''
    }
  },
  mounted: function () {
    this.loading = true;

    if (this.data) {
      this.fetchData({
        data: this.data
      })
      this.loading = false;
    } else {
      this.loadData()
    }
  },
  methods: {
    fetchData(res) {
      const toolbar_tools = this.toolbar_tools

      if (res.data.length === 0) {
        this.loading = false;
        return
      }

      let pivot = new Flexmonster({
        container: "#flexmonster-container",
        componentFolder: "https://cdn.flexmonster.com/",
        toolbar: this.toolbar,
        height: this.height_table,
        beforetoolbarcreated: customizeToolbar,
        licenseKey: import.meta.env.VITE_FLEXMONSTER_LICENSE,
        report: {
          dataSource: {
            dataSourceType: 'json',
            data: res.data.map((d) => {
              if (!d._sys_date_processed) {
                return {
                  ...d
                }
              } else {
                return {
                  ...d,
                  _sys_date_processed: d._sys_date_processed.split('.')[0]
                }
              }
            }),
          },
          slice: this.slice,
          options: {
            ...this.option
          },
          formats: this.formats,
        }
      })

      pivot.customizeContextMenu(function (items, data) {
        items.push({
          label: "Copy",
          handler: () => {
            let content = "";
            if (Array.isArray(data)) {
              let prev;
              for (let cell of data) {
                if (prev) {
                  if (cell.columnIndex > prev.columnIndex) {
                    content += "\t" + cell.label;
                  }
                  if (cell.rowIndex > prev.rowIndex) {
                    content += "\n" + cell.label;
                  }
                  prev = cell;
                } else {
                  content += cell.label;
                  prev = cell;
                }
              }
            } else {
              content += data.label;
            }

            const textarea = document.createElement("textarea");
            textarea.innerHTML = content;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
          }
        });
        return items;
      });


      function customizeToolbar(toolbar) {
        let tabs = toolbar.getTabs();

        if (!toolbar_tools.toolbar_connect) {
          delete tabs[0];
        }

        if (!toolbar_tools.toolbar_open) {
          delete tabs[1];
        }

        if (!toolbar_tools.toolbar_save) {
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
    },
    loadData() {
      let api = useApi()

      if (this.api_method == 'post') {
        api = api.post(this.api)
      } else {
        api = api.get(this.api)
      }

      api.then(res => {
        this.fetchData(res)
      }).catch(() => {
        this.error = true;
      }).finally(() => {
        this.loading = false;
        this.loaded = true;
      })
    },
  }
}
</script>

<style scoped>
.fm-one-arrow-scroll {
  scrollbar-width: thin !important;
}
</style>