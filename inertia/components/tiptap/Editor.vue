<template>
    <div class="editor-shell" :class="{ dark: isDark }">
        <!-- Top bar: dark mode toggle -->
        <div class="topbar">
            <span class="topbar-title">Editor</span>
        </div>

        <!-- Toolbar -->
        <div class="toolbar" v-if="editor">
            <!-- History -->
            <div class="toolbar-group">
                <button class="tb-btn" @click="editor.chain().focus().undo().run()" :disabled="!editor.can().undo()"
                    title="Undo">
                    <svg viewBox="0 0 24 24">
                        <path
                            d="M12.5 8c-2.65 0-5.05 1-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" />
                    </svg>
                </button>
                <button class="tb-btn" @click="editor.chain().focus().redo().run()" :disabled="!editor.can().redo()"
                    title="Redo">
                    <svg viewBox="0 0 24 24">
                        <path
                            d="M18.4 10.6C16.55 9 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z" />
                    </svg>
                </button>
            </div>
            <div class="toolbar-divider" />

            <!-- Heading -->
            <div class="toolbar-group">
                <select class="tb-select" @change="setHeading($event)">
                    <option value="0" :selected="editor.isActive('paragraph')">Paragraph</option>
                    <option value="1" :selected="editor.isActive('heading', { level: 1 })">Heading 1</option>
                    <option value="2" :selected="editor.isActive('heading', { level: 2 })">Heading 2</option>
                    <option value="3" :selected="editor.isActive('heading', { level: 3 })">Heading 3</option>
                    <option value="4" :selected="editor.isActive('heading', { level: 4 })">Heading 4</option>
                    <option value="5" :selected="editor.isActive('heading', { level: 5 })">Heading 5</option>
                    <option value="6" :selected="editor.isActive('heading', { level: 6 })">Heading 6</option>
                </select>
                <select class="tb-select" @change="setFontSize($event)">
                    <option value="">Size</option>
                    <option v-for="s in fontSizes" :key="s" :value="s">{{ s }}px</option>
                </select>
            </div>
            <div class="toolbar-divider" />

            <!-- Text Format -->
            <div class="toolbar-group">
                <button class="tb-btn" :class="{ active: editor.isActive('bold') }"
                    @click="editor.chain().focus().toggleBold().run()" title="Bold"><svg viewBox="0 0 24 24">
                        <path
                            d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" />
                    </svg></button>
                <button class="tb-btn" :class="{ active: editor.isActive('italic') }"
                    @click="editor.chain().focus().toggleItalic().run()" title="Italic"><svg viewBox="0 0 24 24">
                        <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z" />
                    </svg></button>
                <button class="tb-btn" :class="{ active: editor.isActive('underline') }"
                    @click="editor.chain().focus().toggleUnderline().run()" title="Underline"><svg viewBox="0 0 24 24">
                        <path
                            d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z" />
                    </svg></button>
                <button class="tb-btn" :class="{ active: editor.isActive('strike') }"
                    @click="editor.chain().focus().toggleStrike().run()" title="Strikethrough"><svg viewBox="0 0 24 24">
                        <path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z" />
                    </svg></button>
                <button class="tb-btn" :class="{ active: editor.isActive('code') }"
                    @click="editor.chain().focus().toggleCode().run()" title="Inline Code"><svg viewBox="0 0 24 24">
                        <path
                            d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                    </svg></button>
            </div>
            <div class="toolbar-divider" />

            <!-- Colors -->
            <div class="toolbar-group">
                <div class="color-picker-wrap" title="Text Color">
                    <button class="tb-btn color-btn">
                        <svg viewBox="0 0 24 24">
                            <path
                                d="M11 2L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 2h-2zm-1.38 10L12 5.67 14.38 12H9.62z" />
                        </svg>
                        <span class="color-indicator" :style="{ background: currentColor }" />
                    </button>
                    <input type="color" class="color-input" :value="currentColor" @input="setColor($event)" />
                </div>
                <div class="color-picker-wrap" title="Highlight">
                    <button class="tb-btn color-btn">
                        <svg viewBox="0 0 24 24">
                            <path
                                d="M7 22l1.5-1.5 1 1L11 20l-1-1 6.36-6.36 1.42 1.42-1.42 1.41 1.41 1.42-1.41 1.41 1.41 1.42-2.12 2.12-1.41-1.41-1.42 1.41-1.41-1.41L11 20l-1.5 1.5L7 22zm9.19-13.19L14.78 7.4 17.6 4.6 19 6l-2.81 2.81zM5.5 13.5l5.66-5.66 1.41 1.41-5.66 5.66L5.5 13.5z" />
                        </svg>
                        <span class="color-indicator" :style="{ background: currentHighlight }" />
                    </button>
                    <input type="color" class="color-input" :value="currentHighlight" @input="setHighlight($event)" />
                </div>
            </div>
            <div class="toolbar-divider" />

            <!-- Alignment -->
            <div class="toolbar-group">
                <button class="tb-btn" :class="{ active: editor.isActive({ textAlign: 'left' }) }"
                    @click="editor.chain().focus().setTextAlign('left').run()" title="Left"><svg viewBox="0 0 24 24">
                        <path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z" />
                    </svg></button>
                <button class="tb-btn" :class="{ active: editor.isActive({ textAlign: 'center' }) }"
                    @click="editor.chain().focus().setTextAlign('center').run()" title="Center"><svg
                        viewBox="0 0 24 24">
                        <path d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z" />
                    </svg></button>
                <button class="tb-btn" :class="{ active: editor.isActive({ textAlign: 'right' }) }"
                    @click="editor.chain().focus().setTextAlign('right').run()" title="Right"><svg viewBox="0 0 24 24">
                        <path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z" />
                    </svg></button>
                <button class="tb-btn" :class="{ active: editor.isActive({ textAlign: 'justify' }) }"
                    @click="editor.chain().focus().setTextAlign('justify').run()" title="Justify"><svg
                        viewBox="0 0 24 24">
                        <path d="M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z" />
                    </svg></button>
            </div>
            <div class="toolbar-divider" />

            <!-- Lists -->
            <div class="toolbar-group">
                <button class="tb-btn" :class="{ active: editor.isActive('bulletList') }"
                    @click="editor.chain().focus().toggleBulletList().run()" title="Bullet List"><svg
                        viewBox="0 0 24 24">
                        <path
                            d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" />
                    </svg></button>
                <button class="tb-btn" :class="{ active: editor.isActive('orderedList') }"
                    @click="editor.chain().focus().toggleOrderedList().run()" title="Ordered List"><svg
                        viewBox="0 0 24 24">
                        <path
                            d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z" />
                    </svg></button>
                <button class="tb-btn" :class="{ active: editor.isActive('taskList') }"
                    @click="editor.chain().focus().toggleTaskList().run()" title="Task List"><svg viewBox="0 0 24 24">
                        <path
                            d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM17.99 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99z" />
                    </svg></button>
                <button class="tb-btn" @click="editor.chain().focus().sinkListItem('listItem').run()"
                    title="Indent"><svg viewBox="0 0 24 24">
                        <path
                            d="M3 21h18v-2H3v2zM3 8v8l4-4-4-4zm8 9h10v-2H11v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z" />
                    </svg></button>
                <button class="tb-btn" @click="editor.chain().focus().liftListItem('listItem').run()"
                    title="Outdent"><svg viewBox="0 0 24 24">
                        <path
                            d="M11 17h10v-2H11v2zm-8-5l4 4V8l-4 4zm0 9h18v-2H3v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z" />
                    </svg></button>
            </div>
            <div class="toolbar-divider" />

            <!-- Blocks -->
            <div class="toolbar-group">
                <button class="tb-btn" :class="{ active: editor.isActive('blockquote') }"
                    @click="editor.chain().focus().toggleBlockquote().run()" title="Blockquote"><svg
                        viewBox="0 0 24 24">
                        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                    </svg></button>
                <button class="tb-btn" :class="{ active: editor.isActive('codeBlock') }"
                    @click="editor.chain().focus().toggleCodeBlock().run()" title="Code Block"><svg viewBox="0 0 24 24">
                        <path
                            d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z" />
                    </svg></button>
                <button class="tb-btn" @click="editor.chain().focus().setHorizontalRule().run()"
                    title="Horizontal Rule"><svg viewBox="0 0 24 24">
                        <path d="M19 13H5v-2h14v2z" />
                    </svg></button>
            </div>
            <div class="toolbar-divider" />

            <!-- Table -->
            <div class="toolbar-group">
                <div class="dropdown-wrap" v-click-outside="() => tableMenuOpen = false">
                    <button class="tb-btn dropdown-trigger" @click="tableMenuOpen = !tableMenuOpen" title="Table">
                        <svg viewBox="0 0 24 24">
                            <path
                                d="M20 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h15v3zm0-5H5V5h15v9z" />
                        </svg>
                        <span class="dropdown-arrow">▾</span>
                    </button>
                    <div class="dropdown-menu" v-if="tableMenuOpen">
                        <div class="dropdown-label">Insert</div>
                        <button class="dropdown-item" @click="insertTable">Insert Table (3×3)</button>
                        <div class="dropdown-label">Columns</div>
                        <button class="dropdown-item" @click="run('addColumnBefore')">Add Column Before</button>
                        <button class="dropdown-item" @click="run('addColumnAfter')">Add Column After</button>
                        <button class="dropdown-item danger" @click="run('deleteColumn')">Delete Column</button>
                        <div class="dropdown-label">Rows</div>
                        <button class="dropdown-item" @click="run('addRowBefore')">Add Row Before</button>
                        <button class="dropdown-item" @click="run('addRowAfter')">Add Row After</button>
                        <button class="dropdown-item danger" @click="run('deleteRow')">Delete Row</button>
                        <div class="dropdown-label">Cells</div>
                        <button class="dropdown-item" @click="run('mergeCells')">Merge Cells</button>
                        <button class="dropdown-item" @click="run('splitCell')">Split Cell</button>
                        <button class="dropdown-item" @click="run('toggleHeaderRow')">Toggle Header Row</button>
                        <button class="dropdown-item" @click="run('toggleHeaderColumn')">Toggle Header Col</button>
                        <div class="dropdown-label">Table</div>
                        <button class="dropdown-item danger" @click="run('deleteTable')">Delete Table</button>
                    </div>
                </div>
            </div>
            <div class="toolbar-divider" />

            <!-- Link & Image -->
            <div class="toolbar-group">
                <button class="tb-btn" :class="{ active: editor.isActive('link') }" @click="openLinkModal"
                    title="Insert Link"><svg viewBox="0 0 24 24">
                        <path
                            d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
                    </svg></button>
                <button class="tb-btn" v-if="editor.isActive('link')" @click="editor.chain().focus().unsetLink().run()"
                    title="Remove Link"><svg viewBox="0 0 24 24">
                        <path
                            d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8v-2z" />
                    </svg></button>
                <button class="tb-btn" @click="triggerImageUpload" :disabled="imageUploading" title="Upload Image">
                    <svg v-if="!imageUploading" viewBox="0 0 24 24">
                        <path
                            d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                    </svg>
                    <svg v-else class="spin" viewBox="0 0 24 24">
                        <path d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8z" />
                    </svg>
                </button>
                <input ref="imageInput" type="file" accept="image/*" style="display:none" @change="handleImageUpload" />
                <button class="tb-btn" @click="openImageUrlModal" title="Image from URL"><svg viewBox="0 0 24 24">
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg></button>
            </div>
            <div class="toolbar-divider" />

            <!-- Clear -->
            <div class="toolbar-group">
                <button class="tb-btn" @click="editor.chain().focus().clearNodes().unsetAllMarks().run()"
                    title="Clear Formatting"><svg viewBox="0 0 24 24">
                        <path
                            d="M3.27 5L2 6.27l6.97 6.97L6.5 19h3l1.57-3.66L16.73 21 18 19.73 3.27 5zM6 5v.18L8.82 8H11v2.18l1.07 1.07L13.56 8H20V5H6z" />
                    </svg></button>
            </div>
        </div>

        <!-- Editor Body -->
        <div class="editor-body">
            <editor-content :editor="editor" class="editor-content" />
            <div v-if="isEmpty" class="editor-placeholder">Mulai menulis artikel Anda di sini...</div>
        </div>

        <!-- Footer -->
        <div class="editor-footer flex justify-end">
            <span>{{ charCount }} karakter</span>
            <span>{{ wordCount }} kata</span>
        </div>

        <!-- IMAGE CONTROL BUBBLE — shown when an image is selected -->
        <Teleport to="body">
            <div v-if="imageSelected" class="image-bubble" :class="{ dark: isDark }"
                :style="{ top: bubbleY + 'px', left: bubbleX + 'px' }">
                <span class="bubble-label">Ukuran</span>
                <button v-for="s in imageSizes" :key="s.label" class="bubble-btn"
                    :class="{ active: activeImageSize === s.value }" @click="setImageSize(s.value)">{{ s.label
                    }}</button>

                <span class="bubble-sep" />

                <span class="bubble-label">Posisi</span>
                <button v-for="p in imagePositions" :key="p.label" class="bubble-btn"
                    :class="{ active: activeImageAlign === p.value }" @click="setImageAlign(p.value)" :title="p.label">
                    <svg viewBox="0 0 24 24" width="14" height="14">
                        <path :d="p.icon" />
                    </svg>
                </button>

                <span class="bubble-sep" />
                <button class="bubble-btn danger" @click="deleteImage" title="Hapus gambar">
                    <svg viewBox="0 0 24 24" width="14" height="14">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                    </svg>
                </button>
            </div>

            <!-- Link Modal -->
            <div class="modal-overlay" v-if="linkModalOpen" @click.self="linkModalOpen = false">
                <div class="modal" :class="{ dark: isDark }">
                    <div class="modal-header">
                        <h3>Insert Link</h3><button class="modal-close" @click="linkModalOpen = false">✕</button>
                    </div>
                    <div class="modal-body">
                        <label>URL</label>
                        <input v-model="linkUrl" type="url" placeholder="https://example.com" class="modal-input"
                            @keyup.enter="applyLink" />
                        <div class="modal-check">
                            <input v-model="linkTarget" type="checkbox" id="lt" />
                            <label for="lt">Buka di tab baru</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="modal-btn secondary" @click="linkModalOpen = false">Batal</button>
                        <button class="modal-btn primary" @click="applyLink">Insert</button>
                    </div>
                </div>
            </div>

            <!-- Image URL Modal -->
            <div class="modal-overlay" v-if="imageUrlModalOpen" @click.self="imageUrlModalOpen = false">
                <div class="modal" :class="{ dark: isDark }">
                    <div class="modal-header">
                        <h3>Insert Image dari URL</h3><button class="modal-close"
                            @click="imageUrlModalOpen = false">✕</button>
                    </div>
                    <div class="modal-body">
                        <label>URL Gambar</label>
                        <input v-model="imageUrl" type="url" placeholder="https://example.com/image.jpg"
                            class="modal-input" @keyup.enter="applyImageUrl" />
                        <label>Alt Text</label>
                        <input v-model="imageAlt" type="text" placeholder="Deskripsi gambar" class="modal-input" />
                        <label>Ukuran Awal</label>
                        <select v-model="imageInitialSize" class="modal-input">
                            <option v-for="s in imageSizes" :key="s.value" :value="s.value">{{ s.label }}</option>
                        </select>
                        <label>Posisi Awal</label>
                        <select v-model="imageInitialAlign" class="modal-input">
                            <option v-for="p in imagePositions" :key="p.value" :value="p.value">{{ p.label }}</option>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button class="modal-btn secondary" @click="imageUrlModalOpen = false">Batal</button>
                        <button class="modal-btn primary" @click="applyImageUrl">Insert</button>
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount, watch, nextTick } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { TextAlign } from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { Highlight } from '@tiptap/extension-highlight'
import { Link } from '@tiptap/extension-link'
import { Image } from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { TaskList } from '@tiptap/extension-task-list'
import { TaskItem } from '@tiptap/extension-task-item'
import { CharacterCount } from '@tiptap/extension-character-count'
import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { useDark } from '@vueuse/core'
import { useApi } from '~/composables'

