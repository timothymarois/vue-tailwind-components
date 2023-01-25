import TSelect from '../src/components/Forms/TSelect';
import TButton from '../src/components/Elements/TButton.vue';
import TCard from '../src/components/Elements/TCard';


export default {
	title: 'FORMS/TSelect',
	component: TSelect,
	argTypes: { 
		color: {
			name: 'color',
			description: 'Tailwind classname for fill color of checkbox',
			control: { type: 'text' }
		},
		multiple: {
			name: 'multiple',
			description: 'Allow selection of multiple options',
			control: { type: 'boolean' }
		},
		returnObject: {
			name: 'returnObject',
			description: 'Toggle between returning objects/only values',
			control: { type: 'boolean' }
		},
		loading: {
			name: 'loading',
			description: 'Toggle between loading state',
			control: { type: 'boolean' }
        },
        showIcon: {
            name: 'showIcon',
            description: 'Show icon in front of the placeholder',
            control: { type: 'boolean'}
        },
        iconName: {
            name: 'iconName',
            description: 'Icon name',
            control: { type: 'text'}
        }
	},
};

export const Standard = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TSelect, TButton },
	data: () => ({
		options: null
	}),
	template: 
	`
		<div>
			<div class="w-1/2">
				<t-select label="Select an option" v-model="value" required :options="options" searchable v-bind="$props" />
			</div>
			<div class="mt-16">returnObject is set to <b>{{ returnObject }}</b>, so v-model equals: <br> {{ value }}</div>
			<t-button @click="loadOptions">Load Options</t-button>
		</div>
	`,
	methods: {
		loadOptions() {
			this.options = [
				{
					label:'daanj33@gmail.com',
					value:'12332-4592dz-dsdfs'
				},
				{
					label:'example@example.com',
					value:'9234923s-32jidsf-34234'
				}
			];
		}
	},
});

Standard.args = {
	color: 'indigo',
	value: '12332-4592dz-dsdfs',
	returnObject: false,
};

export const TextFieldSelectCombination = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TSelect },
	data: () => ({
		search: null
	}),
	methods: {
		setSearch(v) {
			this.search = v;
		}
	},
	template: 
		`
		<div>
			<div class="w-1/2">
				<t-select label="Select an option" searchable textField @search="setSearch" placeholder="Start typing" required v-bind="$props" />
			</div>
			<div class="mt-16">returnObject is set to <b>{{ returnObject }}</b>, so search equals: <br> {{ search }}</div>
		</div>
		`,
});

TextFieldSelectCombination.args = {
	color: 'indigo',
	options: ['exclude', 'include'],
	returnObject: false,
};


export const MultipleSelect = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TSelect },
	template: `
		<div>
			<t-select label="Select an option" v-model="value" required v-bind="$props" />
			<div class="mt-8">
				Selected: <br>
				{{ value }}
			</div>
		</div>
	`,
});

MultipleSelect.args = {
	color: 'indigo',
	options: [
        {
            label: 'option 1',
            value: 'option_1'
        },
        {
            label: 'option 2',
            value: 'option_2'
        },
        {
            label: 'option 3',
            value: 'option_3'
        }
    ],
	returnObject: false,
	multiple: true,
	value: ["option_1", "option_3"] // Selected option(s) by default
};

export const SlotOpener = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TSelect },
	template: 
		`
		<div>
			<div class="w-1/2">
				<t-select label="Select an option" v-model="value" required v-bind="$props">
					<template slot="opener">
						{{ value.join(", ") }}
					</template>
				</t-select>
			</div>
			<div class="mt-16">returnObject is set to <b>{{ returnObject }}</b>, so v-model equals: <br> {{ value }}</div>
		</div>
		`,
});

SlotOpener.args = {
	color: 'indigo',
	options: [
        {
            label: 'option 1',
            value: 'option_1'
        },
        {
            label: 'option 2',
            value: 'option_2'
        },
        {
            label: 'option 3',
            value: 'option_3'
        }
    ],
	returnObject: false,
	multiple: true,
	value: ["option_1", "option_3"] // Selected option(s) by default
};

