import TwCheckbox from '../components/Elements/Checkbox.vue';

export default {
  title: 'Tailwind/Checkbox',
  component: TwCheckbox,
  argTypes: { // Additional information that can be provided for each prop. It will automatically detect type & default state from Vue SFC, if provided
    color: {
      name: 'color',
      defaultValue: 'indigo',
      description: 'Tailwind classname for outline and fill color',
      control: { type: 'text' }
    },
    size: {
      name: 'size',
      description: 'Set size of checkbox',
      control: { type: 'number', min: 3 }
    },
    value: {
      name: 'value',
      description: 'Value of checkbox'
    },
    label: {
      name: 'label',
      description: 'Toggle text-only button'
    }
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TwCheckbox },
  template: 
    `
    <tw-checkbox v-bind="$props" />
    `,
});

export const Standard = Template.bind({});
Standard.args = {
  color: 'indigo',
  size: 6,
  value: 'some_value',
  label: 'Checkbox',
};
