<template>
	<label 
		:for="id"
		class="flex items-center cursor-pointer"
	>
		<div class="relative">
			<input 
				:id="id" 
				type="checkbox"
				@input="update($event)"
				v-model="checked"
				class="sr-only" 
			/>
			<div 
				:class="`w-${inset ? '14' : '10'} h-${inset ? '8' : '4'} bg-${color}-300 rounded-full shadow-inner`"
				id="background" 
			/>
			<div 
				:class="`absolute w-6 h-6 bg-${color}-700 rounded-full shadow ${inset ? 'left-1 top-1' : '-left-1 -top-1'} transition shadow`"
				id="dot"
			/>
		</div>
		<div class="ml-3 text-sm">
			<t-label :id="id">{{ label }}</t-label>
		</div>
	</label>
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
		}
	},
	methods: {
		update(e) {
			this.$emit('input', !this.value);
		}
	},
	computed: {
		id() {
			return (Math.random()+1).toString(36).substring(7);
		}
	}
};
</script> 

<style scoped>
#dot {
	transform: translateX(100%);
}

input:not(:checked) ~ #dot {
	@apply bg-white;
	transform: translateX(0%);
}

input:not(:checked) ~ #background {
	@apply bg-gray-400;
}
</style>