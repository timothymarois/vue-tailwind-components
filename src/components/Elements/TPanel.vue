<template>
	<div>
		<transition :name="`slide-${type}`">
			<div class="w-full h-full top-0 bottom-0 left-0 right-0 absolute" v-show="showing">
				<div :class="`${relative ? 'relative' : ''}`">
					<div
						class="bg-white shadow-lg z-50"
						:class="containerClasses"
						:style="`${maxWidth ? `max-width: ${maxWidth}px;` : ''} min-width: 300px; height: 100%;`"
					>
						<h3 class="font-medium text-xl pb-4">
							{{ title }}
						</h3>
						<div 
							v-if="closeButton" 
							class="z-50 absolute top-2 right-0 m-2"
						>
							<t-button icon="close" @click="closeModal" text />
						</div>
						<slot></slot>
					</div>
				</div>
			</div>
		</transition>
		<t-overlay 
			:relative="relative"
			:freeze="freeze"
			:showing="showing"
			@close-modal="closeModal"
		/>
	</div>
</template>

<script>
import TButton from "./TButton.vue";
import TOverlay from "./TOverlay.vue";

export default { 
	name: 'TPanel',
	components: {
		TButton,
		TOverlay
	},
	props: {
		type: {
			type: String,
			default: 'right'
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
		padding: {
            type: [Number, String],
            default: 6
        },
		rounded: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: null,
			required: false
		},
		showing: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		closeModal() {
			return this.$emit('close-modal');
		}
	},
	computed: {
		containerClasses() {
			let c = [
				'max-w-xl',
				'block',
				'h-auto',
				'bottom-0',
				'top-0'
			];
			
			switch(this.type) {
				case 'right': 
					c = c.concat([
						'right-0'
					]);
					break;
				case 'left': 
					c = c.concat([
						'left-0'
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

			if(this.rounded) {
				c = c.concat([
					'rounded'
				])
			}

			c = c.concat([
				`p-${this.padding}`
			]);

			return c;
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
			
		}
	}
};
</script>

<style scoped>
.slide-right-enter-active, .slide-right-leave-active, .slide-left-enter-active, .slide-left-leave-active  {
	transition: transform .5s ease-in-out;
	z-index: 50;
}

.slide-right-enter, .slide-right-leave-to {
	transform: translateX(100%);
	z-index: 50;
}

.slide-left-enter, .slide-left-leave-to {
	transform: translateX(-100%);
	z-index: 50;
}
</style>