<template>
	<div class="relative bg-white shadow-lg rounded-lg pointer-events-auto ring-2 ring-black ring-opacity-5 overflow-hidden z-50">
		<div class="p-4">
			<div class="inline-flex items-start">
				<div :class="`flex-shrink-0 text-${iconColor}`">
					<t-icon :value="icon" :size="iconSize" />
				</div>
				<div class="ml-3 pt-0.5">
					<p :class="`text-sm font-medium text-${titleColor}`">
						{{ title }}
					</p>
					<p :class="`mt-1 text-sm text-${descColor}`" v-if="description">
						{{ description }}
					</p>
				</div>
				<div class="ml-4 flex-shrink-0 flex" v-if="closeable">
					<button 
						class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						@click="close"
					>
						<span class="sr-only">
							Close
						</span>
						<t-icon value="close" :size="iconSize" />
					</button>
				</div>
			</div>
		</div>
	</div>	
</template>

<script> 
import TIcon from '../Elements/TIcon.vue';
import TLoader from '../Elements/TLoader.vue';

export default {
	name: 'TNotify',
	components: {
		TIcon,
		TLoader
	},
	props: {
		icon: {
			type: String,
			required: false,
			default: undefined
		},
		iconSize: {
			type: [Number, String],
			required: false,
			default: 5
		},
		iconColor: {
			type: String,
			required: false
		},
		titleColor: {
			type: String,
			required: false,
			default: 'gray-900'
		},
		descColor: {
			type: String,
			required: false,
			default: 'gray-500'
		},
		duration: {
			type: [String, Number],
			required: false,
			default: 4000
		},
		closeable: {
			type: Boolean,
			default: false
		},
		offsetValue: {
			type: [String, Number],
			default: 0
		},
		title: {
			type: String,
			default: 'Notification title'
		},
		description: {
			type: String,
			required: false
		},
		id: {
			type: String,
			required: false
		}
	},
	mounted() {
		if(this.duration) {
			setTimeout(this.close, this.duration);
		}
	},
	methods: {
		close() {
			this.$emit('close', this.id);
		}
	}
}
</script>

<style scoped>
@media only screen and (max-width: 640px) {
	.notify-padding {
		padding-left: 1rem!important;
		padding-right: 1rem!important;
		padding-top: 1.5rem!important;
		padding-bottom: 1.5rem!important;
	}
}
</style>