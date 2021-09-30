<style scoped>
.btn__loading .btn__content {
    opacity: 0;
}
.btn__loader {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
}
</style>

<script>
import { BaseLoader, BaseIcon } from "@/components/Elements/Base";
export default { 
    name: 'Btn',
    components: {
        BaseLoader,
        BaseIcon
    },
    props: {
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
        target : {
            type: String,
            default: null
        },
        to : {
            type: String,
            default: null
        },
        href : {
            type: String,
            default: null
        },
        icon: {
            type: [Boolean, String],
            default: false
        },
        'icon-right': {
            type: String,
            default: null
        },
    },
    computed: {
        classes() {

            let c = [
                'relative',
                'whitespace-nowrap',
                'flex',
                'justify-center',
                'font-semibold',
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
            return (this.icon!==true && this.icon!==false);
        },
        iconOnly() {
            if ((typeof this.icon==='string' && !this.$slots.default) || this.icon===true) {
                return true;
            }

            return false;
        }
    },
    methods: {
        generateRouteLink() {
            let tag

            const data = {
                attrs: {},
                props: {},
                [this.to ? 'nativeOn' : 'on']: {
                    ...this.$listeners,
                    click: this.click,
                },
                ref: 'link'
            }

            if (this.to) {
                tag = this.$nuxt ? 'nuxt-link' : 'router-link'
                Object.assign(data.props, {
                    to: this.to
                })
            }
            else {
                tag = (this.href && 'a') || this.tag || 'div'
                if (tag === 'a' && this.href) data.attrs.href = this.href
            }

            if (this.target) data.attrs.target = this.target

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
                    default : 
                        sz = 5;
                }

                if (this.iconSize) {
                    sz = this.iconSize;
                }

                return this.$createElement(BaseIcon, {
                    props: {
                        size: sz,
                        icon: icon
                    },
                });
            }
            return false;
        },
        genBaseLoader() {
            return this.$createElement(BaseLoader, {
                props: {
                    size: 23,
                    width: 2
                },
            });
        },
        genIcon() {
            if (this.$slots.icon || this.iconText) {
                return this.$createElement('span',{
                    staticClass:'btn__icon',
                    class: {
                        'mr-2' : !this.iconOnly
                    }
                }, [(this.loading ? this.genBaseLoader() : (this.$slots.icon ? this.$slots.icon : this.buildIcon(this.icon)) )])
            }
        },
        genIconAfter() {
            if (this.$slots['icon-right'] || this.iconRight) {
                return this.$createElement('span',{
                    staticClass:'btn__icon btn__after ml-2'
                }, [(this.loading ? this.genBaseLoader() : (this.$slots['icon-right'] ? this.$slots['icon-right'] : this.buildIcon(this.iconRight)))])
            }
        },
        genContent() {
            return this.$createElement('span', {
                staticClass: 'btn__content',
            },this.$slots.default);
        },
        genLoader() {
            if (!this.$slots.icon && !this.$slots['icon-right'] && !this.iconText && !this.iconRight) {
                return this.$createElement('span', {
                    class: 'btn__loader',
                }, this.$slots.loader || [
                    this.genBaseLoader()
                ]);
            }
        },
        click (e) {
            if (!this.disabled) {
                this.$emit('click',e);
            }
        },
        bTheme(c) {
            c = c.concat(['border-2','border-transparent','focus:outline-none']);
            if (this.text) {
                if (this.disabled) {
                    c = c.concat(['text-gray-400','bg-gray-50']);
                }
                else {
                    c = c.concat(['text-black','hover:bg-'+this.color+'-100']);
                }
            }
            else {
                c = c.concat(['text-white']);
                if (this.outlined) {
                    if (this.disabled) {
                        c = c.concat(['text-gray-400','border-gray-300']);
                    }
                    else {
                        if (this.color=='white') {
                            c = c.concat(['border-'+this.color,'text-'+this.color,'hover:bg-'+this.color,'hover:text-indigo-800']);
                        }
                        else {
                            c = c.concat(['border-'+this.color+'-800','hover:border-'+this.color+'-900','text-'+this.color+'-800','hover:bg-'+this.color+'-100']);
                        }
                    }
                }
                else {
                    if (this.disabled) {
                        c = c.concat(['text-gray-400','bg-gray-200']);
                    }
                    else {
                        if (this.color=='white') {
                            c = c.concat(['bg-white','text-indigo-800','hover:bg-indigo-100']);
                        }
                        else {
                            c = c.concat(['bg-'+this.color+'-800','hover:bg-'+this.color+'-900']);
                        }
                    }
                }
            }

            if (!this.icon) {
                c = c.concat(['px-4']);
            }

            if (this.rounded) {
                c = c.concat(['rounded-full']);
            }
            else {
                c = c.concat(['rounded']);
            }

            return c;
        },
        bLoading(c) {
            if (!this.$slots.icon && !this.$slots['icon-right'] && !this.iconText && !this.iconRight) {
                if (this.loading) c = c.concat(['btn__loading']);
            }
            return c;
        },
        bBlock(c) {
            if (this.block) c = c.concat(['w-full']);
            return c;
        },
        bDisabled(c) {
            if (this.disabled===true) {
                c = c.concat(['cursor-not-allowed']);
            }
            else {
                c = c.concat(['cursor-pointer']);
            }
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
                    default : 
                        return c.concat(['shadow']);
                }
            }
            return c;
        },
        bIcon(c) {
            if (this.icon===true) {
                this.block = false;
            }
            return c;
        },
        bSize(c) {

            if (this.padding) {
                return c.concat(['px-'+this.padding,'py-'+this.padding]);
            }

            if (this.$slots.default) {
                switch(this.size) {
                    case 'xs': 
                        c = c.concat(['px-2.5','py-1.5','text-xs']);
                        // if (this.iconRight) c = c.concat(['pr-1.5']);
                        break;
                    case 'sm': 
                        c = c.concat(['px-3','py-2','text-sm','leading-4']);
                        // if (this.iconRight) c = c.concat(['pr-2']);
                        break;
                    case 'lg': 
                        c = c.concat(['px-4','py-2','text-base']);
                        // if (this.iconRight) c = c.concat(['pr-3']);
                        break;
                    case 'xl': 
                        c = c.concat(['px-6','py-3','text-base']);
                        // if (this.iconRight) c = c.concat(['pr-4']);
                        break;
                    default : 
                        c = c.concat(['px-4','py-2','text-sm']);
                        // if (this.iconRight) c = c.concat(['pr-3']);
                }
            }
            else {
                c = c.concat(['p-2','text-sm']);
            }

            return c;
        },
    },
    render (h) {

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
        if (tag === 'button') {
            data.attrs.disabled = this.disabled;
        }

        return h(tag, { ...(!this.disabled ? data : {}), class: this.classes }, children)
    }
};
</script> 