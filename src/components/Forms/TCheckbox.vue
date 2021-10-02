<template>
	<div :class="`flex items-center text-${color}-800 text-sm capitalize`">
		<div class="flex items-center">
			<input 
				:id="id" 
				:value="value"
				@input="update($event)"
				type="checkbox" 
				:class="`opacity-0 absolute h-${size} w-${size} cursor-pointer z-20`" 
			/>
			<div :class="`bg-white border-2 rounded relative border-${color}-700 w-${size} h-${size} flex flex-shrink-0 justify-center items-center`">
				<div :class="`hidden bg-${color}-700 w-${size - 2} h-${size - 2} absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-sm pointer-events-none`" />
			</div>
		</div>
		<div class="ml-3 text-sm">
			<label 
				:for="id" 
				class="cursor-pointer font-medium text-gray-700"
			>{{ label }}</label>
		</div>
	</div>
</template>

<script>
export default { 
	name: 'TCheckbox',
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
		size: {
			type: Number,
			default: 5
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
input[type="checkbox"]:checked + div div {
  display: block;
}
</style>
