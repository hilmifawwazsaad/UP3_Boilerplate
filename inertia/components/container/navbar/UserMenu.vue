<template>
    <div class="">
        <button id="dropdownProfileContainer" data-dropdown-toggle="dropdownProfile"
            class="flex items-center text-sm pe-1 font-medium text-heading rounded-full hover:text-fg-brand md:me-0 hover:cursor-pointer"
            type="button">
            <span class="sr-only">Open user menu</span>
            <div class="sm:me-1.5">
                <span v-if="user?.idjabatan == 570">
                    <IconKey size="20" />
                </span>
                <span v-else-if="isImpersonate">
                    <IconLockSquareRounded size="22" stroke="1.5" />
                </span>
                <span v-else>
                    <IconUser size="20" />
                </span>
            </div>
            <div v-if="user" class="mx-0 md:mx-1 hidden sm:flex flex-col">
                <span>
                    {{ user?.nama }}
                </span>
                <span v-if="isImpersonate">[Impersonate]</span>
            </div>
            <IconChevronDown size="18" />
        </button>

        <!-- Dropdown menu -->
        <div id="dropdownProfile"
            class="z-70! hidden bg-white divide-y divide-gray-300 rounded-lg shadow w-96 dark:shadow-dark-gray rounded-base dark:bg-dark-secondary">
            <div class="px-4 py-3 flex flex-row gap-x-3">
                <div class="h-fit">
                    <div class="rounded-full p-2 bg-primary text-white">
                        <span v-if="user?.idjabatan == 570">
                            <IconKey size="20" />
                        </span>
                        <span v-else-if="isImpersonate">
                            <IconLockSquareRounded size="20" stroke="1.75" />
                        </span>
                        <span v-else>
                            <IconUser size="20" />
                        </span>
                    </div>
                </div>
                <div class="text-sm text-start w-full">
                    <p class="font-bold">
                        {{ user?.nama }}
                    </p>
                    <el-tooltip :content="`${user?.jabatan.namaJabatan} | ${user?.jabatan.satker.namaSatker}`">
                        <p class="font-medium text-sm line-clamp-1">
                            {{ user?.jabatan.namaJabatan }} | {{ user?.jabatan.satker.namaSatker }}
                        </p>
                    </el-tooltip>
                </div>
            </div>
            <ul class="pb-2 text-body font-medium " aria-labelledby="dropdownProfileContainer">
                <li class="">
                    <Link href="/"
                        class="cursor-pointer inline-flex items-center w-full py-2.5 px-4 hover:bg-slate-100 rounded dark:hover:bg-dark-field">
                    <IconHome size="20" class="me-2" />
                    Dashboard
                    </Link>
                </li>
                <li class="">
                    <Link href="/bantuan"
                        class="cursor-pointer inline-flex items-center w-full py-2.5 px-4 hover:bg-slate-100 rounded dark:hover:bg-dark-field">
                    <IconHelp size="20" class="me-2" />
                    Pusat Bantuan
                    </Link>
                </li>

                <hr class=" border-gray-200 dark:border-gray-600">

                <li v-if="auth_config.origin.id_jabatan == 570" class="">
                    <Link href="/users"
                        class="cursor-pointer inline-flex items-center w-full py-2.5 px-4 hover:bg-slate-100 rounded dark:hover:bg-dark-field">
                    <IconUsers size="20" class="me-2" />
                    Users
                    </Link>
                </li>
                <li v-if="isImpersonate" class="">
                    <button @click="endImpersonate"
                        class="cursor-pointer inline-flex items-center w-full py-2.5 px-4 hover:bg-slate-100 rounded dark:hover:bg-dark-field">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="me-2 icon icon-tabler icons-tabler-outline icon-tabler-rotate-clockwise">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
                        </svg>
                        Kembali ke diri sendiri
                    </button>
                </li>

                <hr class=" border-gray-200 dark:border-gray-600">
                <li class="pt-1.5">
                    <button @click="logout"
                        class="cursor-pointer inline-flex items-center w-full py-2.5 px-4 hover:bg-slate-100 rounded dark:hover:bg-dark-field">
                        <IconLogout2 size="18" stroke="1.6" class="me-2" />
                        Keluar
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { inject } from 'vue'
import { initDropdowns } from 'flowbite';
import { useApi, useAuth, useSwal } from '~/composables';
import { IconUser, IconUsers, IconChevronDown, IconKey, IconHome, IconHelp, IconLogout2, IconLockSquareRounded } from '@tabler/icons-vue';

export default {
    components: {
        IconKey,
        IconUser, IconUsers, IconChevronDown, IconHome, IconHelp, IconLogout2, IconLockSquareRounded
    },
    props: {
    },
    data() {
        const auth = useAuth()
        console.log(auth)
        return {
            user: auth.currUser,
            auth_config: auth.auth_config,
            isImpersonate: auth.auth_config.mode == 'impersonate',
        }
    },
    created() {
    },
    mounted() {
        initDropdowns();
    },
    methods: {
        logout() {
            useSwal().confirm({
                title: 'Apakah kamu yakin?',
                text: "Anda akan keluar dari aplikasi",
            }).then((result) => {
                if (result.isConfirmed) {
                    useApi().post('/auth/logout').then(() => {
                        window.location.href = 'https://portal.its.ac.id/'
                    })
                }
            })
        },
        endImpersonate() {
            useSwal().process({
                title: 'Tunggu Sebentar...',
                onProcess: () => {
                    useApi().post('/auth/impersonate/end').then(() => {
                        window.location.href = '/'
                    })
                }
            })
        },
    }
}
</script>