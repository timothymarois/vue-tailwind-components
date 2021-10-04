import TSwitch from '../src/components/Forms/TSwitch.vue';

export default {
	title: 'Forms/TSwitch',
	component: TSwitch,
	argTypes: { 
		color: {
			name: 'color',
			defaultValue: 'indigo',
			description: 'Tailwind classname for outline and fill color',
			control: { type: 'text' }
		},
		inset: {
			name: 'inset',
			description: 'Toogle inset of switch',
			control: { type: 'boolean' },
		},
		value: {
			name: 'value',
			description: 'Value of switch',
			control: { type: 'boolean' },
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
	components: { TSwitch },
	template: 
		`<t-switch v-bind="$props" />`,
});

export const Standard = Template.bind({});
Standard.args = {
	color: 'indigo',
	inset: false,
	value: false,
	label: 'Switch',
};

export const Inset = Template.bind({});
Inset.args = {
	color: 'indigo',
	inset: true,
	value: false,
	label: 'Switch',
};