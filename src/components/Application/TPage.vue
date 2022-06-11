<template>
	<div class="t-page" :class="getCssClass('root')" :style="calcHeight">
        <div class="page-content" :class="getCssClass('content')">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Component from '../Base/Component';
const TPage = Component.extend({
	name: 'TPage',
	props: {
        offsetHeight: {
            type: [Number, String],
            default: 0
        },
        fixedClasses: {
            type: Object,
            default() {
                return {
                    root: 'relative h-full w-full overflow-x-hidden overflow-y-auto',
                    content: 'relative'
                }
            }
        },
        classes: {
            type: Object,
            default() {
                return {
                    root: '',
                    content: ''
                }
            }
        }
	},
    computed: {
        calcHeight() {
            return `height: calc(100vh - ${this.offsetHeight}px)`
        }
    },
    data() {
        return {

        }
    },
    mounted() {

        // let page = document.querySelector('.t-page');
        // console.log(page.outerHeight)
        // console.log(page.offsetHeight)
        // console.log(window.innerHeight)
    }
});

export default TPage;
</script>