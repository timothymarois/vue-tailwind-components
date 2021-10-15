<template>
	<div class="relative inline-flex">
		<div id="content">
			<slot>Text</slot>
		</div>
		<div 
			:class="`absolute pointer-events-none z-50 px-2 py-1 rounded shadow opacity-0 bg-${color} text-xs text-${textColor} text-center whitespace-nowrap Tooltip__${position}`"
			id="Tooltip__content"
		>
			<div :class="`w-3 h-3 absolute bg-${color} z-10`" :id="`Tooltip__arrow__${position}`" />
			{{ content || 'Tooltip content' }}
		</div>
	</div>
</template>

<script>
export default {
	props: {
		position: {
			type: String,
			required: false,
			default: 'top'
		},
		color: {
			type: String,
			required: false,
			default: 'gray-800'
		},
		textColor: {
			type: String,
			required: false,
			default: 'white'
		},
		content: {
			type: String,
			required: true
		}
	}
}
</script>

<style scoped>
.Tooltip__top {
	bottom: calc(100% + 10px);
	left: 50%;
	transform: translateX(-50%);
}

.Tooltip__right {
	top: 50%;
	transform: translateY(-50%);
	left: calc(100% + 10px);
}

.Tooltip__bottom {
	top: calc(100% + 10px);
	left: 50%;
	transform: translateX(-50%);
}

.Tooltip__left {
	top: 50%;
	transform: translateY(-50%);
	right: calc(100% + 10px);
}

#Tooltip__arrow__top {
	left: 50%;
	bottom: -5px;
	transform: translateX(-50%) rotate(45deg);
}

#Tooltip__arrow__right {
	left: -5px;
	top: 50%;
	transform: translateY(-50%) rotate(45deg);
}

#Tooltip__arrow__bottom {
	left: 50%;
	top: -5px;
	transform: translateX(-50%) rotate(45deg);
}

#Tooltip__arrow__left {
	right: -5px;
	top: 50%;
	transform: translateY(-50%) rotate(45deg);
}

#content:hover ~ div {
	opacity: 1;
}
</style>