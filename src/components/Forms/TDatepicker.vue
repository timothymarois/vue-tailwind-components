<template>
   <div class="relative w-full">
      <t-label 
         v-if="label"
         :id="id"
         :label="label"
         :required="required"
         :color="errorState ? 'red-700' : 'gray-800'"
      />
      <div :class="{'mt-1': label}">
         <div class="relative text-gray-500 ">
            <date-picker 
               :value="internalValue" 
               @input="changeValue"
               :placeholder="placeholder"
               type="date"
               :editable="!readonly" 
               :format="format"
               :input-class="fieldClasses"
               :disabled-date="disableDays"
               :style="(width ? `width: ${width}` : '')">
                  <template #icon-calendar>
                     <t-icon value="calendar" :class="{'text-gray-500': !errorState, 'text-red-500': errorState}" size="5" />
                  </template>
            </date-picker>
         </div>
      </div>
   </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

import uniqid from "../../utils/uniqid.js";
import TIcon from "../Elements/TIcon.vue";
import TLabel from "./TLabel.vue";

export default {
   name: 'TDatepicker',
   components: { 
      DatePicker,
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
         default: 'Select date'
      },
      inputClasses: {
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
      readonly: {
         type: Boolean,
         default: false
      },
      value: {
         type: Date,
         default: null
      },
      format: {
         type: String,
         default: 'YYYY-MM-DD'
      },
      width: {
         type: [String, Number],
         default : '100%'
      },
      errorState: {
         type: Boolean,
         default: false
      },
      customStyle: {
         type: String,
         default: null
      },
      disabledDays: {
         type: Array,
         default: null
      },
      disableBefore: {
         type: String,
         default: null // yyyy-MM-dd
      },
      disableAfter: {
         type: String,
         default: null // yyyy-MM-dd
      }
   },
   computed: {
      id() {
         return uniqid();
      },
      internalValue() {
         return this.value;
      },
      
      fieldClasses() {
         if(!this.customStyle) {
            let defaultClasses = [`[&_+_i_>_div]:hover:!text-indigo-900 block w-full h-10 rounded text-sm focus:outline-none focus:ring-0`];
            if (this.inputClasses) defaultClasses = defaultClasses.concat([this.inputClasses]);
            if (this.readonly) {
               defaultClasses = defaultClasses.concat(['cursor-default bg-gray-100 border-gray-200 focus:border-gray-200']);
            } else {
               if(this.errorState) {
                  defaultClasses = defaultClasses.concat(['border-red-400 focus:border-red-400 text-red-700 hover:text-red-800 placeholder:text-red-400 [&_+_i_>_div]:hover:!text-red-500']);
               } else {
                  defaultClasses = defaultClasses.concat([`text-${this.textColor} border-${this.borderColor} hover:bg-${this.color}-100 hover:border-${this.color}-900 focus:border-${this.color}-800 hover:text-${this.color}-900`])
               } 
            }
            return defaultClasses;
         } else {
            return this.customStyle;
         } 
      }
   },
   methods: {
      changeValue(val) {
         this.$emit('input', val);
      },
      disableDays(date) {
         const today = new Date();
         today.setHours(0, 0, 0, 0);
         if (this.disabledDays) {
            const day = new Date(date).getDay();
            let disabledDays = this.disabledDays.map(day => {
               switch (day) {
                  case 'Sunday':
                     return 0
                     break;
                  case 'Monday':
                     return 1
                     break;
                  case 'Tuesday':
                     return 2
                     break;
                  case 'Wednesday':
                     return 3
                     break;
                  case 'Thursday':
                     return 4
                     break;
                  case 'Friday':
                     return 5
                     break;
                  case 'Saturday':
                     return 6
                     break;
               }
            })
            return disabledDays.includes(day) || date < new Date(today.getTime() + 24 * 3600 * 1000) || date < new Date(this.disableBefore) || date > new Date(this.disableAfter) ;
         } else {
            return date < new Date(today.getTime() + 24 * 3600 * 1000) || date < new Date(this.disableBefore) || date > new Date(this.disableAfter);
         }
      }
   }
   
}
</script>
<style lang="css">
   .mx-icon-calendar {
      right: 12px;
   }
   .mx-icon-clear {
      width: 20px;
      hight: 20px;
   }
   .mx-icon-clear svg {
      @apply text-indigo-900;
   }
   .mx-icon-calendar svg {
      fill: transparent;
      width: 20px;
      height: 20px;
      top: 50%;
      margin-top: -11px;
   }  
   .mx-datepicker-main,
   .mx-btn {
      font-family: inherit;
      color: inherit;
   }
   .mx-calendar-content .cell:not(.disabled):hover {
      @apply text-indigo-900 bg-indigo-100;
   }
   .mx-calendar-content .cell.active {
      @apply rounded bg-indigo-800 !important;
   }
</style>