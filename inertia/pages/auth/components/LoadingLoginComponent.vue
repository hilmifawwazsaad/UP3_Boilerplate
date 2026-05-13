<template>
    <div
        class="container mx-auto flex gap-4 flex-col text-center md:text-left items-center justify-evenly px-5 text-white select-none">
        <div class="">
            <div class="flex justify-center flex-col items-center gap-y-4">
                <img src="/public/images/myits-sso.png" alt="Logo ITS" class="w-52">
                <h1 class="text-2xl font-bold">{{ appName }}</h1>
            </div>

            <div class="mt-8 flex items-center justify-center space-x-4">
                <div v-for="i in 3" :key="i" class="w-3 h-3 bg-white rounded-full animate-bounce"
                    :class="`animation-delay-${i}`"></div>
            </div>

            <p class="mt-4 text-center">{{ message }}</p>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        message: String
    },
    data() {
        return {
            appName: import.meta.env.VITE_APP_NAME
        }
    }
}
</script>
<style>
.animation-delay-1 {
    animation-delay: 0s;
}

.animation-delay-2 {
    animation-delay: 0.2s;
}

.animation-delay-3 {
    animation-delay: 0.4s;
}
</style>