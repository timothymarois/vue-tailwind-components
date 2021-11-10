import TTabs from '../src/components/Elements/TTabs';
import TTabContent from '../src/components/Elements/TTabContent';
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
	components: { TTabs, TTabContent, TCard },
    data: () => ({
        tabs0: 'tab1',
        tabs1: 'tab1',
        tabs2: 'tab1',
        tabs3: 'tab1',
        tabs4: 'tab1'
    }),
	template: 
	`
        <div class="p-6 bg-gray-100">

            <div class="w-full">
                <t-card>
                    <t-tabs
                        v-model="tabs0"
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
                    ></t-tabs>
                    <div>Tabs with no content</div>
                </t-card>
            </div>

            <div class="w-full mt-5">
                <t-card>
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
                </t-card>
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

            <div class="w-full mt-10">
                <t-tabs
                    dense
                    v-model="tabs3"
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
                        <t-card>This is tab 1 (dense tabs)</t-card>
                    </template>
                    <template slot="tab2">
                        <t-card>This is tab 2 (dense tabs)</t-card>
                    </template>
                    <template slot="tab3">
                        <t-card>This is tab 3 (dense tabs)</t-card>
                    </template>
                </t-tabs>
            </div>


            <div class="w-full mt-10">
                <t-tabs
                    v-model="tabs4"
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
                        },
                        {
                            name: 'Tab 4',
                            id: 'tab4',
                            disabled: true
                        }
                    ]"
                />

                <t-tab-content v-model="tabs4">
                    <template slot="tab1">
                        <t-card>This is tab 1 (with external content)</t-card>
                    </template>
                    <template slot="tab2">
                        <t-card>This is tab 2 (with external content)</t-card>
                    </template>
                    <template slot="tab3">
                        <t-card>This is tab 3 (with external content)</t-card>
                    </template>
                </t-tab-content>
            </div>



            <div class="w-full mt-5" style="width:400px;">
                <t-card title="Tabs with grow">
                    <t-tabs
                        grow
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
                                name: 'Tab 399',
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
                </t-card>
            </div>

            <div class="w-full mt-5" style="width:400px;">
                <t-card title="Tabs with grow with even">
                    <t-tabs
                        grow
                        even
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
                                name: 'Tab 399',
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
                </t-card>
            </div>


            <div class="w-full mt-5" style="width:400px;">
                <t-card title="Tabs with disabled">
                    <t-tabs
                        grow
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
                            },
                            {
                                name: 'Tab 4',
                                id: 'tab4',
                                disabled: true
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
                        <template slot="tab4">
                            This is tab 4 content
                        </template>
                    </t-tabs>
                </t-card>
            </div>




        </div>
	`,
});
