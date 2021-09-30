<template>
	<div 
        v-show="show" 
        @click="close"
        class="fixed top-0 left-0 lg:left-64 bottom-0 right-0 bg-gray-500 bg-opacity-75 z-30"
        :class="{ 'cursor-pointer' : allowOverlayClose }"
    ></div>
</template>

<script>
export default { 
    name: 'BaseOverlay',
    props: {
       show: {
           type: Boolean,
           default: false
       },
       allowOverlayClose: {
			type: Boolean,
			default: true
		}
    },
    methods: {
        close() {
            if (this.allowOverlayClose) {
                this.$emit('click',true)
            }
        }
    }
};
</script> 