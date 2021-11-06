<template>
    <div class="relative w-full">

        <t-label 
            v-if="label"
            :id="id"
            :label="label"
            :required="required"
        />

        <div class="relative mt-1 w-full">

            <button
                type="button"
                class="flex justify-between items-center border border-gray-200 rounded text-gray-500 text-sm font-medium w-full h-10 focus:outline-none"
                :class="{'hover:bg-indigo-100 hover:text-indigo-900 hover:border-indigo-900 bg-white': !disabled, 'bg-gray-100 cursor-not-allowed': disabled }"
                @keydown.enter.prevent="cycleIndex > -1 ? selectItem(searchableOptions[cycleIndex]) : ''"
                @keydown.up.prevent="cycleOptions(dropdownDirection === 'top' ? 'down' : 'up')"
                @keydown.down.prevent="cycleOptions(dropdownDirection === 'top' ? 'up' : 'down')"
                @click.self="menuToggle('button')"
            >
                <span 
                    v-if="(!searchable && selected.length === 0) || (searchable && disabled && !selected)" 
                    :placeholder="placeholder" 
                    class="truncate pl-3 font-medium"
                >{{ placeholder }}</span>
                
                <span 
                    v-else-if="!searchable && selected.length !== 0" 
                    :placeholder="placeholder" 
                    class="truncate pl-3 font-medium"
                    :class="{ 'text-gray-500 cursor-not-allowed' : disabled, 'text-indigo-800' : !disabled }"
                >{{ selectPlaceholder }}</span>

                <input
                    ref="dsearchb"
                    v-else
                    v-model="localsearch"
                    @keydown="searchLocal(localsearch)"
                    :disabled="disabled"
                    @click="menuToggle('input')"
                    type="text"
                    autocomplete="off"
                    :placeholder="selectPlaceholder"
                    class="w-full bg-transparent font-medium text-sm placeholder-gray-500 my-auto truncate border-0 focus:outline-none"
                    :class="{
                        'text-gray-500 cursor-not-allowed' : disabled, 
                        'text-indigo-800' : !disabled,
                        'placeholder-indigo-800' : selected.length > 0 
                    }"
                />

                <div 
                    v-if="clearable && (localsearch || selected.length)"
                    :class="`cursor-pointer absolute inset-y-0 ${searchable ? 'right-8' : 'right-6'} p-2 flex items-center`"
                    @click="clearField"
                >
                    <t-icon value="close" size="5" />
                </div>

                <div 
                    v-if="!hideicon && !loading"
                    @click="menuToggle('arrow')"
                    class="p-2 h-full"
                >
                    <t-icon 
                        v-if="!hideicon && !loading" 
                        :value="menuIcon" 
                        size="5" 
                    />
                </div>

                <t-loader
                   v-else-if="loading"
                    size="5"
                    class="mr-2"
                />

            </button>

            <ul
                :class="dropdownClasses"
                v-show="menu"
                :id="'dropdown-'+this.id"
            >
                <li 
                    v-if="loading" 
                    class="flex items-center rounded m-4 font-medium"
                >
                    Searching...
                </li>
                <li 
                    v-else-if="!loading && searchableOptions.length === 0" 
                    class="flex items-center justify-between rounded m-4 font-medium"
                >
                    {{ nodata }}
                </li>
                <div 
                    v-else-if="!loading && computedOptions.length > 0"
                >
                    <li
                        v-for="(item, i) of (dropdownDirection === 'top' ? searchableOptions.slice().reverse() : searchableOptions)"
                        :key="i"
                        class="relative cursor-pointer flex items-center rounded m-2 hover:bg-indigo-100 hover:text-indigo-900 transition duration-150"
                        :class="[{ 'text-white bg-indigo-800' : (!multiple && selected[itemValue] === item[itemValue]) }, { 'focused' : searchableOptions[cycleIndex] === item}]"
                        :id="searchableOptions[cycleIndex] === item ? `focus-${id}` : ''"
                        @click="selectItem(item)"
                    >  
                        <t-checkbox 
                            v-if="multiple"
                            :color="color"
                            :value="isChecked(item)"
                            :check="true"
                            size="4"
                            class="ml-2"
                        />
                        <span 
                            class="font-medium m-2" 
                            v-html="item[itemLabel]"
                        />    
                    </li>
                </div>
                <div 
                    v-if="create && (localsearch || !searchable)"
                    :class="`text-${color}-600 font-medium pt-2 pb-2 px-4 border-gray-102 cursor-pointer hover:underline hover:text-${color}-500`"
                    style="border-top-width: 1px;"
                    @click="createNew"
                >
                    {{ createText }}
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
import TButton from "../Elements/TButton.vue";
import TIcon from "../Elements/TIcon.vue";
import TLabel from "./TLabel.vue";
import TCheckbox from "./TCheckbox.vue";
import TLoader from "../Elements/TLoader.vue";
import viewportHelper from "../../utils/viewport.js";
import uniqid from "../../utils/uniqid.js";

