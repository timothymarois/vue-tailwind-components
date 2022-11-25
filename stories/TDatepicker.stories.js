import TDatepicker from '../src/components/Forms/TDatepicker';
import TButton from '../src/components/Elements/TButton.vue';
import TCard from '../src/components/Elements/TCard';


export default {
	title: 'FORMS/TDatepicker',
	component: TDatepicker,
	argTypes: { 
		required: {
			name: 'required',
			description: 'Is date required?',
			control: { type: 'boolean' }
		},
		label: {
			name: 'label',
			description: 'Label of date picker',
			control: { type: 'text' }
		},
		inputClasses: {
			name: 'inputClasses',
			description: 'Additional classes for date picker',
			control: { type: 'text' }
		},
		color: {
			name: 'color',
			description: 'Color change on hover',
			control: { type: 'color' }
		},
		textColor: {
			name: 'textColor',
			description: 'Custom color for date picker',
			control: { type: 'color' }
		},
		borderColor: {
			name: 'borderColor',
			description: 'Custom color for date picker`s border',
			control: { type: 'color' }
		},
		readonly: {
			name: 'readonly',
			description: 'Is date picker disabled?',
			control: { type: 'boolean' }
		},
		width: {
			name: 'width',
			description: 'Set width of date picker',
			control: { type: 'number' }
		},
		errorState: {
			name: 'errorState',
			description: 'Toggle error state',
			control: { type: 'boolean' }
		},
		customStyle: {
			name: 'customStyle',
			description: 'Custom classes for date picker',
			control: { type: 'boolean' }
		},
		disabledDays: {
			name: 'disabledDays',
			description: 'Disable specific days',
         control: { type: 'multi-select' },
         options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
		},
		disableBefore: {
			name: 'disableBefore',
			description: 'Disable all dates before a specified date',
         control: { type: 'text' }
		},
		disableAfter: {
			name: 'disableAfter',
			description: 'Disable all dates after a specified date',
         control: { type: 'text' }
		},
		disableOn: {
			name: 'disableOn',
			description: 'Disable all specific dates',
         control: { type: 'object' }
		},
	},
};

export const Standard = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TDatepicker, TButton },
   data: () => ({
      datepickerValue: null
	}),
	template: 
	`
		<div>
			<div class="w-full">
				<t-datepicker label="Send day" placeholder="Select send day" v-model="datepickerValue" required v-bind="$props" />
			</div>
		</div>
	`,
	methods: {
		
	},
});
Standard.args = {
	color: 'indigo',
};

export const StandardDateSelector = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TDatepicker, TCard },
   data: () => ({
      datepickerValue: null
	}),
	methods: {
		
	},
	template: 
		`
      
		<div class="p-6 bg-gray-100">
         <t-card class="mt-5" title="Standard date selector">
            <div class="w-1/2">
               <t-datepicker label="Select send day" placeholder="Send day" v-model="datepickerValue" required v-bind="$props" />
            </div>
         </t-card>
         
		</div>
		`,
});

StandardDateSelector.args = {
	color: 'indigo'
};



