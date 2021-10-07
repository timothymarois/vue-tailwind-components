import TProgressBar from '../src/components/Elements/TProgressBar.vue';

export default {
	title: 'Elements/TProgressBar',
	component: TProgressBar,
	argTypes: {
		color: {
			name: 'color',
			description: 'Set color of progress bar',
			control: { type: 'text' }
		}
	}
};

export const Standard = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TProgressBar },
	template:
		`
		<div class="m-8">
			<t-progress-bar v-bind="$props" />
		</div>
		`
});
Standard.args = {
	color: 'indigo'
};