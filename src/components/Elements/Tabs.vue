<template>
    <div class="relative">
        <div class="flex flex-wrap -mx-2 -mt-2 mb-2 text-gray-500">
            <button
                class="relative flex items-center justify-center py-2 rounded bg-gray-100 focus:outline-none text-sm font-semibold"
                :class="{
                    'bg-indigo-800 text-white hover:bg-indigo-900 hover:text-white': value == item.id,
                    'hover:bg-indigo-100 hover:text-indigo-900 ': value != item.id,
                    'm-2 px-4' : !dense,
                    'm-1 px-2' : dense
                }"
                @click="update(item.id)"
                v-for="(item, index) of items"
                :key="item.id"
                :id="item.id"
            >
                <span>{{ item.name }}</span>
            </button>
        </div>
        <div v-for="(slot,index) in $slots" :key="index">
            <div v-show="value==index">
                <slot :name="index" />
            </div>
        </div>
    </div>
</template>

<script>
export default { 
    name: 'Tabs',
    components: {

    },
    props: {
        value: {
            type: [String, Number],
            default: null
        },
        items: {
            type: Array,
            default: []
        },
        dense : {
            type: Boolean,
            default: false
        }
    },
    methods:{
        update(v) {
            this.$emit('update:value',v)
        }
    }
};
</script> 