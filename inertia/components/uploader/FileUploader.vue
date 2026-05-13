<template>
    <div class="file-upload">
        <input type="file" ref="fileInput" @change="handleFileChange" style="display: none;" />
        <div v-if="!file"
            class="cursor-pointer p-12 flex justify-center bg-white border border-dashed border-slate-400 rounded-xl dark:bg-dark-field dark:border-slate-600"
            @click="triggerFileInput">
            <div class="text-center">
                <span
                    class="inline-flex justify-center items-center size-16 bg-gray-100 text-gray-800 rounded-full dark:bg-gray-800 dark:text-gray-100">
                    <svg class="shrink-0 size-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" x2="12" y1="3" y2="15"></line>
                    </svg>
                </span>
                <div class="mt-4 flex flex-wrap justify-center text-sm leading-6 text-gray-600 dark:text-gray-400">
                    <span class="pe-1 font-medium text-gray-800 dark:text-gray-100">
                        Select your file to upload
                    </span>
                    <span
                        class="underline semibold text-blue-600 hover:text-blue-700 rounded-lg decoration-2 hover:underline focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-600 dark:text-blue-500">browse</span>
                </div>
                <p class="mt-1 text-xs text-gray-400">
                    Pick a file up to {{ maxFileSize }}MB.
                </p>
                <p class="mt-1 text-xs text-gray-400 uppercase">
                    {{ allowedExtensions.join(', ') }}
                </p>
            </div>
        </div>
        <div v-if="file" class="mt-4 p-3 bg-white border border-solid border-gray-300 rounded-xl dark:bg-dark-field dark:border-slate-600">
            <div class="mb-1 flex justify-between items-center">
                <div class="flex items-center gap-x-3">
                    <span
                        class="size-10 flex justify-center items-center border border-gray-200 text-gray-500 rounded-lg dark:border-slate-300 dark:text-gray-100">
                        <img :src="file.preview" class="rounded-lg" v-if="file.preview" />
                        <svg v-else class="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"></path>
                            <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                            <path d="m5 12-3 3 3 3"></path>
                            <path d="m9 18 3-3-3-3"></path>
                        </svg>
                    </span>
                    <div>
                        <p class="text-sm font-medium text-gray-800 dark:text-gray-100">
                            <span class="truncate inline-block max-w-[300px] align-bottom">{{ file.name }}</span>
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-300">{{ file.size }} KB</p>
                    </div>
                </div>
                <div class="flex items-center gap-x-2">
                    <button type="button"
                        class="cursor-pointer text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
                        @click="removeFile">
                        <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            <line x1="10" x2="10" y1="11" y2="17"></line>
                            <line x1="14" x2="14" y1="11" y2="17"></line>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="flex items-center gap-x-3 whitespace-nowrap">
                <div class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden" role="progressbar"
                    aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                    <div class="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition-all duration-500 dark:bg-blue-600 dark:text-gray-900"
                        :style="{ width: progress + '%' }"></div>
                </div>
                <div class="w-10 text-end">
                    <span class="text-sm text-gray-800 dark:text-gray-100">
                        <span>{{ progress }}</span>%
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';

export default {
    components: {
    },
    data() {
        return {
            fileInput: null,
            file: null,
            progress: 0,
        };
    },
    props: {
        maxFileSize: {
            type: Number,
            default: 10
        },
        allowedExtensions: {
            type: Array,
            default: () => {
                return ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'jpg', 'jpeg', 'png']
            }
        }
    },
    methods: {
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        handleFileChange(event) {
            const selectedFile = event.target.files[0];

            if (selectedFile) {
                const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

                if (_.includes(this.allowedExtensions, fileExtension)) {
                    const fileReader = new FileReader();

                    fileReader.onload = () => {
                        this.file = {
                            name: selectedFile.name,
                            extension: fileExtension,
                            size: (selectedFile.size / 1024).toFixed(2),
                            // preview: fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png' ? fileReader.result : null
                        };

                        if (this.file.size / 1000 > this.maxFileSize) {
                            this.$swal.fire({
                                icon: 'error',
                                title: `Ukuran File terlalu besar (Max. ${this.maxFileSize}MB).`,
                                timer: 2000,
                                timerProgressBar: true
                            })

                            this.removeFile();

                            return;
                        }

                        this.progress = 0;
                        this.uploadProgress();

                        this.$emit('file-uploaded', selectedFile);
                    };

                    fileReader.readAsDataURL(selectedFile);
                } else {
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Format File tidak didukung.',
                        html: `Hanya file <b>${this.allowedExtensions.join(', ')}</b> yang diperbolehkan.`,
                        timer: 5000,
                        timerProgressBar: true
                    });
                }
            }
        },
        uploadProgress() {
            const interval = setInterval(() => {
                this.progress = Math.min(100, this.progress + Math.random() * Math.random()).toFixed(0);
                if (this.progress === 100) {
                    clearInterval(interval);
                }
            }, 250);
        },
        removeFile() {
            this.file = null;
            this.$refs.fileInput.value = null;
            this.progress = 0;
            this.$emit('file-uploaded', null);
        }
    }
};

</script>