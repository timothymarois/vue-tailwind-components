<template>
	<div :class="`relative h-1 block w-full bg-${color}-300 ${rounded ? 'rounded' : ''} overflow-hidden`">
		<div 
			:class="`bg-${color}-700`"
			id="ProgressBar__indeterminate"
		/>
	</div>
</template>

<script>
export default {
	name: 'TProgressBar',
	props: {
		color: {
			type: String,
			required: false,
			default: 'indigo'
		},
		rounded: {
			type: Boolean,
			required: false,
			default: true
		}
	}
}
</script>

<style scoped>
#ProgressBar__indeterminate::before {
	content: '';
	position: absolute;
	background-color: inherit;
	bottom: 0;
	top: 0;
	left: 0;
	animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
}

#ProgressBar__indeterminate::after {
	content: '';
	position: absolute;
	background-color: inherit;
	bottom: 0;
	top: 0;
	left: 0;
	animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
	animation-delay: 1.15s;
}

@keyframes indeterminate {
	0% {
		left:-35%;
		right:100%;
	} 60% {
		left:100%;
		right:-90%;
	} 100% {
		left:100%;
		right:-90%;
	}
}

@keyframes indeterminate-short {
	0% { 
		left: -200%;
		right: 100%;
	} 60% {
		left: 107%;
		right: -8%;
	} 100% {
		left:107%;
		right:-8%;
	}
}

</style>