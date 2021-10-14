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
	components: { TPagination },
	data: () => ({
		currentPerPage: 10,
		currentPage: 1,
		totalItems: 100,
		perPageOptions: [10, 20, 30, 40, 50]
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
			<t-pagination 
				:currentPage="currentPage" 
				:totalItems="totalItems"
				:perPageOptions="perPageOptions" 
				@changePage="changePage" 
			/>
			
			<div class="mt-16">
				Current page: {{ currentPage }}<br>
				Items per page: {{ currentPerPage }} <br>
				Per page options: {{ perPageOptions.join(", ") }}
			</div>
		</div>
	`
});

