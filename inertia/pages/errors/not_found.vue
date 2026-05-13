<template>
  <!-- component -->
  <div class="w-full h-screen flex flex-col items-center justify-center bg-gray-800 ">

    <img src="/public/images/LogoITS.png" class="w-32 mb-6" alt="">

    <div class="flex flex-col items-center justify-center">
      <p class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider text-white">404</p>
      <p class="text-xl md:text-2xl lg:text-3xl font-bold text-white mt-2">Not Found</p>
      <p class="md:text-lg xl:text-xl text-gray-200 mt-4">
        Maaf, halaman yang Anda cari tidak ditemukan.
      </p>
      <Link class="bg-primary text-white py-2 px-4 rounded hover:bg-sky-600 cursor-pointer transition-colors mt-8">
      Kembali ke Beranda
      </Link>
    </div>
  </div>
</template>

<script>
import { Link } from '@inertiajs/vue3';

export default {
  components: {
    Link
  },
}
</script>