<template>
	<div :class="`_loader-wrapper relative inline-flex align-middle justifty-center items-center p-0 h-${size} w-${size}`">
		<svg 
			xmlns="http://www.w3.org/2000/svg" 
			viewBox="21.73913043478261 21.73913043478261 43.47826086956522 43.47826086956522" 
			:class="`_loader-svg w-full h-full mx-auto absolute top-0 bottom-0 left-0 right-0 z-10 transition-all duration-200 ease-in-out text-${color}-900`"
		>
			<circle 
				fill="transparent" 
				cx="43.47826086956522" 
				cy="43.47826086956522" 
				r="20" 
				stroke-width="3.4782608695652177" 
				stroke-dasharray="125.664" 
				stroke-dashoffset="125.66370614359172px" 
				class="_loader-spinner stroke-current z-10 transition-opacity transition-transform duration-500 ease-in-out"
			/>
		</svg>
	</div>
</template>

<script>
export default { 
	name: 'TLoader',
	props: {
		size: {
			type: Number,
			default: 5
		},
		color: {
			type: String,
			default: 'indigo'
		}
	}
};
</script>

<style scoped>
._loader-spinner {
	animation: _loader-spinner 1.4s ease-in-out infinite;
	stroke-linecap: round;
	stroke-dasharray: 80,200;
	stroke-dashoffset: 0px;
}

._loader-svg {
	animation: _loader-svg 1.4s linear infinite;
	transform-origin: center center;
	transform: rotate(0deg)
}

@keyframes _loader-spinner {
	0% {
    stroke-dasharray: 1,200;
    stroke-dashoffset: 0px;
	} 50% {
		stroke-dasharray: 100,200;
		stroke-dashoffset: -15px;
	} 100% {
		stroke-dasharray: 100,200;
		stroke-dashoffset: -124px;
	}
}

@keyframes _loader-svg {
	100% {
		transform: rotate(1turn);
	}
}
</style>