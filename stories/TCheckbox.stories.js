import TCheckbox from '../src/components/Forms/TCheckbox.vue';

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