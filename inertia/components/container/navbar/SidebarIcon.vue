<template>
    <div class="py-3.5 flex items-center justify-between">
        <Link href="/" class="text-xl font-semibold ms-4">
        <span v-if="sidebarOpen" class="flex  items-center gap-x-1">
            <div class="me-2 inline p-2.5 bg-white hover:bg-slate-50 rounded-xl shadow-md dark:bg-dark-slate">
                <img src="/public/images/LogoITS.png" alt="Logo ITS" class="w-6">
            </div>
            <span class="select-none">{{ appName }}</span>
        </span>
        <span v-else>
            <img src="/public/images/LogoITS.png" alt="Logo ITS" class="w-10 inline">
        </span>
        </Link>
    </div>
</template>
<script>
export default {
    props: {
        sidebarOpen: Boolean
    },
    data() {
        return {
            appName: import.meta.env.VITE_APP_NAME
        }
    }
}
</script>