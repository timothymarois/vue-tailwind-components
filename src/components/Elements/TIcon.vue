<template>
    <BaseIcon 
        :value="icon"
        :size="size"
    />
</template>

<script>
import BaseIcon from "./Base/BaseIcon";
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