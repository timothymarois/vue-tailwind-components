import TSelect from '../src/components/Forms/TSelect';

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
	components: { TSelect },
	template: 
		`<t-select v-bind="$props" />`,
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
