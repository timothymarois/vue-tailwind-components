import TBadge from '../src/components/Elements/TBadge';

export default {
	title: 'ELEMENTS/TBadge',
	component: TBadge,
	argTypes: { 
		title: {
			name: 'title',
			description: 'Header title text',
			defaultValue: null,
		},
		subtitle: {
			name: 'subtitle',
			description: 'Header subtitle text',
			defaultValue: null,
		},
        contentPadding: {
			name: 'contentPadding',
			description: 'Change the content padding (default 4)',
            control: { type: 'number', min: 0 }
		},
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
            </div>
        </div>
	`,
});
