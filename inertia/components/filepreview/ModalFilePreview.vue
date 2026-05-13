<template>
    <ModalContainer size="6xl">
        <HeaderModal>
            <h1 class="text-base font-bold text-slate-700 dark:text-white">Preview File</h1>
        </HeaderModal>

        <BodyModal>
            <FilePreview :url="url" :ext="ext" />
        </BodyModal>
    </ModalContainer>
</template>
<script>
import ModalContainer from "../modal/ModalContainer.vue";
import HeaderModal from "../modal/HeaderModal.vue";
import BodyModal from "../modal/BodyModal.vue";

import Spinner from "../skeleton/Spinner.vue";
import FilePreview from "./FilePreview.vue";

export default {
    components: {
        ModalContainer,
        HeaderModal,
        FilePreview,
        BodyModal,
        Spinner,
    },
    props: {
        url: String,
        ext: {
            type: String,
            required: null
        },
    },
    data() {
        return {
            loading: true
        }
    },
    async mounted() {
    },
}
</script>