import TStepper from '../src/components/Elements/TStepper.vue';

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

export const Standard = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TStepper },
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
			}
		]
	}),
	template: 
		`
		<div>
			<div class="w-2/3 mx-auto">
				<t-stepper :stepOptions="stepOptions1" v-bind="$props">
					<template v-slot:step_1>
						Content for step 1
					</template>
					<template v-slot:step_2>
						Content for step 2
					</template>
					<template v-slot:step_3>
						Content for step 3
					</template>
				</t-stepper>
			</div>
		</div>
		`,
});