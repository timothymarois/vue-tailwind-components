import TSwitch from '../src/components/Forms/TSwitch.vue';
import TCard from '../src/components/Elements/TCard.vue';

export default {
	title: 'Forms/TSwitch',
	component: TSwitch,
	argTypes: { 
		color: {
			name: 'color',
			description: 'Tailwind classname for outline and fill color',
			control: { type: 'text' }
		},
		inset: {
			name: 'inset',
			description: 'Toogle inset of switch',
			control: { type: 'boolean' },
		},
		value: {
			name: 'value',
			description: 'Value of switch',
			control: { type: 'boolean' }
		},
		label: {
			name: 'label',
			description: 'Toggle text-only button'
		}
	},
};

// const Template = (args, { argTypes }) => ({
// 	props: Object.keys(argTypes),
// 	components: { TSwitch },
// 	template: 
// 		`<t-switch v-bind="$props" />`,
// });

// export const Standard = Template.bind({});
// Standard.args = {
// 	color: 'indigo',
// 	inset: false,
// 	value: false,
// 	label: 'Switch',
// };

// export const Inset = Template.bind({});
// Inset.args = {
// 	color: 'indigo',
// 	inset: true,
// 	value: false,
// 	label: 'Switch',
// };

// export const TrueLabel = Template.bind({});
// TrueLabel.args = {
// 	color: 'indigo',
// 	inset: false,
// 	value: false,
// 	label: 'Switch',
// 	trueLabel: 'Switch enabled'
// };

// export const MultipleValues = Template.bind({});
// MultipleValues.args = {
// 	color: 'indigo',
// 	inset: false,
// 	value: false,
// 	trueLabel: 'Enabled',
// 	falseLabel: 'Disabled'
// };


export const MultipleValues = () => ({
	components: { TSwitch, TCard },
	data() {
		return { 
			standardValue: false,
			myswitchvalue : false,
			defaultValue: true,
			trueLabel: false,
			testValues:'deactive',
			testValueDefault: 'active'
		}
	},
	template: 
		`

		<div class="mt-10">

			<t-card title="Standard" class="mb-4">
				<t-switch v-model="standardValue" />
				<t-switch v-model="standardValue" inset  class="mt-5"/>
				{{ standardValue }}
			</t-card>

			<t-card title="Standard with label" class="mb-4">
				<t-switch v-model="trueLabel" label="Switch Enabled" />
			</t-card>

			<t-card title="True/False Labels" class="mb-4">
				<t-switch 
					v-model="myswitchvalue"
					trueLabel="Enabled"
					falseLabel="Disabled"
				/>
				{{ myswitchvalue }}
			</t-card>

			<t-card title="Shared value above" class="mb-4">
				<t-switch 
					v-model="myswitchvalue"
					trueLabel="Enabled"
					falseLabel="Disabled"
				/>
				{{ myswitchvalue }}
			</t-card>

			<t-card title="Default true value" class="mb-4">
				<t-switch 
					v-model="defaultValue"
					trueLabel="Enabled"
					falseLabel="Disabled"
				/>
				{{ defaultValue }}
			</t-card>

			<t-card title="Active/Deactive string value" class="mb-4">
				<t-switch 
					v-model="testValues"
					trueLabel="Active"
					falseLabel="Deactive"
					trueValue="active"
					falseValue="deactive"
				/>
				{{ testValues }}
			</t-card>

			<t-card title="Active/Deactive string value (default value)" class="mb-4">
				<t-switch 
					v-model="testValueDefault"
					trueLabel="Active"
					falseLabel="Deactive"
					trueValue="active"
					falseValue="deactive"
				/>
				{{ testValueDefault }}
			</t-card>

			<t-card title="Disabled state" class="mb-4">
				<t-switch 
					v-model="testValueDefault"
					disabled
					
				/>
			</t-card>

		</div>
		
		`,
});
