<template>
	<transition name="pop" appear>
		<div 
			:class="`flex absolute left-1/2 translate-x-[-50%] bottom-5 bg-${color} text-${textColor} px-4 py-2 rounded shadow-lg justify-center items-center`" 
			v-if="visible"
		>
			<t-icon :value="icon" :size="iconSize" />		
			<slot>Notification component</slot>
		</div>
	</transition>
</template>

<script>
import TIcon from '../Elements/TIcon.vue';

export default {
	name: 'TNotify',
	components: {
		TIcon
	},
	props: {
		icon: {
			type: String,
			required: false,
			default: undefined
		},
		iconRight: {
			type: String,
			required: false,
			default: undefined
		},
		iconSize: {
			type: [Number, String],
			required: false,
			default: 4
		},
		color: {
			type: String,
			required: false,
			default: 'black'
		},
		textColor: {
			type: String,
			required: false,
			default: 'white'
		},
		duration: {
			type: [String, Number],
			required: false,
			default: 5000
		},
		location: {
			type: String,
			required: false,
			default: 'center_bottom'
		},
		visible: {
			type: Boolean,
			required: true,
			default: true
		}
	},
	async mounted() {
		if(this.duration) {
			setTimeout(() => this.closeNotification(), this.duration)
		}
	},
	methods: {
		closeNotification() {
			this.$emit('close-notification');
		}
	}
}
</script>

<style scoped>
.pop-enter-active, .pop-leave-active {
	transition: .15s linear all;
}

.pop-enter, .pop-leave-to {
	opacity: 0;
	transform: scale(0.80)
}
</style>