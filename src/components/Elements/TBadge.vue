<template>
    <span :class="contentClasses">
        <slot>Badge</slot>
        <TButton 
            v-if="removeable" 
            class="ml-0.5"
            text
            rounded 
            icon="close" 
            size="xs" 
            iconSize="4"
            padding="0" 
            :color="color"
        />
    </span>
</template>

<script>
import TButton from "./TButton";
export default { 
    name: 'TBadge',
    components: {
        TButton
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
            let c = ['inline-flex rounded-full items-center py-0.5 text-sm font-medium border-2'];

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
    }
};
</script> 