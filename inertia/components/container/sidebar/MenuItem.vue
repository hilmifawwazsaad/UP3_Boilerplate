<template>
    <div v-if="checkVisible(menu.visible)" class="text-gray-700 dark:text-gray-200">

        <hr v-if="menu.beforeDivider" class="my-1 border-gray-200 dark:border-gray-600">

        <li v-if="!menu.children && menu.to" class="hover"
            :class="[sidebarOpen ? 'hover' : is_child ? 'hidden' : 'hover:border-none', checkActive(menu)]">
            <Link :href="is_child ? parent_url + menu.to : menu.to" class="px-3 flex items-center"
                :class="[padding_y, text_size, sidebarOpen ? 'justify-start' : 'justify-center']">
            <span>
                <component :is="menu.icon" size='20' stroke="1.75"></component>
            </span>
            <span v-if="sidebarOpen" class="ml-4">{{ menu.menu_name }}</span>
            </Link>

        </li>

        <li v-else-if="menu.to" class="hs-accordion " :id="menu.menu_name.replace(/\s/g, '') + '-accordion'"
            :class="checkActiveExpand(menu, 'active')">
            <div class="flex flex-row group" v-if="menu.hasMenu">
                <Link class="flex w-full" :href="menu.to">
                <div class="grow flex items-center px-3"
                    :class="[sidebarOpen ? 'justify-start' : 'justify-center', padding_y, text_size, checkActive(menu, true)]">
                    <component :is="menu.icon" size='20'></component>
                    <span v-if="sidebarOpen" class="flex-1 ms-4 text-left rtl:text-right whitespace-break-spaces">
                        {{ menu.menu_name }}
                    </span>
                </div>
                </Link>
                <button type="button"
                    class="hs-accordion-toggle text-start flex items-center focus:outline-none border-none"
                    :aria-expanded="checkActiveExpand(menu, 'expand')"
                    :aria-controls="menu.menu_name.replace(/\s/g, '') + '-accordion'"
                    :class="[sidebarOpen ? 'justify-start px-3' : 'justify-center', padding_y, text_size, checkActive(menu, true)]"
                    @click="tryToOpenSidebar">
                    <svg v-if="sidebarOpen" class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 4 4 4-4" />
                    </svg>
                </button>
            </div>
            <button v-else type="button"
                class="hs-accordion-toggle w-full text-start flex items-center px-3 focus:outline-none "
                :aria-expanded="checkActiveExpand(menu, 'expand')"
                :aria-controls="menu.menu_name.replace(/\s/g, '') + '-accordion'"
                :class="[sidebarOpen ? 'justify-start' : 'justify-center', padding_y, text_size, checkActive(menu)]"
                @click="tryToOpenSidebar">
                <component :is="menu.icon" size='20'></component>
                <span v-if="sidebarOpen" class="flex-1 ms-4 text-left rtl:text-right whitespace-break-spaces">
                    {{ menu.menu_name }}
                </span>
                <svg v-if="sidebarOpen" class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m1 1 4 4 4-4" />
                </svg>
            </button>

            <div :id="menu.menu_name.replace(/\s/g, '') + '-accordion'"
                class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                :style="checkActiveExpand(menu, 'style')" role="region"
                :aria-labelledby="menu.menu_name.replace(/\s/g, '') + '-accordion'">
                <ul class="ps-2" v-if="sidebarOpen">
                    <li v-for="child in menu.children" :key="child.menu_name" class="pl-2">
                        <MenuItem :menu="child" :sidebarOpen="sidebarOpen" padding_y="py-2" text_size="text-sm" class=""
                            :is_child="true" :parent_url="buildUri(menu, child, parent_url, is_child)"
                            v-if="checkVisible(child.visible)" />
                    </li>
                </ul>
            </div>
        </li>

        <hr v-if="menu.afterDivider" class="my-1 border-gray-200 dark:border-gray-600">
    </div>
</template>

<script>
import { initCollapses } from 'flowbite';
import { HSAccordion } from "preline";
import { usePage } from '@inertiajs/vue3';
import { useAuth } from '~/composables';

