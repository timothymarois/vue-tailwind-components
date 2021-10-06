<template>
	<div class="flex items-center">
		<!-- <input 
			:id="id" 
			:value="value"
			@input="update($event)"
			@click="$emit('click',value)"
			type="checkbox" 
			:class="`opacity-0 absolute h-${size} w-${size} cursor-pointer z-20`" 
		/> -->
		<input 
			:id="id" 
			type="checkbox" 
			:class="`opacity-0 absolute h-${size} w-${size} cursor-pointer z-20`" 
			:value="value"
			:checked="isActive"
			@change="onChange"
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
		<div class="ml-3 text-sm">
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
		value: [String, Boolean, Object, Array],
		trueValue: {
			type: [String, Boolean, Object, Array],
			default: null
		},
		falseValue: {
			type: [String, Boolean, Object, Array],
			default: null
		},
		multiple: {
			type: Boolean,
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
		}
	},
	data () {
		return {
			lazyValue: this.value
		}
	},
	watch: {
		value(val) {
			this.lazyValue = val
		},
	},
	methods: {
		valueComparator: (a, b) => Math.round(a) === Math.round(b),
		onChange() {
			// const value = this.value
			let input = this.internalValue

			if (this.isMultiple) 
			{
				if (!Array.isArray(input)) {
					input = []
				}

				const length = input.length
				input = input.filter((item) => !this.valueComparator(item,value))

				if (input.length === length) {
					input.push(value)
				}
			} 
			else if (this.trueValue !== undefined && this.falseValue !== undefined) {
				input = this.valueComparator(input, this.trueValue) ? this.falseValue : this.trueValue
			} 
			else if (value) {
				input = this.valueComparator(input, value) ? null : value
			} 
			else {
				input = !input
			}

			this.internalValue = input
		}
	},
	computed: {
		id() {
			return (Math.random()+1).toString(36).substring(7);
		},
		isMultiple () {
			return this.multiple === true || (this.multiple === null && Array.isArray(this.internalValue))
		},
		internalValue: {
			get: function() {
				return this.lazyValue; 
			},
			set: function(val) { 
				this.lazyValue = val
				this.$emit('input',val);
			}
		},
		isActive() {

			const value = this.value
			const input = this.internalValue

			if (this.isMultiple) {
				if (!Array.isArray(input)) return false
				return input.some(item => this.valueComparator(item, value))
			}

			if (this.trueValue === undefined || this.falseValue === undefined) {
				return value
				? this.valueComparator(value, input)
				: Boolean(input)
			}

			return this.valueComparator(input, this.trueValue)
		}
	}
};
</script> 

<style scoped>
input[type="checkbox"]:checked + div div {
  display: block;
}
</style>
