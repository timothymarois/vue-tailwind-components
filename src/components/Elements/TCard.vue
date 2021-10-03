<template>
    <div :class="cardClasses">
        <div v-if="title" class="px-4 py-5 border-b border-gray-200">
            <div class="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
                <div class="ml-4 mt-4">
                    <h3 class="text-lg leading-6 font-medium text-indigo-800">{{ title }}</h3>
                    <p class="mt-1 text-sm text-gray-500">{{ subtitle }}</p>
                </div>
                <div v-if="$slots.actions" class="ml-4 mt-4 flex justify-between items-center flex-nowrap space-x-2">
                    <slot name="actions"></slot>
                </div>
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
        contentPadding: {
            type: [Number, String],
            default: 4
        }
    },
    computed: {
        contentClasses() {
            let c = '';
            if (this.contentPadding) {
                c = 'p-'+this.contentPadding;
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

            return c;
        }
    }
};
</script> 