export const GroupedSelect = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TSelect, TCard },
	data: () => ({
		value1: null,
		value2: null
	}),
	template: `
	<div class="p-6 bg-gray-100 absolute inset-0 w-full h-full">
		<div class="max-w-2xl">
			<t-card title="Grouped Multiple Select">
				<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
					<t-select v-model="value1" label="Standard" :options="options" grouped multiple placeholder="Select One" />
					<t-select v-model="value1" label="Searchable" :options="options" grouped multiple searchable placeholder="Select One" clearable />
				</div>
				{{ value1 }}
			</t-card>
			<t-card title="Grouped Select" class="mt-4">
				<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
					<t-select v-model="value2" label="Standard" :options="options" grouped placeholder="Select One" />
					<t-select v-model="value2" label="Searchable" :options="options" grouped searchable placeholder="Select One" />
				</div>
				</div>
			</t-card>
		</div>
	</div>
	`,
});

GroupedSelect.args = {
	color: 'indigo',
	options: [
		{
			groupName: "Dogs",
			items: [
				{
					label: 'Dog 1',
					value: 'dog_1'
				},
				{
					label: 'Dog 2',
					value: 'dog_2'
				},
				{
					label: 'Dog 3',
					value: 'dog_3'
				}
			]
		},
		{
			groupName: "Cats",
			items: [
				{
					label: 'Cat 1',
					value: 'cat_1'
				},
				{
					label: 'Cat 2',
					value: 'cat_2'
				},
				{
					label: 'Cat 3',
					value: 'cat_3'
				}
			]
		}
	],
	returnObject: false,
	grouped: true
};

