<template>
	<div :class="`h-${size} w-${size} bg-${color} text-${textColor} font-semibold text-${textSize} flex justify-center items-center ${round ? 'rounded-full' : ''}`">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'TAvatar',
	props: {
		size: {
			type: [String, Number],
			required: false,
			default: 6
		},
		color: {
			type: String,
			required: false,
			default: 'indigo-800'
		},
		textColor: {
			type: String,
			required: false,
			default: 'white'
		},
		round: {
			type: Boolean,
			required: false,
			default: true
		},
		textSize: {
			type: [String],
			required: false,
			default: 'lg'
		}
	}
};
</script>