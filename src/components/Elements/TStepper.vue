<template>
	<div>
		<div v-if="horizontal">
			<div class="flex flex-row justify-between items-center">
				<template v-for="(step, i) of stepOptions">
					<hr 
						v-if="i != 0" 
						class="flex-grow" 
						:class="dividerColor(i)"
						:key="i" 
					/>
					<div class="relative" :key="step.id">
						<div 
							class="flex items-center justify-center rounded-full text-lg select-none"
							:class="[stepColor(i), allowBack(i) ? `cursor-pointer ${simple ? `outline-none border-2 border-${color} hover:border-white ring-2 ring-${color}` :''}` : 'cursor-default', `h-${size} w-${size}`]"
							@click="allowBack(i) ? $emit('previous-step', i + 1) : ''"
						>
							<t-icon value="check" size="6" v-if="(currentStep > i + 1 || finished) && !simple" />
							<span v-else-if="!simple">
								{{ +i + 1 }}
							</span>
						</div>
						<div 
							class="absolute text-center mt-2 w-40 left-1/2 transform -translate-x-1/2"
							:class="[nameColor(i), simple ? 'font-semibold' : '', allowBack(i) ? 'cursor-pointer' : '']"
							@click="allowBack(i) ? $emit('previous-step', i + 1) : ''"
						>{{ step.title }}</div>
					</div>
				</template>
			</div>
			<div class="mt-20" v-for="(step, i) of stepOptions" :key="step.id">
				<div v-show="(currentStep - 1) == i && !finished">
					<slot :name="step.id" />
				</div>
			</div>
			<slot class="mt-20" name="finished" v-if="finished" />
		</div>
		<div v-else>
			<div class="flex flex-col justify-between">
				<div v-for="(step, i) of stepOptions" :key="step.id">
					<div class="relative flex flex-row items-center">
						<div 
							class="flex items-center justify-center rounded-full text-lg select-none"
							:class="[stepColor(i), allowBack(i) ? `cursor-pointer ${simple ? `outline-none border-2 border-${color} hover:border-white ring-2 ring-${color}` :''}` : 'cursor-default', `h-${size} w-${size}`]"
							@click="allowBack(i) ? $emit('previous-step', i + 1) : ''"
						>
							<t-icon value="check" size="6" v-if="(currentStep > i + 1 || finished) && !simple" />
							<span v-else-if="!simple">
								{{ +i + 1 }}
							</span>
						</div>
						<div 
							class="ml-4 text-lg"
							:class="[nameColor(i), simple ? 'font-semibold' : '', allowBack(i) ? 'cursor-pointer' : '']"
							@click="allowBack(i) ? $emit('previous-step', i + 1) : ''"
						>{{ step.title }}</div>
					</div>
					<div 
						class="px-8 pt-2 pb-6"
						:class="[{'border-l-2': i + 1 !== stepOptions.length}, (simple && i + 1 < currentStep) ? `border-${color}` : 'border-gray-300', `ml-${size / 2}`, simple ? '' : 'my-2']"
						style="min-height: 2rem;"
					>
						<transition name="expand" @enter="enter" @after-enter="afterEnter" @leave="leave">
							<div v-show="(currentStep - 1) == i && !finished">
								<slot :name="step.id" id="stepper-slot" />
							</div>
						</transition>
					</div>
				</div>
				<slot class="mt-20" name="finished" v-if="finished" />
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
			type: Boolean,
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
			required: true,
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

			requestAnimationFrame(() => {
				element.style.height = height;
			});
		},
		afterEnter(element) {
			element.style.height = 'auto';
		},
		leave(element) {
			const height = getComputedStyle(element).height;
			
			element.style.height = height;

			getComputedStyle(element).height;

			requestAnimationFrame(() => {
				element.style.height = 0;
			});
		},
		stepColor(i) {
			if(!this.simple) {
				if(this.currentStep === i + 1 && !this.finished) {
					return `bg-${this.color} text-${this.textColor}`
				} 
				else if(this.currentStep > i + 1 || this.finished) {
					return `bg-green-500 text-white`
				} 
				else {
					return `bg-gray-400 text-white`
				}
			} 
			else {
				if(this.currentStep > i + 1 || this.finished) {
					return `bg-${this.color} border-2 border-${this.color} ring-2 ring-${this.color}`;
				} 
				else if(this.currentStep === i + 1) {
					return `bg-${this.color} border-2 border-white ring-2 ring-${this.color}`
				} 
				else {
					return `ring-2 ring-gray-300`
				}
			}
		},
		nameColor(i) {
			if(!this.simple) {
				if(i + 1 > this.currentStep) {
					return `text-gray-400`;
				} 
				else {
					return `text-black`;
				}
			} 
			else {
				if(i + 1 <= this.currentStep) {
					return `text-${this.color}`;
				} 
				else {
					return `text-gray-400`;
				}
			}
		},
		dividerColor(i) {
			if(!this.simple) {
				return `h-0.5 bg-gray-300 mx-4`;
			} 
			else {
				if(i < this.currentStep) {
					return `h-1 bg-${this.color}`;
				} 
				else {
					return `h-0.5 bg-gray-300`;
				}
			}
		},
		allowBack(i) {
			if (i + 1 < this.currentStep && !this.disableBack && !this.finished) return true;
			else return false;
		}
	},
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