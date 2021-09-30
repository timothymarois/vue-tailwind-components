import TwButton from './Button.vue';

export default {
  title: 'Tailwind/Button',
  component: TwButton,
  argTypes: { // Additional information that can be provided for each prop. It will automatically detect type & default state from Vue SFC, if provided
    color: {
      name: 'color',
      defaultValue: 'indigo',
      description: 'Tailwind classname for background color',
      control: { type: 'text' }
    },
    loading: {
      name: 'loading',
      defaultValue: false,
      description: 'Toggle loading state'
    },
    to: {
      name: 'to',
      description: 'Redirects using vue-router'
    },
    href: {
      name: 'href',
      description: 'Redirects using browser as normal link'
    },
    borderColor: {
      name: 'borderColor',
      description: 'Tailwind classname for border color',
      control: { type: 'text' }
    },
    size: {
      name: 'size',
      description: 'Set size of button',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' }
    },
    padding: {
      name: 'padding',
      description: 'Set padding of button.  This may overwrite size.'
    },
    target: {
      name: 'target',
      description: 'Set target of `<a>` link'
    },
    text: {
      name: 'text',
      description: 'Toggle text-only button'
    },
    iconSize: {
      name: 'iconSize',
      description: 'Set size of icons (including spinner)'
    }
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TwButton },
  template: 
    `
    <tw-button v-bind="$props" />
    `,
});

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  rounded: true,
  shadow: true,
  padding: 0,
  label: 'Primary Button',
  size: 'lg'
};

export const Secondary = Template.bind({});
Secondary.args = {
  primary: true,
  rounded: true,
  shadow: false,
  padding: 2,
  outlined: true,
  label: 'Secondary Button',
};
