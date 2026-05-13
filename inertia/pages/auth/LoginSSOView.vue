<template>
    <div class="h-screen w-screen bg-gray-800 flex">
        <LoadingLoginComponent message="Menghubungkan ke myITS SSO" />
    </div>
</template>
<script>

import LoadingLoginComponent from './components/LoadingLoginComponent.vue'

export default {
    components: {
        LoadingLoginComponent
    },
    created() {
        window.location.href = '/login/oidc'
    },
}
</script>