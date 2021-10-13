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
		currentPerPage: 10
	}),
	methods: {
		changePage(val) {
			this.currentPage = val;
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
				Current page: {{ currentPage }}<br>
				Items per page: {{ currentPerPage }} <br>
				Per page options: {{ perPageOptions.join(", ") }}
			</div>
		</div>
	`
});

Standard.args = {
	currentPage: 1,
	totalItems: 500,
	perPageOptions: [10, 20, 30, 40, 50]
};