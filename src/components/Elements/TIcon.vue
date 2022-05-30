<template>
    <div :class="getCssClass()">
        <base-icon-solid v-if="solid" :value="value" />
        <base-icon-outline v-else :value="value" />
    </div>
</template>

<script>
import BaseIconOutline from "./Base/BaseIconOutline.vue";
import BaseIconSolid from "./Base/BaseIconSolid.vue";
import Component from '../Base/Component';
const TIcon = Component.extend({
    name: 'TIcon',
    components: {
        BaseIconOutline,
        BaseIconSolid
    },
    props: {
        value: {
            type: String,
            default: 'check'
        },
        solid: {
			type: Boolean,
			default: null
		},
        fixedClasses: {
            type: String,
            default() {
                return 'relative inline-flex align-middle justify-center items-center p-0'
            }
        },
        classes: {
            type: String,
            default() {
                return 'h-5 w-5';
            }
        }
    }
});

export default TIcon;
</script> 