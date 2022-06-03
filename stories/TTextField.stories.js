export default {
	title: 'FORMS/TTextField',
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
			<t-text-field v-bind="$props" @cleared="cleared = true" />
			<div class="mt-4" v-if="cleared">
				Input field cleared
			</div>
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
						<t-text-field v-model="value" />
						<t-text-field v-model="value" placeholder="placeholder" />
					</div>
				</t-card>

				<t-card class="mt-5" title="Default Value + Labels">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-text-field v-model="defaultValue" label="My Label" required />
						<t-text-field v-model="defaultValue" placeholder="placeholder" label="My Label" required />
					</div>
				</t-card>

				<t-card class="mt-5" title="Error Labels">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-text-field v-model="defaultValue" label="My Label" required error />
						<t-text-field v-model="defaultValue" placeholder="placeholder" label="My Label" required error />
					</div>
				</t-card>

				<t-card class="mt-5" title="Default Value + Labels + Character Counter">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around pb-4">
						<t-text-field v-model="defaultValue" label="My Label" showCount required />
						<t-text-field v-model="defaultValue" placeholder="placeholder" showCount maxlength="100" label="My Label" required />
					</div>
				</t-card>

				<t-card class="mt-5" title="Default Value + Labels + Character Counter + Text">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around pb-4">
						<t-text-field v-model="defaultValue" label="My Label" showCount required maxLengthText="Character Length"  />
						<t-text-field v-model="defaultValue" placeholder="placeholder" showCount maxlength="100" label="My Label" required maxLengthText="Characters Remaining" maxLengthRemaining />
					</div>
				</t-card>

				<t-card class="mt-5" title="Clearable">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-text-field v-model="anotherValue" label="My Label" required clearable />
						<t-text-field v-model="anotherValue" placeholder="placeholder" label="My Label" required clearable />
					</div>
				</t-card>

				<t-card class="mt-5" title="Clearable + Icons (Variant = icon)">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-text-field variant="icon" icon="check" v-model="anotherValue" label="My Label" required clearable />
						<t-text-field variant="icon" icon="check" v-model="anotherValue" placeholder="placeholder" label="My Label" required clearable />
					</div>
				</t-card>

				<t-card class="mt-5" title="Label Icons with Time + Date types">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-text-field type="time" iconLabel="clock" v-model="anotherValue" label="My Label" required />
						<t-text-field type="date" iconLabel="calendar" v-model="anotherValue" label="My Label" required />
					</div>
				</t-card>

				<t-card class="mt-5" title="25000 Limit">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">

						<t-text-field 
							v-model="limitValue" 
							label="Enter Value" 
							type="number"
							min="0" 
							max="25000"
						/>

						<t-text-field 
							v-model="noLimts" 
							label="No Limits" 
							type="number"
						/>

					</div>
				</t-card>

				<t-card class="mt-5" title="50 Minimum">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">

						<t-text-field 
							v-model="limitValue" 
							label="Enter Value" 
							type="number"
							min="50"
						/>

						<t-text-field 
							v-model="noLimts" 
							label="No Minimum" 
							type="number"
						/>

					</div>
				</t-card>

				<t-card class="mt-5" title="Read-only">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-text-field v-model="value" readonly />
						<t-text-field v-model="value" placeholder="placeholder" readonly />
					</div>
				</t-card>

				<t-card class="mt-5" title="Disabled">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-text-field v-model="value" disabled />
						<t-text-field v-model="value" placeholder="placeholder" disabled />
					</div>
				</t-card>

			</div>
		</div>
		`,
});

export const CustomStyle = (argTypes) => ({
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
                <t-card class="mt-5" title="Custom Variant">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-text-field v-model="value" type="number" min="5" max="200" variant="custom" />
						<t-text-field v-model="value" placeholder="no variant" />
					</div>
				</t-card>
			</div>
		</div>
		`,
});
