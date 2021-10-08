import TAvatar from '../src/components/Elements/TAvatar.vue';
import TIcon from '../src/components/Elements/TIcon.vue';

export default {
	title: 'Elements/TAvatar',
	component: TAvatar,
	argTypes: {
		size: {
			name: 'size',
			description: 'Set size of avatar'
		},
		round: {
			name: 'round',
			description: 'Switch between round and square avatar',
			control: { type: 'boolean' }
		},
		textSize: {
			name: 'textSize',
			description: 'Set size of text',
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
			control: { type: 'select' }
		}
	}
};

export const Text = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TAvatar },
	template: `
	<t-avatar v-bind="$props" v-slot>
		DL
	</t-avatar>
	`
});

Text.args = {
	size: 20
}

export const Icon = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TAvatar, TIcon },
	template: `
	<t-avatar v-bind="$props" v-slot>
		<t-icon size="6" value="check" />
	</t-avatar>
	`
});

Icon.args = {
	size: 20
}

export const Image = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TAvatar },
	template: `
	<t-avatar v-bind="$props" v-slot>
		<img src="https://picsum.photos/200" class="rounded-full" />
	</t-avatar>
	`
});

Image.args = {
	size: 20
}