// ─── Font Size Extension ────────────────────────────────────────
const FontSize = Extension.create({
    name: 'fontSize',
    addOptions() { return { types: ['textStyle'] } },
    addGlobalAttributes() {
        return [{
            types: this.options.types,
            attributes: {
                fontSize: {
                    default: null,
                    parseHTML: el => el.style.fontSize?.replace('px', '') || null,
                    renderHTML: attrs => attrs.fontSize ? { style: `font-size:${attrs.fontSize}px` } : {},
                },
            },
        }]
    },
    addCommands() {
        return {
            setFontSize: s => ({ chain }) => chain().setMark('textStyle', { fontSize: s }).run(),
        }
    },
})

// ─── Image with custom attrs (width, align) ──────────────────────
const CustomImage = Image.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            width: { default: null, parseHTML: el => el.getAttribute('data-width') || el.style.width || null, renderHTML: attrs => attrs.width ? { 'data-width': attrs.width, style: `width:${attrs.width}` } : {} },
            align: { default: 'center', parseHTML: el => el.getAttribute('data-align') || 'center', renderHTML: attrs => ({ 'data-align': attrs.align || 'center' }) },
        }
    },
    // Click detection for bubble
    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('imageClick'),
                props: {
                    handleClickOn(view, pos, node) {
                        if (node.type.name === 'image') {
                            return false // let Vue watch selection
                        }
                    },
                },
            }),
        ]
    },
})

