import TPagination from "../src/components/Tables/TPagination.vue";

export default {
	title: 'Tables/TPagination',
	component: TPagination,
	argTypes: {
		totalItems: {
			name: 'totalItems',
			description: 'Total number of items'
		},
		perPage: {
			name: 'perPage',
			description: 'Number of items displayed per page'
		}
	}
};

export const Standard = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { TPagination },
	data: () => ({
		page: 1,
		currentPerPage: 10
	}),
	methods: {
		changePage(val) {
			this.page = val;
		},
		changePerPage(val) {
			this.currentPerPage = val;
		}
	},
	template: 
	`
		<div>
			<t-pagination v-bind="$props" @changePerPage="changePerPage" @changePage="changePage" />
			<div class="mt-16">
				Current page: {{ page }}<br>
				Items per page: {{ currentPerPage }}
			</div>
		</div>
	`
});

Standard.args = {
	totalItems: 500
};