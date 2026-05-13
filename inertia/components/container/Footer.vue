<template>
    <footer class="bg-white shadow rounded-lg mt-4 mx-0 md:mx-4 dark:bg-dark-slate">
        <div class="w-full max-w-7xl p-4 md:flex md:items-center md:justify-between">
            <span class="text-sm text-gray-500 sm:text-center dark:text-slate-400">
                © 2025 |
                <Link href="/" class="hover:underline text-primary dark:text-slate-100">
                {{ appName }}
                </Link>
                . All Rights Reserved.
            </span>
        </div>
    </footer>
</template>
<script>
export default {
    data() {
        return {
            appName: import.meta.env.VITE_APP_NAME
        }
    }
}
</script>