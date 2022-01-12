<template>
	<div class="relative bg-white shadow-lg rounded-lg pointer-events-auto ring-2 ring-black ring-opacity-5 overflow-hidden z-50">
		<div class="flex flex-row h-full">
			<div :class="`flex-shrink-0 pl-3 py-2 text-${iconColor}`">
				<t-icon :value="icon" :size="iconSize" />
			</div>
			<div class="ml-3 py-3 pr-3 border-r border-gray-200">
				<p :class="`text-sm font-medium text-${titleColor}`">
					{{ title }}
				</p>
				<p :class="`mt-1 text-sm text-${descColor}`" v-if="description">
					{{ description }}
				</p>
			</div>
			<div class="flex-shrink-0 flex items-center cursor-pointer px-3 text-gray-600 font-medium text-sm hover:text-gray-900 " @click="close">
				Close
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