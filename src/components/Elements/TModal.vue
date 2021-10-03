<template>
	<div v-show="value" :class="containerClasses">
		<div class="relative px-4 py-4 min-h-full flex items-center justify-center">
			<div :class="containerInnerClasses">
				<div :class="containerContentClasses" :style="(type=='center') ? 'min-width:400px' : ''">
					
					<div v-if="closeButton" class="z-50 absolute top-0 right-0 m-4">
						<t-button icon="close" text @click="$emit('input',false)" />
					</div>

					<div class="relative lg:h-full lg:overflow-y-auto maxHeight">
						<slot></slot>
					</div>
					
				</div>
			</div>
		</div>

		<t-overlay 
			:value="value" 
			:allowOverlayClose="allowOverlayClose"
			@click="$emit('input',false)"
		/>

	</div>
</template>

<style scoped>
.maxHeight { 
	max-height: calc(100vh - 103px);
}
</style>

<script>
import TButton from "./TButton";
import TOverlay from "./TOverlay";
export default { 
	name: 'Modal',
	components: {
		TButton,
		TOverlay
	},
	props: {
		value: {
			type: Boolean,
			default: false
		},
		type: {
			type: String,
			default: 'center'
		},
		closeButton: {
			type: Boolean,
			default: true
		},
		allowOverlayClose: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		containerClasses() {
			return [
                'z-20',
                'fixed',
				'left-0',
				'sm:top-12',
				'sm:mt-1',
				'lg:left-64',
				'bottom-0',
				'right-0',
				'overflow-y-hidden'
            ];
		},
		containerInnerClasses() {

			let c = [
				'z-50',
                'mx-auto',
            ];
			
			switch(this.type) {
				case 'right' : 
					c = c.concat([
						'max-w-screen-md'
					]);
				break;
				case 'center' : 
					c = c.concat([
						'max-w-screen-md'
					]);
				break;
				case 'full' : 
					c = c.concat([
						'w-full'
					]);
				break;
				default : 
			}

			return c;
		},
		containerContentClasses() {

			let c = [
                'relative',
				'z-50',
				'mx-auto',
				'w-full',
				'bg-white',
				'shadow-lg',
				'rounded',
				'overflow-hidden',
            ];
			
			switch(this.type) {
				case 'right' : 
					c = c.concat([
						'max-w-xl',
						'lg:top-4',
						'lg:right-4',
						'lg:bottom-4',
						'lg:absolute'
					]);
				break;
				case 'center' : 
					c = c.concat([
						'p-4',
						'max-w-md'
					]);
				break;
				case 'full' : 
					
				break;
				default : 
			}

			return c;
		}
	}
};
</script> 