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
	components: { TMenu, TButton },
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
		menuOpen: false
    }),
	template: 
		`
		<div>
			<div class="ml-10 mt-5">
				<t-menu :items="items" side="left">
					Menu with text
				</t-menu>
			</div>

			<div class="ml-10 mt-5">
				<t-menu :items="items" side="left">
					<t-button :color="indigo">
						Menu with button
					</t-button>
				</t-menu>
			</div>

			<div class="ml-10 mt-5">
				<t-menu :items="items" side="left" @menu-open="menuOpen = !menuOpen" min-width="300">
					<t-button :color="indigo" :iconRight="menuOpen ? 'chevron-up' : 'chevron-down'">
						Menu with button and icon
					</t-button>
				</t-menu>
			</div>

		</div>
		`,
});