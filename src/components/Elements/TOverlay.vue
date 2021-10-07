<template>
    <transition name="fade" appear>
        <div 
            @click="close"
            class="fixed top-0 left-0 bottom-0 right-0 bg-gray-400 bg-opacity-60 z-50"
            :class="{'cursor-pointer':allowOverlayClose}"
        ></div>
    </transition>
</template>

<script>
export default { 
    name: 'BaseOverlay',
    props: {
        allowOverlayClose: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        close() {
            if (this.allowOverlayClose) {
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