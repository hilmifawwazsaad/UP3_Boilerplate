<template>
    <Multiselect v-model="selected" :options="options" :multiple="multiple" :close-on-select="multiple ? false : true"
        :clear-on-select="true" :preserve-search="true" :placeholder="placeholder" :label="label" :track-by="track_by"
        :preselect-first="multiple ? false : true" :group-values="group_values" :group-label="group_label" :group-select="group_select">
        <template #selection="{ values, isOpen }" v-if="multiple">
            <span class="multiselect__single " v-if="values.length" v-show="!isOpen">
                {{ values.length }} {{ selected_message }}
            </span>
        </template>
    </Multiselect>
</template>
<script>
import Multiselect from 'vue-multiselect';

export default {
    components: {
        Multiselect
    },
    data() {
        return {
            selected: []
        }
    },
    emits: ["update:selected"],
    props: {
        options: Array,
        group_values: String,
        group_label: String,
        group_select: String,
        label: String,
        track_by: String,
        multiple: {
            type: Boolean,
            default: true
        },
        placeholder: {
            type: String,
            default: ""
        },
        selected_message: {
            type: String,
            default: "item dipilih"
        }
    },
    watch: {
        selected() {
            this.$emit("update:selected", this.selected);
        }
    },
}
</script>