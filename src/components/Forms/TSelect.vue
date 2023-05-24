<template>
    <div class="relative w-full">
        <t-label
            v-if="label"
            :id="`search-${id}`"
            :label="label"
            :required="required"
            class="mb-1"
        />

        <div class="relative w-full">
            <div 
                @click="$slots.opener ? menuToggle('button') : ''"
            >
                <slot name="opener">
                    <button
                        type="button"
                        class="flex justify-start items-center border border-gray-200 rounded text-gray-500 text-sm font-medium w-full h-10 focus:outline-none"
                        :class="{'hover:bg-indigo-100 hover:text-indigo-900 hover:border-indigo-900 bg-white group': !disabled, 'bg-gray-100 cursor-not-allowed': disabled }"
                        @keydown.enter.prevent="cycleIndex > -1 ? selectItem(searchableOptions[cycleIndex]) : ''"
                        @keydown.up.prevent="cycleOptions('up')"
                        @keydown.down.prevent="cycleOptions('down')"
                        @keydown.tab="menu = false"
                        @click.self="menuToggle('button')"
                        :tabindex="searchable && !disabled ? '-1' : '0'"
                    >
                        <span v-if="showIcon" class="text-gray-300 ml-2 group-hover:text-indigo-300">
                            <t-icon
                                :value="iconName"
                                solid
                                size="5"
                            />
                        </span>    
                        
                        <span
                            v-if="(!searchable && selected.length === 0) || (searchable && disabled && !selected)" 
                            :placeholder="placeholder" 
                            class="truncate pl-2 font-medium"
                            @click="menuToggle('label')"
                        >{{ placeholder }}</span>
                        
                        <span
                            v-else-if="(!searchable || textField) && selected.length !== 0" 
                            :placeholder="placeholder" 
                            class="truncate pl-2 font-medium"
                            :class="{ 'text-gray-500 cursor-not-allowed': disabled, 'text-indigo-800': !disabled }"
                            @click="menuToggle('label')"
                        >{{ selectPlaceholder }}</span>

                        <input
                            v-else
                            v-model="localsearch"
                            ref="dsearchb"
                            @keyup="searchLocal($event, localsearch)"
                            :disabled="disabled"
                            @click="menuToggle('input')"
                            type="text"
                            :autocomplete="`new-search-${id}`"
                            :id="`search-${id}`"
                            :name="`n[${id}]`"
                            :placeholder="selectPlaceholder"
                            class="w-full bg-transparent font-medium pl-2 text-sm placeholder-gray-500 my-auto truncate border-0 focus:outline-none focus:ring-0"
                            :class="{
                                'cursor-pointer': menu === false,
                                'text-gray-500 cursor-not-allowed': disabled,
                                'text-indigo-800': !disabled,
                                'placeholder-indigo-800': selected.length > 0 || selected[itemValue] || selected[itemValue] === false,
                            }"
                            @keydown="inputFilter"
                        />

                        <div
                            v-if="clearable && (localsearch || selected.length || selected[itemValue] || selected[itemValue] === false)"
                            class="cursor-pointer absolute right-6 p-2 flex items-center"
                            @click="clearField"
                        >
                            <t-icon value="close" size="5" />
                        </div>

                        <div
                            v-if="!hideicon && !loading && !textField"
                            @click="menuToggle('arrow')"
                            class="p-2 h-full flex items-center ml-auto"
                        >
                            <t-icon
                                :value="menuIcon"
                                size="5"
                            />
                        </div>

                        <div 
                            v-if="loading"
                            class="p-2 h-full flex items-center ml-auto"
                        >
                            <t-loader size="5" />
                        </div>
                    </button>
                </slot>
            </div>
            <ul
                v-show="menu"
                :class="dropdownClasses"
                :style="`${this.maxHeight ? `max-height: ${this.maxHeight}px` : ''}`"
                :id="`dropdown-${this.id}`"
            >
                <li v-if="loading && !computedOptions.length" class="flex items-center rounded m-4 font-medium">
                    Searching...
                </li>
                <li v-else-if="searchable && !searchableOptions.length && !localsearch" class="flex items-center justify-between rounded m-4 font-medium">
                    {{ searchText }}
                </li>
                <li v-else-if="!searchableOptions.length" class="flex items-center justify-between rounded m-4 font-medium">
                    {{ nodata }}
                </li>
                <div v-else-if="computedOptions.length && !grouped">
                    <li
                        v-for="(item, i) of searchableOptions"
                        :key="i"
                        class="relative flex items-center rounded m-2 transition duration-150"
                        :class="[
                            {'text-white bg-indigo-800': (!multiple && selected[itemValue] === item[itemValue]) },
                            { 'focused': equalsSearch(item[itemValue]) },
                            item.disabled ? 'text-gray-300' : 'cursor-pointer hover:bg-indigo-100 hover:text-indigo-900'
                        ]"
                        :id="equalsSearch(item[itemValue]) ? `focus-${id}` : ''"
                        @click.stop="item.disabled ? '' : selectItem(item)"
                    >
                        <t-checkbox
                            v-if="multiple"
                            :color="color"
                            :value="isChecked(item)"
                            :check="true"
                            :disabled="item.disabled || loading"
                            size="4"
                            class="ml-2"
                        />
                        <slot v-if="$scopedSlots.option" name="option" :option="item" />
                        <div
                            v-else
                            class="font-normal m-2"
                            v-html="item.optionListLabel ? item.optionListLabel : item[itemLabel]"
                        />
                    </li>
                </div>
                <div v-else-if="computedOptions.length && grouped">
                    <div v-if="!groupSelectable" v-for="(group, j) of options" :key="group.groupName">
                        <div
                            v-if="groupedItems(group.items).length"
                            :class="`font-bold capitalize text-gray-800 border-b border-gray-300 mb-2 mx-2 ${j !== 0 ? 'mt-4' : 'mt-2'} px-2 pb-1`
                        ">
                            {{ group.groupName }}
                        </div>
                        <li
                            v-for="(item, i) of groupedItems(group.items)"
                            :key="i"
                            class="relative flex items-center rounded m-2 transition duration-150"
                            :class="[
                                { 'text-white bg-indigo-800': (!multiple && selected[itemValue] === item[itemValue]) },
                                { 'focused': equalsSearch(item[itemValue]) },
                                item.disabled ? 'text-gray-300' : 'cursor-pointer hover:bg-indigo-100 hover:text-indigo-900'
                            ]"
                            :id="equalsSearch(item[itemValue]) ? `focus-${id}` : ''"
                            @click.stop="item.disabled ? '' : selectItem(item)"
                        >
                            <t-checkbox
                                v-if="multiple"
                                :color="color"
                                :value="isChecked(item)"
                                :check="true"
                                :disabled="item.disabled || loading"
                                size="4"
                                class="ml-2"
                            />
                            <div
                                class="font-normal m-2"
                                v-html="item.optionListLabel ? item.optionListLabel : item[itemLabel]"
                            />   
                        </li>
                    </div>

                  <div v-if="groupSelectable" v-for="group of options" :key="group.groupName">
                    <div v-if="groupedItems(group.items).length" class="relative my-2 flex items-center cursor-pointer hover:bg-indigo-100 hover:text-indigo-900 groupSelectable" @click.stop="selectItem(group, group.groupName)" :class="{'bg-gray-200':(isGroupVisible(group))}">
                        <t-checkbox :color="color" z-index="0" :value="isGroupPartiallyChecked(group)" :check="isGroupFullyChecked(group)" :disabled="loading" size="4" class="ml-2" />
                        <div class="font-normal p-2 w-full" @click="($event) => { if (groupedItems(group.items).length > 1 || group.expandIfSingleItem) { $event.stopPropagation(); toggleGroup(group);};}">
                            {{group.groupName}}
                        </div>
                        <div v-if="groupedItems(group.items).length > 1 || group.expandIfSingleItem" @click.stop="toggleGroup(group)" class="cursor-pointer p-2 flex items-center h-full" >
                            <t-icon :value="isGroupVisible(group) ? 'chevron-up' : 'chevron-down'" size="5" />
                        </div>
                    </div>

                    <li v-if="isGroupVisible(group)"
                        v-for="(item, i) of groupedItems(group.items)"
                        :key="i"
                        class="relative flex items-center rounded m-2 ml-4 transition duration-150 groupSelectable__li"
                        :class="[
                            { 'text-white bg-indigo-800': (!multiple && selected[itemValue] === item[itemValue]) },
                            { 'focused': equalsSearch(item[itemValue]) },
                            item.disabled ? 'text-gray-300' : 'cursor-pointer hover:bg-indigo-100 hover:text-indigo-900'
                        ]"
                        :id="equalsSearch(item[itemValue]) ? `focus-${id}` : ''"
                        @click.stop="item.disabled ? '' : selectItem(item, group.groupName)"
                    >
                        <t-checkbox v-if="multiple" :color="color" :value="isChecked(item)" :check="true" :disabled="item.disabled || loading" size="4" class="ml-2" />
                        <div class="font-normal m-2" v-html="item.optionListLabel ? item.optionListLabel : item[itemLabel]" />
                    </li>
                  </div>
                </div>
                <div 
                    v-if="create && (localsearch || !searchable || createAlways)"
                    :class="`text-${color}-600 font-medium pt-2 pb-2 px-4 border-t border-gray-100 cursor-pointer hover:underline hover:text-${color}-500`"
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
        createAlways: {
            type: Boolean,
            default: false
        },
        createText: {
            type: String,
            required: false,
            default: 'Add new'
        },
        searchText: {
            type: String,
            required: false,
            default: 'Start typing to search for results'
        },
        label: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: 'Select One'
        },
        value: {
            type: [String, Object, Number, Array, Boolean]
        },
        options: {
            type: Array,
            default: () => []
        },
        direction: {
            type: String,
            default: 'bottom'
        },
        hideicon: {
            type: Boolean,
            default: false
        },
        nodata: {
            type: String,
            default: 'No Results Found'
        },
        returnObject: {
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
        groupValue: {
          type: String,
          default: 'value'
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
        },
        grouped: {
            type: Boolean,
            required: false,
            default: false
        },
        zIndex: {
            type: [Number, String],
            default: "10"
        },
        textField: {
            type: Boolean,
            default: false
        },
        groupSelectable: {
          type: Boolean,
          default: false
        },
        maxHeight: {
            type: [String, Number],
            default: null
        },
        allSelectedPlaceholder: {
            type: Boolean,
            default: false
        }, 
        showIcon: {
            type: Boolean,
            dafault: false
        },
        iconName: {
            type: String,
            default: null
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
            cycleIndex: -1,
            visibleGroups: []
        }
    },
    watch: {
        value: {
            handler: function (value) { 
                this.checkValue(value)
            }
        },
        localsearch(v) {
            this.cycleIndex = -1;
            if(v !== null) this.$emit('search', v);
        },
        options(v) {
            if(v !== null) this.checkValueOptions(this.value);
        },
        menu(value) {
            if (value === true) this.$nextTick(() => this.viewport = viewportHelper(`#dropdown-${this.id}`));
            else {
                if(this.multiple || this.searchable) this.cycleIndex = -1;
                else this.cycleIndex = this.selectedIndex || -1;
                this.viewport = [];
            }            
        },
        searchableOptions(v) {
            if(this.searchable && this.textField && !v.length) this.menu = false;
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
            if (this.menu) return 'chevron-up';
            return 'selector';
            // return 'chevron-down'
        },
        dropdownClasses() {
            let c = [`absolute w-full overflow-y-auto text-sm rounded shadow-lg text-gray-500 bg-white focus:outline-none border border-gray-200 z-${this.zIndex}`];

            if(!this.maxHeight) c = c.concat(['max-h-80']);

            if(this.$slots.opener) c = c.concat(['min-w-[200px]']);

            if (this.dropdownDirection === 'top') c = c.concat(['bottom-10']);
            else c = c.concat(['top-10']);

            return c;
        },
        searchableOptions() {
            if (this.localsearch && this.searchable && this.isSearching && !this.external) {
                return JSON.parse(JSON.stringify(this.computedOptions)).filter((option) => {
                    let o = String(option[this.itemLabel]).toLowerCase().match(this.localsearch.toLowerCase().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
                    if (o) {
                        option[this.itemLabel] = String(option[this.itemLabel]).replace((new RegExp(this.localsearch, "ig")), (matchedText) => {
                            return (`<u>${matchedText}</u>`);
                        });
                        return o;
                    }
                });
            } else return this.computedOptions;
        },
        selectPlaceholder() { 
            if (this.multiple && this.selected.length) {
                if (this.allSelectedPlaceholder && this.selected.length === this.options.length) {
                    return `All ${this.placeholder}`;
                } else {
                    return `${this.selected[0][this.itemLabel]}${this.selected.length > 1 ? `, (${this.selected.length - 1} others)` : ''}`
                }
                
            } else if (!this.multiple && (this.selected[this.itemValue] || this.selected[this.itemValue] === false)) {
                return this.selected[this.itemLabel];
            }
            return this.placeholder;
        },
        returnValue() {
            if(this.multiple) {
                if(this.returnObject) return this.selected;
                return this.selected.map((obj) => obj[this.itemValue]);
            } else {
                if(this.returnObject) return this.selected;
                return this.selected[this.itemValue];
            }
        },
        computedOptions() {
          if (
              this.options.length &&
              (
                  ( this.options[0][this.itemValue] == null || this.options[0][this.itemValue] === false ) &&
                  this.options[0][this.itemValue] !== false
              ) && !this.grouped && !this.options[0][this.itemLabel])
          {
            return this.options.map((key) => {
              return {
                label: key,
                value: key
              }
            })
          } else if(this.grouped) {
                let returnItems = [];
                for(const group of this.options) {
                    returnItems.push(...group.items);
                }
                return returnItems;
            }
            else return this.options.filter((x) => !x.hide);
        }
    },
    methods: {
        inputFilter(e) {
            const filters = '\<\>\/\\'
            if (filters.includes(e.key)) {
                e.preventDefault()
            }
        },
        checkValue(value) {
            if (value || value === false) {
                let items = this.getItemsByValue(value, this.multiple);
                if (items) this.selected = items;
            } else {
                this.selected = [];
                this.selectedIndex = -1;
                this.cycleIndex = -1;
                this.localsearch = null;
            }
        },
        checkValueOptions(value) {
            if (value || value === false) {
                let items = this.getItemsByValue(value, this.multiple);
                if (items) this.selected = items;
            }
        },
        getItemsByValue(values, multiple) {
            let found = [];

            if(multiple) {
                for(const item of values) {
                    this.computedOptions.find( option => {
                        if( option[this.itemValue] === (this.returnObject ? item[this.itemValue] : item)) return found.push(item);
                    });
                }
            } else {
                this.computedOptions.find( (option) => {
                    if( option[this.itemValue] === (typeof values === 'object' ? values[this.itemValue] : values)) return found = option;
                });
            }
            
            return found;
        },
        isGroupPartiallyChecked(group) {
            // return group.items?.some( obj => this.selected.some(s => s[this.itemLabel] === obj[this.itemLabel]) );

            return group.items?.some( item => 
                this.selected.some( selectedItem => {
                    return (selectedItem[this.itemLabel] === item[this.itemLabel]) && 
                           (group.groupName === selectedItem.groupName);
                    
                })
            );
        },
        isGroupFullyChecked(group) {
            return group.items?.every( item => this.selected.some( selectedItem => selectedItem[this.itemLabel] === item[this.itemLabel]) );
        },
        selectItem(item, groupName) {
            if (this.loading) return;
            // remove possible underline from search select
            item[this.itemLabel] = String(item[this.itemLabel]).replace(/(<([^>]+)>)/ig, '');

            if(this.textField) {
                let i = this.searchableOptions.indexOf(item);
                this.selectedIndex = i;
                this.menu = false;
                this.isSearching = false;
                return this.localsearch = item[this.itemLabel];
            }

            if(!this.multiple) {
                this.selected = item;
                let i = this.searchableOptions.indexOf(item);
                this.selectedIndex = i;
                if(!item.select || !item.select.length) this.menu = false;
                if(!item.select || !item.select.length) this.isSearching = false;
                // make sure we clear search out after we have selected an item
                if(!item.select || !item.select.length) this.localsearch = null;
            } 
            else {
                
                if (this.groupSelectable && item.groupName && item.items) {
                    // if user checked/unchecked an entire group
                    if (!this.selected.some( (obj) => obj[this.itemValue] === item.groupName) ) {
                        // if all the child items of the group were already checked, uncheck them all
                        if (item.items.every(i => this.selected.some(s => s[this.itemValue] === i[this.itemValue]) )) {
                            for (const i of item.items) {
                                this.selected = this.selected.filter(s => s[this.itemValue] !== i[this.itemValue])
                            }
                        // if none or only some child items in a group are checked, then check them all
                        } else {
                            let uncheckedItems = item.items.filter(i => !this.selected.some( s => s[this.itemValue] === i[this.itemValue]) )
                            uncheckedItems = uncheckedItems.map(item => ({...item, groupName: groupName}))
                            this.selected.push(...uncheckedItems)
                        }
                    // if user checked/unchecked a child item of a group
                    } else {
                        item.items.forEach((groupItem) => {
                            const i = this.selected.findIndex( obj => {
                                return obj[this.itemValue] === groupItem[this.itemValue] 
                            })
                            if (i !== -1) this.selected.splice(i, 1);
                        })
                    }
                } else {
                    if (!this.selected.some( (obj) => obj[this.itemValue] === item[this.itemValue]) ) {
                        this.selected.push({...item, groupName: groupName});
                    } else {
                        let i = this.selected.findIndex( (obj) => obj[this.itemValue] === item[this.itemValue] );
                        this.selected.splice(i, 1);
                    }
                }
            }

            this.$emit('input', this.returnValue);
            this.$emit('change', this.returnValue); // emit both to v-model and to @change depending on what's easier in its context
        },
        menuToggle(source) {
            // if our options are external
            // and there are no options and we have not searched yet
            // then we dont want to show it until the user actually does a search
            if (this.textField) return;
            if (this.external && this.searchable && !this.localsearch && !this.computedOptions.length) return this.menu = false;

            if (!this.disabled) {
                if (this.searchable && source !== 'arrow') this.menu = true;
                else this.menu = !this.menu;
            }
        },
        menuOn() {
            if (!this.disabled) this.menu = true;
        },
        searchLocal(event, value) {
            // lets ignore these events since they are not searches
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Enter') return false;
            
            if (this.localsearch && this.localsearch.length) this.localsearch = this.localsearch.replace(/[\<\>//\\]/gi, '')
            if (!this.textField || (this.textField && this.searchableOptions.length)) this.menu = true;
            this.isSearching = true;

            if (this.groupSelectable) this.showAllGroups();
        },
        equalsSearch(item) { // Work-around because vue 2 doesn't support optional chaining in the template
            return this.searchableOptions?.[this.cycleIndex]?.[this.itemValue] === item;
        },
        cycleOptions(key) {
            if(this.searchableOptions.length) {
                if(key === 'up' && this.cycleIndex > 0) this.cycleIndex -= 1;
                else if(key === 'down' && this.cycleIndex + 1 !== this.searchableOptions.length) this.cycleIndex += 1;

                this.$nextTick(() => {
                    const el = document.getElementById(`focus-${this.id}`);
                    if (el) el.scrollIntoView({ block: "nearest", inline: "nearest" });
                });
            }
        },
        groupedItems(group) {
            if(this.localsearch && this.searchable && this.isSearching && !this.external) {
                return JSON.parse(JSON.stringify(group)).filter((option) => {
                    let o = String(option[this.itemLabel]).toLowerCase().match(this.localsearch.toLowerCase());
                    if (o) {
                        option[this.itemLabel] = String(option[this.itemLabel]).replace((new RegExp(this.localsearch, "ig")), function(matchedText) {
                            return (`<u>${matchedText}</u>`);
                        });
                        return o;
                    }
                });
            } else return group;
        },
        close(e) {
            if (!this.$el.contains(e.target)) {
                this.menu = false;
                if (this.searchable && !this.selected) this.localsearch = null;
            }
        },
        refocus() {
            this.$refs.dsearchb.focus();
        },
        isChecked(item) {
            if(this.selected.some((obj) => obj[this.itemValue] === item[this.itemValue])) return true;
            return false;
        },
        clearField() {
            this.localsearch = null;
            this.selected = [];
            this.$emit('input', this.multiple ? [] : null); // For multiple selects, return empty array instead
            this.$emit('cleared');

            if (this.groupSelectable) this.hideAllGroups();
        },
        createNew() {
            this.$emit('create-new', this.localsearch);
            this.localsearch = null;
            this.menu = false;
        },
        toggleGroup(group) {
            if (!this.visibleGroups.some(obj => obj === group.groupName)) this.visibleGroups.push(group.groupName);
            else {
                const i = this.visibleGroups.indexOf(group.groupName)
                if (i !== -1) this.visibleGroups.splice(i, 1);
            }
        },
        isGroupVisible(group) {
            return this.visibleGroups.some(obj => obj === group.groupName);
        },
        showAllGroups() {
            this.visibleGroups = [];
            this.options.forEach(option => this.visibleGroups.push(option.groupName));
        },
        hideAllGroups() {
            this.visibleGroups = [];
        }
    },
    mounted() {
        if (this.value || this.value === false) {
            let items = this.getItemsByValue(this.value, this.multiple);
            if (items) this.selected = items;
        }

        document.addEventListener('click', this.close, false);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.close);
    }
};
</script> 

<style scoped>
.truncate {
    overflow: hidden;
    text-overflow: ellipsis;
}

.focused {
    scroll-margin: 8px;
}

.focused::before {
    content: "";
    transition: .3s cubic-bezier(.25, .8, .5, 1);
    @apply inset-0 rounded pointer-events-none absolute block bg-black opacity-5;
}
</style>