<template>
    <span 
        :class="contentClasses" 
        style="border-width: 1px;"
    >
        <slot>Badge</slot>
        <div
            v-if="removeable"
            @click="close"
            class="rounded-full hover:bg-red-500 cursor-pointer ml-1 mr-0.5 hover:h-4 hover:text-white" 
        >
            <TIcon 
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
            default: 'indigo'
        },
        removeable : {
            type: Boolean,
            default: false
        },
        outlined: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        contentClasses() {
            let c = ['inline-flex rounded-full items-center py-0.5 text-sm font-medium'];

            if (this.removeable) {
                c = c.concat(['pl-2','pr-0.5']);
            }
            else {
                c = c.concat(['px-2']);
            }

            if (this.outlined) {
                c = c.concat(['border-'+this.color+'-800','bg-'+this.color+'-100','text-'+this.color+'-800']);
            }
            else {
                c = c.concat(['border-'+this.color+'-100','bg-'+this.color+'-100','text-'+this.color+'-800']);
            }

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