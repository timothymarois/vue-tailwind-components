import TStepper from '../src/components/Elements/TStepper.vue';
import TButton from '../src/components/Elements/TButton.vue';

export default {
	title: 'Elements/TStepper',
	component: TStepper,
	argTypes: {
		color: {
			name: 'color',
			description: 'Tailwind classname for fill color of steps',
			control: { type: 'text' }
		},
		textColor: {
			name: 'textColor',
			description: 'Tailwind classname for text color of steps',
			control: { type: 'text' }
		}
	}
};

export const Horizontal = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TStepper, TButton },
	data: () => ({
		stepOptions1: [
			{
				title: "Sign up",
				id: "step_1"
			},
			{
				title: "Confirm email",
				id: "step_2"
			},
			{
				title: "Select preferences",
				id: "step_3"
			},
			{
				title: "Finalize sign up",
				id: "step_4"
			}
		],
		currentStep1: 1
	}),
	template: 
		`
		<div>
			<div class="w-2/3 mx-auto">
				<t-stepper :stepOptions="stepOptions1" :currentStep="currentStep1" :horizontal="true" v-bind="$props">
					<template v-slot:step_1>
						Content for step 1
						<t-button @click="currentStep1 += 1">Next step</t-button>
					</template>
					<template v-slot:step_2>
						Content for step 2
						<div class="flex flex-row space-x-4">
							<t-button @click="currentStep1 -= 1" :text="true">Previous step</t-button>
							<t-button @click="currentStep1 += 1">Next step</t-button>
						</div>
					</template>
					<template v-slot:step_3>
						Content for step 3
						<div class="flex flex-row space-x-4">
							<t-button @click="currentStep1 -= 1" :text="true">Previous step</t-button>
							<t-button @click="currentStep1 += 1">Next step</t-button>
						</div>
					</template>
					<template v-slot:step_4>
						Content for step 4
						<t-button @click="currentStep1 -= 1" :text="true">Previous step</t-button>
					</template>
				</t-stepper>
			</div>
		</div>
		`,
});

export const Vertical = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TStepper, TButton },
	data: () => ({
		stepOptions1: [
			{
				title: "Sign up",
				id: "step_1"
			},
			{
				title: "Confirm email",
				id: "step_2"
			},
			{
				title: "Select preferences",
				id: "step_3"
			},
			{
				title: "Finalize sign up",
				id: "step_4"
			}
		],
		currentStep1: 1
	}),
	template: 
		`
		<div>
			<div class="w-2/3 mx-auto">
				<t-stepper :stepOptions="stepOptions1" :currentStep="currentStep1" :horizontal="false" v-bind="$props">
					<template v-slot:step_1>
						Content for step 1
						<t-button @click="currentStep1 += 1">Next step</t-button>
					</template>
					<template v-slot:step_2>
						Content for step 2
						<div class="flex flex-row space-x-4">
							<t-button @click="currentStep1 -= 1" :text="true">Previous step</t-button>
							<t-button @click="currentStep1 += 1">Next step</t-button>
						</div>
					</template>
					<template v-slot:step_3>
						Content for step 3
						<div class="flex flex-row space-x-4">
							<t-button @click="currentStep1 -= 1" :text="true">Previous step</t-button>
							<t-button @click="currentStep1 += 1">Next step</t-button>
						</div>
					</template>
					<template v-slot:step_4>
						Content for step 4
						<t-button @click="currentStep1 -= 1" :text="true">Previous step</t-button>
					</template>
				</t-stepper>
			</div>
		</div>
		`,
});