// ─── v-click-outside directive ──────────────────────────────────
const vClickOutside = {
    mounted(el, binding) {
        el._clickOutside = (e) => { if (!el.contains(e.target)) binding.value(e) }
        document.addEventListener('click', el._clickOutside)
    },
    unmounted(el) { document.removeEventListener('click', el._clickOutside) },
}

// ─── Props / Emits ───────────────────────────────────────────────
const props = defineProps({
    modelValue: { type: String, default: '' },
    /**
     * Base URL endpoint upload gambar.
     * storeImage  → POST   {uploadEndpoint}
     * destroyImage → DELETE {uploadEndpoint}/{filename}
     */
    uploadEndpoint: { type: String, default: '/webdav/resources/tiptap/images' },
})
const emit = defineEmits(['update:modelValue'])

// ─── Image upload tracking ───────────────────────────────────────
/**
 * Set berisi filename gambar tmp yang sedang ada di editor.
 * Dipakai untuk mendeteksi gambar yang dihapus → otomatis DELETE ke server.
 */
const trackedTmpImages = new Set()

/** Ambil semua filename tmp dari HTML konten editor saat ini */
function extractTmpFilenames(html) {
    const regex = /\/uploads\/tmp\/([^"'\s>]+)/g
    const set = new Set()
    let m
    while ((m = regex.exec(html)) !== null) set.add(m[1])
    return set
}

/** Panggil DELETE endpoint untuk gambar yang sudah tidak ada di editor */
async function deleteOrphanedTmpImages(prevHtml, nextHtml) {
    const before = extractTmpFilenames(prevHtml)
    const after = extractTmpFilenames(nextHtml)

    for (const filename of before) {
        if (!after.has(filename)) {
            try {
                useApi().delete(`${props.uploadEndpoint}/${encodeURIComponent(filename)}`)
                trackedTmpImages.delete(filename)
            } catch { }
        }
    }
}

// ─── Reactive state ──────────────────────────────────────────────
const isDark = useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: 'light',
    storageKey: 'theme',
})
const imageInput = ref(null)
const imageUploading = ref(false)
const tableMenuOpen = ref(false)
const linkModalOpen = ref(false)
const linkUrl = ref('')
const linkTarget = ref(true)
const imageUrlModalOpen = ref(false)
const imageUrl = ref('')
const imageAlt = ref('')
const imageInitialSize = ref('100%')
const imageInitialAlign = ref('center')
const currentColor = ref('#e2e8f0')
const currentHighlight = ref('#854d0e')

