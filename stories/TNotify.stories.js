import TNotify from '../src/components/Elements/TNotify.vue';
import TButton from '../src/components/Elements/TButton.vue';

export default {
	title: 'Elements/TNotify',
	component: TNotify,
	argTypes: {
		iconSize: {
			name: 'iconSize',
			description: 'Set size of icons (including spinner)',
			control: { type: 'text' }
		},
		color: {
			name: 'color',
			description: 'Background color of notification',
			control: { type: 'text' }
		},
		textColor: {
			name: 'color',
			description: 'Background color of notification',
			control: { type: 'text' }
		},
		duration: {
			name: 'duration',
			description: 'Duration in ms that notification will stay visible. Setting `null` will add a close button.',
			control: { type: 'text' }
		},
		loading: {
			name: 'loading',
			description: 'Toggle loading spinner in notification component',
			control: { type: 'boolean' }
		}
	}
}

export const Standard = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TNotify, TButton },
	data: () => ({
        showing: false
    }),
	template:
		`
		<div>
			<div class="mt-72">Scroll down</div>
			<div class="mt-72">Scroll down</div>
			<div class="mt-72">Scroll down</div>
			<t-button @click="showing = true" label="Show notification" />
			<t-notify v-if="showing" @end="showing = false" v-bind="$props">
				A notification component
			</t-notify>
		</div>
		`
});

export const CloseButton = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TNotify, TButton },
	data: () => ({
        showing: false
    }),
	template:
		`
		<div>
			<t-button @click="showing = true" label="Show notification" />
			<t-notify v-if="showing" @end="showing = false" closeable v-bind="$props">
				A notification component
			</t-notify>
		</div>
		`
});

export const Offset = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TNotify, TButton },
	data: () => ({
        showing: false
    }),
	template:
		`
		<div>
			<t-button @click="showing = true" label="Show notification" />
			<t-notify v-if="showing" @end="showing = false" closeable v-bind="$props">
				A notification component
			</t-notify>
		</div>
		`
});


Standard.args = {
	iconSize: 5,
	duration: 3000,
	iconColor: 'green-500',
	title: 'Successfully saved!'
};

CloseButton.args = {
	iconSize: 5,
	iconColor: 'green-500',
	title: 'Successfully saved!',
	description: 'Anyone with a link can now view this file.'
}

Offset.args = {
	iconSize: 5,
	iconColor: 'green-500',
	title: 'Successfully saved!',
	description: 'Anyone with a link can now view this file.',
	offsetValue: 400
}