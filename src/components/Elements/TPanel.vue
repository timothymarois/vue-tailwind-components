<template>
	<div>
		<transition :name="`slide-${type}`">
			<div
				class="bg-white shadow-lg z-50 fixed"
				:class="containerClasses"
				:style="`${maxWidth ? `max-width: ${maxWidth}px;` : ''} min-width: 300px; height: 100%;`"
				v-show="showing"
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
				'inset-y-0'
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