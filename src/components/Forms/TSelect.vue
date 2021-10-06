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
                    v-if="!searchable && selected" 
                    :placeholder="placeholder" 
                    class="truncate pl-3 font-medium "
                    :class="{ 'text-gray-500 cursor-not-allowed' : disabled, 'text-indigo-800' : !disabled }"
                >{{ selected.label }}</span>

                <span 
                    v-else-if="(!searchable && !selected) || (searchable && disabled && !selected)" 
                    :placeholder="placeholder" 
                    class="truncate pl-3 font-medium"
                >{{ placeholder || 'Select an option' }}</span>

                <input
                    ref="dropdownsearch"
                    v-else
                    v-model="localSearch"
                    v-on:keyup="searchLocal(localSearch);"
                    v-on:keyup.enter="reFocus()"
                    :disabled="disabled"
                    type="text"
                    autocomplete="off"
                    :placeholder="placeholder"
                    class="w-full bg-transparent font-medium text-sm placeholder-gray-500 my-auto focus:outline-none truncate border-0"
                    :class="{ 'text-gray-500 cursor-not-allowed' : disabled, 'text-indigo-800' : !disabled, 'mr-2': !hideicon }"
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
                    v-if="!hideicon" 
                    :value="menuIcon" 
                    size="5" 
                    class="mr-2" 
                />

            </button>

            <ul
                :class="dropdownClasses"
                v-show="menu"
            >
                <li v-if="loading" class="flex items-center rounded m-4 font-medium">Searching...</li>
                <div v-else-if="!loading && options.length > 0">
                    <li
                        class="cursor-pointer flex items-center rounded m-2 hover:bg-indigo-100 hover:text-indigo-900 transition duration-150"
                        :class="{ 'text-white bg-indigo-800': (item[itemValue]==value) }"
                        v-for="(item, index) of searchableOptions"
                        :key="index"
                        @click="selectItem(item)"
                        v-on:keyup.enter="selectItem(item)"
                    >
                        <span class="font-medium m-2" v-html="item[itemLabel]"></span>          
                    </li>
                </div>
                <li v-else-if="!loading && !options.length" class="flex items-center rounded m-4 font-medium">{{ nodata }}</li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.truncate {
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>

<script>
import TButton from "../Elements/TButton";
import TIcon from "../Elements/TIcon";
import TLabel from "./TLabel";
export default { 
    name: 't-select',
    components: {
        TLabel,
        TIcon,
        TButton
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
            default: null
        },
        value: {
            type: [String, Object],
            default: null
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
    },
    data: () => {
        return {
            menu: false,
            selected: null,
            localSearch: null,
            isSearching: false
        }
    },
    watch: {
		value: {
			handler: function (value) { 
                if (value) {
                    let item = this.getItemByValue(value);
                    if (item) {
                        this.isSearching = false;
                        this.selected = item;
                        this.localSearch = (item[this.itemLabel]) ? item[this.itemLabel] : null;
                    }
                }
                else {
                    this.selected=null
                    // this.localSearch=null;
                }
			}
		}
	},
    computed: {
        id() {
           return (Math.random()+1).toString(36).substring(7);
        },
        menuIcon() {
            if (this.menu) return 'chevron-up'
            return 'chevron-down'
        },
        dropdownClasses() {

            let c = [
                'absolute w-full max-h-80 overflow-y-auto text-sm rounded shadow text-gray-500 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 border border-gray-300'
            ];

            if (this.direction=='top') {
                c = c.concat(['bottom-10']);
            }
            else {
                c = c.concat(['top-10']);
            }

            return c;
        },
        searchableOptions() {
            let vm = this;

            if (vm.localSearch && vm.searchable && vm.isSearching && !vm.external) {
                return JSON.parse(JSON.stringify(vm.options)).filter(option => {
                    let o = option.label.toLowerCase().match(vm.localSearch.toLowerCase());
                    if (o) {
                        option.label = option.label.toString().replace((new RegExp(vm.localSearch,"ig")),function(matchedText,a,b){
                            return ('<u>'+matchedText+'</u>');
                        });
                        return o;
                    }
                });
            }
            else {
                return vm.options;
            }
        }
    },
    methods: {
        getItemByValue(value) {
            let vm = this;
            return vm.options.find(a => { return a[vm.itemValue] === value; });
        },
        selectItem(item) {
            this.menu = false;
            this.isSearching = false;
            this.selected = item;
            this.localSearch = (item[this.itemLabel]) ? item[this.itemLabel] : null;
            if (this.returnObject) {
                this.$emit('input', item);
            }
            else {
                this.$emit('input', item[this.itemValue]);
            }
        },
        menuToggle() {

            // if our options are external
            // and there are no options and we have not searched yet
            // then we dont want to show it until the user actually does a search
            if (this.external && this.searchable && !this.localSearch && !this.options.length) {
                this.menu = false;
                return;
            }

            if (!this.disabled) {
                if (this.searchable) {
                    this.menu = true;
                }
                else {
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
            this.selected = null;
            this.$emit('input', null);
            this.$emit('search',value);
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
        }
    },
    mounted() {

        if (this.value) {
            let item = this.getItemByValue(this.value);
            if (item) {
                this.selected = item;
                this.localSearch = (item[this.itemLabel]) ? item[this.itemLabel] : null;
            }
        }

        document.addEventListener('click', this.close)
    },
    beforeDestroy() {
        document.removeEventListener('click',this.close)
    }
};
</script> 