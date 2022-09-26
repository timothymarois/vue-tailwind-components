<template>

    <svg xmlns="http://www.w3.org/2000/svg" 
        :class="'w-full h-full mx-auto absolute top-0 bottom-0 left-0 right-0'" 
        viewBox="0 0 24 24" 
    >
        <path v-if="value=='save'" fill="currentColor" d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
	</svg>
</template>

<script>
export default { 
	name: 'BaseIconSolidMDI',
	props: {
		value: {
			type: String,
			default: 'check'
		}
	}
};
</script>