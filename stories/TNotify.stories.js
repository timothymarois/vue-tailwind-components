import TNotify from '../src/components/Elements/TNotify.vue';
import TButton from '../src/components/Elements/TButton.vue';

export default {
	title: 'Elements/TNotify',
	component: TNotify,
	argTypes: {
		iconSize: {
			name: 'iconSize',
			description: 'Set size of icons (including spinner)'
		}
	}
}

export const Standard = (args, { argTypes }) => ({
	props: Object.keys(args),
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
		<div>
			<t-button @click.native="toggleNotification">Show notification</t-button>
			<t-notify v-bind="$props" v-if="show" @close-notification="toggleNotification">
				A notification component
			</t-notify>
		</div>
		`
});