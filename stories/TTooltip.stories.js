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
		<div class="ml-64 mt-20">
			<t-tooltip v-bind="$props">
				<t-button label="Button with Tooltip" v-slot />
			</t-tooltip>
		</div>
	`
});

export const Text = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TTooltip, TButton },
	template: `
		<div class="ml-64 mt-20">
			<t-tooltip v-bind="$props">
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
			<t-tooltip v-bind="$props">
				<t-icon value="question-mark-circle"></t-icon>
			</t-tooltip>
		</div>
	`
})

Button.argTypes = {
	position: 'bottom',
	content: 'Tooltip content'
};
