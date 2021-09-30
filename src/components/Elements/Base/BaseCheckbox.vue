<template>
    <input 
        :id="id" 
        :value="value"
        @input="update($event)"
        type="checkbox" 
    />
</template>

<script>
export default { 
    name: 'BaseCheckbox',
    props: {
        id: {
            type: String,
            default: null
        },
        value: {
            type: [Boolean, String],
            default: null
        }
    },
    methods: {
        update(e) {
            this.$emit('update:value', e.target.value);
        }
    }
};
</script> 