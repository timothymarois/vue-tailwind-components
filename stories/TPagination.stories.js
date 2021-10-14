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
		currentPerPage: 20,
		currentPage: 1,
		totalItems: 20,
		perPageOptions: [20, 30, 40, 50]
	}),
	methods: {
		change({page, perPage}) {
			this.currentPage = page;
			this.currentPerPage = perPage;
		}
	},
	template: 
	`
		<div>
			<t-pagination 
				:currentPage="currentPage" 
				:currentPerPage="currentPerPage"
				:totalItems="totalItems"
				:perPageOptions="perPageOptions" 
				@change="change" 
			/>
			<div class="mt-16">
				Current page: {{ currentPage }}<br>
				Items per page: {{ currentPerPage }} <br>
				Per page options: {{ perPageOptions.join(", ") }}
			</div>
		</div>
	`
});

