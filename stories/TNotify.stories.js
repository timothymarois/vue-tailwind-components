import TNotify from '../src/components/Elements/TNotify.vue';
import TButton from '../src/components/Elements/TButton.vue';

export default {
	title: 'Elements/TNotify',
	component: TNotify,
	argTypes: {
		iconSize: {
			name: 'iconSize',
			description: 'Set size of icons (including spinner)',
			control: { type: 'text' }
		},
		color: {
			name: 'color',
			description: 'Background color of notification',
			control: { type: 'text' }
		},
		textColor: {
			name: 'color',
			description: 'Background color of notification',
			control: { type: 'text' }
		},
		duration: {
			name: 'duration',
			description: 'Duration in ms that notification will stay visible. Setting `null` will add a close button.',
			control: { type: 'text' }
		},
		loading: {
			name: 'loading',
			description: 'Toggle loading spinner in notification component',
			control: { type: 'boolean' }
		}
	}
}

export const Standard = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TNotify, TButton },
	data() {
		return {
			show: false
		}
	},
	methods: {
		toggleNotification() {
			this.show = !this.show
		}
	},
	template:
		`
		<div class="w-full">
			<t-button @click.native="toggleNotification">Show notification</t-button>
			<t-notify v-bind="$props" v-if="show" @close-notification="toggleNotification">
				A notification component
			</t-notify>
		</div>
		`
});

export const CloseButton = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TNotify, TButton },
	data() {
		return {
			show: false
		}
	},
	methods: {
		toggleNotification() {
			this.show = !this.show
		}
	},
	template:
		`
		<div class="w-full">
			<t-button @click.native="toggleNotification">Show notification</t-button>
			<t-notify v-bind="$props" v-if="show" closeable @close-notification="toggleNotification">
				A notification component
			</t-notify>
		</div>
		`
});

Standard.args = {
	iconSize: 5,
	color: 'gray-800',
	duration: 5000
};

CloseButton.args = {
	iconSize: 5,
	color: 'gray-800'
}