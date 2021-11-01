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
            :style="`${minWidth ? `min-width:${minWidth}px;` : ''} ${maxHeight ? `max-height: ${maxHeight}px` : ''}`"
            v-show="menu && !loading && !disabled"
            @click.stop
            id="dropdownMenu"
        >
            <li 
                v-for="(item,index) in items"
                :key="index"
                class="p-2 flex items-center rounded m-2 transition duration-150"
                :class="(!item.disabled) ? `cursor-pointer text-${item.color||'gray'}-500 hover:bg-${item.hover||'indigo'}-100 hover:text-${item.hover||'indigo'}-900` : `cursor-not-allowed text-gray-300 hover:bg-white hover:text-gray-300`"
                :disabled="item.disabled"
                @click="!item.disabled && selectItem(item)"
            >
                <t-icon v-if="item.icon" :value="item.icon" size="5" class="mr-2" />
                <span class="font-medium">{{ item.label }}</span>
            </li>
        </ul>
        
    </div>
</template>

<script>
import TIcon from "./TIcon.vue";
import TButton from "./TButton.vue";
import viewportHelper from "../../utils/viewport.js";

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
        minWidth: {
            type: [String, Number],
            default: null
        },
        maxHeight: {
            type: [String, Number],
            default: null
        }
    },
     data() {
        return {
            menu: false,
            dropdownSide: this.side,
            dropdownDirection: this.direction
        }
    },
    watch: {
        menu: function(value) {
            if(value) {
                this.$nextTick(() => {
                    const viewport = viewportHelper('#dropdownMenu');
                    if(viewport.includes('left')) { this.dropdownSide = 'left'; }
                    if(viewport.includes('right')) { this.dropdownSide = 'right'; }
                    if(viewport.includes('bottom')) { this.dropdownDirection = 'top'; }
                })
            }    
        }
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
                'shadow-lg',
                'bg-white',
                'text-sm',
                'focus:outline-none',
                'w-52',
                'border border-gray-200'
            ];

            if (this.dropdownDirection === 'top') {
                c = c.concat(['bottom-12']);
            } else {
                c = c.concat(['top-12']);
            }

            if (this.dropdownSide === 'left') {
                c = c.concat(['left-0']);
            } else {
                c = c.concat(['right-0']);
            }

            if (this.maxHeight) {
                c = c.concat(['overflow-auto'])
            }

            return c;
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
        document.addEventListener('click', this.close)
    },
    beforeDestroy() {
        document.removeEventListener('click',this.close)
    }
};
</script> 