// Image bubble
const imageSelected = ref(false)
const bubbleX = ref(0)
const bubbleY = ref(0)
const activeImageSize = ref('100%')
const activeImageAlign = ref('center')
let selectedImagePos = null

const imageSizes = [
    { label: '25%', value: '25%' },
    { label: '50%', value: '50%' },
    { label: '75%', value: '75%' },
    { label: '100%', value: '100%' },
]

const imagePositions = [
    { label: 'Kiri', value: 'left', icon: 'M3 21h18v-2H3v2zm0-4h12v-2H3v2zm0-4h18v-2H3v2zm0-4h12V7H3v2zm0-6v2h18V3H3z' },
    { label: 'Tengah', value: 'center', icon: 'M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z' },
    { label: 'Kanan', value: 'right', icon: 'M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z' },
]

const fontSizes = ['10', '12', '14', '16', '18', '20', '24', '28', '32', '36', '48', '64']

// ─── Editor setup ────────────────────────────────────────────────
const editor = useEditor({
    content: props.modelValue,
    extensions: [
        StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] } }),
        Underline, TextAlign.configure({ types: ['heading', 'paragraph'] }),
        TextStyle, Color,
        Highlight.configure({ multicolor: true }),
        Link.configure({ openOnClick: false }),
        CustomImage.configure({ inline: false, allowBase64: true }),
        Table.configure({ resizable: true }), TableRow, TableCell, TableHeader,
        TaskList, TaskItem.configure({ nested: true }),
        CharacterCount, FontSize,
    ],
    onUpdate({ editor }) {
        const nextHtml = editor.getHTML()
        const prevHtml = props.modelValue || ''
        // Deteksi gambar tmp yang dihapus dari editor → DELETE ke server
        deleteOrphanedTmpImages(prevHtml, nextHtml)
        emit('update:modelValue', nextHtml)
    },
    onSelectionUpdate({ editor }) {
        const { selection } = editor.state
        const node = selection.node
        if (node && node.type.name === 'image') {
            imageSelected.value = true
            selectedImagePos = selection.from
            activeImageSize.value = node.attrs.width || '100%'
            activeImageAlign.value = node.attrs.align || 'center'
            nextTick(() => positionBubble(editor))
        } else {
            imageSelected.value = false
            selectedImagePos = null
        }
    },
})

