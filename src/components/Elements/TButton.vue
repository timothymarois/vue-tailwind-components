<script>
import TLoader from './TLoader.vue';
import TIcon from './TIcon.vue';

export default {
	name: 'TButton',
	props: {
		label: {
			type: String,
			default: null
		},
		loading: {
			type: Boolean,
			default: false
		},
		block: {
			type: Boolean,
			default: false
		},
		disabled: {
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
		outlined: {
			type: Boolean,
			default: false
		},
		padding: {
			type: [Number, String],
			default: null
		},
		size: {
			type: String,
			default: 'md'
		},
		iconSize: {
			type: [Number, String],
			default: null
		},
		color: {
			type: String,
			default: 'indigo'
		},
		borderColor: {
			type: String,
			default: 'indigo'
		},
		tag: {
			type: String,
			default: 'button'
		},
		target: {
			type: String,
			default: null
		},
		to: {
			type: String,
			default: null
		},
		href: {
			type: String,
			default: null
		},
		icon: {
			type: String,
			default: null
		},
		iconSolid: {
			type: Boolean,
			default: false
		},
		iconRight: {
			type: String,
			default: null
		},
		colorLevel: {
			type: [String,Number],
			default: 800
		}
	},
	computed: {
		classes() {
			let c = [
				'relative',
				'whitespace-nowrap',
				'justify-center',
				'font-semibold',
				'flex',
				'items-center'
			];

			c = this.bIcon(c);
			c = this.bTheme(c);
			c = this.bBlock(c);
			c = this.bSize(c);
			c = this.bDisabled(c);
			c = this.bShadow(c);
			c = this.bLoading(c);

			return c;
		},
		iconText() {
            return (this.icon !== true && this.icon !== false);
        },
		iconOnly() {
			if (this.icon && (this.$slots.default || this.$slots.icon)) return true;
			if (typeof this.icon === 'string' && !this.$slots.default && !this.label) return true;
			return false;
		}
	},
	methods: {
		generateRouteLink() {
			let tag = '';

			const data = {
				attrs: {},
				props: {},
				[this.to ? 'nativeOn' : 'on']: {
					...this.$listeners,
					click: this.click,
				},
				ref: 'link'
			};

			if (this.to) {
				tag = this.$nuxt ? 'nuxt-link' : 'router-link';
				Object.assign(data.props, {
					to: this.to
				});
			} else {
				tag = (this.href && 'a') || this.tag || 'div';
				if (tag === 'a' && this.href) data.attrs.href = this.href;
			}

			if (this.target) data.attrs.target = this.target;

			return { tag, data };
		},
		buildIcon(icon) {
			if (icon) {
				let sz = 5;

				switch(this.size) {
					case 'xs':
						sz = 4;
						break;
					case 'sm':
						sz = 5;
						break;
					case 'lg':
						sz = 6; 
						break;
					case 'xl':
						sz = 6; 
						break;
					default:
						sz = 5;
				}

				if (this.iconSize) sz = this.iconSize;

				return this.$createElement(TIcon, {
					props: {
						size: sz,
						value: icon,
						solid: (this.iconSolid) ? true : false
					},
				});
			}
			return false;
		},
		genBaseLoader() {
			let color = 'white';
			if(this.disabled) color = 'gray-500'
			
			else {
				if(this.outlined) color = this.color; 
				else color = 'white';
			}

			let sz = 5;
			switch(this.size) {
				case 'xs':
					sz = 4;
					break;
				case 'sm':
					sz = 5;
					break;
				case 'lg':
					sz = 6; 
					break;
				case 'xl':
					sz = 6; 
					break;
				default:
					sz = 5;
			}

			if (this.iconSize) sz = this.iconSize;

			return this.$createElement(TLoader, {
				props: {
					size: sz,
					color: color
				},
			});
		},
		genIcon() {
            if ((this.iconOnly && this.$slots.default) || this.$slots.icon || this.icon) {
				let icon = null;

				if (this.iconOnly && this.$slots.default) icon = this.$slots.default;
				else icon = this.$slots.icon ? this.$slots.icon : this.buildIcon(this.icon)

                return this.$createElement('span',{
                    staticClass:'btn__icon flex align-center',
                    class: {
                        'mr-2': !this.iconOnly
                    }
                }, [(this.loading ? this.genBaseLoader() : icon)])
            }
        },
		genIconAfter() {
            if (this.$slots['icon-right'] || this.iconRight) {
                return this.$createElement('span',{
                    staticClass:'btn__icon flex align-center',
					class: {
						'ml-2': !this.iconOnly
					}
                }, [(this.loading ? this.genBaseLoader() : (this.$slots['icon-right'] ? this.$slots['icon-right'] : this.buildIcon(this.iconRight)))])
            }
        },
		genContent() {
			if (!this.iconOnly) {
				return this.$createElement('span', {
						staticClass: 'btn__content',
				}, (this.$slots.default ? this.$slots.default : this.label));
			}
		},
		genLoader() {
            if (!this.$slots.icon && !this.$slots['icon-right'] && !this.iconRight && !this.icon) {
                return this.$createElement('span', {
                    class: 'btn__loader',
                }, this.$slots.loader || [
                    this.genBaseLoader()
                ]);
            }
        },
		click(e) {
			if (!this.disabled) this.$emit('click', e);
		},
		bTheme(c) {
			let colorLevelSecondary = +this.colorLevel + 100;
			
			c = c.concat(['border-2', 'focus:outline-none']);

			if (this.text) {
				c = c.concat(['border-transparent']);
				
				if (this.disabled) c = c.concat(['text-gray-400', 'bg-gray-50']);
				else c = c.concat([`text-${this.color}-${this.colorLevel}`, `hover:text-${this.color}-${colorLevelSecondary}`, `hover:bg-${this.color}-100`]);
			} else {
				if (this.outlined) {
					if (this.disabled) c = c.concat(['text-gray-400','border-gray-200']);
					else {
						if (this.color === 'white') c = c.concat([`border-${this.color} text-${this.color} hover:bg-${this.color} hover:text-indigo-${this.colorLevel}`]);
						else c = c.concat([`border-${this.color}-${this.colorLevel} hover:border-${this.color}-${colorLevelSecondary} text-${this.color}-${this.colorLevel} hover:bg-${this.color}-100`]);
					}
				} else {
					c = c.concat(['border-transparent']);
					if (this.disabled) c = c.concat(['text-gray-400','bg-gray-200']); 
					else {
						if (this.color === 'white') c = c.concat([`bg-white text-indigo-${this.colorLevel} hover:bg-indigo-100`]);
						else c = c.concat([`text-white bg-${this.color}-${this.colorLevel} hover:bg-${this.color}-${colorLevelSecondary}`]);
					}
				}
			}

			if (this.rounded) c = c.concat(['rounded-full']);
			else c = c.concat(['rounded']);

			return c;
		},
		bLoading(c) {
            if (!this.$slots.icon && !this.$slots['icon-right'] && !this.iconRight && !this.icon) {
                if (this.loading) c = c.concat(['btn__loading']);
            }
            return c;
        },
		bBlock(c) {
			if (this.block) c = c.concat(['w-full']);
			return c;
		},
		bDisabled(c) {
			if (this.disabled) c = c.concat(['cursor-not-allowed']);
			else c = c.concat(['cursor-pointer']);
			return c;
		},
		bShadow(c) {
			if (this.shadow !== false && !this.text && !this.disabled) {
				switch(this.shadow) {
					case 'sm':
						return c.concat(['shadow-sm']);
					case 'md':
						return c.concat(['shadow-md']);
					case 'lg':
						return c.concat(['shadow-lg']);
					case 'xl':
						return c.concat(['shadow-xl']);
					default: 
						return c.concat(['shadow']);
				}
			}
			return c;
		},
		bIcon(c) {
			if (this.icon === true) this.block = false;
			return c;
		},
		bSize(c) {
			if (this.padding || this.padding === 0) c = c.concat([`px-${this.padding} py-${this.padding}`]);
			else {
				switch(this.size) {
					case 'xs': 
						c = c.concat(['text-xs']);
						if (!this.iconOnly) c = c.concat(['px-2','py-1']);
						if (this.iconOnly) c = c.concat(['px-1','py-1']);
						break;
					case 'sm': 
						c = c.concat(['text-sm']);
						if (!this.iconOnly) c = c.concat(['px-3','py-2']);
						if (this.iconOnly) c = c.concat(['px-2','py-2']);
						break;
					case 'lg': 
						c = c.concat(['text-base']);
						if (!this.iconOnly) c = c.concat(['px-4','py-2']);
						if (this.iconOnly) c = c.concat(['px-2','py-2']);
						break;
					case 'xl': 
						c = c.concat(['text-base']);
						if (!this.iconOnly) c = c.concat(['px-6','py-3']);
						if (this.iconOnly) c = c.concat(['px-3','py-3']);
						break;
					default: 
						c = c.concat(['text-sm']);
						if (!this.iconOnly) c = c.concat(['px-4','py-2']);
						if (this.iconOnly) c = c.concat(['px-2','py-2']);
				}
			}

			return c;
		}
	},
	render(h) {
		const children = [
			this.genIcon(),
            this.genContent(),
            this.loading && this.genLoader(),
            this.genIconAfter(),
		];

		// generate the tag type and its attr data
		const { tag, data } = this.generateRouteLink();

		// if we are a button
		// lets add the disabled state (if we're disabled)
		if (tag === 'button') data.attrs.disabled = this.disabled;

		return h(tag, { ...(!this.disabled ? data : {}), class: this.classes }, children)
	}
};
</script>

<style scoped>
.btn__loading .btn__content {
	opacity: 0;
}
.btn__loader {
	display: flex;
	align-items: center;
	height: 100%;
	justify-content: center;
	left: 0;
	position: absolute;
	top: 0;
	width: 100%;
}
</style>