<template>
    <article :class="{ dark: isDark, 'viewer-shell': useShell }">
        <div class="viewer-body">
            <div v-if="!content" class="viewer-empty">
                <svg viewBox="0 0 24 24" width="40" height="40">
                    <path
                        d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                </svg>
                <p>Tidak ada konten untuk ditampilkan.</p>
            </div>
            <div v-else class="viewer-content" v-html="content" />
        </div>
    </article>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
    content: { type: String, default: '' },
    useShell: { type: Boolean, default: true },
})

import { useDark } from "@vueuse/core";
const isDark = useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: 'light',
    storageKey: 'theme',
})
</script>

<style scoped>
/* ─── CSS Variables ──────────────────────────────────────────── */
.viewer-shell {
    --c-bg: #ffffff;
    --c-bg2: #f8fafc;
    --c-border: #e2e8f0;
    --c-text: #1a1a2e;
    --c-text-muted: #6b7280;
    --c-text-faint: #9ca3af;
    --c-code-bg: #f1f5f9;
    --c-code-border: #e2e8f0;
    --c-pre-bg: #0f172a;
    --c-pre-text: #e2e8f0;
    --c-quote-bg: #f0f4fa;
    --c-quote-border: #1e3a5f;
    --c-table-head-bg: #1e3a5f;
    --c-table-head-text: #ffffff;
    --c-table-even: #f8fafc;
    --c-table-hover: #eff6ff;
    --c-hr: #e2e8f0;
    --c-link: #1e3a5f;
    --c-link-deco: #93c5fd;
    --c-heading: #0f172a;
    --c-h6: #4b5563;
    --c-strike: #6b7280;
    --c-code-color: #c026d3;
    --c-active: #1e3a5f;
    --c-btn-hover: #f3f4f6;
    --c-toggle: #6b7280;
    --shadow: 0 4px 24px 0 rgba(30, 40, 80, 0.07);
}

.viewer-shell.dark {
    --c-bg: #191919;
    --c-bg2: #222222;
    --c-border: #2f2f2f;
    --c-text: #e5e7eb;
    --c-text-muted: #9ca3af;
    --c-text-faint: #585858;
    --c-code-bg: #2f2f2f;
    --c-code-border: #585858;
    --c-pre-bg: #111111;
    --c-pre-text: #d1d5db;
    --c-quote-bg: #222222;
    --c-quote-border: #3b82f6;
    --c-table-head-bg: #2f2f2f;
    --c-table-head-text: #e5e7eb;
    --c-table-even: #222222;
    --c-table-hover: #2f2f2f;
    --c-hr: #2f2f2f;
    --c-link: #60a5fa;
    --c-link-deco: #1d4ed8;
    --c-heading: #f1f5f9;
    --c-h6: #9ca3af;
    --c-strike: #585858;
    --c-code-color: #e879f9;
    --c-active: #3b82f6;
    --c-btn-hover: #2f2f2f;
    --c-toggle: #9ca3af;
    --shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.4);
}

/* ─── Shell ──────────────────────────────────────────────────── */
.viewer-shell {
    background: var(--c-bg);
    border: 1.5px solid var(--c-border);
    border-radius: 12px;
    box-shadow: var(--shadow);
    font-family: 'Georgia', 'Times New Roman', serif;
    overflow: hidden;
    transition: background 0.2s, border-color 0.2s;
}

/* ─── Topbar ─────────────────────────────────────────────────── */
.viewer-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 14px 6px;
    border-bottom: 1px solid var(--c-border);
    background: var(--c-bg2);
    transition: background 0.2s;
}

.viewer-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--c-text-muted);
}

.dark-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 6px;
    border: none;
    background: transparent;
    cursor: pointer;
    color: var(--c-toggle);
    transition: background 0.15s, color 0.15s;
}

.dark-toggle svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
}

.dark-toggle:hover {
    background: var(--c-btn-hover);
    color: var(--c-text);
}

/* ─── Body ───────────────────────────────────────────────────── */
.viewer-body {
    padding: 36px 48px;
    background: var(--c-bg);
    min-height: 200px;
    transition: background 0.2s;
}

/* Empty state */
.viewer-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    min-height: 180px;
    color: var(--c-text-faint);
    text-align: center;
}

.viewer-empty svg {
    fill: var(--c-text-faint);
}

.viewer-empty p {
    margin: 0;
    font-size: 15px;
    font-style: italic;
}

/* ─── Content — identical to Editor ─────────────────────────── */
.viewer-content {
    line-height: 1.8;
    color: var(--c-text);
    font-size: 16px;
}

.viewer-content :deep(h1),
.viewer-content :deep(h2),
.viewer-content :deep(h3),
.viewer-content :deep(h4),
.viewer-content :deep(h5),
.viewer-content :deep(h6) {
    font-family: 'Georgia', serif;
    color: var(--c-heading);
    margin: 1.5em 0 0.5em;
    font-weight: 700;
    line-height: 1.3;
}

.viewer-content :deep(h1) {
    font-size: 2.2em;
    border-bottom: 2px solid var(--c-border);
    padding-bottom: 0.3em;
}

.viewer-content :deep(h2) {
    font-size: 1.7em;
    border-bottom: 1px solid var(--c-border);
    padding-bottom: 0.2em;
}

