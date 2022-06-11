<template>
	<div class="t-app" :class="[(isDark ? 'dark' : ''),getCssClass('root')]">
        <div class="t-app-wrapper" :class="getCssClass('wrapper')">
            <slot></slot>
        </div>
	</div>
</template>

<style>
html body {
    height: 100vh;
    width: 100vw;
}
body {
    overflow: hidden;
}
</style>

<script>
import Component from '../Base/Component';
const TApp = Component.extend({
	name: 'TApp',
	props: {
		dark: {
			type: Boolean,
			default: false
		},
        autoDarkMode: {
			type: Boolean,
			default: false
		},
        fixedClasses: {
            type: Object,
            default() {
                return {
                    root: 'flex relative w-full h-full',
                    wrapper: 'relative w-full h-screen overflow-hidden',
                }
            }
        },
        classes: {
            type: Object,
            default() {
                return {
                    root: '',
                    wrapper: 'bg-white text-black dark:bg-black dark:text-white',
                }
            }
        }
	},
    computed: {
        isDark() {
            return (this.autoDarkMode ? this.systemDark : this.dark);
        }
    },
    data() {
        return {
            systemDark : false
        }
    },
    mounted() {

        this.systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', event => {
                this.systemDark = event.matches
            })
    }
});

export default TApp;
</script>