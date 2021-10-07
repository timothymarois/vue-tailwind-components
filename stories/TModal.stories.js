import TModal from '../src/components/Elements/TModal';
import TButton from '../src/components/Elements/TButton';

export default {
	title: 'Elements/TModal',
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

export const Center = (argTypes) => ({
	props: Object.keys(argTypes),
	components: { TModal, TButton },
    data: () => ({
        showing: false
    }),
	template: 
		`
        <div>
            <t-button @click="showing = true" label="Show Modal" />
            <t-modal v-if="showing" @close-modal="showing = false" v-bind="$props">
                <div style="height:200px">This is my modal.  It can be used for many things, but I use it for this.</div>
            </t-modal>
        </div>
		`,
});

export const Right = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TModal, TButton },
    data: () => ({
        showing: false
    }),
	template: 
		`
        <div>
            <t-button @click="showing = true" label="Show Modal" />
            <t-modal v-if="showing" @close-modal="showing = false" v-bind="$props">
                <div style="height:200px">This is my modal.  It can be used for many things, but I use it for this.</div>
            </t-modal>
        </div>
		`,
});

Right.args = {
	type: 'right'
}

export const Full = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TModal, TButton },
    data: () => ({
        showing: false
    }),
	template: 
		`
        <div>
            <t-button @click="showing = true" label="Show Modal" />
            <t-modal v-if="showing" @close-modal="showing = false" v-bind="$props">
                <div style="height:200px">This is my modal.  It can be used for many things, but I use it for this.</div>
            </t-modal>
        </div>
		`,
});

Full.args = {
	type: 'full'
}

