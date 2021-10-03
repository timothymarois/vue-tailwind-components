import TCard from '../src/components/Elements/TCard';
import TButton from '../src/components/Elements/TButton';

export default {
	title: 'ELEMENTS/TCard',
	component: TCard,
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
	components: { TCard, TButton },
	template: 
	`
		<div>

            <div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-card flat>Card (Flat)</t-card>
			</div>

			<div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-card>Card (Default)</t-card>
			</div>

            <div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-card title="Header Title">
                    Card with only title
                </t-card>
			</div>

            <div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-card title="Header Title" subtitle="The header subtitle content">
                    Card with title and subtitle
                </t-card>
			</div>

            <div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-card title="Header Title" subtitle="The header subtitle content">
                    <template slot="actions">
                        <t-button>Edit</t-button>
                        <t-button outlined>Delete</t-button>
                    </template>
                    Card with action buttons
                </t-card>
			</div>

            <div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-card title="Header Title" subtitle="The header subtitle content" contentPadding="0">
                    Card with no content padding, useful for content like tables that look better when full width
                </t-card>
			</div>

            <div class="mt-10 max-w-4xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around">
				<t-card title="Card Title" subtitle="The card subtitle content">
                    ....
                    <template slot="footer">Card footer</template>
                </t-card>
			</div>

		</div>
	`,
});