export const StandardStates = (argTypes) => ({
	props: Object.keys(argTypes),
	components: { TSelect, TCard },
	methods: {
		createNew(v) {
			this.clearableValue=null
		}
	},
	mounted() {
		setTimeout(()=>{
			this.optionsArrayDefault2 = 'option_3'
		},5000)
	},
    data: () => ({
		empty: null,
        value: null,
		multipleValue: null,
		clearableValue: null,
		maxHeightValue: null,
		valueExternalDelay: null,
		loadingDelay: false,
		optionsArrayDefault: 'option_1',
		withDefault: 'option_1',
		withDefaultArray: ['option_1','option_2'],
		optionsArray: ['option_1','option_2','option_3','option_4'],
		optionsArrayDefault2: 'option_2',
		optionsArrayDelay: [],
		options: [
			{
				label: 'option 1',
				value: 'option_1'
			},
			{
				label: 'option 2',
				value: 'option_2'
			},
			{
				label: 'option 3',
				value: 'option_3'
			}
		],
		options2: [
			{
				label: 'option 1',
				value: 'option_1'
			},
			{
				label: 'option 2',
				value: 'option_2'
			},
			{
				label: 'option 3',
				value: 'option_3'
			},
			{
				label: 'option 4',
				value: 'option_4',
				disabled: true
			},
			{
				label: 'option 5',
				value: 'option_5'
			},
			{
				label: 'option 6',
				value: 'option_6'
			},
			{
				label: 'option 7',
				value: 'option_7'
			},
			{
				label: 'option 8',
				value: 'option_8'
			},
			{
				label: 'option 9',
				value: 'option_9'
			}
		],
		optionsWithKey: [
			{
				optionListLabel: `
					<div class="flex">
						<div class="h-6 w-6 rounded-full bg-indigo-700 text-white flex items-center justify-center font-2xl font-semibold mr-2">DL</div>
						option 1
					</div>
				`,
				label: 'option 1',
				key: 'option_1'
			},
			{
				label: 'option 2',
				key: 'option_2'
			},
			{
				label: 'option 3',
				key: 'option_3'
			}
		],
    }),
	template: 
		`
        <div class="p-6 bg-gray-100">
            <div class="max-w-2xl">

                <t-card title="Standard">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-select v-model="value" label="Standard" :options="options" placeholder="Select One" />
						<t-select searchable v-model="value" label="Searchable" :options="options" placeholder="Select One" />
					</div>
				</t-card>

				<t-card title="Standard with Default Value" class="mt-4">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-select v-model="withDefault" label="Standard" :options="options" placeholder="Select One" />
						<t-select searchable v-model="withDefault" label="Searchable" :options="options" placeholder="Select One" />
					</div>
				</t-card>

				<t-card title="Standard with Different itemValue" class="mt-4">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-select itemValue="key" v-model="empty" label="Standard" :options="optionsWithKey" placeholder="Select One" />
						<t-select itemValue="key" searchable v-model="empty" label="Searchable" :options="optionsWithKey" multiple placeholder="Select One" />
					</div>
				</t-card>

				<t-card title="Standard (Array Options + default)" class="mt-4">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-select v-model="optionsArrayDefault" label="Standard" :options="optionsArray" placeholder="Select One" />
						<t-select searchable v-model="optionsArrayDefault" label="Searchable" :options="optionsArray" placeholder="Select One" />
					</div>
				</t-card>

				<t-card title="Standard (Array Options + default + 5s change)" class="mt-4">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-select v-model="optionsArrayDefault2" label="Standard" :options="optionsArray" placeholder="Select One" />
						<t-select searchable v-model="optionsArrayDefault2" label="Searchable" :options="optionsArray" placeholder="Select One" />
					</div>
				</t-card>

				<t-card title="Standard with clearable and create prop" class="mt-4">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-select clearable create v-model="clearableValue" label="Standard" :options="options" placeholder="Select One" @create-new="createNew" />
						<t-select searchable clearable create v-model="clearableValue" label="Searchable" :options="options" placeholder="Select One" @create-new="createNew" />
					</div>
				</t-card>

				<t-card title="Standard with scroll bar" class="mt-4">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-select v-model="maxHeightValue" label="Standard" :options="options2" placeholder="Select One" />
						<t-select searchable v-model="maxHeightValue" label="Searchable" multiple :options="options2" placeholder="Select One" />
					</div>
				</t-card>

				<t-card title="Empty Options" class="mt-4">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-select v-model="value" label="Standard"  placeholder="Select One" />
						<t-select searchable v-model="value" label="Searchable" placeholder="Select One" />
					</div>
				</t-card>

				<t-card title="Loading State" class="mt-4">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-select loading v-model="value" label="Standard"  placeholder="Select One" />
						<t-select loading searchable v-model="value" label="Searchable" placeholder="Select One" />
					</div>
				</t-card>

			</div>
		</div>
		`,
});



