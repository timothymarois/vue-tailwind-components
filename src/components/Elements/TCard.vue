<template>
    <div :class="getCssClass('root')">
        <div v-if="title || $slots.title">
            <div :class="getCssClass('header')" v-if="!$slots.title">
                <div>
                    <h3 :class="getCssClass('headerTitle')">{{ title }}</h3>
                    <p v-if="subtitle" :class="getCssClass('headerSubtitle')">{{ subtitle }}</p>
                </div>
                <div v-if="$slots.actions" :class="getCssClass('actions')">
                    <slot name="actions"></slot>
                </div>
            </div>
            <div v-else :class="getCssClass('header')">
                <slot name="title"></slot>
            </div>
        </div>
        <div :class="getCssClass('body')">
            <slot></slot>
        </div>
        <div v-if="$slots.footer" :class="getCssClass('footer')">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
import Component from '../Base/Component';
const TCard = Component.extend({
    name: 'TCard',
    props: {
        title: {
            type: String,
            default: null
        },
        subtitle: {
            type: String,
            default: null
        },
        fixedClasses: {
            type: Object,
            default() {
                return {
                    root: '',
                    header: 'flex justify-between items-center flex-wrap sm:flex-nowrap',
                    headerTitle: '',
                    headerSubtitle: 'mt-1',
                    actions: 'flex justify-between items-center flex-nowrap space-x-2',
                    body: '',
                    footer: ''
                }
            }
        },
        classes: {
            type: Object,
            default() {
                return {
                    root: 'w-full border border-gray-400 rounded bg-white dark:bg-black',
                    header: 'p-4 border-b border-gray-400',
                    headerTitle: 'leading-none font-medium text-lg text-black',
                    headerSubtitle: 'text-sm text-gray-500',
                    actions: '',
                    body: 'w-full p-4',
                    footer: 'w-full p-4 border-t border-gray-400'
                }
            }
        }
    }
});

export default TCard;
</script> 