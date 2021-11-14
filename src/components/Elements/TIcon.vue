<template>
    <div :class="`relative inline-flex align-middle justify-center items-center p-0 h-${size} w-${size}`">
        <base-icon :value="value" />
    </div>
</template>

<script>
import BaseIcon from "./Base/BaseIcon.vue";
export default { 
    name: 'TIcon',
    components: {
        BaseIcon
    },
    props: {
        value: {
            type: String,
            default: 'check'
        },
        size: {
            type: [String, Number],
            default: 5
        }
    }
};
</script> 