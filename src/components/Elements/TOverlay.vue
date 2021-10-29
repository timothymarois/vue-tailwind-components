<template>
    <transition name="fade">
        <div
            v-if="showing"
            @click="close"
            class="top-0 left-0 bottom-0 right-0 bg-gray-400 bg-opacity-60 z-40"
            :class="{
                'cursor-pointer':!freeze,
                'fixed':!relative,
                'absolute':relative
            }"
        ></div>
    </transition>
</template>

<script>
export default { 
    name: 'BaseOverlay',
    props: {
        freeze: {
            type: Boolean,
            default: false
        },
        relative: {
            type: Boolean,
            default: false
        },
        showing: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        close() {
            if (this.freeze===false) {
                this.$emit('close-modal')
            }
        }
    }
};
</script> 

<style scoped>
.fade-enter-active, .fade-leave-active {
	transition: 1.5s cubic-bezier(.25,.8,.5,1) opacity;
}
.fade-enter, .fade-leave-to {
	opacity: 0;
}
</style>