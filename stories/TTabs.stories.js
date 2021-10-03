import TTabs from '../src/components/Elements/TTabs';
import TCard from '../src/components/Elements/TCard';

export default {
	title: 'ELEMENTS/TTabs',
	component: TTabs,
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
	components: { TTabs, TCard },
    data: () => ({
        tabs1: 'tab1',
        tabs2: 'tab1'
    }),
	template: 
	`
        <div>
            <div class="w-full">
                <t-tabs
                    v-model="tabs1"
                    :items="[
                        {
                            name: 'Tab 1',
                            id: 'tab1'
                        },
                        {
                            name: 'Tab 2',
                            id: 'tab2'
                        },
                        {
                            name: 'Tab 3',
                            id: 'tab3'
                        }
                    ]"
                >
                    <template slot="tab1">
                        This is tab 1 content
                    </template>
                    <template slot="tab2">
                        This is tab 2 content
                    </template>
                    <template slot="tab3">
                        This is tab 3 content
                    </template>
                </t-tabs>
            </div>

            <div class="w-full mt-10">
                <t-tabs
                    v-model="tabs2"
                    :items="[
                        {
                            name: 'Tab 1',
                            id: 'tab1'
                        },
                        {
                            name: 'Tab 2',
                            id: 'tab2'
                        },
                        {
                            name: 'Tab 3',
                            id: 'tab3'
                        }
                    ]"
                >
                    <template slot="tab1">
                        <t-card>This is tab 1 content with cards</t-card>
                    </template>
                    <template slot="tab2">
                        <t-card>This is tab 2 content with cards</t-card>
                    </template>
                    <template slot="tab3">
                        <t-card>This is tab 3 content with cards</t-card>
                    </template>
                </t-tabs>
            </div>
        </div>
	`,
});
