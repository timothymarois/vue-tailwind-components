import TTableSimple from '../src/components/Tables/TTableSimple';
import TCard from '../src/components/Elements/TCard';

export default {
	title: 'TABLES/TTableSimple',
	component: TTableSimple,
	argTypes: { 
		title: {
			name: 'title',
			description: 'Header title text',
			defaultValue: null,
		},
		subtitle: {
			name: 'subtitle',
			description: 'Header subtitle text',
			defaultValue: null,
		},
        contentPadding: {
			name: 'contentPadding',
			description: 'Change the content padding (default 4)',
            control: { type: 'number', min: 0 }
		},
        selectedColor: {
            name: 'selectedColor',
            description: 'Background color of selected and hovered rows',
            control: { type: 'string' }
        }
	},
};


export const BasicTables = () => ({
	// props: Object.keys(argTypes),
	components: { TTableSimple, TCard },
    data: () => ({
        selected: null,
        headers: [
            {
                title: 'Property Address',
                value: 'property_address',
                class: 'uppercase'
            },
            {
                title: 'Full Name',
                value: 'full_name'
            },
            {
                title: 'Mailing Address',
                value: 'mail_address'
            }
        ],
        items: [
            {
                property_address: '845 NY Ave',
                mail_address: '845 NY Ave',
                full_name: 'Timothy Marois'
            },
            {
                property_address: '210 W Trade st',
                mail_address: '210 W Trade st',
                full_name: 'Jason Gordon'
            },
            {
                property_address: '425 N Church st',
                mail_address: '425 N Church st',
                full_name: 'April Lane'
            }
        ]
    }),
	template: 
	`
        <div class="p-6 bg-gray-100">

            <div class="w-full">
                <t-card title="Basic Table" contentPadding="0">
                    <t-table-simple 
                        :headers="headers"
                        :items="items"
                    />
                </t-card>
            </div>

            <div class="w-full mt-4">
                <t-card title="Basic Table without Headers (prop: hideHeader)" contentPadding="0">
                    <t-table-simple 
                        :headers="headers"
                        :items="items"
                        hideHeader
                        striped
                        outlined
                    />
                </t-card>
            </div>

            <div class="w-full mt-4">
                <t-card title="Default No Content" contentPadding="0">
                    <t-table-simple 
                        :headers="headers"
                        :items="[]"
                    />
                </t-card>
            </div>

            <div class="w-full mt-4">
                <t-card title="Custom No Content (prop: nodata)" contentPadding="0">
                    <t-table-simple 
                        :headers="headers"
                        :items="[]"
                        nodata="There were no items found"
                    />
                </t-card>
            </div>

            <div class="w-full mt-4">
                <t-card title="Loading State (prop: loading)" contentPadding="0">
                    <t-table-simple 
                        :loading="true"
                        :headers="headers"
                        :items="[]"
                    />
                </t-card>
            </div>

        </div>
	`,
});


