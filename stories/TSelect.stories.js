import TSelect from '../src/components/Forms/TSelect';
import TCard from '../src/components/Elements/TCard';


export default {
	title: 'FORMS/TSelect',
	component: TSelect,
	argTypes: { 
		color: {
			name: 'color',
			defaultValue: 'indigo',
			description: 'Tailwind classname for outline and fill color',
			control: { type: 'text' }
		},
		value: {
			name: 'value',
			description: 'Value of checkbox',
			control: { type: 'text' },
			defaultValue: null,
		},
		label: {
			name: 'label',
			description: 'Toggle text-only button'
		}
	},
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TSelect },
	template: 
		`<t-select label="Select an option" required v-bind="$props" />`,
});

export const Standard = Template.bind({});
Standard.args = {
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
};


export const MultipleStates = (argTypes) => ({
	props: Object.keys(argTypes),
	components: { TSelect, TCard },
    data: () => ({
        value: null,
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

				<t-card title="Empty Options" class="mt-4">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-select v-model="value" label="Standard"  placeholder="Select One" />
						<t-select searchable v-model="value" label="Searchable" placeholder="Select One" />
					</div>
				</t-card>

				<t-card title="Empty External Options" class="mt-4">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-select v-model="value" label="Standard"  placeholder="Select One" external />
						<t-select searchable v-model="value" label="Searchable" placeholder="Select One" external />
					</div>
				</t-card>

				<t-card title="Disabled" class="mt-4">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-select disabled v-model="value" label="Standard Disabled" :options="options" placeholder="Select One" />
						<t-select disabled searchable v-model="value" label="Disabled Searchable" :options="options" placeholder="Select One" />
					</div>
				</t-card>

			</div>
		</div>
		`,
});
