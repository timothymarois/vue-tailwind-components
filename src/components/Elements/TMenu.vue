<template>
    <div class="relative">
        <t-button 
            @click="btnClick" 
            :iconRight="menuIcon"
            :loading="loading"
            :disabled="disabled"
            :label="label"
            :shadow="shadow"
            :rounded="rounded"
            :text="text"
            :outlined="outlined"
            :block="block"
            :size="size"
            :color="color"
            :icon="icon"
            :iconSize="iconSize"
        ><slot></slot></t-button>

        <ul
            :class="dropdownClasses"
            v-show="menu && !loading && !disabled"
            @click.stop
        >
            <li 
                v-for="(item,index) in items"
                :key="index"
                class="p-2 flex items-center rounded m-2 transition duration-150"
                :class="(!item.disabled) ? `cursor-pointer text-${item.color||'gray'}-500 hover:bg-${item.hover||'indigo'}-50 hover:text-${item.hover||'indigo'}-900` : `cursor-not-allowed text-gray-300 hover:bg-white hover:text-gray-300`"
                :disabled="item.disabled"
                @click="!item.disabled && selectItem(item)"
            >
                <t-icon v-if="item.icon" :value="item.icon" size="6" class="mr-2" />
                <span class="font-medium">{{ item.label }}</span>
            </li>
        </ul>
        
    </div>
</template>

<script>
import TIcon from "./TIcon";
import TButton from "./TButton";
export default { 
    name: 'TMenu',
    components: {
        TButton,
        TIcon
    },
    props: {
        items: {
            type: [Array, Object],
            default: null
        },
        value: {
            type: [String, Number],
            default: null
        },
        displayValue: {
            type: Boolean,
            default: false
        },
        closeOnClick: {
            type: Boolean,
            default: true
        },
        rounded: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        shadow: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        },
        text: {
            type: Boolean,
            default: false
        },
        outlined: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: null
        },
        iconSize: {
            type: [Number, String],
            default: null
        },
        color: {
            type: String,
            default: 'indigo'
        },
        icon: {
            type: [Boolean, String],
            default: null
        },
        direction: {
            type: String,
            default: 'bottom'
        },
        label: {
            type: String,
            default: null
        },
        side: {
            type: String,
            default: 'right'
        },
    },
    computed: {
        iconOnly() {
            if ((typeof this.icon==='string' && !this.$slots.default) || this.icon===true) {
                return true;
            }
            return false;
        },
        menuIcon() {
            if (!this.iconOnly) {
                if (this.menu) return 'chevron-up'
                return 'chevron-down'
            }
            return null;
        },
        dropdownClasses() {
            let c = [
                'z-10',
                'absolute',
                'rounded',
                'shadow',
                'bg-white',
                'text-sm',
                'ring-1',
                'ring-black',
                'ring-opacity-5',
                'focus:outline-none',
                'w-52',
                'border border-gray-200'
            ];

            if (this.direction=='top') {
                c = c.concat(['bottom-12']);
            }
            else {
                c = c.concat(['top-12']);
            }

            if (this.side=='left') {
                c = c.concat(['left-0']);
            }
            else {
                c = c.concat(['right-0']);
            }

            return c;
        }
    },
    data: () => {
        return {
            menu: false
        }
    },
    methods: {
        getItemByValue(value) {
            let vm = this;
            return vm.items.find(a => { return a.value === value; });
        },
        btnClick() {
            this.menu = !this.menu;
        },
        selectItem(item) {
            this.$emit('change',item.value)
            // this.selected = item;
            if (this.closeOnClick) this.menu = false;
        },
        close(e) {
            if (!this.$el.contains(e.target)) {
                this.menu = false
            }
        }
    },
    mounted() {
        // if (this.value) this.selected = this.getItemByValue(this.value);
        document.addEventListener('click', this.close)
    },
    beforeDestroy() {
        document.removeEventListener('click',this.close)
    }
};
</script> 