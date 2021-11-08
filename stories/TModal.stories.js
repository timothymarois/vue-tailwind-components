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

export const Center = (argTypes) => ({
	props: Object.keys(argTypes),
	components: { TModal, TButton },
    data: () => ({
        showing: false,
		showModal: false
    }),
	methods: {
		close() {
			this.showing=false
			this.showModal=false
		}
	},
	template: 
		`
        <div>
            <t-button @click="showModal=true;showing=true;" label="Show Modal" />

            <t-modal v-if="showing" :show="showModal" @end="close()" v-bind="$props">
                <div style="height:200px">This is my modal.  It can be used for many things, but I use it for this.</div>
				<div class="lg:flex-grow flex items-end justify-center mt-8">
                    <t-button icon="close" @click="showModal=false" outlined class="mr-3">Cancel</t-button>
                </div>
            </t-modal>

			<div class="mt-64">Test content</div>
			<div class="mt-64">Test content</div>
			<div class="mt-64">Test content</div>
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
            <t-modal v-if="showing" :show="showing" @end="showing = false" v-bind="$props">
                <div style="height:500px">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
            </t-modal>
        </div>
		`,
});

Right.args = {
	type: 'right'
}

export const Left = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TModal, TButton },
    data: () => ({
        showing: false
    }),
	template: 
		`
        <div>
            <t-button @click="showing = true" label="Show Modal" />
            <t-modal v-if="showing" :show="showing" @end="showing = false" v-bind="$props">
                <div style="height:500px">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
            </t-modal>
        </div>
		`,
});

Left.args = {
	type: 'left'
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
            <t-modal v-if="showing" :show="showing" @end="showing = false" v-bind="$props">
                <div style="height:200px">This is my modal.  It can be used for many things, but I use it for this.</div>
            </t-modal>
			<div class="mt-64">Test content</div>
			<div class="mt-64">Test content</div>
			<div class="mt-64">Test content</div>
        </div>
		`,
});

Full.args = {
	type: 'full'
}



export const LongPageScroll = (argTypes) => ({
	props: Object.keys(argTypes),
	components: { TModal, TButton },
    data: () => ({
        showing: false
    }),
	template: 
		`
        <div style="height:2000px">
            <div style="height:1000px">keep scrolling</div>
            <t-button @click="showing = true" label="Show Modal" />
            <t-modal v-if="showing" :show="showing" @end="showing = false" type="center">
                <div style="height:200px">This is my modal.  It can be used for many things, but I use it for this.</div>
            </t-modal>
        </div>
		`,
});


export const Contained = (argTypes) => ({
	props: Object.keys(argTypes),
	components: { TModal, TButton },
    data: () => ({
        showing: false
    }),
	template: 
		`
        <div>
			<t-button @click="showing = true" label="Show Modal" />
            <div style="height:600px;width:750px;border:red solid 2px;" class="overflow-y-scroll">
				<div style="height:1200px;">
					<t-modal relative v-if="showing" :show="showing" @end="showing = false" type="center" max-width="400">
						<div style="height:200px">This is my modal.  It can be used for many things, but I use it for this.</div>
					</t-modal>
				</div>
			</div>
        </div>
		`,
});

export const Offset = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TModal, TButton },
    data: () => ({
        showing: false
    }),
	template: 
		`
        <div>
            <t-button @click="showing = true" label="Show Modal" />
            <t-modal v-if="showing" :show="showing" @end="showing = false" v-bind="$props">
                <div style="height:200px">This is my modal.  It is offset by 250px from the left.</div>
            </t-modal>
			<div class="mt-64">Test content</div>
			<div class="mt-64">Test content</div>
			<div class="mt-64">Test content</div>
        </div>
		`,
});

Offset.args = {
	offsetDirection: 'left',
	offsetValue: 250
}


export const CenterDivOffset = (argTypes) => ({
	props: Object.keys(argTypes),
	components: { TModal, TButton },
    data: () => ({
        showing: false,
		showModal: false
    }),
	methods: {
		close() {
			this.showing=false
			this.showModal=false
		}
	},
	template: 
		`
        <div id="app">

			<div class="flex">
				<div style="width:300px;height:100vh;border:1px solid">
					side panel
				</div>
				<div id="content" style="width:100%;height:100vh;border:1px solid">

					<t-button @click="showing = true;showModal=true" label="Show Modal" />

					<t-modal v-if="showing" :show="showModal" @end="close" offset-div="content">
						<div style="height:200px">This is my modal.  It can be used for many things, but I use it for this.</div>
						<div class="lg:flex-grow flex items-end justify-center mt-8">
							<t-button icon="close" @click="showModal=false" outlined class="mr-3">Cancel</t-button>
						</div>
					</t-modal>

				</div>
			</div>

            
        </div>
		`,
});

export const RightToFull = (argTypes) => ({
	props: Object.keys(argTypes),
	components: { TModal, TButton },
    data: () => ({
        showing: false,
		showModal: false,
		modalType: 'right'
    }),
	methods: {
		close() {
			this.showing=false
			this.showModal=false
		}
	},
	template: 
		`
		<div>
			<t-button @click="showing = true;showModal=true" label="Show Modal" />

			<t-modal v-if="showing" :show="showModal" @end="close" :type="modalType"> 
				<div style="height:200px">This is my modal.  It can be used for many things, but I use it for this.</div>
				<div class="lg:flex-grow flex items-end justify-center mt-8">
					<t-button icon="close" @click="modalType = 'left'" outlined class="mr-3">Make left</t-button>
					<t-button icon="close" @click="modalType = 'full'" outlined class="mr-3">Make full</t-button>
					<t-button icon="close" @click="modalType = 'right'" outlined class="mr-3">Make right</t-button>
				</div>
			</t-modal>
        </div>
		`,
});
