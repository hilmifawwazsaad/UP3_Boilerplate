<template>
    <div class="mb-2 mx-3" v-if="user">
        <button
            class="w-full text-sm flex flex-rows gap-x-1.5 items-center py-2 bg-primary hover:bg-primary/80 text-white rounded-full cursor-pointer"
            :class="sidebarOpen ? 'px-3 justify-start' : 'px-0 justify-center'" @click="enterAdminMode">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-key">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                    d="M16.555 3.843l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.643 2.643a2.877 2.877 0 0 1 -4.069 0l-.301 -.301l-6.558 6.558a2 2 0 0 1 -1.239 .578l-.175 .008h-1.172a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.172a2 2 0 0 1 .467 -1.284l.119 -.13l.414 -.414h2v-2h2v-2l2.144 -2.144l-.301 -.301a2.877 2.877 0 0 1 0 -4.069l2.643 -2.643a2.877 2.877 0 0 1 4.069 0" />
                <path d="M15 9h.01" />
            </svg>
            <span v-if="sidebarOpen">
                Masuk sebagai Admin
            </span>
        </button>
    </div>
</template>
<script>
import { useAuth } from '~/composables';

export default {
    props: {
        sidebarOpen: Boolean
    },
    data() {
        const auth = useAuth()
        const originUser = auth.currUser
        const isUserAdmin = auth.user?.users?.find((u) => u.idjabatan == 570)

        return {
            user: auth.user,
            hasAdminAccess: isUserAdmin && originUser.idjabatan != 570
        }
    },
    methods: {
        enterAdminMode() {
            const swal = useSwal()

            swal.process({
                title: 'Tunggu Sebentar...',
                onProcess: () => {
                    const payload = {
                        id: 570,
                        ssoid: this.user.users.find((u) => u.idjabatan == 570).ssoid
                    }
                    useApi().post('/auth/impersonate', payload).then((result) => {
                        if (result.status === 200) {
                            swal.success({
                                title: 'Berhasil',
                                text: 'Anda berhasil masuk sebagai Admin',
                                onClose: () => {
                                    window.location.href = '/'
                                }
                            })
                        } else {
                            swal.error({
                                title: 'Gagal',
                                error: 'Anda gagal masuk sebagai Admin'
                            })
                        }
                    }).catch((error) => {
                        swal.error({
                            title: 'Gagal',
                            error: 'Internal Server Error'
                        })
                    })
                }
            })
        }
    }
}
</script>