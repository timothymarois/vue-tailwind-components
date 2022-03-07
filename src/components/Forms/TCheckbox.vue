<template>
	<div class="relative flex items-center">
		<input 
			:id="id"
			:type="radio ? 'radio' : 'checkbox'" 
			:class="`opacity-0 h-${size} w-${size} absolute ${disabled ? 'cursor-default' : 'cursor-pointer'} z-20`" 
			:checked="isChecked"
			:value="value"
			:disabled="disabled"
			@change="onChange($event)"
		/>
		<div :class="outlineClassesComputed">
			<div :class="checkClassesComputed" v-if="check && !radio">
				<TIcon 
					value="check"
					:size="size"
					class="text-white absolute left-0 top-0"
				/>
			</div>
			<div :class="solidClassesComputed" v-else />
		</div>
		<div class="ml-2 text-sm" v-if="label">
			<t-label :id="id" :color="labelColor" :disabled="disabled">{{ label }}</t-label>
		</div>
	</div>
</template>

<script>
import uniqid from "../../utils/uniqid.js";
import TLabel from "./TLabel.vue";
import TIcon from "../Elements/TIcon.vue";
export default { 
	name: 'TCheckbox',
	components: {
		TLabel,
		TIcon
	},
	props: {
		value: {
			type: [String, Boolean],
			default: false
		},
		color: {
			type: String,
			default: 'indigo'
		},
		colorLevel: {
			type: [String, Number],
			default: '800'
		},
		label: {
			type: String,
			default: null
		},
		size: {
			type: [String, Number],
			default: 5
		},
		check: {
			type: Boolean,
			default: false
		},
		trueValue: {
			type: [String, Boolean],
			default: true
		},
		falseValue: {
			type: [String, Boolean],
			default: false
		},
		radio: {
			type: Boolean,
			default: false
		},
		borderColor: {
			type: String,
			default: 'indigo'
		},
		borderColorLevel: {
			type: [String, Number],
			default: '800'
		},
		labelColor: {
			type: String,
			default: 'gray-800'
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		valueComparator: (a, b) => a === b,
		onChange(e) {
			const value = this.value;
			let input = this.internalValue;
			input = this.valueComparator(value,this.trueValue) ? this.falseValue : this.trueValue;
			this.internalValue = input;
		}
	},
	computed: {
		id() {
			return uniqid();
		},
		internalValue: {
			get: function() {
				return this.value; 
			},
			set: function(val) { 
				this.$emit('input', val);
			}
		},
		isChecked() {
			return this.valueComparator(this.value, this.trueValue) ? true : false;
		},
		outlineClassesComputed() {
			let c = [`bg-white border-2 relative flex flex-shrink-0 justify-center items-center w-${this.size} h-${this.size}`];

			if(this.radio) c = c.concat(['rounded-full'])
			else c = c.concat(['rounded']);

			if(this.disabled) c = c.concat(['border-gray-700'])
			else c = c.concat([`border-${this.borderColor}-${this.borderColorLevel}`]);

			return c;
		},
		checkClassesComputed() {
			let c = [`hidden w-${this.size} h-${this.size} flex justify-center items-center rounded`];
			
			if(this.disabled) c = c.concat(['bg-gray-300']);
			else c = c.concat([`bg-${this.color}-${this.colorLevel}`]);

			return c;
		},
		solidClassesComputed() {
			let c = [`hidden w-${this.size - 2} h-${this.size - 2} absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] pointer-events-none`]
			
			if(this.disabled) c = c.concat(['bg-gray-600']);
			else c = c.concat([`bg-${this.color}-${this.colorLevel}`]);
			
			if(this.radio) c = c.concat(['rounded-full']);
			else c = c.concat(['rounded-sm']);

			return c;
		}
	}
};
</script> 

<style scoped>
input:checked + div div {
  display: block;
}
</style>
