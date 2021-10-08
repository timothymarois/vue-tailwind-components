<template>
	<div 
		:class="[alertClasses, `py-3 px-4 text-${textColor} inline-flex items-center ${rounded ? 'rounded-md' : ''} ${shadow ? 'shadow-lg' : ''}`]"
	>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'TAlert',
	props: {
		color: {
			type: String,
			required: false,
			default: 'indigo'
		},
		textColor: {
			type: String,
			required: false,
			default: 'white'
		},
		outlined: {
			type: Boolean,
			required: false,
			default: false
		},
		rounded: {
			type: Boolean,
			required: false,
			default: true
		},
		shadow: {
			type: Boolean,
			required: false,
			default: true
		},
		textOnly: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	computed: {
		alertClasses() {
			let c = []

			if(!this.textOnly) {
				if(this.outlined) {
					c = c.concat([`bg-white border-2 border-${this.color}-600`])
				} else {
					c = c.concat([`bg-${this.color}-600`])
				}
			} else {
				if(this.outlined) {
					c = c.concat([`border-2 border-${this.color}-600`]);
				}
			}

			return c;
		}
	}
}
</script>