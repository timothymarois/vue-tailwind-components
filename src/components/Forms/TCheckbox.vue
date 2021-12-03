<template>
	<div class="relative flex items-center">
		<input 
			:id="id"
			:type="radio ? 'radio' : 'checkbox'" 
			:class="`opacity-0 h-${size} w-${size} absolute cursor-pointer z-20`" 
			:checked="isChecked"
			:value="value"
			@change="onChange($event)"
		/>
		<div :class="`bg-white border-2 ${radio ? 'rounded-full' : 'rounded'} relative border-${borderColor}-800 w-${size} h-${size} flex flex-shrink-0 justify-center items-center`">
			<div :class="`hidden bg-${color}-800 w-${size} h-${size} flex justify-center items-center rounded`" v-if="check && !radio">
				<TIcon 
					value="check"
					:size="size"
					class="text-white absolute left-0 top-0"
				/>
			</div>
			<div :class="`hidden bg-${color}-800 w-${size - 2} h-${size - 2} absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] ${radio ? 'rounded-full' : 'rounded-sm'} pointer-events-none`" v-else />
		</div>
		<div class="ml-2 text-sm" v-if="label">
			<t-label :id="id" >{{ label }}</t-label>
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
		}
	},
	methods: {
		valueComparator: (a, b) => a === b,
		onChange(e) {
			const value = this.value;
			let input = this.internalValue
			input = this.valueComparator(value,this.trueValue) ? this.falseValue : this.trueValue
			this.internalValue = input
		}
	},
	computed: {
		id() {
			return uniqid()
		},
		internalValue: {
			get: function() {
				return this.value; 
			},
			set: function(val) { 
				this.$emit('input',val);
			}
		},
		isChecked() {
			return this.valueComparator(this.value, this.trueValue) ? true : false
		}
	}
};
</script> 

<style scoped>
input:checked + div div {
  display: block;
}
</style>
