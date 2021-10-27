<template>
	<transition name="pop" appear>
		<div 
			:class="`flex justify-center absolute transform -translate-x-1/2 left-1/2  bottom-5 bg-${color} text-${textColor} px-4 py-3 text-sm rounded shadow-lg items-center`"
		>
			<div class="mr-2 flex justify-center items-center" v-if="icon || loading">
				<t-icon :value="icon" :size="iconSize" v-if="icon" />
				<t-loader :color="textColor" :size="iconSize" v-if="loading" />
			</div>
			<slot>Notification component</slot>
			<div class="ml-2 flex justify-center items-center" v-if="iconRight || closeable">
				<t-icon :value="iconRight" :size="iconSize" v-if="iconRight" />
				<t-icon v-if="closeable" value="close" :size="iconSize" class="cursor-pointer" @click.native="closeNotification" />
			</div>	
		</div>
	</transition>
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
		iconRight: {
			type: String,
			required: false,
			default: undefined
		},
		iconSize: {
			type: [Number, String],
			required: false,
			default: 5
		},
		color: {
			type: String,
			required: false,
			default: 'gray-800'
		},
		textColor: {
			type: String,
			required: false,
			default: 'white'
		},
		duration: {
			type: [String, Number],
			required: false,
			default: null
		},
		location: {
			type: String,
			required: false,
			default: 'center_bottom'
		},
		loading: {
			type: Boolean,
			required: false,
			default: false
		},
		closeable: {
			type: Boolean,
			default: false
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
	transform: scale(0.80) translateX(-50%);
}
</style>