import TTooltip from '../src/components/Elements/TTooltip.vue';
import TButton from '../src/components/Elements/TButton.vue';
import TIcon from '../src/components/Elements/TIcon.vue';


export default {
	title: 'Elements/TTooltip',
	component: TTooltip,
	argTypes: {
		position: {
			name: 'position',
			description: 'Position of tooltip relative to element',
			options: ['left', 'top', 'right', 'bottom'],
			control: { type: 'select' },
		},
		content: {
			name: 'content',
			description: 'Content of tooltip',
		},
		color: {
			name: 'color',
			description: 'Background color of tooltip',
			control: { type: 'text' }
		},
		textColor: {
			name: 'textColor',
			description: 'Text color of tooltip',
			control: { type: 'text' }
		}
	}
};

export const Button = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TTooltip, TButton },
	template: `
		<div>
			<div class="ml-32 mt-64 flex flex-wrap flex-row space-x-10">
				<t-tooltip v-bind="$props" content="Tooltip top content that is very long Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." position="top">
					<t-button label="Button with Tooltip" v-slot />
				</t-tooltip>
				<t-tooltip v-bind="$props" content="Tooltip bottom content that is very long Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." position="bottom" maxWidth="400">
					<t-button label="Button with and custom max-width" v-slot />
				</t-tooltip>
				<t-tooltip v-bind="$props" content="Tooltip left" position="left">
					<t-button label="Button with Tooltip" v-slot />
				</t-tooltip>
				<t-tooltip v-bind="$props" content="Tooltip right" position="right">
					<t-button label="Button with Tooltip" v-slot />
				</t-tooltip>
			</div>
		</div>
	`
});

export const Text = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TTooltip, TButton },
	template: `
		<div class="ml-64 mt-20">
			<t-tooltip v-bind="$props" content="Some tooltip">
				Some text
			</t-tooltip>
		</div>
	`
})

export const Icon = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TTooltip, TButton, TIcon },
	template: `
		<div class="ml-64 mt-20">
			<t-tooltip v-bind="$props" content="Some tooltip">
				<t-icon value="question-mark-circle"></t-icon>
			</t-tooltip>
		</div>
	`
})

export const Disabled = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TTooltip, TButton },
	template: `
		<div class="ml-64 mt-20">
			<t-tooltip v-bind="$props" :active="false">
				Tooltip disabled
			</t-tooltip>
		</div>
	`
})

Button.argTypes = {
	position: 'bottom',
	content: 'Tooltip content'
};