export const AdvancedTables = () => ({
	// props: Object.keys(argTypes),
	components: { TTableSimple, TCard },
    methods: {
        rowClicked(item) {
            this.clickedRow = item;
        },
        updateSelection(val) {
            this.selected = val;
        },
        updateSorting(item, sortUpdate) {
            // this is simple logic to change sorting
            let newHeaders = [];
            this.headers.forEach(h => {
                if (h.value==item.value) {
                    h.sorted = sortUpdate
                    newHeaders.push(h);
                }
                else {
                    h.sorted = null
                    newHeaders.push(h);
                }
            });

            this.headers = newHeaders;
        }
    },
    data: () => ({
        selected: [],
        clickedRow: {},
        headers: [
            {
                title: 'Property Address',
                value: 'property_address',
                sorting: true,
                sorted: 'DESC',
                sortDefault: 'DESC'
            },
            {
                title: 'Full Name',
                value: 'full_name',
                sorting: true,
                sorted: false,
            },
            {
                title: 'Mailing Address',
                value: 'mail_address',
                sorting: true,
                hide: true,
                sorted: false,
            },
            {
                title: 'Email',
                value: 'email',
                sorting: false,
                hide: false,
                sorted: false,
            }
        ],
        items: [
            {
                id: 123,
                property_address: '845 NY Ave',
                mail_address: '845 NY Ave',
                full_name: 'Timothy Marois',
                email: 'email@gmail.com'
            },
            {
                id: 214,
                property_address: '210 W Trade st',
                mail_address: '210 W Trade st',
                full_name: 'Jason Gordon',
                email: 'email@gmail.com'
            },
            {
                id: 788,
                property_address: '425 N Church st',
                mail_address: '425 N Church st',
                full_name: null,
                email: 'email@gmail.com'
            },
            {
                id: 888,
                property_address: '425 N Church st',
                mail_address: '425 N Church st',
                full_name: 'April Lane',
                email: 'email@gmail.com'
            }
        ]
    }),
	template: 
	`
        <div class="p-6 bg-gray-100">

            <div class="w-full">
                <t-card title="Selection (prop: select)" contentPadding="0">
                    <t-table-simple 
                        :headers="headers"
                        :items="items"
                        @click-row="rowClicked"
                        @change-selected="updateSelection"
                        @change-sort="updateSorting"
                        select
                        selectFromRow
                        :selectOne="false"
                        loading
                        emptyCellMessage="Not Available"
                    />
                </t-card>
            </div>

            <div class="mt-8">
                SELECTED:
                <p v-for="(item, i) in selected" :key="i">{{JSON.stringify(item)}} <br /></p>
            </div>
            
            <div class="mt-8">
                ROW SELECTED: <p>{{JSON.stringify(clickedRow)}}</p>
            </div>

            <div class="mt-8">
                HEADERS: <p>{{JSON.stringify(headers)}}</p>
            </div>

        </div>
	`,
});

export const FixedHeaderTable = () => ({
	// props: Object.keys(argTypes),
	components: { TTableSimple, TCard },
    methods: {
        rowClicked(item) {
            this.clickedRow = item;
        },
        updateSelection(val) {
            this.selected = val;
        },
        updateSorting(item, sortUpdate) {
            // this is simple logic to change sorting
            let newHeaders = [];
            this.headers.forEach(h => {
                if (h.value==item.value) {
                    h.sorted = sortUpdate
                    newHeaders.push(h);
                }
                else {
                    h.sorted = null
                    newHeaders.push(h);
                }
            });

            this.headers = newHeaders;
        }
    },
    data: () => ({
        selected: [],
        clickedRow: {},
        headers: [
            {
                title: 'Property Address',
                value: 'property_address',
                sorting: true,
                sorted: 'DESC',
                sortDefault: 'DESC'
            },
            {
                title: 'Full Name',
                value: 'full_name',
                sorting: true,
                sorted: false,
            },
            {
                title: 'Mailing Address',
                value: 'mail_address',
                sorting: true,
                hide: true,
                sorted: false,
            },
            {
                title: 'Email',
                value: 'email',
                sorting: false,
                hide: false,
                sorted: false,
            },
            {
                title: 'Email 2',
                value: 'email_2',
                sorting: false,
                hide: false,
                sorted: false,
            },
            {
                title: 'Email 3',
                value: 'email_3',
                sorting: false,
                hide: false,
                sorted: false,
            },
            {
                title: 'Email 4',
                value: 'email_4',
                sorting: false,
                hide: false,
                sorted: false,
            }
        ],
        items: [
            {
                id: 123,
                property_address: '845 NY Ave',
                mail_address: '845 NY Ave',
                full_name: 'Timothy Marois',
                email: 'email@gmail.com',
                email_2: 'email2@gmail.com',
                email_3: 'email3@gmail.com',
                email_4: 'email4@gmail.com'
            },
            {
                id: 214,
                property_address: '210 W Trade st',
                mail_address: '210 W Trade st',
                full_name: 'Jason Gordon',
                email: 'email@gmail.com',
                email_2: 'email2@gmail.com',
                email_3: 'email3@gmail.com',
                email_4: 'email4@gmail.com'
            },
            {
                id: 788,
                property_address: '425 N Church st',
                mail_address: '425 N Church st',
                full_name: 'April Lane',
                email: 'email@gmail.com',
                email_2: 'email2@gmail.com',
                email_3: 'email3@gmail.com',
                email_4: 'email4@gmail.com'
            },
            {
                id: 888,
                property_address: '425 N Church st',
                mail_address: '425 N Church st',
                full_name: 'April Lane',
                email: 'email@gmail.com',
                email_2: 'email2@gmail.com',
                email_3: 'email3@gmail.com',
                email_4: 'email4@gmail.com'
            },
            {
                id: 1234,
                property_address: '845 NY Ave',
                mail_address: '845 NY Ave',
                full_name: 'Timothy Marois',
                email: 'email@gmail.com',
                email_2: 'email2@gmail.com',
                email_3: 'email3@gmail.com',
                email_4: 'email4@gmail.com'
            },
            {
                id: 2144,
                property_address: '210 W Trade st',
                mail_address: '210 W Trade st',
                full_name: 'Jason Gordon',
                email: 'email@gmail.com',
                email_2: 'email2@gmail.com',
                email_3: 'email3@gmail.com',
                email_4: 'email4@gmail.com'
            },
            {
                id: 7884,
                property_address: '425 N Church st',
                mail_address: '425 N Church st',
                full_name: 'April Lane',
                email: 'email@gmail.com',
                email_2: 'email2@gmail.com',
                email_3: 'email3@gmail.com',
                email_4: 'email4@gmail.com'
            },
            {
                id: 8884,
                property_address: '425 N Church st',
                mail_address: '425 N Church st',
                full_name: 'April Lane',
                email: 'email@gmail.com',
                email_2: 'email2@gmail.com',
                email_3: 'email3@gmail.com',
                email_4: 'email4@gmail.com'
            }
        ]
    }),
	template: 
	`
        <div class="p-6 bg-gray-100">
            <t-card title="Selection (prop: select)" contentPadding="0">
                <div class="h-72 relative">
                    <t-table-simple 
                        :headers="headers"
                        :items="items"
                        @click-row="rowClicked"
                        @change-selected="updateSelection"
                        @change-sort="updateSorting"
                        select
                        selectFromRow
                        :selectOne="false"
                        fixedHeader
                    />
                </div>
            </t-card>
        </div>
	`,
});

