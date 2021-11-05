<template>
	<div class="absolute inset-0 w-full h-full">
		<div :class="type !== 'right' ? 'flex items-center min-h-full' : ''">
			<transition :name="transitionName" appear>
				<div
					v-if="localShowing"
					class="bg-white z-50 shadow-lg rounded overflow-x-hidden"
					:class="containerClasses"
					:style="`${maxWidth ? 'max-width:'+maxWidth+'px;' : ''} min-width: 300px; max-height: 100vh; ${offsetCalculation}`"
				>
					<div 
						v-if="closeButton" 
						class="z-50 absolute top-0 right-0 m-2"
					>
						<t-button icon="close" @click="close" text />
					</div>
					<slot></slot>
				</div>
			</transition>
		</div>
		<t-overlay 
			:relative="relative"
			:freeze="freeze"
			:show="localShowing"
			@close="close" 
		/>
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
		padding: {
            type: [Number, String],
            default: 4
        },
		show: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			relativeOffsetPx: null,
			localShowing: this.show
		}
	},
	watch: {
		show(v) {
			if (v !== this.localShowing) {
				if (v===false) {
					this.close()
				}
				else {
					this.localShowing = v
					this.updateDivOffset()
				}
			}
		},
		offsetValue(v) {
			if(v) {
				this.updateDivOffset();
			}
		},
		offsetDirection(v) {
			if(v) {
				this.updateDivOffset();
			}
		}
	},
	methods: {
		close() {
			this.localShowing = false;
			this.$emit('close');
			setTimeout(() => {
				return this.$emit('end');
			}, 200)
		},
		oppositeOf(v) {
			if(v === 'right') {
				return 'left';
			} 
			else {
				return 'right';
			}
		},
		updateDivOffset() {
			this.relativeOffsetPx = null
			if (this.offsetDiv) {
				let mainDivOffset = 0;
				let mainDiv = document.getElementById(this.offsetDiv);
				if (mainDiv) {
					mainDivOffset = mainDiv.offsetWidth;
				}
				let appDiv  = document.getElementById('app').offsetWidth;
				let offset  = parseInt(appDiv-mainDivOffset);
				if (offset) {
					this.relativeOffsetPx = offset;
				}
			}
		}
	},
	computed: {
		containerClasses() {
			let c = [];
			
			switch(this.type) {
				case 'left':
					c = c.concat([
						'max-w-xl',
						'block',
						'h-full',
						'md:h-auto',
						'md:inset-y-4',
						'md:left-4'
					])
				case 'right': 
					c = c.concat([
						'max-w-xl',
						'block',
						'h-full',
						'md:h-auto',
						'md:inset-y-4',
						'md:right-4'
					]);
					break;
				case 'center': 
					c = c.concat([
						'max-w-xl',
						'mx-auto',
						'inset-x-0'
					]);
					break;
				case 'full':
					c = c.concat([
						'inset-0',
						'm-4'
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

			c = c.concat([
				`p-${this.padding}`
			]);

			return c;
		},
		offsetCalculation() {
			if (this.relativeOffsetPx) {
				return `left: ${this.relativeOffsetPx}px; right: 0;`;
			}
			if(this.offsetDirection && this.offsetValue) {
				return `${this.offsetDirection}: ${this.offsetValue}px; ${this.oppositeOf(this.offsetDirection)}: 0;`;
			}
		},
		transitionName() {
			if(this.type === 'right') {
				return 'slide-right';
			} 
			else if (this.type === 'left') {
				return 'slide-left';
			} 
			else {
				return 'pop';
			}
		}
	},
	created() {
		this.updateDivOffset()
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
.pop-enter-active, .pop-leave-active, .slide-right-enter-active, .slide-right-leave-active, .slide-left-enter-active, .slide-left-leave-active {
	transition: all .2s cubic-bezier(.25,.8,.25,1);
	z-index: 50;
}
.pop-enter, .pop-leave-to {
	z-index: 50;
	transform: scale(0.30);
	opacity: 0;
	transform-origin: center center;
}
.slide-right-enter, .slide-right-leave-to {
	z-index: 50;
	transform: translateX(120%);
}
.slide-left-enter, .slide-left-leave-to {
	z-index: 50;
	transform: translateX(-120%);
}
</style>