function positionBubble(ed) {
    const domSel = window.getSelection()
    if (!domSel || domSel.rangeCount === 0) return
    const range = domSel.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    bubbleX.value = rect.left + window.scrollX
    bubbleY.value = rect.top + window.scrollY - 52
}

// ─── Watchers ────────────────────────────────────────────────────
watch(() => props.modelValue, val => {
    if (editor.value && editor.value.getHTML() !== val)
        editor.value.commands.setContent(val, false)
})

// ─── Computed ────────────────────────────────────────────────────
const isEmpty = computed(() => !editor.value?.getText()?.trim())
const charCount = computed(() => editor.value?.storage?.characterCount?.characters?.() ?? 0)
const wordCount = computed(() => editor.value?.storage?.characterCount?.words?.() ?? 0)

// ─── Toolbar helpers ─────────────────────────────────────────────
function setHeading(e) {
    const l = parseInt(e.target.value)
    l === 0 ? editor.value.chain().focus().setParagraph().run()
        : editor.value.chain().focus().setHeading({ level: l }).run()
}

function setColor(e) {
    currentColor.value = e.target.value
    editor.value.chain().focus().setColor(e.target.value).run()
}

function setHighlight(e) {
    currentHighlight.value = e.target.value
    editor.value.chain().focus().setHighlight({ color: e.target.value }).run()
}

function setFontSize(e) {
    if (!e.target.value) return
    editor.value.chain().focus().setFontSize(e.target.value).run()
}

function run(cmd) {
    editor.value.chain().focus()[cmd]().run()
    tableMenuOpen.value = false
}

function insertTable() {
    editor.value.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
    tableMenuOpen.value = false
}

function openLinkModal() {
    linkUrl.value = editor.value.getAttributes('link').href || ''
    linkModalOpen.value = true
}

function applyLink() {
    if (!linkUrl.value) {
        editor.value.chain().focus().unsetLink().run()
    } else {
        editor.value.chain().focus().setLink({ href: linkUrl.value, target: linkTarget.value ? '_blank' : null }).run()
    }
    linkModalOpen.value = false
    linkUrl.value = ''
}

function triggerImageUpload() { imageInput.value.click() }

async function handleImageUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    e.target.value = ''

    imageUploading.value = true

    try {
        const formData = new FormData()
        formData.append('image', file)

        const res = await useApi().post(props.uploadEndpoint, formData)
        console.log(res)

        if (res.status != 201) {
            console.error('[TiptapEditor] Upload gagal')
            return
        }

        const { url, filename } = res.data
        trackedTmpImages.add(filename)
        insertImageWithAttrs(url, file.name, '100%', 'center')
    } catch (err) {
        console.error('[TiptapEditor] Error upload gambar:', err)
    } finally {
        imageUploading.value = false
    }
}

function insertImageWithAttrs(src, alt, width, align) {
    editor.value.chain().focus().setImage({ src, alt, width, align }).run()
}

function openImageUrlModal() {
    imageUrl.value = ''
    imageAlt.value = ''
    imageInitialSize.value = '100%'
    imageInitialAlign.value = 'center'
    imageUrlModalOpen.value = true
}

function applyImageUrl() {
    if (imageUrl.value) {
        insertImageWithAttrs(imageUrl.value, imageAlt.value, imageInitialSize.value, imageInitialAlign.value)
    }
    imageUrlModalOpen.value = false
}

// ─── Image bubble controls ───────────────────────────────────────
function setImageSize(size) {
    if (selectedImagePos === null) return
    activeImageSize.value = size
    editor.value.chain().focus().updateAttributes('image', { width: size }).run()
}

function setImageAlign(align) {
    if (selectedImagePos === null) return
    activeImageAlign.value = align
    editor.value.chain().focus().updateAttributes('image', { align }).run()
}

function deleteImage() {
    editor.value.chain().focus().deleteSelection().run()
    imageSelected.value = false
}

onBeforeUnmount(() => editor.value?.destroy())
</script>


<style scoped>
/* ─── CSS Variables ──────────────────────────────────────────── */
.editor-shell {
    --c-bg: #ffffff;
    --c-bg2: #f8fafc;
    --c-border: #e2e8f0;
    --c-text: #1a1a2e;
    --c-text-muted: #6b7280;
    --c-text-faint: #9ca3af;
    --c-btn-hover: #e5e7eb;
    --c-active: #1e3a5f;
    --c-active-text: #ffffff;
    --c-input-bg: #ffffff;
    --c-input-border: #d1d5db;
    --c-select-bg: #ffffff;
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
    --shadow: 0 4px 24px 0 rgba(30, 40, 80, 0.07);
}

