<template>
	<div class="flex items-center">
		<div 
			class="mr-3 text-sm" 
			v-if="falseLabel"
		>
			<t-label 
				@click.native="switchState('before')"
				:color="`${checked ? 'text-gray-400' : ''}`"
			>
				{{ beforeLabel }}
			</t-label>
		</div>
		<div class="relative cursor-pointer" @click="switchState('toggle')">
			<input 
				type="checkbox"
				@input="update($event)"
				v-model="checked"
				class="sr-only" 
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
				:color="`${!checked ? 'text-gray-400' : ''}`"
			>
				{{ aftLabel }}
			</t-label>
		</div>
	</div>
</template>

<script>
import TLabel from "./TLabel";
export default { 
	name: 'TSwitch',
	data() {
		return {
			checked: false
		}
	},
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
		}
	},
	methods: {
		update(e) {
			this.$emit('input', !this.value);
		},
		switchState(side) {
			if(side === 'aft' && this.falseLabel) {
				this.checked = true;
			} 
			else if(side === 'before') {
				this.checked = false;
			} 
			else {
				this.checked = !this.checked;
			}
		}
	},
	computed: {
		aftLabel() {
			if ((this.trueLabel && this.checked === true) || (this.trueLabel && this.falseLabel)) {
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
