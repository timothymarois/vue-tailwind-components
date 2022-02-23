import TButton from '../src/components/Elements/TButton.vue';
import TIcon from '../src/components/Elements/TIcon.vue';

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
	components: { TButton, TIcon },
	template:
		`<t-button v-bind="$props" />`
});
Primary.args = {
	label: 'Primary Button'
};

export const MultipleStates = () => ({
	// props: Object.keys(argTypes),
	components: { TButton, TIcon },
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
				<t-button text label="Button" color="blue" colorLevel="500" />
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
				<t-button size="xs" icon>
					<template slot="icon"><t-icon value="check" /></template>
				</t-button>
				<t-button size="xs" icon rounded>
					<template slot="icon"><t-icon value="check" /></template>
				</t-button>
				<t-button size="xs" icon loading>
					<template slot="icon"><t-icon value="check" /></template>
				</t-button>
				<t-button size="xs" icon disabled>
					<template slot="icon"><t-icon value="check" /></template>
				</t-button>
				<t-button size="xs" icon loading disabled>
					<template slot="icon"><t-icon value="check" /></template>
				</t-button>
			</div>

			<div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-button size="xs" icon>
					<t-icon value="check" />
				</t-button>
				<t-button size="xs" icon rounded>
					<t-icon value="check" />
				</t-button>
				<t-button size="xs" icon loading>
					<t-icon value="check" />
				</t-button>
				<t-button size="xs" icon disabled>
					<t-icon value="check" />
				</t-button>
				<t-button size="xs" icon loading disabled>
					<t-icon value="check" />
				</t-button>
			</div>

			<div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-button size="xs" icon="check" />
				<t-button size="xs" icon="check" rounded />
				<t-button size="xs" icon="check" loading />
				<t-button size="xs" icon="check" disabled />
				<t-button size="xs" icon="check" loading disabled />
			</div>
		
			<div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-button icon="check" />
				<t-button icon="check" rounded />
				<t-button icon="check" loading />
				<t-button icon="check" disabled />
				<t-button icon="check" loading disabled />
			</div>

			<div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-button size="lg" icon="check" />
				<t-button size="lg" icon="check" rounded />
				<t-button size="lg" icon="check" loading />
				<t-button size="lg" icon="check" disabled />
				<t-button size="lg" icon="check" loading disabled />
			</div>

			<div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-button size="xl" icon="check" />
				<t-button size="xl" icon="check" rounded />
				<t-button size="xl" icon="check" loading />
				<t-button size="xl" icon="check" disabled />
				<t-button size="xl" icon="check" loading disabled />
			</div>

			<div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-button icon="library" outlined />
				<t-button icon="library" outlined rounded />
				<t-button icon="library" outlined loading />
				<t-button icon="library" outlined disabled />
				<t-button icon="library" outlined loading disabled />
			</div>

			<div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-button icon="library" outlined iconSolid />
				<t-button icon="library" outlined iconSolid rounded />
				<t-button icon="library" outlined iconSolid loading />
				<t-button icon="library" outlined iconSolid disabled />
				<t-button icon="library" outlined iconSolid loading disabled />
			</div>

			<div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-button icon="check" text />
				<t-button icon="check" text rounded />
				<t-button icon="check" text loading />
				<t-button icon="check" text disabled />
				<t-button icon="check" text loading disabled />
			</div>



			<div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-button outlined label="Button" color="red" />
				<t-button outlined label="Button" color="red" loading  />
				<t-button outlined label="Button" color="red" icon="check"  />
				<t-button outlined label="Button" color="red" icon="check" loading  />
				<t-button outlined label="Button" color="red" iconRight="arrow-right"  />
				<t-button outlined label="Button" color="red" iconRight="arrow-right" loading  />
			</div>

			<div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-button outlined label="Button" color="red" color-level="600" />
				<t-button outlined label="Button" color="red" color-level="600" loading  />
				<t-button outlined label="Button" color="red" color-level="600" icon="check"  />
				<t-button outlined label="Button" color="red" color-level="600" icon="check" loading  />
				<t-button outlined label="Button" color="red" color-level="600" iconRight="arrow-right"  />
				<t-button outlined label="Button" color="red" color-level="600" iconRight="arrow-right" loading  />
			</div>

			<div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-button label="Button" color="red" />
				<t-button label="Button" color="red" loading  />
				<t-button label="Button" color="red" icon="check"  />
				<t-button label="Button" color="red" icon="check" loading  />
				<t-button label="Button" color="red" iconRight="arrow-right"  />
				<t-button label="Button" color="red" iconRight="arrow-right" loading  />
			</div>

			<div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-button label="Button" color="red" color-level="600" />
				<t-button label="Button" color="red" color-level="600" loading  />
				<t-button label="Button" color="red" color-level="600" icon="check"  />
				<t-button label="Button" color="red" color-level="600" icon="check" loading  />
				<t-button label="Button" color="red" color-level="600" iconRight="arrow-right"  />
				<t-button label="Button" color="red" color-level="600" iconRight="arrow-right" loading  />
			</div>


		</div>
	`,
});
