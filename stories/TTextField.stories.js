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
	methods: {
		
	},
    data: () => ({
		defaultValue: 'Default Value',
        value: null,
		anotherValue: null
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

			</div>
		</div>
		`,
});
