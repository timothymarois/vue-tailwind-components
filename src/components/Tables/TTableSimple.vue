<template>
    <table :class="`t-table min-w-full h-full divide-y divide-gray-200 ${outlined ? 'ring-1 ring-gray-200' : ''}`">
        <thead v-if="!hideHeader" class="bg-white text-indigo-800" :style="fixedHeader ? 'width: calc(100% - 1em); display: table; table-layout: fixed;' : ''">
            <tr>
                <th v-if="select" :class="`w-${selectOptions ? '16' : '12'}`">
                    <slot name="hselect">
                        <div class="flex justify-evenly w-full">
                            <t-checkbox 
                                v-if="!selectOne"
                                v-model="selectedAll"
                                @input="changeSelectControl('visible'); toggleAll();"
                            />
                            <div v-if="!selectOne && selectOptions" id="select-all-options">
                                <t-menu v-model="menuOpen">
                                    <template v-slot:opener>
                                        <t-button
                                            icon="chevron-down"
                                            iconSize="4"
                                            text
                                            :padding="0.5"
                                            @click.native="menuOpen =! menuOpen"
                                            class="select-none"
                                        />
                                    </template>
                                    <template v-slot:content>
                                        <ul class="bg-white text-sm p-2 rounded border border-gray-200 w-52 text-left text-gray-500 font-medium">
                                            <li class="p-2 cursor-pointer hover:bg-indigo-100 hover:text-indigo-900 rounded" @click="changeSelectControl('all'); selectAll()">
                                                Select All <span v-if="totalCount">{{ totalCount }}</span>
                                            </li>
                                            <li class="p-2 mt-1 cursor-pointer hover:bg-indigo-100 hover:text-indigo-900 rounded" @click="changeSelectControl('none'); deselectAll()">
                                                Select None
                                            </li>
                                            <li class="p-2 mt-1 cursor-pointer hover:bg-indigo-100 hover:text-indigo-900 rounded" @click="changeSelectControl('visible'); selectAll()">
                                                Select Visible
                                            </li>
                                            <li class="p-2 mt-1 rounded" v-if="selectOptionCustom">
                                                <form class="flex flex-row" @submit.prevent="changeSelectControl('number'); selectRows($refs.rows_to_select.value);">
                                                    Select 
                                                    <input type="number" ref="rows_to_select" onkeydown="return ![69, 109, 110, 189, 190].includes(event.keyCode)" :min="1" class="w-24 h-6 rounded border-gray-300 text-indigo-900 font-medium bg-gray-50 py-0.5 px-1 ml-1.5 -mt-0.5 focus:ring-1 focus:ring-indigo-300" /> 
                                                    <t-button type="submit" icon="arrow-right" iconSize="4" :padding="1" class="ml-auto -mt-1" />
                                                </form>
                                            </li>
                                        </ul>
                                    </template>
			                    </t-menu>
                            </div>
                        </div>
                    </slot>
                </th>

                <th v-for="(h,hindex) in headerItems"
                    class="my-auto py-1 px-2 lg:px-4 lg:py-2 text-sm font-normal whitespace-nowrap capitalize"
                    :key="hindex"
                    :class="{
                        'text-left' : !h.align,
                        'text-right' : (h.align=='right'),
                        'text-center' : (h.align=='center'),
                        'sortable cursor-pointer hover:bg-indigo-50' : h.sorting,
                        'sorted' : h.sorted
                    }"
                    :style="(h.width) ? 'width:'+h.width+';' : ''"
                    @click="sortClicked(h,hindex)"
                >
                    <slot :name="'header.'+h.value" v-bind:header="h">
                        <div class="my-auto truncate">
                            <span class="font-bold">{{ h.title }}</span>
                            <span v-if="h.sorting" class="sort-icon">
                                <t-icon v-if="h.sorted=='ASC'" size="4" value="arrow-sm-up" />
                                <t-icon v-else-if="h.sorted=='DESC'" size="4" value="arrow-sm-down" />
                                <t-icon v-else size="4" value="switch-vertical" />
                            </span>
                        </div>
                    </slot>
                </th>
            </tr>
        </thead>
        <thead v-if="loading" :style="fixedHeader ? 'width: 100%; display: table; table-layout: fixed;' : 'position: relative; top: 0;'">
            <tr :class="`v-data-table__progress ${fixedHeader ? 'table table-fixed w-full' : ''}`">
                <th colspan="100%" class="border-none p-0 relative">
                    <t-progress-bar 
                        :color="selectedColor" 
                        :rounded="false" 
                        class="absolute" 
                    />
                </th>
            </tr>
        </thead>
        <tbody v-if="items && items.length > 0" class="tbody bg-white" :style="fixedHeader ? `height: calc(100% - 36px); overflow-y: scroll; display: block;` : ''">
            <tr 
                v-for="(item, i) in items" :key="i" 
                :class="[
                    `hover:bg-${hoverColor}-50 transition duration-150 text-gray-800 hover:text-indigo-900 text-sm trow`,
                    (fixedHeader ? 'table table-fixed w-full' : ''),
                    (striped ? 'even:bg-gray-50' : ''),
                    (item.class ? item.class : ''), 
                    (selection.includes(i) ? `bg-${selectedColor}-100` : ''),
                    (selectFromRow || rowCursor) ? 'cursor-pointer' : ''
                ]"
                @click="selectRow(i,item,$event)"
            >
                <td 
                    v-if="select"
                    class="px-2 py-2 border-0 relative text-center w-12"
                >
                    <slot name="column.select">
                        <div :class="`flex ${selectOptions ? 'justify-start' : 'justify-center'} w-full`">
                            <TCheckbox 
                                :value="selection.includes(i)" 
                                @input="toggleRow(i)"
                                @click.prevent=""
                            />
                        </div>
                    </slot>
                </td>

                <td 
                    v-for="(h) in headerItems" 
                    :key="h.value" 
                    class="px-4 py-3 border-0 relative font-normal"
                    :class="[
                        (!h.align) ? 'text-left' : '',
                        (h.align=='right') ? 'text-right' : '',
                        (h.align=='center') ? 'text-center' : '',
                        (item.class) ? item.class : ''
                    ]"
                    :style="(h.width) ? 'width:'+h.width+';' : ''"
                >
                    <slot :name="'column.'+h.value" v-bind:column="item" v-bind:index="i">{{ item[h.value] }}</slot>
                </td>
            </tr>
        </tbody>
        <tbody v-else :style="fixedHeader ? `height: calc(100% - 36px); display: block;` : ''">
            <tr :class="fixedHeader ? 'table table-fixed w-full' : ''">
                <td colspan="100%" class="text-center p-3"><slot name="noresults">{{ messageText }}</slot></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import TCheckbox from "../Forms/TCheckbox.vue";
