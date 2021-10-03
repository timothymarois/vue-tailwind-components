import TMenu from '../src/components/Elements/TMenu';
import TButton from '../src/components/Elements/TButton';

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
		label: {
			name: 'label',
			description: 'Toggle text-only button'
		}
	},
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TMenu, TButton },
	template: 
	`
		<div class="max-w-xl">
			<t-menu v-bind="$props" label="Menu" />
		</div>
	`,
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
