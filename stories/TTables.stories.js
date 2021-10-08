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
                value: 'property_address'
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
                        v-model="selected"
                        :headers="headers"
                        :items="items"
                    />
                </t-card>
            </div>

            <div class="w-full mt-4">
                <t-card title="Basic Table without Headers (prop: hideHeader)" contentPadding="0">
                    <t-table-simple 
                        v-model="selected"
                        :headers="headers"
                        :items="items"
                        hideHeader
                    />
                </t-card>
            </div>

            <div class="w-full mt-4">
                <t-card title="Default No Content" contentPadding="0">
                    <t-table-simple 
                        v-model="selected"
                        :headers="headers"
                        :items="[]"
                    />
                </t-card>
            </div>

            <div class="w-full mt-4">
                <t-card title="Custom No Content (prop: nodata)" contentPadding="0">
                    <t-table-simple 
                        v-model="selected"
                        :headers="headers"
                        :items="[]"
                        nodata="There was no items found"
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
    data: () => ({
        selected: [],
        headers: [
            {
                title: 'Property Address',
                value: 'property_address',
                sorting: true,
                sort: 'DESC',
                sorted: 'DESC'
            },
            {
                title: 'Full Name',
                value: 'full_name',
                sorting: true,
                sorted: null
            },
            {
                title: 'Mailing Address',
                value: 'mail_address',
                sorting: true,
                sorted: null
            }
        ],
        items: [
            {
                id: 123,
                property_address: '845 NY Ave',
                mail_address: '845 NY Ave',
                full_name: 'Timothy Marois'
            },
            {
                id: 214,
                property_address: '210 W Trade st',
                mail_address: '210 W Trade st',
                full_name: 'Jason Gordon'
            },
            {
                id: 788,
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
                <t-card title="Selection (prop: select)" contentPadding="0">
                    <t-table-simple 
                        v-model="selected"
                        :headers="headers"
                        :items="items"
                        select
                        selectFromRow
                    />
                </t-card>
            </div>

            <div class="mt-8">
                <p v-for="(item, i) in selected" :key="i">
                    {{JSON.stringify(item)}} <br />
                </p>
            </div>

        </div>
	`,
});

export const LoadingState = () => ({
	// props: Object.keys(argTypes),
	components: { TTableSimple, TCard },
    data: () => ({
        selected: [],
        headers: [
            {
                title: 'Property Address',
                value: 'property_address'
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
                id: 123,
                property_address: '845 NY Ave',
                mail_address: '845 NY Ave',
                full_name: 'Timothy Marois'
            },
            {
                id: 214,
                property_address: '210 W Trade st',
                mail_address: '210 W Trade st',
                full_name: 'Jason Gordon'
            },
            {
                id: 788,
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
                <t-card title="Selection (prop: select)" contentPadding="0">
                    <t-table-simple 
                        v-model="selected"
                        :headers="headers"
                        :items="items"
                        select
                        selectFromRow
                        loading
                    />
                </t-card>
            </div>

            <div class="mt-8">
                <p v-for="(item, i) in selected" :key="i">
                    {{JSON.stringify(item)}} <br />
                </p>
            </div>

        </div>
	`,
});