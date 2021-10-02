import BaseLoader from '../components/Elements/Base/BaseLoader.vue';

export default {
  title: 'Tailwind/Loader',
  component: BaseLoader,
  argTypes: { // Additional information that can be provided for each prop. It will automatically detect type & default state from Vue SFC, if provided
    color: {
      name: 'color',
      defaultValue: 'indigo',
      description: 'Tailwind classname for loader color',
      control: { type: 'text' }
    },
    size: {
      name: 'size',
      description: 'Set size of loader',
      control: { type: 'number', min: 4 }
	},
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseLoader },
  template: 
    `
    <base-loader v-bind="$props" />
    `,
});

export const Standard = Template.bind({});
Standard.args = {
  color: 'indigo',
  size: 12
};