.viewer-content :deep(h3) {
    font-size: 1.35em;
}

.viewer-content :deep(h4) {
    font-size: 1.1em;
}

.viewer-content :deep(h5) {
    font-size: 1em;
}

.viewer-content :deep(h6) {
    font-size: 0.9em;
    color: var(--c-h6);
}

.viewer-content :deep(p) {
    padding: 0.25em 0;
}

.viewer-content :deep(strong) {
    font-weight: 700;
}

.viewer-content :deep(em) {
    font-style: italic;
}

.viewer-content :deep(u) {
    text-decoration: underline;
}

.viewer-content :deep(s) {
    text-decoration: line-through;
    color: var(--c-strike);
}

.viewer-content :deep(code) {
    background: var(--c-code-bg);
    border: 1px solid var(--c-code-border);
    border-radius: 4px;
    padding: 1px 5px;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.88em;
    color: var(--c-code-color);
}

.viewer-content :deep(pre) {
    background: var(--c-pre-bg);
    color: var(--c-pre-text);
    border-radius: 8px;
    padding: 16px 20px;
    margin: 1.25em 0;
    overflow-x: auto;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.9em;
    line-height: 1.7;
}

.viewer-content :deep(pre code) {
    background: transparent;
    border: none;
    padding: 0;
    color: inherit;
    font-size: inherit;
}

.viewer-content :deep(blockquote) {
    border-left: 4px solid var(--c-quote-border);
    margin: 1.25em 0;
    padding: 8px 16px;
    background: var(--c-quote-bg);
    border-radius: 0 8px 8px 0;
    color: var(--c-text-muted);
    font-style: italic;
}

.viewer-content :deep(ul),
.viewer-content :deep(ol) {
    padding-left: 1.6em;
    margin: 0.75em 0;
}

.viewer-content :deep(li) {
    margin: 0.3em 0;
}

.viewer-content :deep(ul li) {
    list-style-type: disc;
}

.viewer-content :deep(ol li) {
    list-style-type: decimal;
}

.viewer-content :deep(ul ul li) {
    list-style-type: circle;
}

.viewer-content :deep(ul ul ul li) {
    list-style-type: square;
}

.viewer-content :deep(ul[data-type="taskList"]) {
    list-style: none;
    padding-left: 0.5em;
}

.viewer-content :deep(ul[data-type="taskList"] li) {
    display: flex;
    align-items: center;
    gap: 8px;
}

.viewer-content :deep(ul[data-type="taskList"] li > label) {
    margin-top: 2px;
}

.viewer-content :deep(ul[data-type="taskList"] li > div > p) {
    padding: 0px !important;
}

.viewer-content :deep(ul[data-type="taskList"] li > label input[type="checkbox"]) {
    width: 15px;
    height: 15px;
    accent-color: var(--c-active);
    pointer-events: none;
    /* read-only */
}

.viewer-content :deep(hr) {
    border: none;
    border-top: 2px solid var(--c-hr);
    margin: 1.5em 0;
}

.viewer-content :deep(a) {
    color: var(--c-link);
    text-decoration: underline;
    text-decoration-color: var(--c-link-deco);
    text-underline-offset: 2px;
    transition: opacity 0.15s;
}

.viewer-content :deep(a:hover) {
    opacity: 0.75;
}

/* ─── Image alignment — same as editor ─────────────────────── */
.viewer-content :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 0.75em 0;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
    display: block;
}

.viewer-content :deep(img[data-align="left"]) {
    margin-left: 0;
    margin-right: auto;
}

.viewer-content :deep(img[data-align="center"]) {
    margin-left: auto;
    margin-right: auto;
}

.viewer-content :deep(img[data-align="right"]) {
    margin-left: auto;
    margin-right: 0;
}

/* ─── Table ──────────────────────────────────────────────────── */
.viewer-content :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.25em 0;
    font-size: 0.95em;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
}

.viewer-content :deep(table th),
.viewer-content :deep(table td) {
    border: 1px solid var(--c-border);
    padding: 10px 14px;
    text-align: left;
    vertical-align: top;
    min-width: 80px;
    color: var(--c-text);
}

.viewer-content :deep(table th) {
    background: var(--c-table-head-bg);
    color: var(--c-table-head-text);
    font-weight: 600;
    font-family: 'Georgia', serif;
    letter-spacing: 0.02em;
}

.viewer-content :deep(table tr:nth-child(even) td) {
    background: var(--c-table-even);
}

.viewer-content :deep(table tr:hover td) {
    background: var(--c-table-hover);
    transition: background 0.15s;
}

/* ─── Responsive ─────────────────────────────────────────────── */
@media (max-width: 640px) {
    .viewer-body {
        padding: 24px 16px;
    }

    .viewer-content :deep(h1) {
        font-size: 1.7em;
    }

    .viewer-content :deep(h2) {
        font-size: 1.35em;
    }

    .viewer-content :deep(table) {
        font-size: 0.85em;
    }
}

@media print {
    .viewer-shell {
        border: none;
        box-shadow: none;
    }

    .viewer-topbar {
        display: none;
    }

    .viewer-body {
        padding: 0;
    }
}
</style>