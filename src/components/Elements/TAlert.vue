<template>
	<div class="w-full">
		<div 
			:class="[alertClasses, `py-3 px-4 w-full text-${textColor} inline-flex items-center ${rounded ? 'rounded' : ''} ${shadow ? 'shadow' : ''}`]"
		>
			<div v-if="icon" class="mr-2">
				<t-icon 
					:class="`text-${iconColor}-${iconColorLevel}`"
					:value="icon" 
					:size="iconSize" 
				/>
			</div>
			<div :class="`text-${textColor}-${colorLevel}`">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
import TIcon from "./TIcon.vue";
export default {
	name: 'TAlert',
	components: {
		TIcon
	},
	props: {
		icon: {
			type: String,
			default: null
		},
		iconSize: {
			type: String,
			default: 6
		},
		iconColor: {
			type: String,
			default: 'white'
		},
		iconColorLevel: {
			type: [Number, String],
			default: '600'
		},
		color: {
			type: String,
			default: 'indigo'
		},
		colorLevel: {
			type: [Number, String],
			default: '600'
		},
		textColor: {
			type: String,
			default: 'white'
		},
		outlined: {
			type: Boolean,
			default: false
		},
		rounded: {
			type: Boolean,
			default: false
		},
		shadow: {
			type: Boolean,
			default: false
		},
		text: {
			type: Boolean,
			default: false
		},
		borderColor: {
			type: String,
			default: 'indigo'
		},
		borderPosition: {
			type: String,
			default: null
		},
		borderWidth: {
			type: [String, Number],
			default: '4'
		}
	},
	computed: {
		alertClasses() {
			let c = []

			if(!this.text) {
				if(this.outlined) {
					c = c.concat([`border-2 border-${this.borderColor}-${this.colorLevel}`])
				} 
				else {
					c = c.concat([`bg-${this.color}-${this.colorLevel}`])
				}
			} 
			else {
				if(this.outlined) {
					c = c.concat([`border-2 border-${this.borderColor}-${this.colorLevel}`]);
				}
			}

			if(this.borderPosition && !this.outlined) {
				const position = this.borderPosition.substring(0, 1);
				c = c.concat([`border-${position}-${this.borderWidth} border-${this.borderColor}`])
			}

			return c;
		}
	}
}
</script>