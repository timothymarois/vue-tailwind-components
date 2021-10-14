<template>
	<div class="absolute w-full h-full top-0 bottom-0 left-0 right-0">
		<div :class="`relative ${type !== 'right' ? 'flex items-center min-h-full' : ''}`">
			<t-overlay :freeze="freeze" @close-modal="closeModal" />
			
			<transition :name="type === 'right' ? 'slide' : 'pop'" appear>
				<div
					class="bg-white fixed z-50 shadow-lg rounded p-4 overflow-y-auto"
					:class="containerClasses"
					:style="`min-width: 300px; max-width: 95%; max-height: calc(100vh - 2em); ${width && type !== 'full' ? `width: ${width}px;` : ''}`"
				>
					<div v-if="closeButton" class="z-50 absolute top-0 right-0 m-2">
						<t-button icon="close" @click="closeModal" text />
					</div>
					<slot></slot>
				</div>
			</transition>
		</div>
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
		freeze: {
			type: Boolean,
			default: false
		},
		width: {
			type: String,
			required: false,
			default: '600'
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
						'block',
						'h-auto',
						'bottom-0',
						'top-0',
						'right-0',
						'mb-4',
						'mt-4',
						'mr-4'
					]);
					break;
				case 'center': 
					c = c.concat([
						'mx-auto',
						'left-0',
						'right-0'
					]);
					break;
				case 'full':
					c = c.concat([
						'w-11/12',
						'mx-auto',
						'left-0',
						'right-0'
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