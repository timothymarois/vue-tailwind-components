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
                <textarea 
                    :id="id"
                    :type="type"
                    :name="name"
                    :placeholder="placeholder"
                    :readonly="readonly"
                    :disabled="disabled"
                    :required="required"
                    :maxlength="maxLength"
                    :autocomplete="`new-${id}`"
                    :value="internalValue"
                    @input="input($event)"
                    @keyup="keyup($event)"
                    @keydown="keydown($event)"
                    @focusout="focusout($event)"
                    @focus="focusin($event)"
                    :class="inputClasses"
                    :ref="id"
                    rows="4"
                    cols="4"
                />
            </div>
        </div>
        <div v-if="showCount && internalValue && !readonly" :class="getCssClass('characterCount')">
            {{ maxLengthNumber }} <span>
                <span v-if="lengthText">{{ lengthText }}</span>
                <span v-if="maxLength && !lengthText">/ {{ maxLength }}</span>
            </span>
        </div>
    </div>
</template>

<script>
import uniqid from "../../utils/uniqid.js";
import Component from '../Base/Component';
const TTextArea = Component.extend({
    name: 'TTextArea',
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
        maxLength: {
            type: Number,
            default: null
        },
        value: {
            type: [Number, String],
            default: null
        },
        width: {
            type: [String, Number],
            default : null
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
        showCount: {
            type: Boolean,
            default: false
        },
        maxLengthRemaining: {
            type: Boolean,
            default: false
        },
        lengthText: {
            type: String,
            default: null
        },
        fixedClasses: {
            type: String,
            default() {
                return {
                    root: 'relative',
                    characterCount: 'absolute right-0.5 -bottom-[18px]',
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
                    inputWrapper: '',
                    input: 'block w-full px-3 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50  disabled:opacity-50 disabled:cursor-not-allowed',
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
        },
        maxLengthNumber() {
            if (this.maxLengthRemaining && this.maxLength) return (this.maxLength-this.internalValue.length);
            return this.internalValue.length;
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

export default TTextArea;
</script>