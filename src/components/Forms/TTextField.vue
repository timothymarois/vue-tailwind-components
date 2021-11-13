<template>
    <div class="relative w-full">
        <t-label 
            v-if="label"
            :id="id"
            :label="label"
            :required="required"
            :icon="iconLabel"
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
                    :maxlength="maxlength"
                    :autocomplete="`new-${id}`"
                    v-model="internalValue"
                    @input="update($event)"
                    @keyup="keyup($event)"
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
import TIcon from "../Elements/TIcon";
import TLabel from "./TLabel";
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
        }
    },
    computed: {
        internalValue : {
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
            let c = [`block w-full h-10 border-gray-200 rounded text-${this.color}-800 text-sm hover:bg-${this.color}-100 hover:text-${this.color}-900 hover:border-${this.color}-900 focus:outline-none focus:ring-0 focus:border-${this.color}-800`];

            if (this.icon) {
                c = c.concat(['pl-8']);
            }

            if (this.inputClasses) {
                c = c.concat([this.inputClasses]);
            }

            return c;
        }
    },
    methods: {
        update(e) {
            this.$emit('input', e.target.value);
        },
        keyup(e) {
            this.$emit('keyup', e);
        },
        clearField() {
            this.internalValue = null;
            this.$emit('cleared');
        }
    }
};
</script>