import TProgressBar from "../Elements/TProgressBar.vue";
import TIcon from "../Elements/TIcon.vue";
import TMenu from "../Elements/TMenu.vue";
import TButton from "../Elements/TButton.vue";
export default {
    name: 'TTableSimple',
    data () {
        return {
            selection: [],
            selectedAll: false,
            menuOpen: false
        }
    },
    components: {
        TCheckbox,
        TProgressBar,
        TIcon,
        TMenu,
        TButton
    },
    props: {
        headers: {
            type: Array,
            default: () => []
        },
        items: {
            type: Array,
            default: () => []
        },
        select: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        hideHeader: {
            type: Boolean,
            default: false
        },
        nodata: {
            type: String,
            default: 'No results found'
        },
        loadingText: {
            type: String,
            default: 'Loading... Please wait'
        },
        selectedColor: {
            type: String,
            default: 'indigo'
        },
        hoverColor: {
            type: String,
            default: 'indigo'
        },
        selectFromRow: {
            type: Boolean,
            default: false
        },
        selectOne: {
            type: Boolean,
            default: false
        },
        rowCursor: {
            type: Boolean,
            default: false
        },
        fixedHeader: {
            type: Boolean,
            default: false
        },
        striped: {
            type: Boolean,
            default: false
        },
        outlined: {
            type: Boolean,
            default: false
        },
        selectOptions: {
            type: Boolean,
            default: false
        },
        selectOptionCustom: {
            type: Boolean,
            default: true
        },
        totalCount: {
            type: [String, Number],
            default: null
        }
    },
    computed: {
        messageText() {
            if (this.loading) return this.loadingText
            return this.nodata
        },
        headerItems() {
            return this.headers.filter(item => !item.hide)
        }
    },
    methods: {
        sortClicked(h,i) {
            if (h.sorting===true) {
                let sortUpdate = null;
                if (h.sorted=='ASC') {
                    sortUpdate = 'DESC';
                }
                else if (h.sorted=='DESC') {
                    sortUpdate = 'ASC';
                }
                else if (!h.sorted) {
                    if (h.sortDefault) {
                        sortUpdate = h.sortDefault
                    }
                    else {
                        sortUpdate = 'ASC';
                    }
                }
                else {
                    sortUpdate = null;
                }

                this.$emit('change-sort',h,sortUpdate)
            }
        },
        toggleAll() {
            if (!this.selectedAll) {
                this.deselectAll();
            } 
            else {
                this.selectAll();
            }
        },
        selectAll() {
            this.selection = [...Array(this.items.length).keys()];
        },
        selectRows(i) {
            this.selection = [...Array(+i).keys()];
        },
        deselectAll() {
            this.selection = [];
        },
        toggleRow(i, origin) {
            if(!this.selectFromRow || origin === 'selectRow') {
                if (!this.selection.includes(i)) {
                    if (this.selectOne === true) {
                        this.selection = [i];
                    }
                    else {
                        this.selection.push(i)
                    }
                } 
                else {
                    const index = this.selection.indexOf(i);
                    if (index > -1) {
                        this.selection.splice(index, 1);
                    }
                }
            }
        },
        selectRow(i,item,$event) {

            // let $event.target.cellIndex
            if (this.selectFromRow) {
                this.toggleRow(i,'selectRow');
            }
            
            // we do not want to send this event
            // if we are also checking the box
            if (this.select) {
                // prevent input clicks
                // prevent first cell checkbox clicks
                if ($event.target.nodeName==='INPUT') return;
                if ($event.target.nodeName=='TD' && $event.target.cellIndex===0) return
                this.$emit('click-row',item)
            }
            else {
                this.$emit('click-row',item)
            }
        },
        checkedAll(e) {
            this.selectedAll = e;
        },
        changeSelectControl(v) {
            this.menuOpen = false;

            if(v !== 'number') {
                this.$emit('select-control', v);
            } else {
                this.$emit('select-control', +this.$refs.rows_to_select.value)
            }
        }
    },
    watch: {
        selection() {
            let selectedItems = [];

            if (this.selection.length) {
                for(let i = 0; i < this.items.length; i++) {
                    if(this.selection.includes(i)) {
                        selectedItems.push(this.items[i]);
                    }
                }

                // if the selected items equal the total items
                // lets make sure to check the selected all
                // however, if they do not match, then uncheck select all
                if (this.selection.length===this.items.length) {
                    this.selectedAll = true;
                }
                else {
                    this.selectedAll = false;
                }
            } 
            else {
                // if the selection is empty, 
                // lets uncheck the select all
                this.selectedAll = false;
            }

            this.$emit('change-selected', selectedItems);
        },
        items() {
            this.selection = [];
        }
    }
}
</script>

<style scoped>
table.t-table>thead>tr:last-child>th {
    border-right: 1px solid #e5e5e5;
}
table.t-table>thead>tr:last-child>th:last-child {
    border-right: 0;
}
/* table.t-table>thead>tr>th.sortable:hover {
    @apply bg-indigo-50
} */
table.t-table>thead>tr>th.sortable:not(.sorted) span.sort-icon {
    opacity: 0.3;
}
table.t-table>thead>tr>th.sortable:hover span.sort-icon {
    opacity: 1;
}

#select-all-options input::-webkit-outer-spin-button,
#select-all-options input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>