import TButton from '../src/components/Elements/TButton';

export default {
	title: 'Elements/TButton',
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
			defaultValue: undefined,
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

// const Template = (args, { argTypes }) => ({
// 	props: Object.keys(argTypes),
// 	components: { TButton },
// 	template: 
// 		`<t-button v-bind="$props" />`,
// });


export const Primary = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TButton },
	template:
		`<t-button v-bind="$props" />`
});
Primary.args = {
	label: 'Primary Button'
};

export const MultipleStates = () => ({
	// props: Object.keys(argTypes),
	components: { TButton },
	template: 
	`
		<div>
			<div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-button label="Button" />
				<t-button label="Button" loading />
				<t-button label="Button" icon="check" />
				<t-button label="Button" icon="check" loading />
				<t-button label="Button" iconRight="arrow-right" />
				<t-button label="Button" iconRight="arrow-right" loading />
			</div>

			<div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-button label="Button" disabled/>
				<t-button label="Button" loading disabled />
				<t-button label="Button" icon="check" disabled />
				<t-button label="Button" icon="check" loading disabled />
				<t-button label="Button" iconRight="arrow-right" disabled />
				<t-button label="Button" iconRight="arrow-right" loading disabled />
			</div>

			<div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-button outlined label="Button" />
				<t-button outlined label="Button" loading  />
				<t-button outlined label="Button" icon="check"  />
				<t-button outlined label="Button" icon="check" loading  />
				<t-button outlined label="Button" iconRight="arrow-right"  />
				<t-button outlined label="Button" iconRight="arrow-right" loading  />
			</div>

			<div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-button outlined label="Button" disabled/>
				<t-button outlined label="Button" loading disabled />
				<t-button outlined label="Button" icon="check" disabled />
				<t-button outlined label="Button" icon="check" loading disabled />
				<t-button outlined label="Button" iconRight="arrow-right" disabled />
				<t-button outlined label="Button" iconRight="arrow-right" loading disabled />
			</div>


			<div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-button text label="Button" />
				<t-button text label="Button" loading  />
				<t-button text label="Button" icon="check"  />
				<t-button text label="Button" icon="check" loading  />
				<t-button text label="Button" iconRight="arrow-right"  />
				<t-button text label="Button" iconRight="arrow-right" loading  />
			</div>

			<div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-button text label="Button" disabled/>
				<t-button text label="Button" loading disabled />
				<t-button text label="Button" icon="check" disabled />
				<t-button text label="Button" icon="check" loading disabled />
				<t-button text label="Button" iconRight="arrow-right" disabled />
				<t-button text label="Button" iconRight="arrow-right" loading disabled />
			</div>

			<div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-button label="Large" size="xl" />
				<t-button label="Large" size="xl" loading />
				<t-button label="Large" size="xl" icon="check" />
				<t-button label="Large" size="xl" icon="check" loading />
				<t-button label="Large" size="xl" iconRight="arrow-right" />
				<t-button label="Large" size="xl" iconRight="arrow-right" loading />
			</div>

			<div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-button label="Small" size="xs" />
				<t-button label="Small" size="xs" loading />
				<t-button label="Small" size="xs" icon="check" />
				<t-button label="Small" size="xs" icon="check" loading />
				<t-button label="Small" size="xs" iconRight="arrow-right" />
				<t-button label="Small" size="xs" iconRight="arrow-right" loading />
			</div>


			<div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-button icon="check" />
				<t-button icon="check" rounded />
				<t-button icon="check" loading />
				<t-button icon="check" disabled />
				<t-button icon="check" loading disabled />
			</div>

			<div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-button icon="check" outlined />
				<t-button icon="check" outlined rounded />
				<t-button icon="check" outlined loading />
				<t-button icon="check" outlined disabled />
				<t-button icon="check" outlined loading disabled />
			</div>

			<div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-button icon="check" text />
				<t-button icon="check" text rounded />
				<t-button icon="check" text loading />
				<t-button icon="check" text disabled />
				<t-button icon="check" text loading disabled />
			</div>



			<div class="mt-10 max-w-md mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-button label="Button" />
				<t-button label="Button" />
				<t-button icon="check" />
				<t-button icon="check" rounded />
			</div>


		</div>
	`,
});
