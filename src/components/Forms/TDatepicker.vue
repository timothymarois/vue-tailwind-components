<template>
  <div class="relative w-full">
    <t-label
        v-if="label"
        :id="id"
        :label="label"
        :required="required"
        :color="errorState ? 'red-500' : 'gray-800'"
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
          <template #input='{ props, events }'>
            <input
                v-bind='props'
                v-on='{
                           ...events,
                           input: event => handleInput(event, events.input)
                        }'>
          </template>
        </date-picker>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { DateTime, Settings } from "luxon";

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
      default: 'MM-DD-YYYY'
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
    },
    timezone: {
      type: String,
      default: ''
    },
    disableOn: {
      type: Array,
      default: null
    },
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
            defaultClasses = defaultClasses.concat(['border-red-500 focus:border-red-500 text-red-500 hover:text-red-800 placeholder:text-red-400 [&_+_i_>_div]:hover:!text-red-500']);
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
  created() {
    if (this.timezone) Settings.defaultZone = this.timezone;
  },
  methods: {
    padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    },
    formatDate(date) {
      return [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
      ].join('-');
    },
    changeValue(val) {
      this.$emit('input', val);
    },
    disableDays(_date) {
      if (this.disabledDays) {
        const day = DateTime.fromJSDate(_date, {zone: this.timezone}).setLocale('en').toLocaleString({ weekday: 'long' });
        return this.disabledDays.includes(day) ||
            DateTime.fromJSDate(_date) < DateTime.now() ||
            (this.disableBefore && DateTime.fromJSDate(_date).endOf('day') < DateTime.fromFormat(this.disableBefore, 'yyyy-MM-dd').endOf('day')) ||
            (this.disableAfter && DateTime.fromJSDate(_date).endOf('day') > DateTime.fromFormat(this.disableAfter, 'yyyy-MM-dd').endOf('day')) ||
            (this.disableOn && this.disableOn.includes(DateTime.fromJSDate(_date).toFormat('yyyy-MM-dd')) ) ;
      } else {
        return DateTime.fromJSDate(_date) < DateTime.now() ||
            (this.disableBefore && DateTime.fromJSDate(_date).endOf('day') < DateTime.fromFormat(this.disableBefore, 'yyyy-MM-dd').endOf('day')) ||
            (this.disableAfter && DateTime.fromJSDate(_date).endOf('day') > DateTime.fromFormat(this.disableAfter, 'yyyy-MM-dd').endOf('day')) ||
            (this.disableOn && this.disableOn.includes(DateTime.fromJSDate(_date).toFormat('yyyy-MM-dd')) );
      }
    },
    handleInput (event, update) {
      let value = event.target.value.replace(/[^0-9\-]/g, '');
      let formatDate = value;
      if (formatDate.charAt(formatDate.length-1) === '-' && formatDate.charAt(formatDate.length-2) === '-') {
        formatDate = formatDate.slice(0, formatDate.length - 1);
      }
      if (value.length > 10) {
        formatDate = value.slice(0,10);
      } else if ((value.length === 2 || value.length === 5) && event.inputType !== 'deleteContentBackward') {
        formatDate = formatDate + '-';
      }
      this.$forceUpdate();
      update(formatDate);
    }
  }

}
</script>
<style lang="css">
.mx-icon-calendar {
  right: 12px;
  @apply cursor-pointer;
}
.mx-icon-clear {
  width: 20px;
  hight: 20px;
}
.mx-icon-clear svg {
  @apply text-indigo-900 cursor-pointer;
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
  @apply rounded bg-indigo-800 text-white !important;
}
</style>