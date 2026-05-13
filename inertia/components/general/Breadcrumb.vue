<template>
    <ol class="flex items-center whitespace-nowrap">
        <li class="inline-flex items-center text-sm " v-for="item in bread" :key="item.title">
            <Link v-if="item.to" :href="item.to" class="hover:underline text-gray-800 dark:text-slate-200">
            {{ item.title }}
            </Link>
            <span v-else class="text-gray-400 truncate dark:text-gray-400">
                {{ item.title }}
            </span>
            <svg v-if="item.hasNext" class="shrink-0 mx-2 size-4 text-gray-400 dark:text-gray-200"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m9 18 6-6-6-6"></path>
            </svg>
        </li>
    </ol>
</template>
<script>

export default {
    components: {
    },
    props: {
        bread: Array,
    }
}
</script>