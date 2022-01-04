<template>
    <div class="relative w-full">
        <t-label 
            v-if="label"
            :id="id"
            :label="label"
            :required="required"
            :icon="iconLabel"
            :color="errorState ? 'text-red-700' : 'text-gray-800'"
        />
        <div :class="{'mt-1':label}">
            <div class="relative text-gray-500">
                <div v-if="icon" class="pointer-events-none absolute inset-y-0 left-0 p-2 flex items-center">
                    <t-icon :value="icon" size="5" />
                </div>
                <input 
                    :id="id"
                    :type="type" 
                    :name="name" 
                    :placeholder="placeholder" 
                    :readonly="readonly"
                    :required="required"
                    :maxlength="maxlength"
                    :autocomplete="`new-${id}`"
                    :value="internalValue"
                    @input="input($event)"
                    @keyup="keyup($event)"
                    @keydown="keydown($event)"
                    @focusout="focusout($event)"
                    @focus="focusin($event)"
                    :min="min"
                    :max="max"
                    :class="fieldClasses"
                    :style="(width ? `width: ${width}px` : '')"
                />
                <div 
                    v-if="clearable && internalValue"
                    class="cursor-pointer absolute inset-y-0 right-0 p-2 flex items-center"
                    @click="clearField"
                >
                    <t-icon value="close" size="5" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import uniqid from "../../utils/uniqid.js";
import TIcon from "../Elements/TIcon.vue";
import TLabel from "./TLabel.vue";
export default { 
    name: 'TTextField',
    components: {
        TLabel,
        TIcon
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
        inputClasses: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: null
        },
        color: {
            type: String,
            required: false,
            default: 'indigo'
        },
        textColor: {
            type: String,
            required: false,
            default: 'black'
        },
        borderColor: {
            type: String,
            required: false,
            default: 'gray-200'
        },
        name: {
            type: String,
            default: null
        },
        type: {
            type: String,
            default: 'text'
        },
        readonly: {
            type: Boolean,
            default: false
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
        errorState: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        internalValue: {
            get() {
                return this.value
            },
            set(v) {
                this.$emit('input', v);
            }
        },
        id() {
            return uniqid();
        },
        fieldClasses() {
            let c = [`block w-full h-10 rounded text-sm hover:bg-${this.color}-100 focus:outline-none focus:ring-0`];

            if (this.icon) {
                c = c.concat(['pl-8']);
            }

            if (this.inputClasses) {
                c = c.concat([this.inputClasses]);
            }

            if(this.errorState) {
                c = c.concat(['border-red-400 focus:border-red-400 text-red-700 hover:text-red-800']);
            } else {
                c = c.concat([`text-${this.textColor} border-${this.borderColor} hover:border-${this.color}-900 focus:border-${this.color}-800 hover:text-${this.color}-900`])
            }

            return c;
        }
    },
    methods: {
        validateValue(value) {
            if (value === null || value === '') return null;
            if (this.type == 'number') {
                value = +value;
                if (this.max && value > +this.max) value = +this.max;
                if (this.min && value < +this.min) value = +this.min;
            }
            return value
        },
        input(e) {
            e.target.value = this.validateValue(e.target.value)
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
            this.$emit('focusout', e);
        },
        clearField() {
            this.internalValue = null;
            this.$emit('cleared');
        }
    }
};
</script>