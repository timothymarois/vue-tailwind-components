<template>
	<div class="flex items-center">
		<input 
			:id="id" 
			type="checkbox" 
			:class="`opacity-0 absolute h-${size} w-${size} cursor-pointer z-20`" 
			:checked="isChecked"
			:value="value"
			@change="onChange($event)"
		/>
		<div :class="`bg-white border-2 rounded relative border-${color}-700 w-${size} h-${size} flex flex-shrink-0 justify-center items-center`">
			<div :class="`hidden bg-${color}-700 w-${size} h-${size} flex justifty-center items-center rounded`" v-if="check">
				<TIcon 
					value="check" 
					:size="size"
					class="text-white absolute left-0 top-0"
				/>
			</div>
			<div :class="`hidden bg-${color}-700 w-${size - 2} h-${size - 2} absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-sm pointer-events-none`" v-else />
		</div>
		<div class="ml-3 text-sm" v-if="label">
			<t-label :id="id" >{{ label }}</t-label>
		</div>
	</div>
</template>

<script>
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
		color: {
			type: String,
			default: 'indigo'
		},
		size: {
			type: Number,
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
	},
	data() {
		return {
			// lazyValue: this.value
		}
	},
	methods: {
		valueComparator: (a, b) => a === b,
		onChange(e) {

			// const value = e.target.checked;
			const value = this.value;
			let input = this.internalValue
			input = this.valueComparator(value,this.trueValue) ? this.falseValue : this.trueValue

			// console.log('----------------')
			// console.log('isChecked: '+this.isChecked.toString())
			// console.log('value: '+value.toString())
			// console.log('input: '+input.toString())

			this.internalValue = input
		}
	},
	computed: {
		id() {
			return (Math.random() + 1).toString(36).substring(7);
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
input[type="checkbox"]:checked + div div {
  display: block;
}
</style>