/* Dark mode overrides using the brand palette */
.editor-shell.dark {
    --c-bg: #191919;
    /* --color-dark-primary */
    --c-bg2: #222222;
    /* --color-dark-secondary */
    --c-border: #2f2f2f;
    /* --color-dark-slate */
    --c-text: #e5e7eb;
    --c-text-muted: #9ca3af;
    --c-text-faint: #585858;
    /* --color-dark-gray */
    --c-btn-hover: #2f2f2f;
    --c-active: #3b82f6;
    --c-active-text: #ffffff;
    --c-input-bg: #343534;
    /* --color-dark-field */
    --c-input-border: #585858;
    --c-select-bg: #343534;
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
    --shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.4);
}

/* ─── Shell ──────────────────────────────────────────────────── */
.editor-shell {
    display: flex;
    flex-direction: column;
    border: 1.5px solid var(--c-border);
    border-radius: 12px;
    overflow: visible;
    background: var(--c-bg);
    box-shadow: var(--shadow);
    font-family: 'Georgia', 'Times New Roman', serif;
    min-height: 480px;
    max-height: 800px;
    transition: background 0.2s, border-color 0.2s;
}

/* ─── Topbar ─────────────────────────────────────────────────── */
.topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 14px 6px;
    border-bottom: 1px solid var(--c-border);
    background: var(--c-bg2);
    border-radius: 10px 10px 0 0;
}

.topbar-title {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: var(--c-text-muted);
    padding: 4px 0;
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
    color: var(--c-text-muted);
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

/* ─── Toolbar ────────────────────────────────────────────────── */
.toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 2px;
    padding: 7px 10px;
    background: var(--c-bg2);
    border-bottom: 1.5px solid var(--c-border);
    position: sticky;
    top: 0;
    z-index: 10;
}

.toolbar-group {
    display: flex;
    align-items: center;
    gap: 1px;
}

.toolbar-divider {
    width: 1px;
    height: 22px;
    background: var(--c-border);
    margin: 0 4px;
}

.tb-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    padding: 5px 6px;
    border: none;
    background: transparent;
    border-radius: 6px;
    cursor: pointer;
    color: var(--c-text-muted);
    transition: background 0.13s, color 0.13s;
    min-width: 30px;
    height: 30px;
}

.tb-btn svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
    flex-shrink: 0;
}

.tb-btn:hover:not(:disabled) {
    background: var(--c-btn-hover);
    color: var(--c-text);
}

.tb-btn.active {
    background: var(--c-active);
    color: var(--c-active-text);
}

.tb-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}

.tb-select {
    height: 30px;
    padding: 0 6px;
    border: 1px solid var(--c-input-border);
    border-radius: 6px;
    font-size: 12px;
    background: var(--c-select-bg);
    color: var(--c-text);
    cursor: pointer;
    outline: none;
    transition: border-color 0.13s, background 0.2s;
}

.tb-select:focus {
    border-color: var(--c-active);
}

/* Color picker */
.color-picker-wrap {
    position: relative;
    display: inline-flex;
}

.color-btn {
    flex-direction: column;
    gap: 1px;
    height: 30px;
    padding: 3px 6px;
}

.color-indicator {
    display: block;
    width: 14px;
    height: 3px;
    border-radius: 2px;
    pointer-events: none;
}

.color-input {
    position: absolute;
    inset: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    border: none;
    padding: 0;
}

/* Dropdown */
.dropdown-wrap {
    position: relative;
}

.dropdown-trigger {
    padding-right: 4px;
}

.dropdown-arrow {
    font-size: 10px;
    opacity: 0.6;
}

.dropdown-menu {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    min-width: 185px;
    background: var(--c-bg);
    border: 1.5px solid var(--c-border);
    border-radius: 8px;
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.18);
    z-index: 200;
    padding: 5px 0;
}

.dropdown-label {
    font-size: 10px;
    font-weight: 700;
    color: var(--c-text-faint);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 7px 12px 2px;
}

.dropdown-item {
    display: block;
    width: 100%;
    padding: 6px 12px;
    border: none;
    background: transparent;
    text-align: left;
    font-size: 13px;
    color: var(--c-text);
    cursor: pointer;
    transition: background 0.1s;
}

.dropdown-item:hover {
    background: var(--c-btn-hover);
}

.dropdown-item.danger {
    color: #ef4444;
}

.dropdown-item.danger:hover {
    background: rgba(239, 68, 68, 0.08);
}

/* ─── Editor Body ────────────────────────────────────────────── */
.editor-body {
    position: relative;
    flex: 1;
    padding: 32px 40px;
    min-height: 360px;
    overflow-y: auto;
    background: var(--c-bg);
    transition: background 0.2s;
}

.editor-body::-webkit-scrollbar {
    display: none !important;
}

.editor-placeholder {
    position: absolute;
    top: 32px;
    left: 40px;
    color: var(--c-text-faint);
    pointer-events: none;
    font-size: 16px;
    font-style: italic;
}

/* ─── Content styles ─────────────────────────────────────────── */
.editor-content :deep(.ProseMirror) {
    outline: none;
    min-height: 300px;
    line-height: 1.8;
    color: var(--c-text);
    font-size: 16px;
    font-family: 'Georgia', 'Times New Roman', serif;
    caret-color: var(--c-active);
}

