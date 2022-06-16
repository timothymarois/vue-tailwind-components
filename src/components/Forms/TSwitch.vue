<template>
	<div class="flex items-center">
		<div 
			class="mr-3 text-sm" 
			v-if="falseLabel"
		>
			<t-label 
				@click.native="switchState('before')"
				:color="`${isChecked ? 'gray-500' : ''}`"
				:class="{'cursor-not-allowed': isChecked && disabled}"
			>
				{{ beforeLabel }}
			</t-label>
		</div>
		<div class="relative cursor-pointer" @click="switchState('toggle')" v-if="!disabled">
			<input 
				:id="id"
				type="checkbox"
				class="sr-only" 
				:checked="isChecked"
				:value="value"
				@change="onChange($event)"
			/>
			<div 
				:class="`${inset ? 'w-12' : 'w-10'} ${inset ? 'h-6' : 'h-4'} bg-${color}-${colorLevel} rounded-full shadow-inner`"
				id="background" 
			/>
			<div 
				:class="`absolute w-6 h-6 bg-white border-2 border-${color}-${colorLevel} rounded-full ${inset ? 'left-0 top-0' : '-left-1 -top-1'} transition`"
				id="dot"
			/>
		</div>
		<div class="relative cursor-not-allowed" v-else>
			<div :class="`${inset ? 'w-12' : 'w-10'} ${inset ? 'h-6' : 'h-4'} ${isChecked ? `bg-${color}-300` : 'bg-gray-100'} rounded-full shadow-inner`" />
			<div :class="`absolute w-6 h-6 bg-white border-2 ${isChecked ? `border-${color}-300 translate-x-full` : 'translate-x-0'} rounded-full ${inset ? 'left-0 top-0' : '-left-1 -top-1'} transition`" />
		</div>
		<div class="ml-3 text-sm">
			<t-label 
				@click.native="switchState('aft')"
				:color="`${!isChecked ? 'gray-500' : ''}`"
				:class="{'cursor-not-allowed': !isChecked && disabled}"
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
		colorLevel: {
			type: [String, Number],
			default: '800'
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
		disabled: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		id() {
			return uniqid();
		},
		aftLabel() {
			if ((this.trueLabel && this.isChecked === true) || (this.trueLabel && this.falseLabel)) return this.trueLabel;
			else return this.label;
		},
		beforeLabel() {
			if(this.falseLabel) return this.falseLabel;
		},
		internalValue: {
			get() {
				return this.value; 
			},
			set(val) { 
				this.$emit('input', val);
				this.$emit('change', val);
			}
		},
		isChecked() {
			return this.valueComparator(this.value, this.trueValue) ? true : false
		}
	},
	methods: {
		switchState(side) {
			if(!this.disabled) {
				if(side === 'aft' && this.falseLabel) this.internalValue = this.trueValue;
				else if(side === 'before') this.internalValue = this.falseValue;
				else {
					// this.internalValue = !this.internalValue;
					const value = this.value;
					let input = this.internalValue
					input = this.valueComparator(value,this.trueValue) ? this.falseValue : this.trueValue
					this.internalValue = input
				}
			}
		},
		valueComparator: (a, b) => a === b,
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
