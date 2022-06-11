<template>
	<nav class="t-nav" :class="getCssClass('root')">
        <div class="desktop-nav" :class="getCssClass('wrapper')">
            <slot></slot>
        </div>
        <div class="mobile-nav" :class="getCssClass('mobileWrapper')">
            <slot name="mobile"></slot>
        </div>
    </nav>
</template>

<script>
import Component from '../Base/Component';
const TNav = Component.extend({
	name: 'TNav',
	props: {
        fixedClasses: {
            type: Object,
            default() {
                return {
                    root: 'w-full relative',
                    wrapper: 'w-full flex relative',
                    mobileWrapper: 'w-full sm:hidden',
                }
            }
        },
        classes: {
            type: Object,
            default() {
                return {
                    root: 'bg-white dark:bg-gray-800 text-black dark:text-white',
                    wrapper: 'shadow py-2 px-4 h-16 items-center justify-between',
                    mobileWrapper: ''
                }
            }
        }
	},
    computed: {
      
    },
    data() {
        return {

        }
    },
    mounted() {

    }
});

export default TNav;
</script>