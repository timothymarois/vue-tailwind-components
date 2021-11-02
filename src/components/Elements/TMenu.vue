<template>
    <div class="relative">
        <div class="cursor-pointer" @click="openClick">
            <slot></slot>
        </div>
        <ul
            :class="dropdownClasses"
            :style="`${minWidth ? `min-width:${minWidth}px;` : ''} ${maxHeight ? `max-height: ${maxHeight}px;` : ''}`"
            v-show="menu && !loading && !disabled"
            @click.stop
            :id="'dropdown-'+this.id"
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
import uniqid from "../../utils/uniqid.js";
import viewportHelper from "../../utils/viewport.js";

export default { 
    name: 'TMenu',
    components: {
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
        side: {
            type: String,
            default: 'left'
        },
        minWidth: {
            type: [String, Number],
            default: null
        },
        maxHeight: {
            type: [String, Number],
            default: 300
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
            this.$emit("menu",value)
            if(value) {
                this.$nextTick(() => {
                    const viewport = viewportHelper('#dropdown-'+this.id);
                    if(viewport.includes('left')) this.dropdownSide = 'left';
                    if(viewport.includes('right')) this.dropdownSide = 'right';
                    if(viewport.includes('bottom')) this.dropdownDirection = 'top';
                })
            }    
        }
    },
    computed: {
        id() {
            return uniqid();
        },
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
            } 
            else {
                c = c.concat(['top-12']);
            }

            if (this.dropdownSide === 'left') {
                c = c.concat(['left-0']);
            } 
            else {
                c = c.concat(['right-0']);
            }

            if (this.maxHeight) {
                c = c.concat(['overflow-y-auto'])
            }

            return c;
        }
    },
    methods: {
        getItemByValue(value) {
            let vm = this;
            return vm.items.find(a => { return a.value === value; });
        },
        openClick() {
            this.menu = !this.menu;
        },
        selectItem(item) {
            this.$emit('change',item.value)
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