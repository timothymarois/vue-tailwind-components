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
	data: () => ({
        notifications: []
    }),
	methods: {
		newNotification() {
			this.addNotification({
				title: `Profile Saved`,
				description: 'Your profile settings have been saved. Your profile',
				icon: "check",
				iconColor: "green-600",
				closeable: true,
				duration: null
			});
		},
		addNotification(args) {
			this.notifications.unshift({
				...args,
				id: Math.random().toString(36).substring(7) //uniqid function
			})
		},
		removeNotification(id) {
			const i = this.notifications.findIndex((obj) => obj.id === id);
			this.notifications.splice(i, 1);
		}
	},
	template:
		`
		<div>
			<div class="max-w-md overflow-hidden max-h-screen absolute right-4 top-4 z-50 px-2 pb-4 pt-1 -mr-2">
				<transition-group name="pop" class="flex flex-col space-y-2">
					<t-notify 
						v-for="n of notifications" :key="n.id"
						:id="n.id"
						:title="n.title"
						:description="n.description"
						:icon="n.icon || null"
						:iconSize="n.iconSize"
						:iconColor="n.iconColor"
						:titleColor="n.titleColor"
						:descColor="n.descColor"
						:duration="n.duration"
						:closeable="n.closeable"
						@close="removeNotification"
					/>
				</transition-group>
			</div>
			<t-button @click="newNotification" label="New notification" />
		</div>
		`
});