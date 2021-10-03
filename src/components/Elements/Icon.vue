<template>
    <BaseIcon 
        :icon="icon"
        :size="size"
    />
</template>

<script>
import { BaseIcon } from "./Base/BaseIcon";
export default { 
    name: 'Icon',
    components: {
        BaseIcon
    },
    props: {
        icon: {
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