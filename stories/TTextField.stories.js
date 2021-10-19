import TTextField from '../src/components/Forms/TTextField';

export default {
	title: 'FORMS/TTextField',
	component: TTextField,
	argTypes: { 
		value: {
			name: 'value',
			description: 'Set default value of text field'
		},
		label: {
			name: 'label',
			description: 'Set label of text field'
		},
        placeholder: {
			name: 'placeholder',
			description: 'Set placeholder for text field'
		},
		clearable: {
			name: 'clearable',
			description: 'Toggle adding clear option to text field'
		}
	},
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TTextField },
	data: () => ({
		cleared: false
	}),
	template: 
		`
		<div>
			<t-text-field v-bind="$props" @cleared="cleared = true" />
			<div class="mt-4" v-if="cleared">
				Input field cleared
			</div>
		</div>
		`,
});

export const Standard = Template.bind({});
Standard.args = {
	value: null,
	placeholder: 'Placeholder',
	label: 'Label'
};