export const WithDefaultValue = () => ({
	// props: Object.keys(argTypes),
	components: { TTableSimple, TCard },
    methods: {
        rowClicked(item) {
            this.clickedRow = item;
        },
        updateSelection(val) {
            this.selected = val;
        },
        updateSorting(item, sortUpdate) {
            // this is simple logic to change sorting
            let newHeaders = [];
            this.headers.forEach(h => {
                if (h.value==item.value) {
                    h.sorted = sortUpdate
                    newHeaders.push(h);
                }
                else {
                    h.sorted = null
                    newHeaders.push(h);
                }
            });

            this.headers = newHeaders;
        }
    },
    data: () => ({
        selected: [],
        clickedRow: {},
        headers: [
            {
                title: 'Property Address',
                value: 'property_address',
                sorting: true,
                sorted: 'DESC',
                sortDefault: 'DESC'
            },
            {
                title: 'Full Name',
                value: 'full_name',
                sorting: true,
                sorted: false,
            },
            {
                title: 'Mailing Address',
                value: 'mail_address',
                sorting: true,
                hide: true,
                sorted: false,
            },
            {
                title: 'Email',
                value: 'email',
                sorting: false,
                hide: false,
                sorted: false,
                width: '100px'
            }
        ],
        items: [
            {
                id: 123,
                property_address: '845 NY Ave',
                mail_address: '845 NY Ave',
                full_name: 'Timothy Marois',
                email: 'email@gmail.com'
            },
            {
                id: 214,
                property_address: '210 W Trade st',
                mail_address: '210 W Trade st',
                full_name: 'Jason Gordon',
                email: 'email@gmail.com'
            },
            {
                id: 788,
                property_address: '425 N Church st',
                mail_address: '425 N Church st',
                full_name: 'April Lane',
                email: 'email@gmail.com'
            },
            {
                id: 888,
                property_address: '425 N Church st',
                mail_address: '425 N Church st',
                full_name: 'April Lane',
                email: 'email@gmail.com'
            }
        ],
        defaultSelected: [0, 1]
    }),
	template: 
	`
        <div class="p-6 bg-gray-100">

            <div class="w-full">
                <t-card title="Selection (prop: select)" contentPadding="0">
                    <t-table-simple 
                        :headers="headers"
                        :items="items"
                        :defaultSelected="defaultSelected"
                        @click-row="rowClicked"
                        @change-selected="updateSelection"
                        @change-sort="updateSorting"
                        select
                        selectFromRow
                        :selectOne="false"
                    />
                </t-card>
            </div>

            <div class="mt-8">
                SELECTED:
                <p v-for="(item, i) in selected" :key="i">{{JSON.stringify(item)}} <br /></p>
            </div>
            
            <div class="mt-8">
                ROW SELECTED: <p>{{JSON.stringify(clickedRow)}}</p>
            </div>

            <div class="mt-8">
                HEADERS: <p>{{JSON.stringify(headers)}}</p>
            </div>

        </div>
	`,
});

