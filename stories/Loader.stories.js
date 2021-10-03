import TLoader from '../src/components/Elements/TLoader';

export default {
	title: 'ELEMENTS/TLoader',
	component: TLoader,
	argTypes: { 
		color: {
			name: 'color',
			defaultValue: 'indigo',
			description: 'Tailwind classname for loader color',
			control: { type: 'text' }
		},
		size: {
			name: 'size',
			description: 'Set size of loader',
			control: { type: 'number', min: 4 }
	},
	},
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TLoader },
	template: 
		`
		<t-loader v-bind="$props" />
		`,
});

export const Standard = Template.bind({});
Standard.args = {
	color: 'indigo',
	size: 12
};
