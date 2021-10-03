import TIcon from '../src/components/Elements/TIcon';

export default {
	title: 'ELEMENTS/TIcon',
	component: TIcon,
	argTypes: { 
		value: {
			name: 'value',
			description: 'Icon to display'
		}
	},
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TIcon },
	template: 
		`<t-icon v-bind="$props" />`,
});

export const Standard = Template.bind({});
Standard.args = {
	value: 'check'
};
