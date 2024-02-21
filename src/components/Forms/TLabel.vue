<template>
    <label 
        :for="id"
        :class="`${disabled ? 'cursor-default' : 'cursor-pointer'} block text-sm font-medium text-${color} transition-colors duration-150`"
    >
        <slot>
            <t-icon v-if="icon" :value="icon" class="mr-1" />
            <span v-if="label" class="inline-block">{{ label }}</span>
        </slot>
        <span class="inline-block text-red-500" v-if="required">*</span>
        <slot>
            <t-tooltip
                v-if="tooltip"
                position="top"
                :content="tooltip"
                class="inline-flex align-middle"
            >
                <span class="inline-flex text-gray-600 cursor-help">
                    <t-icon size="4" value="information-circle" solid />
                </span>
            </t-tooltip>
        </slot>
    </label>
</template>

<script>
import TIcon from "../Elements/TIcon.vue";
import TTooltip from "../Elements/TTooltip.vue";

export default { 
    name: 'TLabel',
    components: {
        TIcon,
        TTooltip
    }, 
    props: {
        required: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: null
        },
        id: {
            type: String,
            default: null
        },
        color: {
            type: String,
            default: 'gray-800'
        },
        icon: {
            type: String,
            default: null
        },
        tooltip: {
            type: String,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        }
    }
};
</script> 