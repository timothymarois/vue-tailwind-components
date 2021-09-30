<template>
    <div class="relative w-full">
        <BaseLabel 
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
                    :class="{ 'text-gray-500' : disabled, 'text-indigo-800' : !disabled }"
                >{{ selected.label }}</span>

                <span 
                    v-else-if="!searchable && !selected" 
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
                    class="w-full bg-transparent font-medium text-sm placeholder-gray-500 my-auto mr-2 focus:outline-none truncate border-0"
                    :class="{ 'text-gray-500' : disabled, 'text-indigo-800' : !disabled }"
                />

                <Icon :icon="menuIcon" size="5" class="mr-2" />

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
                        v-for="(item, index) of options"
                        :key="index"
                        @click="selectItem(item)"
                        v-on:keyup.enter="selectItem(item)"
                    >
                        <!-- <span v-if="autocompleteAddress" class="font-medium m-2">{{item?.name?.value || item?.name}}, {{item?.city?.value}}, {{item?.state?.value}}, {{item?.zipcode?.value}}</span> -->
                        <span class="font-medium m-2">{{ item[itemLabel] }}</span>          
                    </li>
                </div>
                <li v-else-if="!loading && !options.length" class="flex items-center rounded m-4 font-medium">No Results Found</li>
            </ul>

            <!-- <v-select 
                :value="value" 
                @input="update($event)"
            /> -->
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
import { BaseLabel, Icon } from "@/components/Elements";
// import vSelect from "vue-select";
// import "vue-select/dist/vue-select.css";
export default { 
    name: 'SelectField',
    components: {
        BaseLabel,
        Icon
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
            type: String,
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
            localSearch: null
        }
    },
    watch: {
		value: {
			handler: function (value) { 
                if (value) {
                    if (!this.external) {
                        let item = this.getItemByValue(value);
                        if (item) {
                            this.selected = item;
                            this.localSearch = item[this.itemLabel];
                        }
                    }
                }
			}
		}
	},
    computed: {
        id() {
            return this.$helpers.generateRandomString(8).toLowerCase()
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
        }
    },
    methods: {
        getItemByValue(value) {
            let vm = this;
            return vm.options.find(a => { return a[vm.itemValue] === value; });
        },
        selectItem(item) {
            this.menu = false;
            this.localSearch = item[this.itemLabel];
            this.selected = item;
            this.$emit('update:value', item[this.itemValue]);
        },
        menuToggle() {
            if (!this.disabled) {
                this.menu = !this.menu
            }
        },
        searchLocal(value) {
            this.$emit('search',value);
        },
        close(e) {
            if (!this.$el.contains(e.target)) {
                this.menu = false
            }
        },
        reFocus() {
            this.$refs.dropdownsearch.focus();
        },
        // handleDropdownPosition() {
        //     const screenPadding = 16;

        //     const placeholderRect = this.placeholder.getBoundingClientRect();
        //     const dropdownRect = this.dropdown.getBoundingClientRect();

        //     const dropdownRightX = dropdownRect.x + dropdownRect.width;
        //     const placeholderRightX = placeholderRect.x + placeholderRect.width;

        //     if (dropdownRect.x < 0) {
        //         this.dropdown.style.left = '0';
        //         this.dropdown.style.right = 'auto';
        //         this.dropdown.style.transform = `translateX(${-placeholderRect.x + screenPadding}px)`;
        //     } else if (dropdownRightX > window.outerWidth) {
        //         this.dropdown.style.left = 'auto';
        //         this.dropdown.style.right = '0';
        //         this.dropdown.style.transform = `translateX(${(window.outerWidth - placeholderRightX) - screenPadding}px)`;
        //     }
        // },
    },
    mounted() {

        if (this.value) {
            let item = this.getItemByValue(this.value);
            if (item) {
                this.selected = item;
                this.localSearch = item[this.itemLabel];
            }
        }

        document.addEventListener('click', this.close)
    },
    beforeDestroy() {
        document.removeEventListener('click',this.close)
    }
};
</script> 