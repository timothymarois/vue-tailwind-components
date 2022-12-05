<template>
    <div :class="computedCardClasses">
        <div v-if="title || $slots.title">
            <div class="flex justify-between items-center flex-wrap sm:flex-nowrap border-b border-gray-200 p-4" v-if="!$slots.title">
                <div>
                    <h3 class="text-lg leading-none font-medium text-indigo-800">{{ title }}</h3>
                    <p v-if="subtitle" class="mt-1 text-sm text-gray-500">{{ subtitle }}</p>
                </div>
                <div v-if="$slots.actions" class="flex justify-between items-center flex-nowrap space-x-2">
                    <slot name="actions"></slot>
                </div>
            </div>
            <div v-else>
                <slot name="title"></slot>
            </div>
        </div>
        <div :class="computedContentClasses">
            <slot></slot>
        </div>
        <div v-if="$slots.footer" :class="computedContentClasses" class="border-t border-gray-200">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
export default { 
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
            default: false
        },
        tile: {
            type: Boolean,
            default: false
        },
        border: {
            type: Boolean,
            default: false
        },
        borderColor: {
            type: String,
            default: 'gray'
        },
        contentPadding: {
            type: [Number, String],
            default: 4
        },
        contentClasses: {
            type: Array,
            default: ['w-full']
        },
        cardClasses: {
            type: String,
            default: ['bg-white w-full']
        }
    },
    computed: {
        computedContentClasses() {
            let c = [...this.contentClasses];
            if (this.contentPadding) c = c.concat([`p-${this.contentPadding}`]);
            return c;
        },
        computedCardClasses() {
            let c = [...this.cardClasses];

            if (!this.flat) c = c.concat(['shadow']);
            if (!this.tile) c = c.concat(['rounded']);
            
            if (this.border) {
                c = c.concat(['border']);
                c = c.concat([`border-${this.borderColor}-200`]);
            }

            return c;
        }
    }
};
</script> 