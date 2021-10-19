import TBadge from '../src/components/Elements/TBadge';

export default {
	title: 'Elements/TBadge',
	component: TBadge,
	argTypes: { 
		color: {
            title: 'color',
			description: 'Change color of badge',
			control: { type: 'text' }
        },
        removeable : {
			name: 'removeable',
			description: 'Toggle ability to remove badge',
			control: { type: 'boolean' }
        },
        outlined: {
            name: 'outlined',
			description: 'Toggle outline of badge',
			control: { type: 'boolean' }
        },
        rounded: {
			name: 'rounded',
			description: 'Toggle roundness badge',
			control: { type: 'boolean' }
		}
	},
};

// const Template = (args, { argTypes }) => ({
// 	props: Object.keys(argTypes),
// 	components: { TCard },
// 	template: 
// 		`
//             <t-card v-bind="$props">
//                 This is the content of the card
//             </t-card>
//         `,
// });

// export const Standard = Template.bind({});
// Standard.args = {

// };

export const Primary = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TBadge },
	template: `<t-badge v-bind="$props">Primary Badge</t-badge>`
});


export const MultipleStates = () => ({
	// props: Object.keys(argTypes),
	components: { TBadge },
    data: () => ({
        tabs1: 'tab1',
        tabs2: 'tab1'
    }),
	template: 
	`
        <div>
            <div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
                <t-badge>Badge</t-badge>
                <t-badge removeable>Badge</t-badge>
                <t-badge outlined>Outlined</t-badge>
                <t-badge outlined removeable>Outlined</t-badge>
				<t-badge outlined rounded icon="check">With icon</t-badge>
				<t-badge outlined removeable rounded>Rounded</t-badge>
            </div>
        </div>
	`,
});
