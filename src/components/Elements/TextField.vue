<template>
    <div class="relative">
        <BaseLabel 
            v-if="label"
            :id="id"
            :label="label"
            :required="required"
        />
        <div :class="{'mt-1':label}">
            <div class="relative text-gray-500">
                <div v-if="icon" class="pointer-events-none absolute inset-y-0 left-0 p-2 flex items-center">
                    <Icon :icon="icon" size="4" />
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
import { BaseLabel, Icon } from "@/components/Elements";
export default { 
    name: 'TextField',
    components: {
        BaseLabel,
        Icon
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
            return this.$helpers.generateRandomString(8).toLowerCase()
        },
        fieldClasses() {
            let c = ['shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-md border-gray-300 rounded-md'];

            if (this.icon) {
                c = c.concat(['pl-8']);
            }

            return c;
        }
    },
    methods: {
        update(e) {
            this.$emit('update:value', e.target.value);
        }
    }
};
</script> 