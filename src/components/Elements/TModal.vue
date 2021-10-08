<template>
	<div>
		<t-overlay :allowOverlayClose="allowOverlayClose" @close-modal="closeModal" />
		<transition :name="type === 'right' ? 'slide' : 'pop'" appear>
			<div
				class="bg-white fixed z-50 shadow-lg rounded p-4 overflow-hidden"
				:class="containerClasses"
				style="min-width: 300px; max-height: calc(100vh - 2em)"
			>
				<div v-if="closeButton" class="z-50 absolute top-0 right-0 m-2">
					<t-button icon="close" @click="closeModal" text />
				</div>
				<slot></slot>
			</div>
		</transition>
	</div>
</template>

<script>
import TButton from "./TButton.vue";
import TOverlay from "./TOverlay.vue";
export default { 
	name: 'Modal',
	components: {
		TButton,
		TOverlay
	},
	props: {
		type: {
			type: String,
			default: 'center'
		},
		closeButton: {
			type: Boolean,
			default: true
		},
		allowOverlayClose: {
			type: Boolean,
			default: true
		}
	},
	methods: {
		closeModal() {
			return this.$emit('close-modal');
		}
	},
	computed: {
		containerClasses() {
			let c = [];
			
			switch(this.type) {
				case 'right': 
					c = c.concat([
						'max-w-xl',
						'bottom-4',
						'right-4',
						'h-full'
					]);
					break;
				case 'center': 
					c = c.concat([
						'max-w-xl',
						'mx-auto',
						'relative'
					]);
					break;
				case 'full':
					c = c.concat([
						'w-11/12',
						'mx-auto',
						'relative'
					]);
					break; 
			}

			return c;
		}
	}
};
</script>

<style scoped>
.pop-enter-active, .pop-leave-active, .slide-enter-active, .slide-leave-active {
	transition: all .3s cubic-bezier(.25,.8,.25,1);
}
.pop-enter, .pop-leave-to {
	transform: scale(0.30);
	opacity: 0.80;
	transform-origin: center center;
}
.slide-enter, .slide-leave-to {
	transform: translateX(400%);
}
</style>