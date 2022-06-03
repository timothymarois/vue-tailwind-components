export default {
	title: 'FORMS/TTextArea',
	argTypes: { 
		value: {
			name: 'value',
			description: 'Set default value of text field'
		},
		label: {
			name: 'label',
			description: 'Set label of text field'
		},
        placeholder: {
			name: 'placeholder',
			description: 'Set placeholder for text field'
		},
		clearable: {
			name: 'clearable',
			description: 'Toggle adding clear option to text field'
		},
		borderColor: {
			name: 'borderColor',
			description: 'Set custom borde rcolor',
			control: { type: 'text' }
		}
	},
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	data: () => ({
		cleared: false
	}),
	template: 
		`
		<div>
			<t-text-area v-bind="$props" />
		</div>
		`,
});

export const Standard = Template.bind({});
Standard.args = {
	value: null,
	placeholder: 'Placeholder',
	label: 'Label'
};

export const DifferentStates = (argTypes) => ({
	props: Object.keys(argTypes),
    data: () => ({
		defaultValue: 'Default Value',
        value: null,
		anotherValue: null,
		limitValue: null,
		noLimts: 0
    }),
	template: 
		`
        <div class="p-6 bg-gray-100">
            <div class="max-w-2xl">

                <t-card class="mt-5" title="Standard">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
                        <t-text-area v-model="value" placeholder="placeholder" />
					</div>
				</t-card>

                <t-card class="mt-5" title="Standard">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
                        <t-text-area label="With Label" v-model="value" placeholder="placeholder" />
					</div>
				</t-card>

                <t-card class="mt-5" title="Standard">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
                        <t-text-area maxLength="255" showCount label="With Label" v-model="value" placeholder="placeholder" />
					</div>
				</t-card>

			</div>
		</div>
		`,
});
