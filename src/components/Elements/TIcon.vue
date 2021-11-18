<template>
    <div :class="`relative inline-flex align-middle justify-center items-center p-0 h-${size} w-${size}`">
        <base-icon-solid v-if="solid" :value="value" />
        <base-icon-outline v-else :value="value" />
    </div>
</template>

<script>
import BaseIconOutline from "./Base/BaseIconOutline.vue";
import BaseIconSolid from "./Base/BaseIconSolid.vue";
export default { 
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
        size: {
            type: [String, Number],
            default: 5
        },
        solid: {
			type: Boolean,
			default: null
		}
    }
};
</script> 