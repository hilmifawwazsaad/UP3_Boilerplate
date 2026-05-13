<template>
    <div v-if="extension == 'pdf'">
        <div class="h-[300px] xl:h-[600px] mb-2">
            <VuePdfApp :pdf="url" :config="config_pdf_viewer" />
        </div>
    </div>
    <div v-else
        class="h-[200px] xl:h-[425px] flex flex-col justify-center gap-x-2 items-center text-slate-700 dark:text-white">

        <svg v-if="extension == 'xlsx' || extension == 'xls'" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="125" height="125" viewBox="0 0 48 48">
            <path fill="#4CAF50" d="M41,10H25v28h16c0.553,0,1-0.447,1-1V11C42,10.447,41.553,10,41,10z">
            </path>
            <path fill="#FFF"
                d="M32 15H39V18H32zM32 25H39V28H32zM32 30H39V33H32zM32 20H39V23H32zM25 15H30V18H25zM25 25H30V28H25zM25 30H30V33H25zM25 20H30V23H25z">
            </path>
            <path fill="#2E7D32" d="M27 42L6 38 6 10 27 6z"></path>
            <path fill="#FFF"
                d="M19.129,31l-2.411-4.561c-0.092-0.171-0.186-0.483-0.284-0.938h-0.037c-0.046,0.215-0.154,0.541-0.324,0.979L13.652,31H9.895l4.462-7.001L10.274,17h3.837l2.001,4.196c0.156,0.331,0.296,0.725,0.42,1.179h0.04c0.078-0.271,0.224-0.68,0.439-1.22L19.237,17h3.515l-4.199,6.939l4.316,7.059h-3.74V31z">
            </path>
        </svg>

        <svg v-else-if="extension == 'docx' || extension == 'doc'" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="100" height="100" viewBox="0 0 48 48">
            <path fill="#2196F3" d="M41,10H25v28h16c0.553,0,1-0.447,1-1V11C42,10.447,41.553,10,41,10z">
            </path>
            <path fill="#FFF"
                d="M25 15.001H39V17H25zM25 19H39V21H25zM25 23.001H39V25.001H25zM25 27.001H39V29H25zM25 31H39V33.001H25z">
            </path>
            <path fill="#0D47A1" d="M27 42L6 38 6 10 27 6z"></path>
            <path fill="#FFF"
                d="M21.167,31.012H18.45l-1.802-8.988c-0.098-0.477-0.155-0.996-0.174-1.576h-0.032c-0.043,0.637-0.11,1.162-0.197,1.576l-1.85,8.988h-2.827l-2.86-14.014h2.675l1.536,9.328c0.062,0.404,0.111,0.938,0.143,1.607h0.042c0.019-0.498,0.098-1.051,0.223-1.645l1.97-9.291h2.622l1.785,9.404c0.062,0.348,0.119,0.846,0.17,1.511h0.031c0.02-0.515,0.073-1.035,0.16-1.563l1.503-9.352h2.468L21.167,31.012z">
            </path>
        </svg>

        <svg v-else-if="extension == 'zip' || extension == 'rar'" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="100" height="100" viewBox="0 0 48 48">
            <path fill="#CFD8DC"
                d="M17 24L7 17.467c0 0 1-1.865 1-3.732S7 10 7 10l10 6.533V24zM17 40L7 32.533c0 0 1-.934 1-2.8S7 26 7 26l10 6.533V40zM17 32L7 24.533c0 0 1-.934 1-2.8S7 18 7 18l10 6.533V32z">
            </path>
            <path fill="#3F51B5"
                d="M17.624,34c-0.219,0-0.44-0.071-0.624-0.219l-10.625-8c-0.432-0.346-0.501-0.975-0.156-1.406c0.344-0.431,0.975-0.501,1.405-0.156l10.625,8c0.432,0.346,0.501,0.975,0.156,1.406C18.208,33.871,17.917,34,17.624,34z">
            </path>
            <path fill="#3F51B5" d="M42,25H16c0,0,1,1.742,1,4.246S16,33,16,33h26c0,0,1-1,1-4S42,25,42,25z"></path>
            <path fill="#9C27B0"
                d="M17.624,26c-0.219,0-0.44-0.071-0.624-0.219l-10.625-8c-0.432-0.346-0.501-0.975-0.156-1.406c0.344-0.431,0.975-0.502,1.405-0.156l10.625,8c0.432,0.346,0.501,0.975,0.156,1.406C18.208,25.871,17.917,26,17.624,26z">
            </path>
            <path fill="#9C27B0" d="M42,17H16c0,0,1,1.742,1,4.246S16,25,16,25h26c0,0,1-1,1-4S42,17,42,17z"></path>
            <path fill="#8BC34A"
                d="M18.609,41c0-0.293-0.113-0.584-0.36-0.781l-10.625-8c-0.43-0.345-1.061-0.274-1.405,0.156c-0.345,0.432-0.275,1.061,0.156,1.406L15.962,41H18.609z">
            </path>
            <path fill="#8BC34A" d="M42,33H16c0,0,1,1.742,1,4.246S16,41,16,41h26c0,0,1-1,1-4S42,33,42,33z"></path>
            <path fill="#689F38" d="M42,33H16c0,0,0.441,0.756,0.733,2h26.035C42.473,33.559,42,33,42,33z"></path>
            <path fill="#303F9F" d="M42,25H16c0,0,0.441,0.756,0.733,2h26.035C42.473,25.559,42,25,42,25z"></path>
            <path fill="#FDD835"
                d="M21.034 32c.11-.45.299-1.379.299-2.5s-.189-2.05-.299-2.5H19c.003.009.333 1.267.333 2.5S19.002 31.993 19 32H21.034zM21.034 24c.11-.45.299-1.379.299-2.5s-.189-2.05-.299-2.5H19c.003.009.333 1.267.333 2.5S19.002 23.993 19 24H21.034zM21.034 40c.11-.45.299-1.379.299-2.5s-.189-2.05-.299-2.5H19c.003.009.333 1.267.333 2.5S19.002 39.993 19 40H21.034z">
            </path>
            <path fill="#7B1FA2"
                d="M42.768,19C42.473,17.559,42,17,42,17L30.844,8.591C30.844,8.591,30.063,8,29,8C27.771,8,7,8,7,8l0.018,0.018C6.703,8.012,6.39,8.137,6.191,8.412c-0.325,0.446-0.226,1.072,0.22,1.396l9.737,7.47c0.161,0.325,0.418,0.92,0.607,1.722H42.768z">
            </path>
            <path fill="#AF7000"
                d="M32,16L21,8h-5l11,8c1.75,1.25,2,1.625,2,3s0,19,0,19s0,3-2,3c1.056,0,3.678,0,5,0c2,0,2-3,2-3s0-18,0-19C34,17,32.438,16.438,32,16z">
            </path>
            <g>
                <path fill="#FFC107"
                    d="M34,27v4h-5v-4H34 M34.25,26h-5.5C28.336,26,28,26.336,28,26.75v4.5c0,0.414,0.336,0.75,0.75,0.75h5.5c0.414,0,0.75-0.336,0.75-0.75v-4.5C35,26.336,34.664,26,34.25,26L34.25,26z">
                </path>
            </g>
            <path fill="#5B3B07" d="M31.5 28.5A0.5 0.5 0 1 0 31.5 29.5A0.5 0.5 0 1 0 31.5 28.5Z"></path>
            <path fill="#FFEB3B"
                d="M31.5,29c-0.276,0-0.5-0.224-0.5-0.5v-3c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5v3C32,28.776,31.776,29,31.5,29z">
            </path>
        </svg>

        <div v-else-if="extension == 'png' || extension == 'jpg' || extension == 'jpeg'"
            class="flex flex-row gap-x-2 items-center">
            <img class="border border-slate-300" :src="url">
        </div>

        <svg v-else xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 128 128">
            <path fill="#FFF"
                d="M94.5,112h-61c-5.5,0-10-4.5-10-10V22c0-5.5,4.5-10,10-10h61c5.5,0,10,4.5,10,10v80C104.5,107.5,100,112,94.5,112z">
            </path>
            <path fill="#C7D7E2"
                d="M33.5 22H94.5V37H33.5zM88.5 57h-51c-1.7 0-3-1.3-3-3s1.3-3 3-3h51c1.7 0 3 1.3 3 3S90.2 57 88.5 57zM88.5 72h-51c-1.7 0-3-1.3-3-3s1.3-3 3-3h51c1.7 0 3 1.3 3 3S90.2 72 88.5 72zM64 87H37.5c-1.7 0-3-1.3-3-3s1.3-3 3-3H64c1.7 0 3 1.3 3 3S65.7 87 64 87z">
            </path>
            <path fill="#454B54"
                d="M94.5,115h-61c-7.2,0-13-5.8-13-13V22c0-7.2,5.8-13,13-13h61c7.2,0,13,5.8,13,13v80C107.5,109.2,101.7,115,94.5,115z M33.5,15c-3.9,0-7,3.1-7,7v80c0,3.9,3.1,7,7,7h61c3.9,0,7-3.1,7-7V22c0-3.9-3.1-7-7-7H33.5z">
            </path>
        </svg>


        <div class="">
            <p class="mb-1 text-sm lg:text-base">
                Jenis File:
                <span v-if="extension == 'xlsx' || extension == 'xls'" class="font-bold">
                    Excel
                </span>
                <span v-else-if="extension == 'docx' || extension == 'doc'" class="font-bold">
                    Word
                </span>
                <span v-else-if="extension == 'zip' || extension == 'rar'" class="font-bold">
                    Archive
                </span>
                <span v-else-if="extension == 'png' || extension == 'jpg' || extension == 'jpeg'" class="font-bold">
                    Image
                </span>
                <span v-else class="font-bold">
                    Lainnya
                </span>
            </p>

            <div class="flex flex-row gap-x-2 items-center">
                <a :href="url" target="_blank"
                    class="flex gap-2 items-center text-sm px-2 py-1 text-white rounded bg-green-500 hover:bg-green-700 group">
                    <IconDownload size="18" />
                    <span class="text-xs">
                        Unduh Berkas
                    </span>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
import Spinner from "../skeleton/Spinner.vue";
import VuePdfApp from "vue3-pdf-app";
import { IconDownload } from "@tabler/icons-vue";

import "vue3-pdf-app/dist/icons/main.css";

export default {
    components: {
        IconDownload,
        VuePdfApp,
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
            extension: null,
            config_pdf_viewer: {
                sidebar: {
                    viewThumbnail: true,
                    viewOutline: false,
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
                        scaleSelectContainer: false,
                    },
                }
            },
        }
    },
    mounted() {
        if (this.ext) {
            this.extension = this.ext
        } else {
            this.extension = this.url.split('.').pop().toLowerCase()
        }
    },
    methods: {

    }
}
</script>
