<template>
    <div class="flex flex-col md:flex-row justify-between mt-2 text-sm">
        <div>
            <div class="flex flex-col mb-6 md:mb-0 lg:flex-row lg:items-center">
                <select 
                    name="perPage" 
                    class="cursor-pointer shadow flex w-16 pl-2 pr-4 py-2 bg-white border-gray-200 text-gray-500 hover:bg-indigo-100 hover:text-indigo-900 focus:outline-none focus:ring-indigo-800 text-sm font-medium rounded" 
                    v-model="perPage"
                >
                    <option
                        v-for="option of perPageOptions"
                        :key="option"
                        :value="option"
                    >
                        {{ option }}
                    </option>
                </select>
                <label for="perPage" class="mt-2 lg:mt-0 lg:ml-4 text-gray-500 text-left">Showing {{ fromItem }} to {{ toItem }} of {{ totalItems }} results</label>
            </div>
        </div>
        <div 
            v-if="totalPages > 1" 
            class="relative flex space-x-1"
        >
            <div @click="prevDisabled ? '' : goToPage(currentPage - 1)">
                <a :class="[prevDisabled ? 'cursor-not-allowed bg-gray-100 text-gray-400' : 'cursor-pointer hover:bg-indigo-100 hover:text-indigo-900 bg-white text-gray-500', 'relative inline-flex items-center px-2 py-2 rounded text-sm font-medium shadow']">
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
                <div 
                    @click="goToPage(page)"
                >
                    <a
                        class="cursor-pointer w-10 min-w-min relative inline-flex items-center justify-center px-2 py-2 rounded bg-white text-sm font-medium text-gray-500 hover:bg-indigo-100 hover:text-indigo-900 shadow"
                        :class="{'z-10 bg-indigo-100 border-indigo-800 text-indigo-800' : currentPage === page}"
                    >
                        {{ page }}
                    </a>
                </div>
            </div>
            <div @click="nextDisabled ? '' : goToPage(currentPage + 1)">
                <a :class="[nextDisabled ? 'cursor-not-allowed bg-gray-100 text-gray-400' : 'cursor-pointer hover:bg-indigo-100 hover:text-indigo-900 bg-white text-gray-500', 'relative inline-flex items-center px-2 py-2 rounded text-sm font-medium shadow']">
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
    data() {
        return {
            perPage: 10
        }
    },
    props: {
        currentPage: {
            type: Number,
            required: false,
            default: 1
        },
        totalItems: {
            type: Number,
            required: true
        },
        perPageOptions: {
            type: Array,
            required: false,
            default: () => {
                return [20, 30, 50, 75]
            }
        }
    },
    watch: {
        perPage: function(value) {
            this.$emit('changePage', 1)
        }
    },
    computed: {
        prevDisabled() {
            return this.currentPage === 1;
        },
        nextDisabled() {
            return this.currentPage === this.totalPages;
        },
        totalPages() {
            return Math.ceil(this.totalItems / this.perPage);
        },
        pagesArray() {
			if(this.totalPages <= 5) {
				return (this.totalPages);
			} else if (this.totalPages > 5 && this.currentPage === 1) {
				return [1, this.currentPage + 1, this.currentPage + 2, this.currentPage + 3, this.totalPages];
			} else if (this.totalPages > 5 && this.currentPage === 2) {
				return [1, this.currentPage, this.currentPage + 1, this.currentPage + 2, this.totalPages];
			} else if (this.totalPages > 5 && this.currentPage < this.totalPages - 1) {
				return [1, this.currentPage - 1, this.currentPage, this.currentPage + 1, this.totalPages];
			} else if (this.totalPages > 5 && this.currentPage === this.totalPages - 1) {
                return [1, this.currentPage - 2, this.currentPage - 1, this.currentPage, this.totalPages];
            } else if (this.totalPages > 5 && this.currentPage === this.totalPages) {
                return [1, this.currentPage - 3, this.currentPage - 2, this.currentPage - 1, this.currentPage];
            }
        },
        fromItem() {
            if (this.currentPage === 1) {
                return 1;
            }
            else {
                return (this.perPage * (this.currentPage - 1)) + 1;
            }
        },
        toItem() {
            if (this.currentPage === this.totalPages) {
                return this.totalItems;
            } else {
                return (this.currentPage) * this.perPage;
            }
        }
    },
    methods: {
        goToPage(page) {
            this.$emit('changePage', page)
        }
    },
};
</script>