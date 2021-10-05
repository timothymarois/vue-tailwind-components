<template>
    <div class="relative">
        <div v-for="(slot,index) in $slots" :key="index">
            <div v-show="value==index">
                <slot :name="index" />
            </div>
        </div>
    </div>
</template>

<script>
export default { 
    name: 'TTabContent',
    props: {
        value: {
            type: [String, Number],
            default: null
        }
    }
};
</script> 