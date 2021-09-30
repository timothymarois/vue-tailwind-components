<template>
    <div class="flex items-center text-indigo-800 text-sm capitalize">
        <div class="flex items-center">
            <input 
                :id="id" 
                :value="value"
                @input="update($event)"
                type="checkbox" 
                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" 
            />
        </div>
        <div class="ml-3 text-sm">
            <label :for="id" class="cursor-pointer font-medium text-gray-700">{{ label }}</label>
        </div>
    </div>
</template>

<script>
export default { 
    name: 'Checkbox',
    props: {
        value: {
            type: [Boolean, String],
            default: null
        },
        label: {
            type: String,
            default: null
        }
    },
    computed: {
        id() {
            return this.$helpers.generateRandomString(8).toLowerCase()
        },
    },
    methods: {
        update(e) {
            this.$emit('update:value', !this.value);
        }
    }
};
</script> 