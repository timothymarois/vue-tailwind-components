<template>
    <div class="w-full">
        <div class="flex flex-wrap text-gray-500"
            :class="{
                'justify-between': grow,
                'gap-4 mb-4': !dense,
                'gap-2 mb-2': dense,
                'sticky top-0 bg-white pb-2 z-10': sticky
            }"
        >
            <button
                class="relative flex items-center justify-center rounded bg-gray-100 focus:outline-none font-semibold"
                :class="{
                    'bg-indigo-800 text-white ': value == item.id,
                    'px-4 py-2 text-sm': !dense,
                    'px-2 py-1 text-xs': dense,
                    'flex-grow': grow,
                    'flex-1': even,
                    'hover:bg-indigo-900 hover:text-white': (value == item.id) && !item.disabled,
                    'hover:bg-indigo-100 hover:text-indigo-900': (value != item.id) && !item.disabled,
                    'cursor-not-allowed text-gray-300 bg-gray-100 hover:bg-gray-100 hover:text-gray-300': item.disabled
                }"
                @click="update(item)"
                v-for="item of items"
                :key="item.id"
                :id="item.id"
                :disabled="item.disabled" 
            >
                <span>{{ item.name }}</span>
            </button>
        </div>
        <div v-for="(slot, index) in $slots" :key="index">
            <div v-show="value == index">
                <slot :name="index" />
            </div>
        </div>
    </div>
</template>

<script>
export default { 
    name: 'TTabs',
    props: {
        value: {
            type: [String, Number],
            default: null
        },
        items: {
            type: Array,
            default: () => []
        },
        dense: {
            type: Boolean,
            default: false
        },
        grow: {
            type: Boolean,
            default: false
        },
        even: {
          type: Boolean,
          default: false
        },
        sticky: {
            type: Boolean,
            default: false
        }
    },
    methods:{
        update(item) {
            if (item.disabled) return;
            this.$emit('input', item.id);
            this.$emit('change', item.id);
        }
    }
};
</script> 