import { RULE_VISIBILITY, MENU_STYLE, cls } from './helper';

export default {
    emits: ['toggleSidebar'],
    components: {
    },
    props: {
        menu: Object,
        sidebarOpen: Boolean,
        parent_url: String,
        is_child: {
            type: Boolean,
            default: false
        },
        padding_y: {
            type: String,
            default: 'py-2.5'
        },
        text_size: {
            type: String,
            default: 'text-base'
        }
    },
    mounted() {
        // initTooltips();
        initCollapses();
        HSAccordion.autoInit();
    },
    methods: {
        findChildRecursively(menu, uriNow, uriParent = '') {
            return menu.children.find((child) => {
                if (child.children) {
                    // Rekursif untuk mengecek children dari child
                    if (child.url_parent === undefined || child.url_parent) {

                        return this.findChildRecursively(child, uriNow, uriParent != '' ? uriParent : menu.to);
                    } else {
                        return this.findChildRecursively(child, uriNow, uriParent);
                    }
                } else {
                    if (child.url_parent === undefined || child.url_parent === true) {
                        if (uriNow.includes(uriParent + menu.to + child.to)) {
                            return true;
                        }

                        if (child.allow_next) {
                            if (uriParent == menu.to) {
                                if (uriNow.includes(menu.to + child.to)) {
                                    return true
                                }
                            } else {
                                if (uriNow.includes(uriParent + menu.to + child.to)) {
                                    return true
                                }
                            }
                        }
                    } else {
                        if (child.allow_next) {
                            if (uriParent == menu.to) {
                                if (uriNow.includes(menu.to + child.to)) {
                                    return true
                                }
                            } else {
                                if (uriNow.includes(child.to)) {
                                    return true
                                }
                            }
                        }
                        return child.to === uriNow
                    }

                    return uriNow == uriParent + child.to
                }

            });
        },
        checkActive(menu, group = false) {
            let uriNow = usePage().url
            if (uriNow.split('?')[1]) {
                uriNow = uriNow.split('?')[0]
            }

            if (uriNow[uriNow.length - 1] === '/') {
                uriNow = uriNow.slice(0, -1)
            }

            if (menu.children !== undefined) {
                let child
                if (menu.uri_parent === undefined || menu.uri_parent) {
                    child = this.findChildRecursively(menu, uriNow, this.parent_url)
                } else {
                    child = this.findChildRecursively(menu, uriNow)
                }

                if (child) {
                    if (group) {
                        return cls(
                            MENU_STYLE.base,
                            MENU_STYLE.active,
                            MENU_STYLE.darkActive,
                            MENU_STYLE.groupActive,
                            MENU_STYLE.darkGroupActive
                        )
                    }

                    return cls(
                        MENU_STYLE.base,
                        MENU_STYLE.active,
                        MENU_STYLE.darkActive
                    )
                } else {
                    if (uriNow === menu.to) {
                        if (group) {
                            return cls(
                                MENU_STYLE.base,
                                MENU_STYLE.active,
                                MENU_STYLE.darkActive,
                                MENU_STYLE.groupActive,
                                MENU_STYLE.darkGroupActive
                            )
                        } else {
                            if (this.parent_url + uriNow === menu.to) {
                                return cls(
                                    MENU_STYLE.base,
                                    MENU_STYLE.active,
                                    MENU_STYLE.darkActive
                                )
                            } else {
                                return ''
                            }
                        }
                    } else {
                        if (group) {
                            return cls(
                                MENU_STYLE.base,
                                MENU_STYLE.accordionActive,
                                MENU_STYLE.darkAccordionActive,
                                MENU_STYLE.hover,
                                MENU_STYLE.darkHover
                            )
                        } else {
                            return cls(
                                MENU_STYLE.base,
                                MENU_STYLE.accordionActive,
                                MENU_STYLE.darkAccordionActive,
                                MENU_STYLE.hover,
                                MENU_STYLE.darkHover
                            )
                        }
                    }
                }
            }

            if (this.is_child && menu.url_parent === undefined || menu.url_parent) {
                if (uriNow == this.parent_url + menu.to) {
                    return cls(
                        MENU_STYLE.base,
                        MENU_STYLE.active,
                        MENU_STYLE.darkActive
                    )
                } else {
                    if (!menu.allow_next) {
                        return cls(
                            MENU_STYLE.base,
                            MENU_STYLE.hover,
                            MENU_STYLE.darkHover
                        )
                    } else {
                        if (uriNow.includes(this.parent_url + menu.to)) {
                            return cls(
                                MENU_STYLE.base,
                                MENU_STYLE.active,
                                MENU_STYLE.darkActive
                            )
                        } else {
                            return cls(
                                MENU_STYLE.base,
                                MENU_STYLE.hover,
                                MENU_STYLE.darkHover
                            )
                        }
                    }
                }
            } else {
                if (menu.allow_next) {
                    if (uriNow.includes(this.parent_url) || uriNow.includes(menu.alternateTo)) {
                        return cls(
                            MENU_STYLE.base,
                            MENU_STYLE.active,
                            MENU_STYLE.darkActive
                        )
                    } else {
                        return cls(
                            MENU_STYLE.base,
                            MENU_STYLE.hover,
                            MENU_STYLE.darkHover
                        )
                    }
                }
            }

            if (menu.chainChildren === undefined) {
                if (menu.to === uriNow || menu.alternateTo == uriNow) {
                    return cls(
                        MENU_STYLE.base,
                        MENU_STYLE.active,
                        MENU_STYLE.darkActive
                    )
                } else {
                    return cls(
                        MENU_STYLE.base,
                        MENU_STYLE.hover,
                        MENU_STYLE.darkHover
                    )
                }
            } else if (menu.chainChildren === true) {
                if (uriNow.indexOf(menu.to) !== -1) {
                    if (group) {
                        return cls(
                            MENU_STYLE.base,
                            MENU_STYLE.active,
                            MENU_STYLE.darkActive,
                            MENU_STYLE.groupActive,
                            MENU_STYLE.darkGroupActive
                        )
                    }

                    return cls(
                        MENU_STYLE.base,
                        MENU_STYLE.active,
                        MENU_STYLE.darkActive
                    )
                } else {
                    if (group) {
                        return cls(
                            MENU_STYLE.base,
                            MENU_STYLE.groupInactive,
                            MENU_STYLE.darkGroupActive
                        )
                    }

                    return cls(
                        MENU_STYLE.base,
                        MENU_STYLE.hover,
                        MENU_STYLE.darkHover
                    )
                }
            }
        }
        ,
        checkActiveExpand(menu, as) {
            let uriNow = usePage().url
            if (uriNow[uriNow.length - 1] === '/') {
                uriNow = uriNow.slice(0, -1);
            }

            if (menu.children !== undefined) {
                const child = this.findChildRecursively(menu, uriNow, this.parent_url);

                if (child) {
                    if (as === 'expand') {
                        return true
                    } else if (as === 'active') {
                        return 'active'
                    } else if (as === 'style') {
                        return 'display: block;'
                    }
                } else {
                    if (as === 'expand') {
                        return false
                    } else if (as === 'active') {
                        return ''
                    } else if (as === 'style') {
                        return 'height: 0;'
                    }
                }
            }
        },
        buildUri(menu, child, parent_url, is_child) {
            if (!is_child) {
                const url_parent = child.url_parent === undefined ? true : child.url_parent

                if (url_parent) {
                    return parent_url
                } else {
                    return ''
                }
            } else {
                const url_parent = child.url_parent === undefined ? true : child.url_parent

                if (url_parent) {
                    return parent_url + menu.to
                } else {
                    return ''
                }
            }
        },
        checkVisible(visible) {
            const user = useAuth({ current: true })
            let rule
            if (typeof visible === 'string') {
                rule = RULE_VISIBILITY[visible]
            } else if (typeof visible === 'object') {
                rule = RULE_VISIBILITY['object']
            } else {
                return true
            }
            return rule({ user: user, visible: visible })
        },
        tryToOpenSidebar() {
            if (!this.sidebarOpen) {
                this.$emit('toggleSidebar');
            }
        }
    }
}
</script>