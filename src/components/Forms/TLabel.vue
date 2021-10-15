<template>
    <label 
        :for="id" 
        class="cursor-pointer block text-sm font-medium text-gray-800"
    ><slot>{{ label }}</slot><span class="text-red-500" v-if="required"> *</span></label>
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
        }
    }
};
</script> 