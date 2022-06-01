<template>
    <transition name="fade" appear>
        <div
            v-if="show"
            @click="close"
            :class="overlayClasses"
        ></div>
    </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
	transition: .3s cubic-bezier(.25,.8,.8,1) opacity;
}
.fade-enter, .fade-leave-to {
	opacity: 0;
}
</style>

<script>
import Component from '../Base/Component';
const TOverlay = Component.extend({
    name: 'TOverlay',
    props: {
        freeze: {
            type: Boolean,
            default: false
        },
        relative: {
            type: Boolean,
            default: false
        },
        show: {
            type: Boolean,
            default: true
        },
        fixedClasses: {
            type: String,
            default() {
                return 'top-0 left-0 bottom-0 right-0'
            }
        },
        classes: {
            type: String,
            default() {
                return 'bg-gray-400 bg-opacity-60 z-40'
            }
        },
    },
    methods: {
        close() {
            if (this.freeze === false) this.$emit('close');
        }
    },
    computed: {
        overlayClasses() {
            return [this.getCssClass(),(this.freeze?'':'cursor-pointer'),(this.relative?'absolute':'fixed')];
        }
    }
});

export default TOverlay;
</script> 