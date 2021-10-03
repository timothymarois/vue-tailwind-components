<template>
    <div class="relative">
        <t-label 
            v-if="label"
            :id="id"
            :label="label"
            :required="required"
        />
        <div :class="{'mt-1':label}">
            <div class="relative text-gray-500">
                <div v-if="icon" class="pointer-events-none absolute inset-y-0 left-0 p-2 flex items-center">
                    <t-icon :value="icon" size="4" />
                </div>
                <input 
                    :id="id"
                    :type="type" 
                    :name="name" 
                    :placeholder="placeholder" 
                    :readonly="readonly"
                    :maxlength="maxlength"
                    :value="value"
                    @input="update($event)"
                    :class="fieldClasses"
                    :style="(width ? 'width:'+width+'px' : '')"
                />
            </div>
        </div>
    </div>
</template>

<script>
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
        readonly: {
            type: Boolean,
            default: false
        },
        maxlength: {
            type: Number,
            default: 255
        },
        value: {
            type: String,
            default: null
        },
        width: {
            type: [String, Number],
            default : null
        },
        icon: {
            type: [String,Boolean],
            default: false
        }
    },
    computed: {
        id() {
            return (Math.random()+1).toString(36).substring(7);
        },
        fieldClasses() {
            let c = ['shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-md border-gray-300 rounded-md '];

            if (this.icon) {
                c = c.concat(['pl-8']);
            }

            return c;
        }
    },
    methods: {
        update(e) {
            this.$emit('input', e.target.value);
        }
    }
};
</script> 