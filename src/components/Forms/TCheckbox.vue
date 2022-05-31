<template>
	<div :class="getCssClass('root')">
		<input 
			:id="id"
			:type="radio ? 'radio' : 'checkbox'" 
			:class="getCssClass('input')" 
			:checked="isChecked"
			:value="value"
			:disabled="disabled"
			@change="onChange($event)"
		/>
		<div :class="[getCssClass('iconWrapper'),((disabled)?getCssClass('disabledWrapper'):null)]">
			<div v-if="check && !radio" :class="[getCssClass('iconCheck'),((disabled)?getCssClass('disabled'):null)]">
				<t-icon value="check" :class="getCssClass('icon')" />
			</div>
			<div v-else :class="[getCssClass('iconSolid'),((disabled)?getCssClass('disabled'):null)]" />
		</div>
		<div v-if="label" :class="getCssClass('labelWrapper')">
			<t-label :id="id" :disabled="disabled">{{ label }}</t-label>
		</div>
	</div>
</template>

<style scoped>
input:checked + div div {
	display: block;
}
</style>

<script>
import uniqid from "../../utils/uniqid.js";
import TLabel from "./TLabel.vue";

import Component from '../Base/Component';
const TCheckbox = Component.extend({
	name: 'TCheckbox',
	components: {
		TLabel
	},
	props: {
		label: {
			type: String,
			default: null
		},
		value: {
			type: [String, Boolean],
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
		check: {
			type: Boolean,
			default: false
		},
		radio: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		fixedClasses: {
            type: Object,
            default() {
                return {
                    root: 'relative flex items-center',
					disabled: '',
					disabledWrapper: '',
                    input: 'opacity-0 absolute z-20 cursor-pointer disabled:cursor-default',
					iconWrapper: 'relative flex flex-shrink-0 justify-center items-center',
					iconCheck: 'hidden flex justify-center items-center',
					iconSolid: 'hidden absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] pointer-events-none',
					icon: 'absolute left-0 top-0',
					labelWrapper: ''
                }
            }
        },
        classes: {
            type: Object,
            default() {
                return {
                    root: '',
                    input: 'h-5 w-5',
					disabled: '!bg-gray-300',
					disabledWrapper: '!border-gray-300',
					iconWrapper: 'bg-white h-5 w-5 border-2 border-indigo-800 rounded',
					iconCheck: 'h-5 w-5 bg-indigo-800 rounded',
					iconSolid: 'h-3 w-3 bg-indigo-800 rounded-sm',
					icon: 'text-white',
					labelWrapper: 'ml-2 text-sm'
                }
            }
        }
	},
	methods: {
		valueComparator: (a, b) => a === b,
		onChange() {
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
				this.$emit('change', val);
			}
		},
		isChecked() {
			return this.valueComparator(this.value, this.trueValue) ? true : false;
		}
	}
});

export default TCheckbox;
</script>