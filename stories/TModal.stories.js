import TModal from '../src/components/Elements/TModal';
import TButton from '../src/components/Elements/TButton';

export default {
	title: 'ELEMENTS/TModal',
	component: TModal,
	argTypes: { 
		type: {
			name: 'type',
			defaultValue: 'center',
			description: 'Type of the modal, center, right or full',
			control: { type: 'text' }
		},
	},
};

export const Standard = (argTypes) => ({
	props: Object.keys(argTypes),
	components: { TModal, TButton },
    data: () => ({
        value: false
    }),
	template: 
		`
        <div>
            <t-button @click="value=true" label="Show Modal" />
            <t-modal v-model="value">
                <div style="height:200px">This is my modal</div>
            </t-modal>
        </div>
		`,
});
