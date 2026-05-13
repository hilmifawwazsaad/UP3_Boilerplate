<template>
    <div class="skeleton-table w-full bg-white p-4 dark:bg-dark-slate">
        <table class="table">
            <thead v-if="showHeader" class=" bg-slate-100 dark:bg-dark-field">
                <tr>
                    <th v-for="(h, idx) in columns" :key="idx">
                        <div class="text-sm px-2">{{ h.title }}</div>
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="r in rows" :key="'s-' + r" class="bg-slate-50 dark:bg-dark-field">
                    <td v-for="(c, ci) in columns" :key="ci">
                        <div class="skeleton" :style="{ width: widths[(ci + r) % widths.length] }"></div>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="mt-4 flex flex-rows gap-x-2">
            <div class="skeleton w-32"></div>
            <div class="skeleton w-8"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            widths: ["95%", "85%", "70%", "60%", "40%"]
        }
    },
    props: {
        columns: { type: Array, default: () => ["Kolom 1", "Kolom 2", "Kolom 3"] },
        rows: { type: Number, default: 5 },
        showHeader: { type: Boolean, default: true },
    },
}
</script>

<style scoped>
.table {
    width: 100%;
    border-collapse: collapse;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
        Arial;
}

th,
td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #e6e6e6;
    vertical-align: middle;
}


/* skeleton box */
.skeleton {
    height: 20px;
    border-radius: 6px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e6e6e6 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.2s linear infinite;
}

.dark .skeleton {
    height: 20px;
    border-radius: 6px;
    background: linear-gradient(90deg,
            #2f2f2f 25%,
            #3e464e 50%,
            #292f36 75%);
    background-size: 200% 100%;
    animation: shimmer 1.2s linear infinite;
}

/* aria-hidden muted fallback */
.muted {
    color: #888;
    padding: 20px;
    text-align: center;
}

/* shimmer */
@keyframes shimmer {
    0% {
        background-position: 200% 0;
    }

    100% {
        background-position: -200% 0;
    }
}

/* small responsive tweak */
@media (max-width: 600px) {

    th,
    td {
        padding: 10px;
        font-size: 0.9rem;
    }

    .skeleton {
        height: 12px;
    }
}
</style>
