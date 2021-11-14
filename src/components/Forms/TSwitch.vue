<template>
	<div class="flex items-center">
		<div 
			class="mr-3 text-sm" 
			v-if="falseLabel"
		>
			<t-label 
				@click.native="switchState('before')"
				:color="`${isChecked ? 'text-gray-400' : ''}`"
			>
				{{ beforeLabel }}
			</t-label>
		</div>
		<div class="relative cursor-pointer" @click="switchState('toggle')">
			<input 
				:id="id"
				type="checkbox"
				class="sr-only" 
				:checked="isChecked"
				:value="value"
				@change="onChange($event)"
			/>
			<div 
				:class="`w-${inset ? '12' : '10'} h-${inset ? '6' : '4'} bg-${color}-800 rounded-full shadow-inner`"
				id="background" 
			/>
			<div 
				:class="`absolute w-6 h-6 bg-white border-2 border-${color}-800 rounded-full ${inset ? 'left-0 top-0' : '-left-1 -top-1'} transition`"
				id="dot"
			/>
		</div>
		<div class="ml-3 text-sm">
			<t-label 
				@click.native="switchState('aft')"
				:color="`${!isChecked ? 'text-gray-400' : ''}`"
			>
				{{ aftLabel }}
			</t-label>
		</div>
	</div>
</template>

<script>
import uniqid from "../../utils/uniqid.js";
import TLabel from "./TLabel.vue";
export default { 
	name: 'TSwitch',
	components: {
		TLabel
	},
	props: {
		value: {
			type: [Boolean, String],
			default: null
		},
		label: {
			type: String,
			default: null
		},
		color: {
			type: String,
			default: 'indigo'
		},
		inset: {
			type: Boolean,
			default: false
		},
		trueLabel: {
			type: [String,Boolean],
			required: false
		},
		falseLabel: {
			type: [String,Boolean],
			required: false
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
	methods: {
		switchState(side) {
			if(side === 'aft' && this.falseLabel) {
				this.internalValue = this.trueValue;
			} 
			else if(side === 'before') {
				this.internalValue = this.falseValue;
			} 
			else {
				// this.internalValue = !this.internalValue;
				const value = this.value;
				let input = this.internalValue
				input = this.valueComparator(value,this.trueValue) ? this.falseValue : this.trueValue
				this.internalValue = input
			}
		},
		valueComparator: (a, b) => a === b,
		onChange(e) {
			// const value = this.value;
			// let input = this.internalValue
			// input = this.valueComparator(value,this.trueValue) ? this.falseValue : this.trueValue
			// this.internalValue = input
		}
	},
	computed: {
		id() {
			return uniqid()
		},
		aftLabel() {
			if ((this.trueLabel && this.isChecked === true) || (this.trueLabel && this.falseLabel)) {
				return this.trueLabel;
			} 
			else {
				return this.label;
			}
		},
		beforeLabel() {
			if(this.falseLabel) {
				return this.falseLabel;
			}
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
#dot {
	transform: translateX(100%);
}
input:not(:checked) ~ #dot {
	@apply bg-white border-gray-400;
	transform: translateX(0%);
}
input:not(:checked) ~ #background {
	@apply bg-gray-400;
}
</style>
