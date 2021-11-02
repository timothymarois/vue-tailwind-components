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
    }),
	template: 
		`
		<div>
			<div class="ml-10 mt-5">
				<t-menu :items="items" label="Menu" side="left">
					Menu with text
				</t-menu>
			</div>

			<div class="ml-10 mt-5" style="width:100px">
				<t-menu :items="items" label="Menu with button" side="left">
					<t-button :color="indigo">
						Menu with button
					</t-button>
				</t-menu>
			</div>

			<div class="ml-10 mt-5" style="width:100px">
				<t-menu :items="items" label="Menu with button (min width)" side="left" min-width="300">
					<t-button :color="indigo">
						Menu with button (min width)
					</t-button>
				</t-menu>
			</div>

		</div>
		`,
});