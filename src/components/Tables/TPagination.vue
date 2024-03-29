<template>
    <div class="flex flex-col sm:flex-row justify-between mt-2 text-sm">
        <div class="flex flex-row items-center mt-2 sm:mt-0 order-2 sm:order-1">
            <select 
                name="currentPerPage" 
                class="cursor-pointer flex w-16 pl-2 pr-4 py-2 bg-white border-gray-200 text-gray-500 hover:bg-indigo-100 hover:border-indigo-900 hover:text-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring-0 text-sm font-medium rounded"
                :value="currentPerPage"
                @input="changePerPage($event)"
            >
                <option
                    v-for="option of perPageOptions"
                    :key="option"
                    :value="option"
                >
                    {{ option }}
                </option>
            </select>
            <label for="perPage" class="mt-0 ml-4 text-gray-500 text-left">Showing {{ fromItem }} to {{ toItem }} of {{ totalItems }} results</label>
        </div>
        <div class="relative flex space-x-1 order-1 sm:order-2">
            <div @click="prevDisabled ? '' : goToPage(currentPage - 1)">
                <a :class="[prevDisabled ? 'cursor-not-allowed bg-gray-100 text-gray-400' : 'cursor-pointer hover:bg-indigo-100 hover:text-indigo-900 bg-white text-gray-500', 'relative inline-flex items-center px-2 py-2 rounded text-sm font-medium border border-gray-200']">
                    <span class="sr-only">
                        Previous
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </a>
            </div> 
            <div
                v-for="page in pagesArray"
                :key="page"
                class="relative flex space-x-1"
            >
                <div @click="goToPage(page)">
                    <a
                        class="cursor-pointer w-10 min-w-min relative inline-flex items-center justify-center px-2 py-2 rounded bg-white text-sm font-medium text-gray-500 hover:bg-indigo-100 hover:text-indigo-900 border border-gray-200 hover:border-indigo-900"
                        :class="{'z-10 bg-indigo-100 border-indigo-800 text-indigo-800' : currentPage === page}"
                    >
                        {{ page }}
                    </a>
                </div>
            </div>
            <div @click="nextDisabled ? '' : goToPage(currentPage + 1)">
                <a :class="[nextDisabled ? 'cursor-not-allowed bg-gray-100 text-gray-400' : 'cursor-pointer hover:bg-indigo-100 hover:text-indigo-900 bg-white text-gray-500', 'relative inline-flex items-center px-2 py-2 rounded text-sm font-medium border border-gray-200 hover:border-indigo-900']">
                    <span class="sr-only">
                        Next
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TPagination",
    props: {
        currentPage: {
            type: Number,
            default: 1
        },
        currentPerPage: {
            type: Number,
            default: () => {
                return this.perPageOptions[0]
            }
        },
        totalItems: {
            type: Number,
            required: true
        },
        perPageOptions: {
            type: Array,
            default: () => {
                return [10, 20, 30, 50, 75, 100]
            }
        }
    },
    computed: {
        prevDisabled() {
            return this.currentPage === 1;
        },
        nextDisabled() {
            return this.currentPage === this.totalPages || this.totalItems === 0;
        },
        totalPages() {
            return Math.ceil(this.totalItems / this.currentPerPage);
        },
        pagesArray() {
			if(this.totalPages <= 5) return (this.totalPages === 0 ? 1 : this.totalPages);
			else if (this.totalPages > 5 && this.currentPage === 1) return [1, this.currentPage + 1, this.currentPage + 2, this.currentPage + 3, this.totalPages];
			else if (this.totalPages > 5 && this.currentPage === 2) return [1, this.currentPage, this.currentPage + 1, this.currentPage + 2, this.totalPages];
			else if (this.totalPages > 5 && this.currentPage < this.totalPages - 1) return [1, this.currentPage - 1, this.currentPage, this.currentPage + 1, this.totalPages];
			else if (this.totalPages > 5 && this.currentPage === this.totalPages - 1) return [1, this.currentPage - 2, this.currentPage - 1, this.currentPage, this.totalPages];
            else if (this.totalPages > 5 && this.currentPage === this.totalPages) return [1, this.currentPage - 3, this.currentPage - 2, this.currentPage - 1, this.currentPage];
        },
        fromItem() {
            if (this.currentPage === 1) return 1;
            else return (this.currentPerPage * (this.currentPage - 1)) + 1;
        },
        toItem() {
            if (this.currentPage === this.totalPages) return this.totalItems;
            else return (this.currentPage) * this.currentPerPage;
        }
    },
    methods: {
        goToPage(page) {
            if(page !== this.currentPage) {
                this.$emit('change', {
                    page: +page,
                    perPage: +this.currentPerPage
                });
            }
        },
        changePerPage(e) {
            this.$emit('change', {
                page: +this.currentPage,
                perPage: +e.target.value
            });
        }
    }
};
</script>