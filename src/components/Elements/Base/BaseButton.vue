<template>
	<button 
		:type="type" 
		:id="id"
	>
		<div v-if="hasIcon" class="mr-2">
			<slot name="icon"></slot>
		</div>
		<slot>Button</slot>
		<div v-if="hasIconAfter" class="ml-2">
			<slot name="icon-after"></slot>
		</div>
	</button>
</template>

<script>
export default { 
	name: 'TwBaseButton',
	props: {
		id: {
			type: String,
			default: null
		},
		type: {
			type: String,
			default: null
		}
	},
	computed: {
		hasIcon() {
			return !!this.$slots.icon;
		},
		hasIconAfter() {
			return !!this.$slots['icon-after'];
		},
	}
};
</script> 