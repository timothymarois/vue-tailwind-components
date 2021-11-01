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

export const Standard = (argTypes) => ({
	props: Object.keys(argTypes),
	components: { TMenu },
    data: () => ({
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
				icon: 'arrow-right',
				label: 'About',
				value: 'about',
				disabled: false
			},
			{
				icon: 'arrow-right',
				label: 'About',
				value: 'about',
				color: 'red',
				hover: 'red',
				disabled: false
			},
			{
				icon: 'arrow-right',
				label: 'Disabled',
				value: 'disabled',
				disabled: true
			}
		],
    }),
	template: 
		`
		<div>
			<div class="ml-10 mt-5 absolute bottom-0" style="width:100px">
				<t-menu :items="items" label="Menu" />
			</div>

			<div class="ml-10 mt-5 float-right" style="width:100px">
				<t-menu :items="items" label="Menu"/>
			</div>

			<div class="ml-10 mt-5" style="width:100px">
				<t-menu :items="items" label="Menu (max height)" side="left" max-height="100" />
			</div>

		</div>
		`,
});