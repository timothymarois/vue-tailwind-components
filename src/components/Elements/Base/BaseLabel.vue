<template>
    <label 
        :for="id" 
        class="block text-sm font-medium text-gray-700 ml-1"
    >{{ label }}<span class="text-red-600" v-if="required">*</span></label>
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