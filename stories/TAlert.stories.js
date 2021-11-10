import TAlert from '../src/components/Elements/TAlert.vue';
import TIcon from '../src/components/Elements/TIcon.vue';

export default {
	title: 'Elements/TAlert',
	component: TAlert,
	argTypes: {
		color: {
			name: 'color',
			description: 'Set color of alert',
			control: { type: 'text' }
		},
		textColor: {
			type: 'textColor',
			description: 'Set color of text',
			control: { type: 'text' }
		},
		outlined: {
			name: 'outlined',
			description: 'Toggle outline of alert',
			control: { type: 'boolean' }
		},
		rounded: {
			name: 'rounded',
			description: 'Switch between round and square avatar',
			control: { type: 'boolean' }
		},
		shadow: {
			name: 'shadow',
			description: 'Toggle shadow of alert',
			control: { type: 'boolean' }
		},
		textOnly: {
			name: 'textOnly',
			description: 'Toggle between text only alert',
			control: { type: 'boolean' }
		},
		icon: {
			name: 'icon',
			description: 'Name of icon',
			control: { type: 'text' }
		},
		iconSize: {
			name: 'iconSize',
			description: 'Set size of icon'
		},
		borderColor: {
			name: 'borderColor',
			description: 'Set color of border',
			control: { type: 'text' }
		},
		borderPosition: {
			name: 'borderPosition',
			description: 'Set position of border',
			options: ['top', 'right', 'bottom', 'left'],
			control: { type: 'select' }
		},
		borderWidth: {
			name: 'borderWidth',
			description: 'Set width of border',
		}
	}
};

export const Error = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TAlert, TIcon },
	template: `
	<t-alert v-bind="$props" v-slot>
		Your notifications are turned off
	</t-alert>
	`
});

Error.args = {
	color: 'red',
	icon: 'bell',
	iconSize: 5,
	rounded: true,
	borderPosition: 'bottom',
	borderColor: 'red-300',
	borderWidth: 8
}

export const Warning = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TAlert, TIcon },
	template: `
	<t-alert v-bind="$props" v-slot>
		Your car's extended warranty expires soon
	</t-alert>
	`
});

Warning.args = {
	color: 'yellow',
	textColor: 'yellow-600',
	icon: 'exclamation-circle',
	iconSize: 5,
	outlined: true,
	rounded: true,
	shadow: false
}

export const Success = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TAlert, TIcon },
	template: 
	`
		<t-alert v-bind="$props" v-slot>
			Your entry has been confirmed
		</t-alert>
	`
});

Success.args = {
	color: 'green',
	icon: 'check',
	iconSize: 5,
	shadow: true,
	rounded: true,
	borderPosition:"left",
	borderColor:"green-800"
}
