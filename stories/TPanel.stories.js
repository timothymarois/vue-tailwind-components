import TPanel from '../src/components/Elements/TPanel.vue';
import TButton from '../src/components/Elements/TButton.vue';

export default {
	title: 'Elements/TPanel',
	component: TPanel,
	argTypes: { 
		type: {
			name: 'type',
			defaultValue: 'center',
			description: 'Type of the modal, center, right or full',
			control: { type: 'text' }
		},
		width: {
			name: 'width',
			description: 'Set width of modal in pixels'
		},
		offsetDirection: {
			name: 'offsetDirection',
			description: 'Set direction of offset',
			options: ['left', 'right'],
			control: { type: 'select' },
		},
		offsetValue: {
			name: 'offsetValue',
			description: 'Set value of offset in pixels'
		}
	},
};

export const Right = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TPanel, TButton },
    data: () => ({
        showing: false
    }),
	template: 
		`
        <div>
            <t-button @click="showing = true" label="Show Panel" />
            <t-panel v-if="showing" :show="showing" @end="showing = false" v-bind="$props">
               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </t-panel>
        </div>
		`,
});

Right.args = {
	type: 'right',
	title: 'Panel Title'
}

export const Left = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TPanel, TButton },
    data: () => ({
        showing: false
    }),
	template: 
		`
		<div>
			<t-button @click="showing = true" label="Show Panel" />
			<t-panel v-if="showing" :show="showing" @end="showing = false" v-bind="$props">
				Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
			</t-panel>
			<div class="mt-64">scroll down</div>
			<div class="mt-64">scroll down</div>
			<div class="mt-64">scroll down</div>
		</div>
		`,
});

Left.args = {
	type: 'left',
	title: 'Panel Title',
	maxWidth: '1000'
}