.editor-content :deep(h1),
.editor-content :deep(h2),
.editor-content :deep(h3),
.editor-content :deep(h4),
.editor-content :deep(h5),
.editor-content :deep(h6) {
    font-family: 'Georgia', serif;
    color: var(--c-heading);
    margin: 1.5em 0 0.5em;
    font-weight: 700;
    line-height: 1.3;
}

.editor-content :deep(h1) {
    font-size: 2.2em;
    border-bottom: 2px solid var(--c-border);
    padding-bottom: 0.3em;
}

.editor-content :deep(h2) {
    font-size: 1.7em;
    border-bottom: 1px solid var(--c-border);
    padding-bottom: 0.2em;
}

.editor-content :deep(h3) {
    font-size: 1.35em;
}

.editor-content :deep(h4) {
    font-size: 1.1em;
}

.editor-content :deep(h5) {
    font-size: 1em;
}

.editor-content :deep(h6) {
    font-size: 0.9em;
    color: var(--c-h6);
}

.editor-content :deep(p) {
    padding: 0.25em 0;
}

.editor-content :deep(strong) {
    font-weight: 700;
}

.editor-content :deep(em) {
    font-style: italic;
}

.editor-content :deep(u) {
    text-decoration: underline;
}

.editor-content :deep(s) {
    text-decoration: line-through;
    color: var(--c-strike);
}

.editor-content :deep(code) {
    background: var(--c-code-bg);
    border: 1px solid var(--c-code-border);
    border-radius: 4px;
    padding: 1px 5px;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.88em;
    color: var(--c-code-color);
}

.editor-content :deep(pre) {
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

.editor-content :deep(pre code) {
    background: transparent;
    border: none;
    padding: 0;
    color: inherit;
    font-size: inherit;
}

.editor-content :deep(blockquote) {
    border-left: 4px solid var(--c-quote-border);
    margin: 1.25em 0;
    padding: 8px 16px;
    background: var(--c-quote-bg);
    border-radius: 0 8px 8px 0;
    color: var(--c-text-muted);
    font-style: italic;
}

.editor-content :deep(ul),
.editor-content :deep(ol) {
    padding-left: 1.6em;
    margin: 0.75em 0;
}

.editor-content :deep(li) {
    margin: 0.3em 0;
}

.editor-content :deep(ul li) {
    list-style-type: disc;
}

.editor-content :deep(ol li) {
    list-style-type: decimal;
}

.editor-content :deep(ul ul li) {
    list-style-type: circle;
}

.editor-content :deep(ul ul ul li) {
    list-style-type: square;
}

.editor-content :deep(ul[data-type="taskList"]) {
    list-style: none;
    padding-left: 0.5em;
}

.editor-content :deep(ul[data-type="taskList"] li) {
    display: flex;
    align-items: center;
    gap: 8px;
}

.editor-content :deep(ul[data-type="taskList"] li > label) {
    margin-top: 2px;
}

.editor-content :deep(ul[data-type="taskList"] li > div > p) {
    padding: 0px !important;
}

.editor-content :deep(ul[data-type="taskList"] li > label input[type="checkbox"]) {
    width: 15px;
    height: 15px;
    cursor: pointer;
    accent-color: var(--c-active);
}

.editor-content :deep(hr) {
    border: none;
    border-top: 2px solid var(--c-hr);
    margin: 1.5em 0;
}

.editor-content :deep(a) {
    color: var(--c-link);
    text-decoration: underline;
    text-decoration-color: var(--c-link-deco);
    text-underline-offset: 2px;
    transition: opacity 0.15s;
}

.editor-content :deep(a:hover) {
    opacity: 0.75;
}

/* ─── Image with align support ──────────────────────────────── */
.editor-content :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 0.75em 0;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
    display: block;
    transition: box-shadow 0.2s, outline 0.15s;
    cursor: pointer;
}

.editor-content :deep(img[data-align="left"]) {
    margin-left: 0;
    margin-right: auto;
}

.editor-content :deep(img[data-align="center"]) {
    margin-left: auto;
    margin-right: auto;
}

.editor-content :deep(img[data-align="right"]) {
    margin-left: auto;
    margin-right: 0;
}

.editor-content :deep(img.ProseMirror-selectednode) {
    outline: 3px solid var(--c-active);
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.18);
}

/* ─── Table ──────────────────────────────────────────────────── */
.editor-content :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.25em 0;
    font-size: 0.95em;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
}

.editor-content :deep(table th),
.editor-content :deep(table td) {
    border: 1px solid var(--c-border);
    padding: 10px 14px;
    text-align: left;
    vertical-align: top;
    min-width: 80px;
    position: relative;
    color: var(--c-text);
}

.editor-content :deep(table th) {
    background: var(--c-table-head-bg);
    color: var(--c-table-head-text);
    font-weight: 600;
    font-family: 'Georgia', serif;
    letter-spacing: 0.02em;
}

.editor-content :deep(table tr:nth-child(even) td) {
    background: var(--c-table-even);
}

.editor-content :deep(table tr:hover td) {
    background: var(--c-table-hover);
}

.editor-content :deep(.selectedCell::after) {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(59, 130, 246, 0.14);
    pointer-events: none;
}

.editor-content :deep(.column-resize-handle) {
    position: absolute;
    right: -2px;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--c-active);
    cursor: col-resize;
    z-index: 20;
}