export default { 
    name: 'TSelect',
    components: {
        TLabel,
        TIcon,
        TButton,
        TCheckbox,
        TLoader
    }, 
    props: {
        required: {
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
        searchable: {
            type: Boolean,
            default: false
        },
        external: {
            type: Boolean,
            default: false
        },
        create: {
            type: Boolean,
            default: false
        },
        createText: {
            type: String,
            required: false,
            default: 'Add new'
        },
        label: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: "Select One"
        },
        value: {
            type: [String, Object, Number, Array]
        },
        options: {
            type: Array,
            default: () => []
        },
        direction: {
            type: String,
            default: 'bottom'
        },
        hideicon : {
            type: Boolean,
            default: false
        },
        nodata: {
            type: String,
            default: 'No Results Found'
        },
        returnObject : {
            type: Boolean,
            default: false
        },
        itemValue: {
            type: String,
            default: 'value'
        },
        itemLabel: {
            type: String,
            default: 'label'
        },
        multiple: {
            type: Boolean,
            required: false,
            default: false
        },
        color: {
            type: String,
            required: false,
            default: 'indigo'
        },
        clearable: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {
            menu: false,
            selected: [],
            localsearch: null,
            isSearching: false,
            viewport: [],
            selectedIndex: -1,
            cycleIndex: -1
        }
    },
    watch: {
        value: {
            handler: function (value) { 
                if (value) {
                    let items = this.getItemsByValue(value, this.multiple);
                    if (items) {
                        this.selected = items;
                    }
                } 
                else {
                    this.selected = [];
                    this.localsearch = null;
                }
            }
        },
        menu: function(value) {
            if (value===true) {
                this.$nextTick(() => {
                    this.viewport = viewportHelper('#dropdown-'+this.id);
                });
            }
            else {
                if(this.multiple || this.searchable) {
                    this.cycleIndex = -1;
                } else {
                    this.cycleIndex = this.selectedIndex || -1;
                }
                this.viewport = [];
            }            
        }
    },
    computed: {
        dropdownDirection() {
            if(this.viewport.includes('bottom')) return 'top';
            if(this.viewport.includes('top')) return 'bottom';
            return this.direction
        },
        id() {
           return uniqid();
        },
        menuIcon() {
            if (this.menu) return 'chevron-up'
            return 'selector'
            // return 'chevron-down'
        },
        dropdownClasses() {
            let c = [
                'absolute w-full max-h-80 overflow-y-auto text-sm rounded shadow-lg text-gray-500 bg-white focus:outline-none z-10 border border-gray-200'
            ];

            if (this.dropdownDirection === 'top') {
                c = c.concat(['bottom-10']);
            } else {
                c = c.concat(['top-10']);
            }

            return c;
        },
        searchableOptions() {
            if (this.localsearch && this.searchable && this.isSearching && !this.external) {
                return JSON.parse(JSON.stringify(this.computedOptions)).filter(option => {
                    let o = option[this.itemLabel].toLowerCase().match(this.localsearch.toLowerCase());
                    if (o) {
                        option[this.itemLabel] = option[this.itemLabel].toString().replace((new RegExp(this.localsearch, "ig")), function(matchedText, a, b){
                            return (`<u>${matchedText}</u>`);
                        });
                        return o;
                    }
                });
            }
            else {
                return this.computedOptions;
            }
        },
        selectPlaceholder() { 
            if(this.multiple && this.selected.length > 0) {
                return `${this.selected[0][this.itemLabel]}${this.selected.length > 1 ? `, (${this.selected.length - 1} others)` : ''}`
            } 
            else if(!this.multiple && this.selected[this.itemValue]) {
                return this.selected[this.itemLabel];
            }
            return this.placeholder;
        },
        returnValue() {
            if(this.multiple) {
                if(this.returnObject) {
                    return this.selected;
                }
                return this.selected.map(obj => obj[this.itemValue]);
            } 
            else {
                if(this.returnObject) {
                    return this.selected;
                }
                return this.selected[this.itemValue];
            }
        },
        computedOptions() {
            if(this.options.length > 0 && !this.options[0][this.itemValue]) {
                return this.options.map(key => {
                    return {
                        label: key,
                        value: key
                    }
                })
            } 
            else {
                return this.options;
            }
        }
    },
    methods: {
        getItemsByValue(values, multiple) {
            let found = [];

            if(multiple) {
                for(const item of values) {
                    this.computedOptions.find(obj => {
                        if(obj[this.itemValue] === item) return found.push(obj);
                    })
                }
            } 
            else {
                this.computedOptions.find(obj => {
                    if(obj[this.itemValue] === (this.returnObject ? values[this.itemValue] : values)) {
                        this.localsearch = obj[this.itemLabel];
                        return found = obj;
                    }
                });
            }
            
            return found;
        },
        selectItem(item) {
            // remove possible underline from search select
            item[this.itemLabel] = item[this.itemLabel].replace(/(<([^>]+)>)/ig, '');

            if(!this.multiple) {
                this.selected = item;
                this.localsearch = (item[this.itemLabel]) ? item[this.itemLabel] : null;
                let i = this.searchableOptions.indexOf(item);
                this.selectedIndex = i;
                this.menu = false;
                this.isSearching = false;
            } 
            else {
                if(!this.selected.some(obj => obj[this.itemValue] === item[this.itemValue])) {
                    this.selected.push(item);
                } else {
                    let i = this.selected.indexOf(item);
                    this.selected.splice(i, 1);
                }
            }

            this.$emit('input', this.returnValue);
        },
        menuToggle(source) {
            // if our options are external
            // and there are no options and we have not searched yet
            // then we dont want to show it until the user actually does a search
            if (this.external && this.searchable && !this.localsearch && !this.computedOptions.length) {
                return this.menu = false;
            }

            if (!this.disabled) {
                if (this.searchable && source !== 'arrow') {
                    this.menu = true;
                } else {
                    this.menu = !this.menu;
                }
            }
        },
        menuOn() {
            if (!this.disabled) {
                this.menu = true;
            }
        },
        searchLocal(value) {
            this.menu = true;
            this.isSearching = true;
            this.$emit('search', value);
        },
        cycleOptions(key) {
            if(this.searchableOptions.length > 0) {
                if(key === 'up' && this.cycleIndex > 0) {
                    this.cycleIndex -= 1;
                     this.$nextTick(() => {
                        const el = document.getElementById(`focus-${this.id}`);
                        el.scrollIntoView({block: "nearest", inline: "nearest"});
                    });
                } else if(key === 'down' && this.cycleIndex + 1 !== this.searchableOptions.length) {
                    this.cycleIndex += 1;
                     this.$nextTick(() => {
                        const el = document.getElementById(`focus-${this.id}`);
                        el.scrollIntoView({block: "nearest", inline: "nearest"});
                    });
                }
            }
        },
        close(e) {
            if (!this.$el.contains(e.target)) {
                this.menu = false;
                if (this.searchable && !this.selected) {
                    this.localsearch = null;
                }
            }
        },
        refocus() {
            this.$refs.dsearchb.focus();
        },
        isChecked(item) {
            if(this.selected.some(obj => obj[this.itemValue] === item[this.itemValue])) {
                return true;
            }
            return false;
        },
        clearField() {
            this.localsearch = null;
            this.selected = [];
            this.$emit('input',null); 
        },
        createNew() {
            this.$emit('create-new', this.localsearch);
            this.localsearch = null;
        }
    },
    mounted() {
        if (this.value) {
            let items = this.getItemsByValue(this.value, this.multiple);
            if (items) {
                this.selected = items;
            }
        }

        document.addEventListener('click', this.close)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.close)
    }
};
</script> 

<style scoped>
.truncate {
    overflow: hidden;
    text-overflow: ellipsis;
}

.focused::before {
    content: "";
    transition: .3s cubic-bezier(.25, .8, .5, 1);
    @apply inset-0 rounded pointer-events-none absolute block bg-black opacity-10;
}
</style>