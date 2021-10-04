import TCheckbox from '../src/components/Forms/TCheckbox';

export default {
	title: 'FORMS/TCheckbox',
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
			control: { type: 'boolean'  },
			defaultValue: false,
		},
		label: {
			name: 'label',
			description: 'Toggle text-only button'
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
