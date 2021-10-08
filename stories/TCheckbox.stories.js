import TCheckbox from '../src/components/Forms/TCheckbox.vue';
import TCard from '../src/components/Elements/TCard.vue';

export default {
	title: 'Forms/TCheckbox',
	component: TCheckbox,
	argTypes: { 
		color: {
			name: 'color',
			defaultValue: 'indigo',
			description: 'Tailwind classname for outline and fill color',
			control: { type: 'text' }
		},
		size: {
			name: 'size',
			description: 'Set size of checkbox',
			control: { type: 'number', min: 3 }
		},
		value: {
			name: 'value',
			description: 'Value of checkbox',
			control: { type: 'boolean' },
			defaultValue: false,
		},
		label: {
			name: 'label',
			description: 'Toggle text-only button'
		},
		check: {
			name: 'check',
			description: 'Toggles checkmark in middle of checkbox',
			control: { type: 'boolean' },
		}
	},
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TCheckbox },
	template: 
		`<t-checkbox v-bind="$props" />`,
});

export const Standard = Template.bind({});
Standard.args = {
	color: 'indigo',
	size: 6,
	value: false,
	label: 'Checkbox',
};

export const Check = Template.bind({});
Check.args = {
	color: 'indigo',
	size: 5,
	value: false,
	label: 'Checkbox with check',
	check: true
}

export const MultipleValues = (argTypes) => ({
	props: Object.keys(argTypes),
	components: { TCheckbox, TCard },
    data: () => ({
        value: false,
		valueTwo: false,
		valueThree: 'Inactive'
    }),
	computed: {
		firstValue() {
			return this.value.toString(); 
		}
	},
	methods: {

	},
	template: 
		`
        <div>

            <t-card title="Default State (checked = true)">
				<t-checkbox v-model="value" label="Boolean True/false" />
				value: {{ firstValue }}
			</t-card>

			<t-card title="Reverse (checked = false)" subtitle="You can reverse the true/false state values" class="mt-2">
				<t-checkbox v-model="valueTwo" label="Boolean True/false" :trueValue="false" :falseValue="true" />
				value: {{ valueTwo.toString() }}
			</t-card>

			<t-card title="String (checked = 'Active')" subtitle="You can use a string for true/false state values" class="mt-2">
				<t-checkbox v-model="valueThree" label="String Active/Inactive" :trueValue="'Active'" :falseValue="'Inactive'" />
				value: {{ valueThree.toString() }}
			</t-card>

        </div>
		`,
});
