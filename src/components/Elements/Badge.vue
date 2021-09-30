<template>
    <span :class="contentClasses">
        <slot>Badge</slot>
        <Btn 
            v-if="removeable" 
            class="ml-1" 
            text
            rounded 
            icon="close" 
            size="xs" 
            iconSize="3" 
            padding="0" 
            :color="color"
        />
    </span>
</template>

<script>
import { Btn } from "@/components/Elements";
export default { 
    name: 'Badge',
    components: {
        Btn
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
            let c = ['inline-flex rounded items-center py-0.5 text-sm font-medium border border-transparent'];

            if (this.removeable) {
                c = c.concat(['pl-2.5','pr-1']);
            }
            else {
                c = c.concat(['px-2.5']);
            }

            if (this.outlined) {
                c = c.concat(['border-'+this.color+'-800','text-'+this.color+'-800']);
            }
            else {
                c = c.concat(['bg-'+this.color+'-100','text-'+this.color+'-700']);
            }

            return c;
        }
    }
};
</script> 