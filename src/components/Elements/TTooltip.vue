<template>
	<div class="relative inline-flex">
		<div :id="`tooltip__wrap-${id}`" @mouseenter="show = true" @mouseleave="show = false">
			<slot>Text</slot>
		</div>
	</div>
</template>

<script>
import uniqid from '../../utils/uniqid.js';

export default {
	props: {
		position: {
			type: String,
			default: 'right' // top, right, bottom, left
		},
		color: {
			type: String,
			default: 'gray-800'
		},
		textColor: {
			type: String,
			default: 'white'
		},
		content: {
			type: String,
			required: true
		},
		active: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			show: false,
			element: document.createElement("div"),
			arrowElement: document.createElement("div"),
			clientRect: null,
		}
	},
	watch: {
		show(value) {
			if(value && this.active) {
				document.getElementById(this.id).classList.remove("opacity-0");
			} else {
				document.getElementById(this.id).classList.add("opacity-0");
			}
		}
	},
	mounted() {
		this.clientRect = document.getElementById(`tooltip__wrap-${this.id}`).getBoundingClientRect();

		this.arrowElement.classList.add("w-3", "h-3", "absolute", `bg-${this.color}`, ...this.arrowOffset);
		this.element.style = this.tooltipOffset(this.clientRect);
		this.element.style.zIndex = 1007;

		const classes = [
			"absolute",
			"pointer-events-none",
			"px-2", 
			"py-1.5", 
			"rounded", 
			"shadow", 
			`bg-${this.color}`, 
			"text-xs", 
			`text-${this.textColor}`, 
			"text-center", 
			"whitespace-nowrap", 
			"transform",
			"-translate-x-1/2",
			"transition-opacity",
			"duration-200",
			"opacity-0"
		];

		this.element.classList.add(...classes);
		this.element.innerHTML = this.content;
		this.element.setAttribute("id", this.id);
		this.element.appendChild(this.arrowElement);
		document.body.appendChild(this.element);

		window.addEventListener('resize', this.checkResize);
	},
	beforeDestroy() {
		this.element.remove();
		this.arrowElement.remove();
		window.removeEventListener('resize', this.checkResize);
	},
	methods: {
		checkResize() {
			setTimeout(() => {
				const newRect = document.getElementById(`tooltip__wrap-${this.id}`).getBoundingClientRect();
				if(newRect.y != this.clientRect.y || newRect.x != this.clientRect.x) {
					this.element.style = this.tooltipOffset(newRect);
					this.clientRect = newRect;

					console.log('update');
				}
			}, 1000);
		},
		tooltipOffset(newRect) {		
			switch(this.position) {
				case 'top': 
					return `left: ${newRect['x'] + (newRect['width'] / 2)}px; top: ${newRect['y'] - newRect['height']}px;`;
				case 'bottom':
					return `left: ${newRect['x'] + (newRect['width'] / 2)}px; top: ${newRect['y'] + newRect['height'] + 10}px;`;
				case 'left':
					return `left: ${newRect['x'] - 10}px; top: ${newRect['y'] + (newRect['height'] / 2)}px; transform: translateX(-100%) translateY(-50%);`;
				case 'right':
					return `left: ${newRect['x'] + newRect['width'] + 10}px; top: ${newRect['y'] + (newRect['height'] / 2)}px; transform: translateX(0%) translateY(-50%);`;
			}
		},
	},
	computed: {
		id() {
			return uniqid();
		},
		arrowOffset() {
			switch(this.position) {
				case 'top':
					return ['left-1/2', '-bottom-1.5', 'transform', 'rotate-45', '-translate-x-1/2'];
				case 'bottom':
					return ['left-1/2', '-top-1.5', 'transform', 'rotate-45', '-translate-x-1/2'];
				case 'left':
					return ['top-1/2', '-right-1.5', 'transform', 'rotate-45', '-translate-y-1/2'];
				case 'right':
					return ['top-1/2', '-left-1.5', 'transform', 'rotate-45', '-translate-y-1/2'];
			}
		}
	}
}
</script>

<style scoped>
.tooltip__right {
	left: calc(100% + 10px);
}
.tooltip__bottom {
	transform: translateX(-50%);
}
.tooltip__left {
	right: calc(100% + 10px);
}
.tooltip__arrow__top {
	left: 50%;
	bottom: -5px;
	transform: translateX(-50%) rotate(45deg);
}
.tooltip__arrow__right {
	left: -5px;
	top: 50%;
	transform: translateY(-50%) rotate(45deg);
}
.tooltip__arrow__bottom {
	left: 50%;
	top: -5px;
	transform: translateX(-50%) rotate(45deg);
}
.tooltip__arrow__left {
	right: -5px;
	top: 50%;
	transform: translateY(-50%) rotate(45deg);
}
</style>