export const SelectAllOptions = () => ({
	// props: Object.keys(argTypes),
	components: { TTableSimple, TCard },
    methods: {
        rowClicked(item) {
            this.clickedRow = item;
        },
        updateSelection(val) {
            this.selected = val;
        },
        updateSorting(item, sortUpdate) {
            // this is simple logic to change sorting
            let newHeaders = [];
            this.headers.forEach(h => {
                if (h.value==item.value) {
                    h.sorted = sortUpdate
                    newHeaders.push(h);
                }
                else {
                    h.sorted = null
                    newHeaders.push(h);
                }
            });

            this.headers = newHeaders;
        },
        updateSelectControl(v) {
            this.selectAllOption = v;
        }
    },
    data: () => ({
        selected: [],
        clickedRow: {},
        selectAllOption: null,
        headers: [
            {
                title: 'Property Address',
                value: 'property_address',
                sorting: true,
                sorted: 'DESC',
                sortDefault: 'DESC'
            },
            {
                title: 'Full Name',
                value: 'full_name',
                sorting: true,
                sorted: false,
            },
            {
                title: 'Mailing Address',
                value: 'mail_address',
                sorting: true,
                hide: true,
                sorted: false,
            },
            {
                title: 'Email',
                value: 'email',
                sorting: false,
                hide: false,
                sorted: false,
                width: '100px'
            }
        ],
        items: [
            {
                id: 123,
                property_address: '845 NY Ave',
                mail_address: '845 NY Ave',
                full_name: 'Timothy Marois',
                email: 'email@gmail.com'
            },
            {
                id: 214,
                property_address: '210 W Trade st',
                mail_address: '210 W Trade st',
                full_name: 'Jason Gordon',
                email: 'email@gmail.com'
            },
            {
                id: 788,
                property_address: '425 N Church st',
                mail_address: '425 N Church st',
                full_name: 'April Lane',
                email: 'email@gmail.com'
            },
            {
                id: 888,
                property_address: '425 N Church st',
                mail_address: '425 N Church st',
                full_name: 'April Lane',
                email: 'email@gmail.com'
            }
        ]
    }),
	template: 
	`
        <div class="p-6 bg-gray-100">

            <div class="w-full">
                <t-card title="Selection (prop: select)" contentPadding="0">
                    <t-table-simple 
                        :headers="headers"
                        :items="items"
                        @click-row="rowClicked"
                        @change-selected="updateSelection"
                        @change-sort="updateSorting"
                        select
                        selectFromRow
                        :selectOne="false"
                        selectOptions
                        @select-control="updateSelectControl"
                        totalCount="808"
                    />
                </t-card>
            </div>

            <div class="mt-8">
                SELECTED:
                <p v-for="(item, i) in selected" :key="i">{{JSON.stringify(item)}} <br /></p>
            </div>
            
            <div class="mt-8">
                SELECT OPTION: <p>{{JSON.stringify(selectAllOption)}}</p>
            </div>

        </div>
	`,
});

