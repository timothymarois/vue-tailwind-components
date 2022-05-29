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
            <div v-else>
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
        flat: {
            type: Boolean,
            defualt: false
        },
        tile: {
            type: Boolean,
            defualt: false
        },
        border: {
            type: Boolean,
            defualt: false
        },
        borderColor: {
            type: String,
            defualt: 'gray'
        },
        contentPadding: {
            type: [Number, String],
            default: 4
        },
        fixedClasses: {
            type: Object,
            default() {
                return {
                    root: 'w-full',
                    header: 'flex justify-between items-center flex-wrap sm:flex-nowrap p-4',
                    headerTitle: 'leading-none font-medium text-lg',
                    headerSubtitle: 'mt-1 text-sm',
                    actions: 'flex justify-between items-center flex-nowrap space-x-2',
                    body: 'w-full p-4',
                    footer: 'w-full p-4'
                }
            }
        },
        classes: {
            type: Object,
            default() {
                return {
                    root: 'shadow bg-white',
                    header: 'border-b border-gray-200',
                    headerTitle: 'text-indigo-800',
                    headerSubtitle: 'text-gray-500',
                    actions: '',
                    body: '',
                    footer: 'border-t border-gray-200'
                }
            }
        }
    },
    computed: {
        contentClasses() {
            let c = ['w-full'];
            if (this.contentPadding) c = c.concat([`p-${this.contentPadding}`]);
            return c;
        },
        cardClasses() {
            let c = ['bg-white w-full'];

            if (!this.flat) c = c.concat(['shadow']);
            if (!this.tile) c = c.concat(['rounded']);
            
            if (this.border) {
                c = c.concat(['border']);
                c = c.concat([`border-${this.borderColor}-200`]);
            }

            return c;
        }
    }
});

export default TCard;
</script> 