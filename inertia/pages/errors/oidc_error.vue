<template>
    <div class="w-full h-screen flex flex-col items-center justify-center bg-gray-800 ">
        <div
            class="w-full text-center text-white flex justify-center flex-col gap-3 items-center max-w-md py-3 animate-fade-up animate-once animate-ease-in-out">
            <span>
                <img src="/public/images/icons/cloud_1281785.png" alt="Icon OIDC Error" class="w-32 mb-6">
            </span>
            <p class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider text-white">500</p>
            <p class="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                Authentication Error
            </p>
            <p class="md:text-lg xl:text-xl text-gray-200 mt-4">
                Maaf, terjadi kesalahan pada server.
            </p>
        </div>
    </div>
</template>
<script>
export default {
}
</script>