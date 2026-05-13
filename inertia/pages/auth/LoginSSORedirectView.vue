<template>
    <div class="h-screen w-screen bg-gray-800 flex">
        <LoadingLoginComponent message="Sedang Login" />
    </div>
</template>
<script>
import LoadingLoginComponent from './components/LoadingLoginComponent.vue'

export default {
    components: {
        LoadingLoginComponent
    },
    mounted() {
        setTimeout(() => {
            window.location.href = '/'
        }, 1500)
    }
}
</script>