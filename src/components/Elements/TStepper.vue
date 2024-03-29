<template>
	<div>
		<div v-if="horizontal">
			<div class="flex flex-row justify-between items-center" :class="centerProgress ? 'mx-auto' : ''" :style="maxWidth ? `max-width: ${maxWidth}px;` : ''">
				<template v-for="(step, i) of stepOptionsComputed">
					<hr 
						v-if="i !== 0" 
						class="grow" 
						:class="dividerColor(i)"
						:key="i" 
					/>
					<div class="relative">
						<div 
							class="flex items-center justify-center rounded-full text-lg select-none"
							:class="[stepColor(i), (allowBack(i) && currentStep > i + 1) ? `cursor-pointer ${simple ? `outline-none border-2 border-${color} hover:border-white ring-2 ring-${color}` :''}` : 'cursor-default', `h-${size} w-${size}`]"
							@click="allowBack(i) ? $emit('previous-step', i + 1) : ''"
						>
							<t-icon v-if="(currentStep > i + 1 || finished) && !simple" value="check" size="6" />
							<span v-else-if="!simple">
								{{ +i + 1 }}
							</span>
						</div>
						<div 
							class="absolute text-center mt-2 w-40 left-1/2 -translate-x-1/2"
							:class="[nameColor(i), simple ? 'font-semibold' : '', allowBack(i) ? 'cursor-pointer hover:underline' : '']"
							@click="allowBack(i) ? $emit('previous-step', i + 1) : ''"
						>{{ step.title }}</div>
					</div>
				</template>
			</div>
			<div v-for="(step, i) of stepOptionsComputed" :key="step.id">
				<div v-show="(currentStep - 1) == i && !finished" class="mt-20">
					<slot :name="step.id" />
				</div>
			</div>
			<div class="mt-20" v-if="finished">
				<slot class="mt-20" name="finished" />
			</div>
		</div>
		<div v-else>
			<div class="flex flex-col justify-between">
				<div v-for="(step, i) of stepOptionsComputed" :key="step.id">
					<div class="relative flex flex-row items-center">
						<div 
							class="flex items-center justify-center rounded-full text-lg select-none"
							:class="[stepColor(i), (allowBack(i) && currentStep > i + 1) ? `cursor-pointer ${simple ? `outline-none border-2 border-${color} hover:border-white ring-2 ring-${color}` :''}` : 'cursor-default', `h-${size} w-${size}`]"
							@click="allowBack(i) ? $emit('previous-step', i + 1) : ''"
						>
							<t-icon v-if="(currentStep > i + 1 || finished) && !simple" value="check" size="6" />
							<span v-else-if="!simple">
								{{ +i + 1 }}
							</span>
						</div>
						<div 
							class="ml-4 text-lg"
							:class="[nameColor(i), simple ? 'font-semibold' : '', allowBack(i) ? 'cursor-pointer hover:underline' : '']"
							@click="allowBack(i) ? $emit('previous-step', i + 1) : ''"
						>{{ step.title }}</div>
					</div>
					<div 
						class="pl-7 pt-2 pb-6 min-h-[2rem]"
						:class="[{'border-l-2': i + 1 !== stepOptionsComputed.length}, (simple && i + 1 < currentStep) ? `border-${color}` : 'border-gray-300', `ml-${size / 2}`, simple ? '' : 'my-2']"
					>
						<transition name="expand" @enter="enter" @after-enter="afterEnter" @leave="leave">
							<div v-show="(currentStep - 1) == i && !finished">
								<slot :name="step.id" id="stepper-slot" />
							</div>
						</transition>
					</div>
				</div>
				<div v-if="finished" class="mt-20">
					<slot name="finished" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import TIcon from '../Elements/TIcon.vue';

export default {
	name: 'TStepper',
	components: {
		TIcon
	},
	props: {
		horizontal: {
			type: Boolean,
			required: false,
			default: false
		},
		color: {
			type: String,
			required: false,
			default: 'indigo-600'
		},
		textColor: {
			type: String,
			required: false,
			default: 'white'
		},
		stepOptions: {
			type: Array,
			required: true
		},
		disableBack: {
			type: [Boolean, Array],
			required: false,
			default: false
		},
		currentStep: {
			type: Number,
			required: true,
			default: 1
		},
		finished: {
			type: Boolean,
			required: false,
			default: false
		},
		simple: {
			type: Boolean,
			required: false,
			default: false
		},
		size: {
			type: [String, Number],
			required: false,
			default: 12
		},
		maxWidth: {
			type: [String, Number],
			required: false,
			default: null
		},
		centerProgress: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	computed: {
		stepOptionsComputed() {
			return this.stepOptions.filter((x) => !x.hide);
		}
	},
	methods: {
		enter(element) {
			const width = getComputedStyle(element).width;

			element.style.width = width;
			element.style.position = 'absolute';
			element.style.visibility = 'hidden';
			element.style.height = 'auto';

			const height = getComputedStyle(element).height;

			element.style.width = null;
			element.style.position = null;
			element.style.visibility = null;
			element.style.height = 0;

			getComputedStyle(element).height;

			requestAnimationFrame(() => element.style.height = height);
		},
		afterEnter(element) {
			element.style.height = 'auto';
		},
		leave(element) {
			const height = getComputedStyle(element).height;
			
			element.style.height = height;

			getComputedStyle(element).height;

			requestAnimationFrame(() => element.style.height = 0);
		},
		stepColor(i) {
			if(!this.simple) {
				if(this.currentStep === i + 1 && !this.finished) return `bg-${this.color} text-${this.textColor}`;
				else if(this.currentStep > i + 1 || this.finished) return 'bg-green-500 text-white';
				return 'bg-gray-400 text-white';
			} else {
				if(this.currentStep > i + 1 || this.finished) return `bg-${this.color} border-2 border-${this.color} ring-2 ring-${this.color}`;
				else if(this.currentStep === i + 1) return `bg-${this.color} border-2 border-white ring-2 ring-${this.color}`;
				return 'ring-2 ring-gray-300';
			}
		},
		nameColor(i) {
			if(!this.simple) {
				if(i + 1 > this.currentStep) return 'text-gray-400';
				return 'text-black';
			} else {
				if(i + 1 <= this.currentStep) return `text-${this.color}`;
				return 'text-gray-400';
			}
		},
		dividerColor(i) {
			if(!this.simple) return 'h-0.5 bg-gray-300 mx-4';
			else {
				if(i < this.currentStep) return `h-1 bg-${this.color}`;
				return 'h-0.5 bg-gray-300';
			}
		},
		allowBack(i) {
			if (i + 1 < this.currentStep && !this.disableBack && !this.finished) return true;
			else if(Array.isArray(this.disableBack)) {
				if(this.disableBack.includes(i + 1)) return false;
				else return true;
			} else return false;
		}
	}
}
</script>

<style scoped>
.expand-enter-active, .expand-leave-active {
	transition: height .3s cubic-bezier(.25,.8,.5,1);
	overflow: hidden;
}

.expand-enter, .expand-leave-to {
	height: 0;
}

#stepper-slot {
	will-change: height;
	transform: translateZ(0);
	backface-visibility: hidden;
	perspective: 1000px;
}
</style>