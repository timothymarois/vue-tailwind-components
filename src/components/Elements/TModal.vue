<template>
	<div class="w-full h-full top-0 bottom-0 left-0 right-0 absolute">
		<div :class="`${relative ? 'relative' : ''} ${type !== 'right' ? 'flex items-center min-h-full' : ''}`">
			<t-overlay 
				:relative="relative"
				:freeze="freeze" 
				@close-modal="closeModal" 
			/>
			<transition :name="type === 'right' ? 'slide' : 'pop'" appear>
				<div
					class="bg-white z-50 shadow-lg rounded p-4 overflow-x-hidden"
					:class="containerClasses"
					:style="`${maxWidth ? 'max-width:'+maxWidth+'px;' : ''} min-width: 300px; max-height: calc(100vh - 2em); ${offsetCalculation}`"
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
		relative: {
            type: Boolean,
            default: false
        },
		maxWidth: {
            type: [String, Number],
            default: null
        },
		scrolling: {
            type: Boolean,
            default: false
        },
		offsetDirection: {
			type: String,
			default: undefined
		},
		offsetValue: {
			type: [String, Number],
			default: undefined
		},
		offsetDiv: {
            type: String,
            default: null
        },
	},
	data() {
		return {
			relativeOffsetPx: null
		}
	},
	methods: {
		closeModal() {
			return this.$emit('close-modal');
		},
		oppositeOf(v) {
			if(v === 'right') {
				return 'left';
			} else {
				return 'right';
			}
		}
	},
	computed: {
		containerClasses() {
			let c = [];
			
			switch(this.type) {
				case 'right': 
					c = c.concat([
						'max-w-xl',
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
						'max-w-xl',
						'mx-auto',
						'left-0',
						'right-0',
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

			if (this.relative) {
				c = c.concat([
					'absolute'
				]);
			} else {
				c = c.concat([
					'fixed'
				]);
			}

			if (this.scrolling) {
				c = c.concat([
					'overflow-y-auto'
				]);
			} else {
				c = c.concat([
					'overflow-y-hidden'
				]);
			}

			return c;
		},
		offsetCalculation() {
			if (this.relativeOffsetPx) {
				return `left: ${this.relativeOffsetPx}px; right: 0;`;
			}
			if(this.offsetDirection && this.offsetValue) {
				return `${this.offsetDirection}: ${this.offsetValue}px; ${this.oppositeOf(this.offsetDirection)}: 0;`;
			}
		}
	},
	created() {
		if (this.offsetDiv) {
			let mainDiv = document.getElementById(this.offsetDiv).offsetWidth;
			let appDiv  = document.getElementById('app').offsetWidth;
			let offset  = parseInt(appDiv-mainDiv);
			if (offset) {
				this.relativeOffsetPx = offset;
			}
			// mainDiv.classList.remove("overflow-y-auto");
		}
	},
	beforeDestroy() {
		// if (this.offsetDiv) {
		// 	let mainDiv = document.getElementById(this.offsetDiv).offsetWidth;
		// 	mainDiv.classList.add("overflow-y-hidden");
		// }
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