<template>
    <div :class="`relative inline-flex align-middle justify-center items-center p-0 h-${size} w-${size}`">
        <base-icon-solid v-if="solid && !mdi" :value="value" />
        <BaseIconSolidMDI v-else-if="mdi && solid" :value="value" />
        <BaseIconOutlineMDI v-else-if="!solid && mdi" :value="value" />
        <base-icon-outline v-else :value="value" />
    </div>
</template>

<script>
import BaseIconOutline from "./Base/BaseIconOutline.vue";
import BaseIconSolid from "./Base/BaseIconSolid.vue";
import BaseIconSolidMDI from "./Base/BaseIconSolidMDI.vue";
import BaseIconOutlineMDI from "./Base/BaseIconOutlineMDI.vue";
export default { 
    name: 'TIcon',
    components: {
        BaseIconOutline,
        BaseIconSolid,
        BaseIconSolidMDI,
        BaseIconOutlineMDI
    },
    props: {
        value: {
            type: String,
            default: 'check'
        },
        size: {
            type: [String, Number],
            default: 5
        },
        solid: {
			type: Boolean,
			default: null
		},
        mdi: {
			type: Boolean,
			default: false
		}
    }
};
</script> 