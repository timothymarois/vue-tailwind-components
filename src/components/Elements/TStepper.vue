<template>
	<div>
		<div class="flex flex-row justify-between">
			<template v-for="(step, i) of stepOptions">
				<hr v-if="i != 0" class="flex-grow h-0.5 ml-4 mr-4 mt-5 bg-gray-300" :key="i" />
				<div class="relative" :key="step.id">
					<div 
						@click="currentStep = (+i + 1)"
						class="flex items-center justify-center rounded-full h-12 w-12 text-lg cursor-pointer select-none"
						:class="currentStep >= i + 1 ? `bg-${color} text-${textColor}` : 'bg-gray-400 text-white'"
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
</template>

<script>
import TIcon from '../Elements/TIcon.vue';

export default {
	name: 'TStepper',
	components: {
		TIcon
	},
	props: {
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
		}
	},
	data() {
		return {
			currentStep: 1
		}
	}
}
</script>