<template>
    <ProviderHandler>
        <slot></slot>
    </ProviderHandler>
    <ModalContainer class="absolute z-999" />
</template>
<script>
import { container as ModalContainer } from "jenesius-vue-modal"
import { useTheme } from "~/composables";
import ProviderHandler from "./ProviderHandler.vue";

export default {
    components: {
        ModalContainer,
        ProviderHandler
    },
    mounted() {
        if (localStorage.getItem('theme') == null) {
            localStorage.setItem('theme', 'light')
        }

        const theme = useTheme()
        theme.sweetAlert2(localStorage.getItem('theme'))
        theme.flexMonster(localStorage.getItem('theme'))
    },
}
</script>