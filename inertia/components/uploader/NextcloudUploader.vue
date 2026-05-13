<template>
    <div class="flex justify-center">
        <div
            class="w-full bg-white shadow border border-gray-200 rounded-2xl p-8 text-center dark:bg-dark-secondary dark:border-gray-700">

            <!-- TITLE -->
            <h2 class="text-2xl font-bold text-gray-800 mb-2 dark:text-white">
                Upload your file
            </h2>
            <p class="text-sm text-gray-400 dark:text-gray-300">
                {{ allowedExtensions.join(', ') }}
            </p>

            <p class="text-sm text-gray-400 mb-6 dark:text-gray-300">
                Max {{ maxFileSize }}MB
            </p>

            <!-- DROP AREA -->
            <div v-if="!file && !loading" @click="triggerFileInput" @dragover.prevent @drop.prevent="handleDrop"
                class="bg-gray-100 hover:bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl py-12 px-6 cursor-pointer hover:border-blue-500 transition dark:bg-dark-slate dark:border-gray-600 dark:hover:border-blue-600 dark:hover:bg-dark-secondary/50">
                <div class="flex flex-col items-center">
                    <div class="text-3xl text-blue-500 mb-4 dark:text-blue-400">📁</div>
                    <p class="text-gray-500 dark:text-gray-400">
                        Drag & Drop your file here
                    </p>
                    <p class="text-xs text-gray-400 mt-1 dark:text-gray-300">
                        or click to browse
                    </p>
                </div>
            </div>

            <!-- LOADING -->
            <div v-if="loading"
                class="py-10 flex flex-col items-center border-2 border-blue-200 rounded-xl dark:border-blue-600">
                <div class="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <p class="mt-4 text-blue-600 text-sm font-medium">
                    Uploading file...
                </p>
            </div>

            <!-- SUCCESS -->
            <div v-if="successMessage && !loading"
                class="py-2 border-2 border-green-200 rounded-xl dark:border-green-600">
                <div class="flex flex-row justify-center items-center gap-3">
                    <div class="text-3xl text-green-500">✔</div>
                    <p class="text-green-600 text-sm font-medium">
                        {{ successMessage }}
                    </p>
                </div>
                <div class="py-2">
                    <a :href="url" target="_blank" class="cursor-pointer text-sm text-center hover:underline">
                        {{ url }}
                    </a>
                </div>
            </div>

            <!-- ERROR -->
            <div v-if="errorMessage && !loading"
                class="py-2 border-2 border-red-200 rounded-xl dark:border-red-600 flex flex-row justify-center items-center gap-3">
                <div class="text-3xl text-red-500">✖</div>
                <p class="text-red-600 text-sm font-medium">
                    {{ errorMessage }}
                </p>
            </div>

            <input type="file" ref="fileInput" hidden @change="handleFileChange" />
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
import { useApi } from '~/composables';

export default {
    props: {
        modelValue: {
            type: String,
            default: null
        },
        uploading: {
            type: Boolean,
            default: false
        },
        maxFileSize: {
            type: Number,
            default: 10
        },
        allowedExtensions: {
            type: Array,
            default: () => ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx']
        },
        destination: {
            type: String,
            default: 'Upload'
        }
    },

    emits: ['update:modelValue', 'update:uploading'],

    data() {
        return {
            file: null,
            loading: false,
            url: null,
            successMessage: null,
            errorMessage: null
        }
    },

    watch: {
        modelValue(val) {
            if (!val) {
                this.resetAll()
            }
        }
    },

    beforeUnmount() {
        this.resetAll()
    },

    methods: {
        getUploadStatus() {
            return this.loading
        },

        triggerFileInput() {
            this.$refs.fileInput.click()
        },

        handleDrop(event) {
            const file = event.dataTransfer.files[0]
            if (file) this.processFile(file)
        },

        handleFileChange(event) {
            const file = event.target.files[0]
            if (file) this.processFile(file)
        },

        async processFile(selectedFile) {
            this.resetState()

            const extension = selectedFile.name.split('.').pop().toLowerCase()

            if (!_.includes(this.allowedExtensions, extension)) {
                this.errorMessage = `Format tidak didukung (${extension})`
                return
            }

            const sizeMB = selectedFile.size / 1024 / 1024
            if (sizeMB > this.maxFileSize) {
                this.errorMessage = `Ukuran file melebihi ${this.maxFileSize}MB`
                return
            }

            this.file = selectedFile
            await this.uploadFile(selectedFile)
        },

        async uploadFile(selectedFile) {
            const api = useApi()

            try {
                this.loading = true
                this.$emit('update:uploading', true)

                const formData = new FormData()
                formData.append('file', selectedFile)
                formData.append('destination', this.destination)

                const response = await api.post('/r/nc/req/upload', formData)

                if (response.data.status === 200) {
                    this.successMessage = response.data.message
                    this.url = response.data.url
                    this.$emit('update:modelValue', this.url)
                } else {
                    this.errorMessage = response.data.message
                }

            } catch (error) {
                this.errorMessage =
                    error.response?.data?.error || 'Gagal upload ke server'
            } finally {
                this.loading = false
                this.$emit('update:uploading', false)
            }
        },

        resetState() {
            this.successMessage = null
            this.errorMessage = null
        },

        resetAll() {
            this.file = null
            this.url = null
            this.successMessage = null
            this.errorMessage = null
            this.loading = false
            this.$emit('update:uploading', false)

            if (this.$refs.fileInput) {
                this.$refs.fileInput.value = null
            }
        }
    }
}
</script>
