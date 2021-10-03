import TMenu from '../src/components/Elements/TMenu';

export default {
	title: 'ELEMENTS/TMenu',
	component: TMenu,
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
	components: { TMenu },
	template: 
	`<t-menu v-bind="$props" label="Menu" />`,
});

export const Standard = Template.bind({});
Standard.args = {
	color: 'indigo',
    label: 'Menu',
	items: [
        {
            icon: 'arrow-right',
            label: 'Home',
            value: 'home',
            disabled: false
        },
        {
            icon: null,
            label: 'About',
            value: 'about',
            disabled: false
        },
        {
            icon: null,
            label: 'Contact',
            value: 'contact',
            disabled: false
        }
    ],
};