export const ItemsWithObjects = () => ({
	// props: Object.keys(argTypes),
	components: { TTableSimple, TCard },
    methods: {
        rowClicked(item) {
            this.clickedRow = item;
        },
        updateSelection(val) {
            this.selected = val;
        },
        updateSorting(item, sortUpdate) {
            // this is simple logic to change sorting
            let newHeaders = [];
            this.headers.forEach(h => {
                if (h.value==item.value) {
                    h.sorted = sortUpdate
                    newHeaders.push(h);
                }
                else {
                    h.sorted = null
                    newHeaders.push(h);
                }
            });

            this.headers = newHeaders;
        }
    },
    data: () => ({
        selected: [],
        clickedRow: {},
        headers: [
            {
                title: 'Property Address',
                value: 'property_address',
                sorting: true,
                sorted: 'DESC',
                sortDefault: 'DESC'
            },
            {
                title: 'Full Name',
                value: 'full_name',
                sorting: true,
                sorted: false,
            },
            {
                title: 'Mailing Address',
                value: 'mail_address',
                sorting: true,
                hide: true,
                sorted: false,
            },
            {
                title: 'Property Info',
                value: 'property.info',
                sorting: false,
                hide: false,
                sorted: false,
            },
            {
                title: 'Property Cost',
                value: 'property.cost',
                sorting: false,
                hide: false,
                sorted: false,
            },
            {
                title: 'Property Date',
                value: 'property.date',
                sorting: false,
                hide: false,
                sorted: false,
            },
            {
                title: 'Property Type',
                value: 'property.type',
                sorting: false,
                hide: false,
                sorted: false,
            }
        ],
        items: [
            {
                id: 123,
                property_address: '845 NY Ave',
                mail_address: '845 NY Ave',
                full_name: 'Timothy Marois',
                property: {
                    info: "Info",
                    cost: "Cost",
                    date: "Date",
                    type: "Type"
                }
            },
            {
                id: 214,
                property_address: '210 W Trade st',
                mail_address: '210 W Trade st',
                full_name: 'Jason Gordon',
                property: {
                    info: "Info",
                    cost: "Cost 2",
                    date: "Date",
                    type: "Type"
                }
            },
            {
                id: 788,
                property_address: '425 N Church st',
                mail_address: '425 N Church st',
                full_name: 'April Lane',
                property: {
                    info: "Info",
                    cost: "Cost",
                    date: "Date",
                    type: "Type"
                }
            },
            {
                id: 888,
                property_address: '425 N Church st',
                mail_address: '425 N Church st',
                full_name: 'April Lane',
                property: {
                    info: "Info",
                    cost: "Cost",
                    date: "Date",
                    type: "Type"
                }
            },
            {
                id: 1234,
                property_address: '845 NY Ave',
                mail_address: '845 NY Ave',
                full_name: 'Timothy Marois',
                property: {
                    info: "Info",
                    cost: "Cost",
                    date: "Date",
                    type: "Type"
                }
            },
            {
                id: 2144,
                property_address: '210 W Trade st',
                mail_address: '210 W Trade st',
                full_name: 'Jason Gordon',
                property: {
                    info: "Info",
                    cost: "Cost",
                    date: "Date",
                    type: "Type"
                }
            },
            {
                id: 7884,
                property_address: '425 N Church st',
                mail_address: '425 N Church st',
                full_name: 'April Lane',
                property: {
                    info: "Info",
                    cost: "Cost",
                    date: "Date",
                    type: "Type"
                }
            },
            {
                id: 8884,
                property_address: '425 N Church st',
                mail_address: '425 N Church st',
                full_name: 'April Lane',
                property: {
                    info: "Info",
                    cost: "Cost",
                    date: "Date",
                    type: "Type"
                }
            }
        ]
    }),
	template: 
	`
        <div class="p-6 bg-gray-100">
            <t-card title="Selection (prop: select)" contentPadding="0">
                <div class="h-72 relative">
                    <t-table-simple 
                        :headers="headers"
                        :items="items"
                        @click-row="rowClicked"
                        @change-selected="updateSelection"
                        @change-sort="updateSorting"
                        select
                        selectFromRow
                        :selectOne="false"
                    />
                </div>
            </t-card>
        </div>
	`,
});