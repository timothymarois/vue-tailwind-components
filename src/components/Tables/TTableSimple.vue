<template>
    <table class="min-w-full divide-y divide-gray-200 bg-gray-50">
        <thead v-if="!hideHeader" class="bg-white text-indigo-800">
            <tr>

                <th v-if="select" style="width:30px;">
                    <slot name="hselect">
                        <div class="flex justify-center w-full">
                            <TCheckbox 
                                @click.native="toggleAll"
                                @isChecked="checkedAll"
                                :value="selectedAll"
                            />
                        </div>
                    </slot>
                </th>

                <th v-for="(h,hindex) in headers"
                    class="p-4 text-sm font-normal text-left"
                    :key="hindex"
                    :class="(h.class) ? h.class : 'text-left'"
                    :style="(h.width) ? 'width:'+h.width+';' : ''"
                >
                    <slot :name="'header.'+h.value" v-bind:header="h"><span class="font-bold my-auto">{{ h.title }}</span></slot>
                </th>
            </tr>
        </thead>
        <thead v-if="loading">
            <tr class="v-data-table__progress">
                <th colspan="100%" class="border-none p-0 relative">
                    <t-progress-bar 
                        :color="selectedColor" 
                        :rounded="false" 
                        class="absolute" 
                    />
                </th>
            </tr>
        </thead>
        <tbody v-if="items && items.length > 0" class="tbody bg-white overflow-scroll">
            <tr 
                v-for="(item, i) in items" :key="i" 
                :class="[
                    `hover:bg-${hoverColor}-100 transition duration-150 text-gray-800 hover:text-indigo-900 text-sm`, 
                    (item.class ? item.class+' trow' : 'trow'), 
                    (selection.includes(i) ? `bg-${selectedColor}-100` : ''),
                    (selectFromRow) ? 'cursor-pointer' : ''
                ]"
                @click="selectRow(i)"
            >
                <td 
                    v-if="select"
                    class="p-4 border-0 relative font-normal text-center"
                >
                    <slot name="column.select">
                        <div class="flex justify-center w-full">
                            <TCheckbox :value="selection.includes(i)" @click.native="toggleRow(i)" />
                        </div>
                    </slot>
                </td>

                <td 
                    v-for="(h) in headers" 
                    :key="h.value" 
                    class="p-4 border-0 relative font-normal"
                    :class="(h.class) ? h.class : 'text-left'"
                >
                    <slot :name="'column.'+h.value" v-bind:column="item" v-bind:index="i">{{ item[h.value] }}</slot>
                </td>
            </tr>
        </tbody>
        <tbody v-else >
            <tr>
                <td colspan="100%" class="text-center">{{ messageText }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import TCheckbox from "../Forms/TCheckbox.vue";
import TProgressBar from "../Elements/TProgressBar.vue";

export default {
    name: 'TTableSimple',
    data () {
        return {
            selection: [],
            selectedAll: false
        }
    },
    components: {
        TCheckbox,
        TProgressBar
    },
    props: {
        value: {
            type: Array,
            default: null
        },
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
            default: 'No results found.'
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
        }
    },
    computed: {
        messageText() {
            if (this.loading) return this.loadingText
            return this.nodata
        }
    },
    methods: {
        toggleAll() {
            if (!this.selectedAll) {
                this.selection = [];
            } else {
                this.selection = [...Array(this.items.length).keys()];
            }
        },
        toggleRow(i, origin) {
            if(!this.selectFromRow || origin === 'selectRow') {
                if (!this.selection.includes(i)) {
                    this.selection.push(i);
                } else {
                    const index = this.selection.indexOf(i);
                    if (index > -1) {
                        this.selection.splice(index, 1);
                    }
                }
            }
        },
        selectRow(i) {
            if(this.selectFromRow) {
                this.toggleRow(i, 'selectRow');
            }
        },
        checkedAll(e) {
            this.selectedAll = e;
        }
    },
    watch: {
        selection() {
            let selectedItems = [];

            for(let i = 0; i < this.items.length; i++) {
                if(this.selection.includes(i)) {
                    selectedItems.push(this.items[i]);
                }
            }

            this.$emit('input', selectedItems);
        }
    }
}
</script>