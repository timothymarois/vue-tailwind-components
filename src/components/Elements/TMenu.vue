<template>
    <div class="relative">
        <div v-if="openerSlotEmpty" :id="`slot-container-${id}`">
            <t-button 
                @click="menuToggle" 
                :iconRight="menuIcon"
                :loading="loading"
                :disabled="disabled"
                :label="label"
                :shadow="buttonShadow"
                :rounded="rounded"
                :text="text"
                :outlined="outlined"
                :block="block"
                :size="size"
                :color="color"
                :icon="icon"
                :iconSize="iconSize"
                :iconSolid="iconSolid"
            >
                <slot></slot>
            </t-button>
        </div>
        <div :id="`slot-container-${id}`" v-else>
            <slot name="opener"></slot>
        </div>
        <div v-if="items">
            <transition name="fade">
                <ul
                    v-if="menu && !loading && !disabled"
                    :class="dropdownClasses"
                    :style="`${minWidth ? `min-width:${minWidth}px;` : ''} ${maxHeight ? `max-height: ${maxHeight}px;` : ''} ${dropdownOffset}`"
                    @click.stop
                    :id="`dropdown-${id}`"
                >
                    <li 
                        v-for="(item,index) in items"
                        :key="index"
                        :class="((item.divider) ? '' : classes.item+' '+fixedClasses.item)+' '+((!item.disabled) ? `cursor-pointer text-${item.color||'gray'}-500 hover:bg-${item.hover||'indigo'}-100 hover:text-${item.hover||'indigo'}-900` : `cursor-not-allowed text-gray-300 hover:bg-white hover:text-gray-300`)"
                        :disabled="item.disabled"
                        @click="!item.disabled && selectItem(item)"
                        @click.middle="!item.disabled && selectItem(item, '_blank')"
                    >
                        <span v-if="item.divider">
                            <hr class="border-gray-200" />
                        </span>
                        <span v-else>
                            <t-icon v-if="item.icon && !item.divider" :value="item.icon" size="5" class="mr-2" />
                            <span class="font-medium">{{ item[labelName] }}</span>
                        </span>
                    </li>
                </ul>
            </transition>
        </div>
        <div v-else>
            <transition name="fade">
                <div
                    v-if="menu && !loading && !disabled"
                    :class="dropdownClasses"
                    :style="`${dropdownOffset}`"
                    :id="`dropdown-${id}`"
                >
                    <slot name="content"></slot>
                </div>
            </transition>
        </div>
        
    </div>
</template>

<script>
import TIcon from "./TIcon.vue";
import TButton from "./TButton.vue";
import uniqid from "../../utils/uniqid.js";
import viewportHelper from "../../utils/viewport.js";

export default { 
    name: 'TMenu',
    components: {
        TIcon,
        TButton
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
            default: true
        },
        buttonShadow: {
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
        iconSolid: {
            type: Boolean,
            default: false
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
        },
        label: {
            type: String,
            default: null
        },
        labelName: {
            type: String,
            default: "label"
        },
        value: {
            type: Boolean,
            default: false
        },
        valueName: {
            type: String,
            default: "value"
        },
        fixedClasses: {
            type: Object,
            default() {
                return {
                    item: 'flex items-center transition duration-150',
                }
            }
        },
        classes: {
            type: Object,
            default() {
                return {
                    item: 'p-2 m-2 rounded',
                }
            }
        }

    },
     data() {
        return {
            menu: this.value,
            viewport: [],
        }
    },
    watch: {
        value(v) {
            this.menu = v;
        },
        menu(v) {
            if (v === true) this.$emit("input", true);
            else this.$emit("input", false);
            if (v === true) this.$nextTick(() => this.viewport = viewportHelper(`#dropdown-${this.id}`));
            else this.viewport = [];
        }
    },
    computed: {
        dropdownSide() {
            if(this.viewport.includes('left')) return 'left';
            if(this.viewport.includes('right')) return 'right';
            return this.side;
        },
        dropdownDirection() {
            if(this.viewport.includes('bottom')) return 'top';
            if(this.viewport.includes('top')) return 'bottom';
            return this.direction;
        },
        id() {
            return uniqid();
        },
        iconOnly() {
            if ((typeof this.icon === 'string' && !this.$slots.default) || this.icon === true) return true;
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
                'focus:outline-none',
            ];

            if (!this.$slots.content) c = c.concat(['bg-white','rounded','text-sm','w-52','border border-gray-200']);
            if(this.shadow) c = c.concat(['shadow-lg']);
            if (this.dropdownSide === 'left') c = c.concat(['left-0']);
            else c = c.concat(['right-0']);

            if (this.maxHeight) c = c.concat(['overflow-y-auto'])

            return c;
        },
        dropdownOffset() {
            if (this.menu) {
                const el = document.getElementById(`slot-container-${this.id}`);
                if (!el) return;
                
                if(this.dropdownDirection === 'top') return `bottom: ${el.clientHeight + 5}px`;
                else return `top: ${el.clientHeight + 5}px`;
            }
        },
        openerSlotEmpty() {
            if(!this.$slots.opener) return true;
            return false;
        }
    },
    methods: {
        getItemByValue(value) {
            return this.items.find(a => { return a.value === value; });
        },
        menuToggle() {
            this.menu = !this.menu;
        },
        selectItem(item, target) {
            this.$emit('change', item[this.valueName], target);
            if (this.closeOnClick && !target) this.menu = false;
        },
        close(e) {
            if (!this.$el.contains(e.target)) this.menu = false;
        },
        
    },
    mounted() {        
        document.addEventListener('click', this.close);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.close);
    }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
	transition: all .2s cubic-bezier(.25,.8,.25,1);
	z-index: 50;
}
.fade-enter, .fade-leave-to {
	z-index: 50;
	opacity: 0;
    transform: translateY(-5%);
}
</style>