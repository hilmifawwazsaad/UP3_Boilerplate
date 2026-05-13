<template>
  <!-- component -->
  <div class="w-full h-screen flex flex-col items-center justify-center bg-gray-800 ">

    <img src="/public/images/LogoITS.png" class="w-32 mb-6" alt="">

    <div class="flex flex-col items-center justify-center">
      <p class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider text-white">500</p>
      <p class="text-xl md:text-2xl lg:text-3xl font-bold text-white mt-2">Server Error</p>
      <p class="md:text-lg xl:text-xl text-gray-200 mt-4">Maaf, terjadi kesalahan pada server.</p>
      <button @click="tryFix"
        class="bg-primary text-white py-2 px-4 rounded hover:bg-sky-600 cursor-pointer transition-colors mt-8">
        Coba perbaiki
      </button>
      <p class="md:text-lg xl:text-xl text-gray-200 mt-4">
        Apabila masih menampilkan halaman ini, silahkan hubungi Admin.
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    tryFix() {
      localStorage.clear()
      sessionStorage.clear()
      axios.defaults.withCredentials = true

      localStorage.setItem('theme', 'light')

      axios.post('/auth/logout', {}).then(response => {
        this.$swal.close()
        window.location.href = '/'
      })
    }
  }
}
</script>