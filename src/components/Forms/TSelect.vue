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
                @click="menuToggle"
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
                    ref="dropdownsearch"
                    v-else
                    v-model="localSearch"
                    @keyup="searchLocal(localSearch)"
                    @keyup.enter="reFocus()"
                    :disabled="disabled"
                    type="text"
                    autocomplete="off"
                    :placeholder="selectPlaceholder"
                    class="w-full bg-transparent font-medium text-sm placeholder-gray-500 my-auto focus:outline-none truncate border-0"
                    :class="{ 'text-gray-500 cursor-not-allowed' : disabled, 'text-indigo-800' : !disabled, 'mr-2': !hideicon, 'placeholder-indigo-800' : selected.length > 0 }"
                />

                <!-- <t-button
                    v-if="!hideicon" 
                    :icon="menuIcon" 
                    iconSize="5" 
                    class="mr-2" 
                    @click="menuToggle"
                    padding="0"
                    text
                /> -->

                <t-icon 
                    v-if="!hideicon && !loading" 
                    :value="menuIcon" 
                    size="5" 
                    class="mr-2" 
                />

                <t-loader
                   v-else-if="loading"
                    size="4"
                    class="mr-2"
                />
            </button>

            <ul
                :class="dropdownClasses"
                v-show="menu"
            >
                <li 
                    v-if="loading" 
                    class="flex items-center rounded m-4 font-medium"
                >
                    Searching...
                </li>
                <div v-else-if="!loading && computedOptions.length > 0">
                    <li
                        v-for="(item, i) of searchableOptions"
                        :key="i"
                        class="cursor-pointer flex items-center rounded m-2 hover:bg-indigo-100 hover:text-indigo-900 transition duration-150"
                        :class="{ 'text-white bg-indigo-800' : (!multiple && selected[itemValue] === item[itemValue]) }"
                        @click="selectItem(item)"
                        @keyup.enter="selectItem(item)"
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
                <li 
                    v-else-if="!loading && !computedOptions.length" 
                    class="flex items-center rounded m-4 font-medium"
                >
                    {{ nodata }}
                </li>
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

export default { 
    name: 't-select',
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
        }
    },
    data() {
        return {
            menu: false,
            selected: [],
            localSearch: null,
            isSearching: false
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
                } else {
                    this.selected = []
                }
            }
        }
    },
    computed: {
        id() {
           return (Math.random() + 1).toString(36).substring(7);
        },
        menuIcon() {
            if (this.menu) return 'chevron-up'
            return 'chevron-down'
        },
        dropdownClasses() {
            let c = [
                'absolute w-full max-h-80 overflow-y-auto text-sm rounded shadow text-gray-500 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 border border-gray-300'
            ];

            if (this.direction === 'top') {
                c = c.concat(['bottom-10']);
            } else {
                c = c.concat(['top-10']);
            }

            return c;
        },
        searchableOptions() {
            let vm = this;

            if (vm.localSearch && vm.searchable && vm.isSearching && !vm.external) {
                return JSON.parse(JSON.stringify(vm.computedOptions)).filter(option => {
                    let o = option[this.itemLabel].toLowerCase().match(vm.localSearch.toLowerCase());
                    if (o) {
                        option[this.itemLabel] = option[this.itemLabel].toString().replace((new RegExp(vm.localSearch, "ig")), function(matchedText, a, b){
                            return (`<u>${matchedText}</u>`);
                        });
                        return o;
                    }
                });
            }
            else {
                return vm.computedOptions;
            }
        },
        selectPlaceholder() { 
            if(this.multiple && this.selected.length > 0) {
                return `${this.selected[0][this.itemLabel]}${this.selected.length > 1 ? `, (${this.selected.length - 1} others)` : ''}`
            } else if(!this.multiple && this.selected[this.itemValue]) {
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
            } else {
                if(this.returnObject) {
                    return this.selected;
                }

                return this.selected[this.itemValue];
            }

        },
        computedOptions() {
            if(this.options.length > 0 && !this.options[0][this.itemValue]) {
                // this.itemValue = "value";
                // this.itemLabel = "label";
                return this.options.map(key => {
                    return {
                        label: key,
                        value: key
                    }
                })

            } else {
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
            } else {
                this.computedOptions.find(obj => {
                    if(obj[this.itemValue] === (this.returnObject ? values[this.itemValue] : values)) {
                        this.localSearch = obj[this.itemLabel];
                        return found = obj;
                    }
                });
            }
            
            return found;
        },
        selectItem(item) {
            item[this.itemLabel] = item[this.itemLabel].replace( /(<([^>]+)>)/ig, ''); // Remove possible underline from search select

            if(!this.multiple) {
                this.menu = false;
                this.isSearching = false;
                this.selected = item;
                this.localSearch = (item[this.itemLabel]) ? item[this.itemLabel] : null;
            } else {
                if(!this.selected.some(obj => obj[this.itemValue] === item[this.itemValue])) {
                    this.selected.push(item);
                } else {
                    let i = this.selected.indexOf(item);
                    this.selected.splice(i, 1);
                }
            }

            this.$emit('input', this.returnValue);
        },
        menuToggle() {
            // if our options are external
            // and there are no options and we have not searched yet
            // then we dont want to show it until the user actually does a search
            if (this.external && this.searchable && !this.localSearch && !this.computedOptions.length) {
                return this.menu = false;
            }

            if (!this.disabled) {
                if (this.searchable) {
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
        close(e) {
            if (!this.$el.contains(e.target)) {
                this.menu = false;
                if (this.searchable && !this.selected) {
                    this.localSearch = null;
                }
            }
        },
        reFocus() {
            this.$refs.dropdownsearch.focus();
        },
        isChecked(item) {
            if(this.selected.some(obj => obj[this.itemValue] === item[this.itemValue])) {
                return true;
            }

            return false;
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
</style>