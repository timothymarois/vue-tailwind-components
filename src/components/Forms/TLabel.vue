<template>
    <label 
        :for="id" 
        :class="`cursor-pointer block text-sm font-medium ${color} ml-1 transition-colors duration-300`"
    ><slot>{{ label }}</slot><span class="text-red-600" v-if="required">*</span></label>
</template>

<script>
export default { 
    name: 'BaseLabel',
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
            default: 'text-gray-700'
        }
    }
};
</script> 