export const MultipleStates = (argTypes) => ({
	props: Object.keys(argTypes),
	components: { TSelect, TCard },
	methods: {
		createNew(v) {
			this.clearableValue=null
		}
	},
	mounted() {
		setTimeout(() => {
			this.optionsArrayDefault2 = 'option_3'
		}, 5000);
	},
    data: () => ({
		empty: null,
        value: null,
		multipleValue: null,
		clearableValue: null,
		maxHeightValue: null,
		valueExternalDelay: null,
		loadingDelay: false,
		optionsArrayDefault: 'option_1',
		withDefault: 'option_1',
		withDefaultArray: ['option_1','option_2'],
		optionsArray: ['option_1','option_2','option_3','option_4'],
		optionsArrayDefault2: 'option_2',
		optionsArrayDelay: [],
		options: [
			{
				label: 'option 1',
				value: 'option_1'
			},
			{
				label: 'option 2',
				value: 'option_2'
			},
			{
				label: 'option 3',
				value: 'option_3'
			}
		],
		options2: [
			{
				label: 'option 1',
				value: 'option_1'
			},
			{
				label: 'option 2',
				value: 'option_2'
			},
			{
				label: 'option 3',
				value: 'option_3'
			},
			{
				label: 'option 4',
				value: 'option_4'
			},
			{
				label: 'option 5',
				value: 'option_5'
			},
			{
				label: 'option 6',
				value: 'option_6'
			},
			{
				label: 'option 7',
				value: 'option_7'
			},
			{
				label: 'option 8',
				value: 'option_8'
			},
			{
				label: 'option 9',
				value: 'option_9'
			}
		],
		optionsWithKey: [
			{
				label: 'option 1',
				key: 'option_1'
			},
			{
				label: 'option 2',
				key: 'option_2'
			},
			{
				label: 'option 3',
				key: 'option_3'
			}
		],
    }),
	template: 
		`
        <div class="p-6 bg-gray-100">
            <div class="max-w-2xl">

				<t-card title="Multiple" class="mt-4">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-select multiple clearable v-model="multipleValue" label="Standard" :options="options" placeholder="Select Many" />
						<t-select multiple searchable v-model="multipleValue" label="Searchable" :options="options" placeholder="Select Many" />
					</div>
				</t-card>

				<t-card title="Multiple with Default Value" class="mt-4">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-select multiple v-model="withDefaultArray" label="Standard" :options="options" placeholder="Select Many" />
						<t-select multiple searchable v-model="withDefaultArray" label="Searchable" :options="options" placeholder="Select Many" />
					</div>
				</t-card>

				<t-card title="Multiple (Array Options)" class="mt-4">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-select multiple clearable v-model="multipleValue" label="Standard" :options="options" placeholder="Select Many" />
						<t-select multiple searchable v-model="multipleValue" label="Searchable" :options="options" placeholder="Select Many" />
					</div>
				</t-card>

				<t-card title="Multiple (No Options + Create)" class="mt-4">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-select multiple clearable v-model="multipleValue" label="Standard" :options="options" create placeholder="Select Many" />
						<t-select multiple searchable v-model="multipleValue" label="Searchable" :options="options" create placeholder="Select Many" />
					</div>
				</t-card>

			</div>
		</div>
		`,
});


import axios from 'axios';

export const ExternalStates = (argTypes) => ({
	props: Object.keys(argTypes),
	components: { TSelect, TCard },
	methods: {
		createNew(v) {
			this.clearableValue=null
		},
		search(s) {
			this.loading = true
			this.options = [];
			axios
			.get('https://api.openbrewerydb.org/breweries/search?per_page=20&query='+s)
			.then((r) => {
				this.loading = false
				this.options = r.data
			})
		}
	},
    data: () => ({
		loading: false,
		valueExternalObj: null,
		valueExternalValue: null,
		options: [],
    }),
	template: 
		`
        <div class="p-6 bg-gray-100">
            <div class="max-w-2xl">

				<t-card title="External: Empty Options" class="mt-4">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-select v-model="value" label="Standard"  placeholder="Select One" external />
						<t-select searchable v-model="value" label="Searchable" placeholder="Select One" external />
					</div>
				</t-card>

				<t-card title="External: Disabled State" class="mt-4">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-select v-model="value" label="Standard"  placeholder="Select One" external disabled />
						<t-select searchable v-model="value" label="Searchable" placeholder="Select One" external disabled />
					</div>
				</t-card>

				<t-card title="External: API Search (return Value) + clearable" class="mt-4">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-select @search="search" :loading="loading" v-model="valueExternalValue" label="Standard"  placeholder="Select One" external :options="options" itemValue="name" itemLabel="name" clearable />
						<t-select @search="search" :loading="loading" searchable v-model="valueExternalValue" label="Searchable" placeholder="Select One" :options="options" external itemValue="name" itemLabel="name" clearable />
					</div>

					<template slot="footer">
						<div>Selected: {{ valueExternalValue }}</div>
					</template>
				</t-card>

				<t-card title="External: API Search (return Object) + clearable" class="mt-4">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-select @search="search" :loading="loading" v-model="valueExternalObj" label="Standard"  placeholder="Select One" external :options="options" itemValue="name" itemLabel="name" returnObject clearable />
						<t-select @search="search" :loading="loading" searchable v-model="valueExternalObj" label="Searchable" placeholder="Select One" :options="options" external itemValue="name" itemLabel="name" returnObject clearable />
					</div>

					<template slot="footer">
						<div>Selected: {{ valueExternalObj }}</div>
					</template>
				</t-card>

			</div>
		</div>
		`,
});