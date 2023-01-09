<template>
    <div class="w-full">
        <div class="flex text-gray-500 flex-nowrap overflow-x-auto pb-4 scrollbar-thin scrollbar-h-1 scrollbar-thumb-gray-300 scrollbar-track-white mb-2"
            :class="{
                'justify-between': grow,
                'gap-4': !dense,
                'gap-2': dense,
                'sticky top-0 bg-white pb-2 z-10': sticky
            }"
        >
            <span v-for="item of items" class="inline-block relative" :class="{'flex-grow': grow, 'flex-1': even}" :key="item.id">
                <button
                    class="flex items-center justify-center rounded bg-gray-100 focus:outline-none font-semibold w-full"
                    :class="{
                        'bg-indigo-800 text-white ': value == item.id,
                        'px-4 py-2 text-sm': !dense,
                        'px-2 py-1 text-xs': dense,
                        'pr-[24px]': item.disabled,
                        'hover:bg-indigo-900 hover:text-white': (value == item.id) && !item.disabled,
                        'hover:bg-indigo-100 hover:text-indigo-900': (value != item.id) && !item.disabled,
                        'cursor-not-allowed text-gray-300 bg-gray-100 hover:bg-gray-100 hover:text-gray-300': item.disabled
                    }"
                    @click="update(item)"
                    :id="item.id"
                    :disabled="item.disabled" 
                >
                    <span>{{ item.name }}</span>
                </button>
                <t-tooltip v-if="item.comingSoon" content="Coming Soon" position="top" class="absolute -top-[2px] right-[5px]  cursor-pointer text-indigo-800">
					<t-icon value="question-mark-circle" solid size="4" />
				</t-tooltip>
            </span>
        </div>
        <div v-for="(slot, index) in $slots" :key="index">
            <div v-show="value == index">
                <slot :name="index" />
            </div>
        </div>
    </div>
</template>

<script>
import TIcon from "./TIcon.vue"; 
import TTooltip from "./TTooltip.vue"; 
export default { 
    name: 'TTabs',
    components: {
        TIcon,
        TTooltip
    },
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