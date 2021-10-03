import TTextField from '../src/components/Forms/TTextField';

export default {
	title: 'FORMS/TTextField',
	component: TTextField,
	argTypes: { 
		value: {
			name: 'value',
			description: 'Value of text field',
			defaultValue: null,
		},
		label: {
			name: 'label',
			description: ''
		},
        placeholder: {
			name: 'placeholder',
			description: ''
		}
	},
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TTextField },
	template: 
		`<t-text-field v-bind="$props" />`,
});

export const Standard = Template.bind({});
Standard.args = {
	value: null,
	placeholder: 'Placeholder',
	label: 'Label'
};
