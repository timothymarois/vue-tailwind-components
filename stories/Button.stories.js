import TButton from '../src/components/Elements/Button.vue';

export default {
	title: 'ELEMENTS/TButton',
	component: TButton,
	argTypes: {
		color: {
			name: 'color',
			defaultValue: 'indigo',
			description: 'Tailwind classname for background color',
			options: ['indigo', 'red', 'blue'],
			control: { type: 'select' },
		},
		loading: {
			name: 'loading',
			defaultValue: false,
			description: 'Toggle loading state'
		},
		to: {
			name: 'to',
			description: 'Redirects using vue-router'
		},
		href: {
			name: 'href',
			description: 'Redirects using browser as normal link'
		},
		borderColor: {
			name: 'borderColor',
			description: 'Tailwind classname for border color',
			control: { type: 'text' }
		},
		size: {
			name: 'size',
			description: 'Set size of button',
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
			control: { type: 'select' },
			defaultValue: 'md',
		},
		padding: {
			name: 'padding',
			description: 'Set padding of button.  This may overwrite size.'
		},
		target: {
			name: 'target',
			description: 'Set target of `<a>` link',
			options: ['_blank',null],
			control: { type: 'select' }
		},
		text: {
			name: 'text',
			description: 'Toggle text-only button'
		},
		iconSize: {
			name: 'iconSize',
			description: 'Set size of icons (including spinner)'
		}
	},
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TButton },
	template: 
		`<t-button v-bind="$props" />`,
});

export const Standard = Template.bind({});
Standard.args = {
	label: 'Standard Button'
};

export const Outlined = Template.bind({});
Outlined.args = {
	outlined: true,
	label: 'Outlined Button'
};
