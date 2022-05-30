export default {
	title: 'ELEMENTS/TIcon',
	argTypes: { 
		value: {
			name: 'value',
			description: 'Icon to display',
			defaultValue:'check'
		}
	}
};

export const Default = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	template: `<t-app><t-icon v-bind="$props" /></t-app>`
});

export const VariantLarge = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	template: `<t-app><t-icon v-bind="$props" variant="large" /></t-app>`
});

export const VariantLargeGreen = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	template: `<t-app><t-icon v-bind="$props" variant="largeGreen" /></t-app>`
});