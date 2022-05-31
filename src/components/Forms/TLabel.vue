<template>
    <label 
        :for="id"
        :class="[getCssClass('label'),((disabled)?getCssClass('disabledLabel'):null)]"
    >
        <slot>
            <t-icon v-if="icon" :value="icon" :class="getCssClass('icon')" />
            <span v-if="label" :class="getCssClass('textLabel')">{{ label }}</span>
        </slot>
        <span v-if="required" :class="getCssClass('required')">*</span>
    </label>
</template>

<script>
import Component from '../Base/Component';
const TLabel = Component.extend({
    name: 'TLabel',
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
        icon: {
            type: String,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        },
        fixedClasses: {
            type: Object,
            default() {
                return {
                    label: 'block transition-colors duration-150',
                    disabledLabel: '',
                    textLabel: 'inline-block',
                    icon: '',
                    required: 'inline-block'
                }
            }
        },
        classes: {
            type: Object,
            default() {
                return {
                    label: 'text-sm font-medium text-gray-800 cursor-pointer',
                    disabledLabel: 'cursor-default',
                    textLabel: '',
                    icon: 'mr-1',
                    required: 'text-red-600'
                }
            }
        }
    }
});

export default TLabel;
</script> 