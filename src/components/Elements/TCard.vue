<template>
    <div :class="cardClasses">
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
        <div :class="contentClasses">
            <slot></slot>
        </div>
        <div v-if="$slots.footer" :class="contentClasses" class="border-t border-gray-200">
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
        }
    },
    computed: {
        contentClasses() {
            let c = ['w-full'];
            if (this.contentPadding) {
                c = c.concat([`p-${this.contentPadding}`]);
            }
            return c;
        },
        cardClasses() {
            let c = ['bg-white w-full'];

            if (!this.flat) {
                c = c.concat(['shadow']);
            }

            if (!this.tile) {
                c = c.concat(['rounded']);
            }

            if (this.border) {
                c = c.concat(['border']);
                c = c.concat([`border-${this.borderColor}-200`]);
            }

            return c;
        }
    }
};
</script> 