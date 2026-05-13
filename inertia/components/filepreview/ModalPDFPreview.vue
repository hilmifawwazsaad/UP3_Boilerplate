<template>
    <ModalContainer size="4xl">
        <BodyModal>
            <div class="transition-all h-[calc(100vh-300px)] py-2">
                <VuePdfApp :pdf="url" :config="config_pdf_viewer" />
            </div>
        </BodyModal>
    </ModalContainer>
</template>
<script>
import ModalContainer from "../modal/ModalContainer.vue";
import HeaderModal from "../modal/HeaderModal.vue";
import BodyModal from "../modal/BodyModal.vue";
import VuePdfApp from "vue3-pdf-app";

export default {
    components: {
        VuePdfApp,
        ModalContainer,
        BodyModal
    },
    props: {
        url: String
    },
    data() {
        return {
            config_pdf_viewer: {
                sidebar: {
                    viewThumbnail: true,
                    viewOutline: true,
                    viewAttachments: false,
                },
                secondaryToolbar: {
                    secondaryPresentationMode: false,
                    secondaryOpenFile: false,
                    secondaryPrint: false,
                    secondaryDownload: false,
                    secondaryViewBookmark: false,
                    firstPage: false,
                    lastPage: false,
                    pageRotateCw: false,
                    pageRotateCcw: false,
                    cursorSelectTool: false,
                    cursorHandTool: false,
                    scrollVertical: false,
                    scrollHorizontal: false,
                    scrollWrapped: false,
                    spreadNone: false,
                    spreadOdd: false,
                    spreadEven: false,
                    documentProperties: false,
                },
                toolbar: {
                    toolbarViewerLeft: {
                        findbar: false,
                        previous: false,
                        next: false,
                        pageNumber: true,
                    },
                    toolbarViewerRight: {
                        presentationMode: true,
                        openFile: false,
                        print: true,
                        download: true,
                        viewBookmark: false,
                    },
                    toolbarViewerMiddle: {
                        zoomOut: true,
                        zoomIn: true,
                        scaleSelectContainer: true,
                    },
                }
            }
        }
    }
}
</script>