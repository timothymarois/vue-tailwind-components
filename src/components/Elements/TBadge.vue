<template>
    <span :class="contentClasses">
        <div v-if="icon">
            <t-icon
                class="mr-1"
                :value="icon"
                :size="iconSize"
            />
        </div>
        <slot>Badge</slot>
        <div
            v-if="removeable"
            @click="close"
            class="rounded-full hover:bg-red-500 cursor-pointer ml-1 mr-0.5 hover:h-5 hover:text-white" 
        >
            <t-icon 
                class="px-2.5 mt-1 align-text-top"
                value="close" 
                size="3" 
            />
        </div>
    </span>
</template>

<script>
import TIcon from "./TIcon.vue";
export default { 
    name: 'TBadge',
    components: {
        TIcon
    },
    props: {
        color: {
            type: String,
            required: false,
            default: 'indigo'
        },
        removeable: {
            type: Boolean,
            required: false,
            default: false
        },
        outlined: {
            type: Boolean,
            required: false,
            default: false
        },
        rounded: {
            type: Boolean,
            required: false,
            default: false
        },
        icon: {
            type: String,
            required: false
        },
        iconSize: {
            type: [String, Number],
            required: false,
            default: 5
        }
    },
    computed: {
        contentClasses() {
            let c = ['border inline-flex items-center py-0.5 text-sm font-medium'];

            if (this.removeable) c = c.concat(['pl-2','pr-0.5']);
            else c = c.concat(['px-2']);

            if (this.outlined) c = c.concat([`border-${this.color}-800 bg-${this.color}-100 text-${this.color}-800`]);
            else c = c.concat([`border-${this.color}-100 bg-${this.color}-100 text-${this.color}-800`]);

            if (this.rounded) c = c.concat(['rounded-full']);
            else c = c.concat(['rounded']);

            return c;
        }
    },
    methods: {
        close() {
            this.$emit('remove');
        }
    }
};
</script> 