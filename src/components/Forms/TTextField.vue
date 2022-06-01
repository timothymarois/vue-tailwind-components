<template>
    <div :class="getCssClass('root')">
        <t-label 
            v-if="label"
            :id="id"
            :label="label"
            :required="required"
            :icon="iconLabel"
            :error="error"
        />
        <div :class="{'mt-1': label}">
            <div :class="getCssClass('inputWrapper')">
                <div v-if="icon" :class="getCssClass('icon')">
                    <t-icon :value="icon" />
                </div>
                <input 
                    :id="id"
                    :type="type"
                    :name="name"
                    :placeholder="placeholder"
                    :readonly="readonly"
                    :disabled="disabled"
                    :required="required"
                    :maxlength="maxlength"
                    :autocomplete="`new-${id}`"
                    :pattern="pattern"
                    :value="internalValue"
                    @input="input($event)"
                    @keyup="keyup($event)"
                    @keydown="keydown($event)"
                    @focusout="focusout($event)"
                    @focus="focusin($event)"
                    :min="min"
                    :max="max"
                    :class="inputClasses"
                    :style="(width ? `width: ${width}px` : '')"
                    :ref="id"
                />
                <div 
                    v-if="clearable && internalValue && !readonly"
                    :class="getCssClass('clearable')"
                    @click="clearField"
                >
                    <t-icon value="close" />
                </div>
            </div>
        </div>
        <div v-if="characterCounter && internalValue && !readonly" :class="getCssClass('characterCount')">
            {{ internalValue.length }}<span v-if="maxlength">/{{ maxlength }}</span>
        </div>
    </div>
</template>

<script>
import uniqid from "../../utils/uniqid.js";
import Component from '../Base/Component';
const TTextField = Component.extend({
    name: 'TTextField',
    props: {
        required: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: null
        },
        name: {
            type: String,
            default: null
        },
        type: {
            type: String,
            default: 'text'
        },
        maxlength: {
            type: Number,
            default: 255
        },
        value: {
            type: [Number, String],
            default: null
        },
        width: {
            type: [String, Number],
            default : null
        },
        icon: {
            type: String,
            default: null
        },
        iconLabel: {
            type: String,
            default: null
        },
        clearable: {
            type: Boolean,
            default: false
        },
        min: {
            type: [String, Number],
            default: null
        },
        max: {
            type: [String, Number],
            default: null
        },
        pattern: {
            type: String,
            default: null
        },
        error: {
            type: Boolean,
            default: false
        },
        characterCounter: {
            type: Boolean,
            default: false
        },
        fixedClasses: {
            type: String,
            default() {
                return {
                    root: 'relative',
                    characterCount: 'absolute right-0.5 -bottom-[18px]',
                    clearable: 'cursor-pointer absolute inset-y-0 right-0 p-2 flex items-center',
                    icon: 'pointer-events-none absolute inset-y-0 left-0 p-2 flex items-center',
                    inputWrapper: 'relative',
                    input: 'block'
                }
            }
        },
        classes: {
            type: String,
            default() {
                return {
                    root: 'w-full',
                    characterCount: 'text-right text-[11px] text-gray-600',
                    clearable: 'text-gray-500',
                    icon: 'text-gray-500',
                    inputWrapper: '',
                    input: 'w-full h-10 rounded text-sm focus:outline-none focus:ring-0 text-black border-gray-300 hover:bg-indigo-100 hover:border-indigo-900 focus:border-indigo-800 hover:text-indigo-900',
                    inputReadonlyState: 'cursor-default bg-gray-100 border-gray-200 focus:border-gray-200 hover:!border-gray-200 hover:!bg-gray-100',
                    inputDisabledState: 'cursor-default bg-gray-100 border-gray-200 focus:border-gray-200 hover:!border-gray-200 hover:!bg-gray-100',
                    inputErrorState: '!border-red-400 focus:!border-red-400 !text-red-700 hover:!text-red-800 hover:!bg-red-50'
                }
            }
        }
    },
    computed: {
        internalValue: {
            get() {
                return this.value;
            },
            set(v) {
                this.$emit('input', v);
            }
        },
        id() {
            return uniqid();
        },
        inputClasses() {
            if (this.disabled) return [this.getCssClass('input'),this.getCssClass('inputDisabledState')];
            if (this.readonly) return [this.getCssClass('input'),this.getCssClass('inputReadonlyState')];
            if (this.error) return [this.getCssClass('input'),this.getCssClass('inputErrorState')];
            return this.getCssClass('input');
        }
    },
    methods: {
        validateValue(value) {
            if (value === null || value === '') return null;
            if (this.type === 'number') {
                value = +value;
                if (this.max && value > +this.max) value = +this.max;
                if (this.min && value < +this.min) value = +this.min;
            }
            return value;
        },
        input(e) {
            if(this.type !== 'number') e.target.value = this.validateValue(e.target.value);
            this.$emit('input', e.target.value);
        },
        keyup(e) {
            this.$emit('keyup', e);
        },
        keydown(e) {
            this.$emit('keydown', e);
        },
        focusin(e) {
            this.$emit('focusin', e);
        },
        focusout(e) {
            if(this.type === 'number') {
                e.target.value = this.validateValue(e.target.value);
                this.$emit('input', e.target.value);
            }
            this.$emit('focusout', e);
        },
        clearField() {
            this.internalValue = null;
            this.$emit('cleared');
        },
        blur() {
            this.$refs[this.id].blur();
        }
    }
});

export default TTextField;
</script>