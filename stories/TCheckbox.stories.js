export default {
	title: 'Forms/TCheckbox',
	argTypes: { 
		color: {
			name: 'color',
			description: 'Tailwind classname for fill color',
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
		},
		borderColor: {
			name: 'borderColor',
			description: 'Tailwind classname for outline color',
			control: { type: 'text' }
		}
	},
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
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
    data: () => ({
        value: true,
		valueTwo: false,
		valueThree: 'Inactive'
    }),
	template: 
		`
        <div>

            <t-card title="Default State (checked = true) (disabled)">
				<t-checkbox v-model="value" label="Boolean True/false" />
				value: {{ value.toString() }}
			</t-card>

			<t-card title="Reverse (checked = false)" subtitle="You can reverse the true/false state values" class="mt-2">
				<t-checkbox v-model="valueTwo" label="Boolean True/false" :trueValue="false" :falseValue="true" disabled />
				value: {{ valueTwo.toString() }}
			</t-card>

			<t-card title="String (checked = 'Active')" subtitle="You can use a string for true/false state values" class="mt-2">
				<t-checkbox v-model="valueThree" label="String Active/Inactive" :trueValue="'Active'" :falseValue="'Inactive'" />
				value: {{ valueThree.toString() }}
			</t-card>

        </div>
		`,
});

export const Radio = (argTypes) => ({
	props: Object.keys(argTypes),
    data: () => ({
        value: 'option_1'
    }),
	computed: {
		firstValue() {
			return this.value.toString(); 
		}
	},
	template: 
		`
        <div>
            <t-card title="Radio group">
				<div class="flex flex-col space-y-3">
					<t-checkbox v-model="value" label="Option 1" trueValue="option_1" :radio="true" />
					<t-checkbox v-model="value" label="Option 2" trueValue="option_2" :radio="true" />
					<t-checkbox v-model="value" label="Option 3" trueValue="option_3" :radio="true" />
					<t-checkbox v-model="value" label="Option 4" trueValue="option_4" :radio="true" />
					value: {{ firstValue }}
				</div>
			</t-card>
        </div>
		`,
});

