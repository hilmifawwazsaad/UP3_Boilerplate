<template>
    <div class="w-full min-h-screen flex items-center justify-center bg-[#406093] px-4 sm:px-6 lg:px-8">
        <div class="w-full max-w-md py-3 animate-fade-up animate-once animate-ease-in-out">
            <div class="min-h-96 px-8 py-6 mt-4 text-left bg-white rounded-xl shadow-lg">
                <div class="mt-5 flex flex-col justify-center items-center h-full">
                    <div class="w-full flex justify-center items-center">
                        <img src="/public/images/LogoITS.png" alt="myITS Kinerja" class="w-20">
                    </div>

                    <div v-if="response" id="alert-2"
                        class="w-full flex items-center p-4 mb-4 text-red-800 rounded bg-red-50" role="alert">
                        <svg class="shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span class="sr-only">Info</span>
                        <div class="ms-3 text-sm font-medium">
                            <p>{{ response }}</p>
                        </div>
                        <button type="button"
                            class="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8"
                            data-dismiss-target="#alert-2" aria-label="Close">
                            <span class="sr-only">Close</span>
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                    <div class="w-full flex flex-col items-center justify-center mb-8">
                        <p class="p-0 m-0 mt-6 text-lg font-semibold">
                            Login to your Account
                        </p>
                    </div>
                </div>
                <form @submit.prevent="tryLogin">
                    <div class="w-full flex flex-col">
                        <label class="font-semibold text-sm text-gray-600 mb-1 ">
                            Username
                        </label>
                        <input
                            class="border border-slate-400 rounded px-3 py-2 mb-5 text-sm w-full focus:border-primary"
                            placeholder="Username" v-model="form.username" autofocus />
                    </div>
                    <div class="w-full flex flex-col">
                        <label class="font-semibold text-sm text-gray-600 mb-1 ">
                            Password
                        </label>
                        <input type="password"
                            class="border border-slate-400 rounded px-3 py-2 mb-5 text-sm w-full focus:border-primary"
                            placeholder="••••••••" v-model="form.password" />
                    </div>
                    <div class="my-2 flex justify-end">
                        <button type="submit"
                            class="py-1.5 px-8 bg-primary hover:bg-blue-500 focus:ring-offset-blue-200 text-white text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded cursor-pointer select-none">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { useForm, useSwal } from "~/composables";

export default {
    data() {
        return {
            form: useForm({
                username: '',
                password: '',
            }),
            response: ''
        }
    },
    components: {
    },
    // mounted() {
    //     if (localStorage.getItem('theme') == null) {
    //         localStorage.setItem('theme', 'light')
    //     }

    //     const theme = useTheme()
    //     theme.sweetAlert2(localStorage.getItem('theme'))
    // },
    methods: {
        tryLogin() {
            const swal = useSwal()
            swal.process({
                title: 'Tunggu Sebentar...',
                onProcess: () => {
                    this.form.func.post('/login/ghost').then((res) => {
                        if (res.status == 200) {
                            swal.success({
                                title: 'Berhasil',
                                text: 'Login Berhasil',
                                onClose: () => {
                                    window.location.href = '/'
                                }
                            })
                        } else {
                            throw new Error()
                        }
                    }).catch(() => {
                        this.response = 'Username atau Password Salah'
                        swal.close()
                    })
                }
            })

        },
    },
}
</script>
<style></style>