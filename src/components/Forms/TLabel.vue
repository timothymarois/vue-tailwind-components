<template>
    <label 
        :for="id"
        :class="`cursor-pointer block text-sm font-medium ${color} transition-colors duration-150`"
    >
        <slot>
            <t-icon v-if="icon" :value="icon" class="mr-1" />
            <span v-if="label" class="inline-block">{{ label }}</span>
        </slot>
        <span class="inline-block text-red-600" v-if="required">*</span>
    </label>
</template>

<script>
import TIcon from "../Elements/TIcon.vue";
export default { 
    name: 'TLabel',
    components: {
        TIcon
    }, 
    props: {
        required: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: null
        },
        id: {
            type: String,
            default: null
        },
        color: {
            type: String,
            default: 'text-gray-800'
        },
        icon: {
            type: String,
            default: null
        }
    }
};
</script> 