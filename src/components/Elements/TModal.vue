<template>
	<div class="absolute inset-0 w-full h-full" :class="{'overlay-y-scroll':scroll}">
		<div :class="type !== 'right' ? 'flex items-center min-h-full' : ''">
			<transition :name="transitionName" appear>
				<div
					v-if="localShowing"
					class="bg-white z-50 shadow-lg rounded transition-all duration-300 ease-in-out"
					:class="containerClasses"
					:style="`${maxWidth ? `max-width:${maxWidth}px;` : ''} min-width: 300px; ${scroll ? 'margin-top: 1em; margin-bottom: 1em;' : 'max-height: calc(100vh - 2em);'} ${widthCalculation} ${offsetCalculation};`"
				
				>
					<div class="flex flex-col h-full relative">
						<div v-if="$slots.header" class="shrink-0 border-b border-gray-200 relative">
							<slot name="header"></slot>
							<div v-if="closeButton" class="z-50 absolute top-1/2 right-2 -translate-y-1/2">
								<t-button icon="close" @click="close" text />
							</div>
						</div>
						<div v-else-if="!$slots.header && closeButton" class="z-50 absolute top-0 right-0 m-2">
							<t-button icon="close" @click="close" text />
						</div>

						<div v-if="$slots.header || $slots.footer" :class="`grow ${noOverflow ? '' : `overflow-y-${overflowScroll ? 'scroll' : 'auto'} overflow-x-hidden`} p-${padding}`">
							<slot name="content"></slot>
						</div>
						<div v-else :class="`h-full grow p-${padding}`">
							<slot></slot>
						</div>

						<div v-if="$slots.footer" class="w-full mt-auto shrink-0 bg-gray-50 border-t border-gray-200">
							<slot name="footer"></slot>
						</div>
						<div></div>
					</div>
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
			default: 0
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
		},
		scroll: {
			type: Boolean,
			default: false
		},
		noOverflow: {
			type: Boolean,
			default: false
		},
		centerOverflow: {
			type: Boolean,
			default: false
		},
		overflowScroll: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			relativeOffsetPx: null,
			localShowing: this.show,
			previousType: null,
		}
	},
	watch: {
		show(v) {
			if (v !== this.localShowing) {
				if (v === false) this.close();
				else {
					this.localShowing = v;
					this.updateDivOffset();
				}
			}
		},
		type(newValue, oldValue) {
			if(newValue !== oldValue) this.previousType = oldValue;
		},
		offsetValue() {
			this.updateDivOffset();
		},
		offsetDirection() {
			this.updateDivOffset();
		},
		offsetDiv() {
			this.updateDivOffset();
		}
	},
	methods: {
		close() {
			this.localShowing = false;
			this.$emit('close');
			setTimeout(() => {
				return this.$emit('end');
			}, 200);
		},
		oppositeOf(v) {
			if(v === 'right') return 'left';
	
			return 'right';
		},
		updateDivOffset() {
			this.relativeOffsetPx = null
			if (this.offsetDiv) {
				let mainDivOffset = 0;
				let mainDiv = document.getElementById(this.offsetDiv);
				if (mainDiv) mainDivOffset = mainDiv.offsetWidth;
				let appDiv  = document.getElementById('app').offsetWidth;
				let offset  = +(appDiv - mainDivOffset);
				if (offset) this.relativeOffsetPx = offset;
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
						'inset-2',
						'mt-2',
						'sm:inset-y-4',
						'sm:left-4',
						'sm:right-auto',
						'sm:m-0'
					]);
					break;
				case 'right': 
					c = c.concat([
						'max-w-xl',
						'block',	
						'inset-2',
						'mt-2',
						'sm:inset-y-4',
						'sm:right-4',
						'sm:left-auto',
						'sm:m-0',
					]);
					break;
				case 'center': 
					c = c.concat([
						'max-w-xl',
						'block',
						'mx-auto',
						'inset-x-2',
						'mt-2',
						'sm:mt-0',
						`${this.centerOverflow ? 'sm:my-auto sm:inset-4' : ''}`
					]);
					break;
				case 'full':
					c = c.concat([
						'max-w-full',
						'inset-y-2',
						'mt-2',
						`${this.previousType + '-4' || 'left-4'}`,
						'sm:inset-y-4',
						'sm:m-0'
					]);
					break; 
			}

			if (this.relative) c = c.concat(['absolute']);
			else if((!this.relative && this.scroll)) c = c.concat(['relative']);
			else c = c.concat(['fixed']);
			if (!this.scrolling) c = c.concat(['overflow-hidden']);

			return c;
		},
		offsetCalculation() {
			if (this.relativeOffsetPx) {
				if(this.type === 'left' || (this.previousType === 'left' && this.type !== 'right') || this.type === 'center') return `left: calc(${this.relativeOffsetPx}px + 1em); right: 1em;`;
				else return 'right: 1em;';
			} else if(this.offsetDirection && this.offsetValue > 0) return `${this.offsetDirection}: ${this.offsetValue}px; ${this.oppositeOf(this.offsetDirection)}: 0;`;
		},
		widthCalculation() {
			if(this.offsetValue || this.relativeOffsetPx) return `width: calc(100% - 2em ${this.offsetValue || this.relativeOffsetPx ? `- ${this.offsetValue || this.relativeOffsetPx}px` : ''});`;
			else if(this.centerOverflow || this.type === 'full') return `width: calc(100% - 2em);`;
			
			return 'width: auto;';
		},
		transitionName() {
			if(this.type === 'right') return 'slide-right';
			else if (this.type === 'left') return 'slide-left';
			
			return 'pop';
		}
	},
	created() {
		this.updateDivOffset();
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