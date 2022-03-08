<template>
    <input 
        :id="id"
        :type="type" 
        :name="name" 
        :placeholder="placeholder" 
        :readonly="readonly"
        :maxlength="maxlength"
        :value="value"
        @input="update($event)"
    />
</template>

<script>
export default { 
    name: 'BaseInput',
    props: {
        id: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: null
        },
        name: {
            type: String,
            default: null
        },
        type: {
            type: String,
            default: 'text'
        },
        readonly: {
            type: Boolean,
            default: false
        },
        maxlength: {
            type: Number,
            default: 255
        },
        value: {
            type: String,
            default: null
        },
    },
    methods: {
        update(e) {
            this.$emit('update:value', e.target.value);
        }
    }
};
</script> 