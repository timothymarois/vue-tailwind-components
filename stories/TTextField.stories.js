import TTextField from '../src/components/Forms/TTextField';
import TCard from '../src/components/Elements/TCard';

export default {
	title: 'FORMS/TTextField',
	component: TTextField,
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
	components: { TTextField },
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
	components: { TTextField, TCard },
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

				<t-card class="mt-5" title="Default Value + Labels + Character Counter">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around pb-4">
						<t-text-field v-model="defaultValue" label="My Label" characterCounter required />
						<t-text-field v-model="defaultValue" placeholder="placeholder" characterCounter maxlength="100" label="My Label" required />
					</div>
				</t-card>

				<t-card class="mt-5" title="Clearable">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-text-field v-model="anotherValue" label="My Label" required clearable />
						<t-text-field v-model="anotherValue" placeholder="placeholder" label="My Label" required clearable />
					</div>
				</t-card>

				<t-card class="mt-5" title="Clearable + Icons">
					<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end sm:justify-around">
						<t-text-field icon="check" v-model="anotherValue" label="My Label" required clearable />
						<t-text-field icon="check" v-model="anotherValue" placeholder="placeholder" label="My Label" required clearable />
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

			</div>
		</div>
		`,
});

export const CustomStyle = (argTypes) => ({
	props: Object.keys(argTypes),
	components: { TTextField, TCard },
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
						<t-text-field v-model="value" type="number" min="5" max="200" customStyle="w-20 appearance-none py-0 pl-2 -mt-1 ml-0.5 border-t-0 border-r-0 border-l-0 border-gray-400 mr-1 font-semibold text-indigo-800 focus:ring-0 focus:border-indigo-700 focus:text-indigo-800" />
						<t-text-field v-model="value" placeholder="placeholder" />
					</div>
				</t-card>
			</div>
		</div>
		`,
});
