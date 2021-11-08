<template>
	<div>
		<div v-if="horizontal">
			<div class="flex flex-row justify-between">
				<template v-for="(step, i) of stepOptions">
					<hr v-if="i != 0" class="flex-grow h-0.5 ml-4 mr-4 mt-5 bg-gray-300" :key="i" />
					<div class="relative" :key="step.id">
						<div 
							class="flex items-center justify-center rounded-full h-12 w-12 text-lg select-none"
							:class="currentStep >= i + 1 ? `bg-${color} text-${textColor} cursor-pointer` : 'bg-gray-400 text-white'"
							@click="i + 1 < currentStep ? $emit('previous-step', i + 1) : ''"
						>
							<t-icon v-if="currentStep > i + 1" value="check" size="6" />
							<span v-else>
								{{ +i + 1 }}
							</span>
						</div>
						<div 
							class="absolute text-center mt-2 w-40 left-1/2 transform -translate-x-1/2"
							:class="{'text-gray-400' : currentStep < i + 1}"
						>{{ step.title }}</div>
					</div>
				</template>
			</div>
			<div class="mt-20" v-for="(step, i) of stepOptions" :key="step.id">
				<div v-show="(currentStep - 1) == i">
					<slot :name="step.id" />
				</div>
			</div>
		</div>
		<div v-else>
			<div class="flex flex-col justify-between">
				<div v-for="(step, i) of stepOptions" :key="step.id">
					<div class="relative">
						<div 
							class="flex items-center justify-center rounded-full h-8 w-8 text-lg select-none"
							:class="currentStep >= i + 1 ? `bg-${color} text-${textColor} cursor-pointer` : 'bg-gray-400 text-white'"
							@click="i + 1 < currentStep ? $emit('previous-step', i + 1) : ''"
						>
							<t-icon v-if="currentStep > i + 1" value="check" size="6" />
							<span v-else>
								{{ +i + 1 }}
							</span>
						</div>
						<div 
							class="absolute left-10 top-0.5 text-lg"
							:class="{'text-gray-400' : currentStep < i + 1}"
						>{{ step.title }}</div>
					</div>
					<div 
						class="ml-4 my-2 px-8 pt-2 pb-6"
						:class="{'border-l-2 border-gray-300': i + 1 !== stepOptions.length}"
						style="min-height: 2rem;"
					>
						<transition name="expand" @enter="enter" @after-enter="afterEnter" @leave="leave">
							<div v-show="(currentStep - 1) == i">
								<slot :name="step.id" id="stepper-slot" />
							</div>
						</transition>
					</div>
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
		currentStep: {
			type: Number,
			required: true,
			default: 1
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