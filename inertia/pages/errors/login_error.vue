<template>
    <div class="w-full h-screen flex flex-col items-center justify-center bg-gray-800 ">
        <div
            class="w-full text-center text-white flex justify-center flex-col gap-3 items-center max-w-md py-3 animate-fade-up animate-once animate-ease-in-out">
            <span>
                <img src="/public/images/icons/padlock_11324349.png" alt="Icon Broken Padlock" class="w-32 mb-6">
            </span>

            <h1 class="font-bold text-3xl">
                Oops! Login Failed
            </h1>

            <p class="text-lg">
                Anda tidak memiliki akses ke <b>{{ appName }}</b> karena belum tercatat memiliki
                <b>Jabatan Struktural</b>.
            </p>
            <p>Untuk perbaikan data <b>Jabatan Struktural</b> mohon dapat menghubungi <b>DIREKTORAT SDMO</b>.</p>
        </div>
    </div>
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