.editor-content :deep(.tableWrapper) {
    overflow-x: auto;
    margin: 1.25em 0;
}

/* ─── Footer ─────────────────────────────────────────────────── */
.editor-footer {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 14px;
    background: var(--c-bg2);
    border-top: 1.5px solid var(--c-border);
    font-size: 12px;
    color: var(--c-text-faint);
    font-variant-numeric: tabular-nums;
    transition: background 0.2s;
}

.footer-btn {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    margin-left: auto;
    padding: 4px 10px;
    border: 1px solid var(--c-input-border);
    border-radius: 5px;
    background: var(--c-input-bg);
    cursor: pointer;
    font-size: 12px;
    color: var(--c-text);
    transition: background 0.13s;
}

.footer-btn svg {
    fill: currentColor;
}

.footer-btn:hover {
    background: var(--c-btn-hover);
}

/* ─── Image Bubble ───────────────────────────────────────────── */
.image-bubble {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 3px;
    background: #ffffff;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    padding: 5px 8px;
    box-shadow: 0 6px 22px rgba(0, 0, 0, 0.14);
    z-index: 9999;
    white-space: nowrap;
    pointer-events: all;
}

.image-bubble.dark {
    background: #222222;
    border-color: #2f2f2f;
    box-shadow: 0 6px 22px rgba(0, 0, 0, 0.5);
}

.bubble-label {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: #9ca3af;
    padding: 0 3px;
    user-select: none;
}

.image-bubble.dark .bubble-label {
    color: #585858;
}

.bubble-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px 7px;
    border-radius: 5px;
    border: none;
    background: transparent;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    color: #374151;
    transition: background 0.12s, color 0.12s;
    height: 26px;
    min-width: 26px;
}

.image-bubble.dark .bubble-btn {
    color: #d1d5db;
}

.bubble-btn svg {
    fill: currentColor;
}

.bubble-btn:hover {
    background: #f3f4f6;
}

.image-bubble.dark .bubble-btn:hover {
    background: #2f2f2f;
}

.bubble-btn.active {
    background: #1e3a5f;
    color: #fff;
}

.image-bubble.dark .bubble-btn.active {
    background: #3b82f6;
    color: #fff;
}

.bubble-btn.danger {
    color: #ef4444;
}

.bubble-btn.danger:hover {
    background: rgba(239, 68, 68, 0.1);
}

.bubble-sep {
    width: 1px;
    height: 18px;
    background: #e2e8f0;
    margin: 0 2px;
}

.image-bubble.dark .bubble-sep {
    background: #2f2f2f;
}

/* ─── Modal ──────────────────────────────────────────────────── */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    backdrop-filter: blur(3px);
}

.modal {
    background: #fff;
    border-radius: 12px;
    width: 420px;
    max-width: 95vw;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    overflow: hidden;
}

.modal.dark {
    background: #191919;
    border: 1px solid #2f2f2f;
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px 12px;
    border-bottom: 1px solid #e2e8f0;
}

.modal.dark .modal-header {
    border-color: #2f2f2f;
}

.modal-header h3 {
    margin: 0;
    font-size: 15px;
    color: #0f172a;
    font-family: 'Georgia', serif;
}

.modal.dark .modal-header h3 {
    color: #f1f5f9;
}

.modal-close {
    border: none;
    background: none;
    font-size: 15px;
    cursor: pointer;
    color: #6b7280;
    padding: 2px 7px;
    border-radius: 4px;
}

.modal-close:hover {
    background: #f3f4f6;
}

.modal.dark .modal-close:hover {
    background: #2f2f2f;
}

.modal-body {
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.modal-body label {
    font-size: 12px;
    font-weight: 700;
    color: #374151;
}

.modal.dark .modal-body label {
    color: #9ca3af;
}

.modal-input {
    width: 100%;
    padding: 8px 10px;
    border: 1.5px solid #d1d5db;
    border-radius: 6px;
    font-size: 13px;
    outline: none;
    box-sizing: border-box;
    background: #fff;
    color: #1a1a2e;
    transition: border-color 0.13s;
}

.modal.dark .modal-input {
    background: #343534;
    border-color: #585858;
    color: #e5e7eb;
}

.modal-input:focus {
    border-color: #1e3a5f;
}

.modal.dark .modal-input:focus {
    border-color: #3b82f6;
}

.modal-check {
    display: flex;
    align-items: center;
    gap: 7px;
}

.modal-check input {
    accent-color: #1e3a5f;
}

.modal-footer {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    padding: 12px 20px 15px;
    border-top: 1px solid #e2e8f0;
}

.modal.dark .modal-footer {
    border-color: #2f2f2f;
}

.modal-btn {
    padding: 8px 18px;
    border-radius: 7px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: background 0.13s;
}

.modal-btn.secondary {
    background: #f3f4f6;
    color: #374151;
}

.modal-btn.secondary:hover {
    background: #e5e7eb;
}

.modal.dark .modal-btn.secondary {
    background: #2f2f2f;
    color: #d1d5db;
}

.modal.dark .modal-btn.secondary:hover {
    background: #585858;
}

.modal-btn.primary {
    background: #1e3a5f;
    color: #fff;
}

.modal-btn.primary:hover {
    background: #16305a;
}

.modal.dark .modal-btn.primary {
    background: #3b82f6;
}

.modal.dark .modal-btn.primary:hover {
    background: #2563eb;
}
</style>