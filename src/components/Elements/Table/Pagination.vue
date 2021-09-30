<template>
    <div class="flex flex-col md:flex-row justify-between mt-2 text-sm">
        <div>
            <div class="flex flex-col mb-6 md:mb-0 lg:flex-row lg:items-center">
                <select name="perPage" class="cursor-pointer shadow flex w-16 pl-2 pr-4 py-2 bg-white border-gray-200 text-gray-500 hover:bg-indigo-100 hover:text-indigo-900 focus:outline-none focus:ring-indigo-800 text-sm font-medium rounded" @change="perPage">
                <option :selected="per_page === 10" value="10">10</option>
                <option :selected="per_page === 15" value="15">15</option>
                <option :selected="per_page === 25" value="25">25</option>
                <option :selected="per_page === 50" value="50">50</option>
                </select>
                <label for="perPage" class="mt-2 lg:mt-0 lg:ml-4 text-gray-500 text-left">Showing {{ from }} to {{ to }} of {{ total }} results</label>
            </div>
        </div>

        <div v-if="total > per_page" class="relative flex space-x-1">
            
            <div
                v-show="current_page !== 1"
                :class="{ disabled: prevDisabled }"
                id="prevPageButton"
                @click="goToPage(prev_page, per_page)"
            >
                <a class="cursor-pointer relative inline-flex items-center px-2 py-2 rounded bg-white text-sm font-medium text-gray-500 hover:bg-indigo-100 hover:text-indigo-900 shadow">
                    <span class="sr-only">Previous</span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
                </a>
            </div>

            <div class="relative inline-flex space-x-1" v-if="last_page - 2 > current_page">
                <div
                    v-show="current_page > 3"
                    @click="goToPage(first_page, per_page)"
                >
                    <a
                        class="cursor-pointer w-10 min-w-min relative inline-flex items-center justify-center px-2 py-2 rounded bg-white text-sm font-medium text-gray-500 hover:bg-indigo-100 hover:text-indigo-900 shadow"
                        :class="{
                        'z-10 bg-indigo-100 border-indigo-800 text-indigo-800': current_page === first_page,
                        'bg-white border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-900': current_page !== last_page - 4,
                    }"
                    >{{ first_page }}</a>
                </div>
                <div v-show="current_page > 3">
                    <a class="relative inline-flex items-center justify-center px-2 py-2 rounded text-sm font-medium text-gray-500">...</a>
                </div>
                <div v-show="prev_page" @click="goToPage(prev_page, per_page)">
                    <a class="cursor-pointer w-10 min-w-min relative inline-flex items-center justify-center px-2 py-2 rounded bg-white text-sm font-medium text-gray-500 hover:bg-indigo-100 hover:text-indigo-900 shadow">{{ prev_page }}</a>
                </div>
                <div aria-current="page">
                    <a class="cursor-pointer w-10 min-w-min relative inline-flex items-center justify-center px-2 py-2 rounded bg-indigo-100 text-sm font-medium text-indigo-800 hover:text-indigo-900 shadow">{{ current_page }}</a>
                </div>
                <div @click="goToPage(next_page, per_page)">
                    <a class="cursor-pointer w-10 min-w-min relative inline-flex items-center justify-center px-2 py-2 rounded bg-white text-sm font-medium text-gray-500 hover:bg-indigo-100 hover:text-indigo-900 shadow">{{ current_page + 1 }}</a>
                </div>
                <div>
                    <a class="relative inline-flex items-center justify-center px-2 py-2 rounded text-sm font-medium text-gray-500">...</a>
                </div>
                <div @click="goToPage(last_page, per_page)">
                    <a class="cursor-pointer w-10 min-w-min relative inline-flex items-center justify-center px-2 py-2 rounded bg-white text-sm font-medium text-gray-500 hover:bg-indigo-100 hover:text-indigo-900 shadow">{{ last_page }}</a>
                </div>
            </div>

            <div class="relative flex space-x-1" v-else>
                <div v-show="last_page - 4 > 0" @click="goToPage(first_page, per_page)">
                    <a
                        class="cursor-pointer w-10 min-w-min relative inline-flex items-center justify-center px-2 py-2 rounded bg-white text-sm font-medium text-gray-500 hover:bg-indigo-100 hover:text-indigo-900 shadow"
                    >{{ first_page }}</a>
                </div>
                <div v-show="last_page - 4 > 0">
                    <a class="relative inline-flex items-center justify-center px-2 py-2 rounded text-sm font-medium text-gray-500">...</a>
                </div>
                <div
                    v-show="last_page - 3 > 0"
                    aria-current="page"
                    @click="goToPage(last_page - 3, per_page)"
                >
                    <a
                        class="cursor-pointer w-10 min-w-min relative inline-flex items-center justify-center px-2 py-2 rounded bg-white text-sm font-medium text-gray-500 hover:bg-indigo-100 hover:text-indigo-900 shadow"
                        :class="{
                        'z-10 bg-indigo-100 border-indigo-800 text-indigo-800':
                        current_page === last_page - 3,
                        'bg-white border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-900': current_page !== last_page - 3,
                    }"
                    >{{ last_page - 3 }}</a>
                </div>
                <div v-show="last_page - 2 > 0" @click="goToPage(last_page - 2, per_page)">
                    <a
                        class="cursor-pointer w-10 min-w-min relative inline-flex items-center justify-center px-2 py-2 rounded bg-white text-sm font-medium text-gray-500 hover:bg-indigo-100 hover:text-indigo-900 shadow"
                        :class="{
                        'z-10 bg-indigo-100 border-indigo-800 text-indigo-800':
                        current_page === last_page - 2,
                        'bg-white border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-900': current_page !== last_page - 2,
                    }"
                    >{{ last_page - 2 }}</a>
                </div>
                <div v-show="last_page - 1 > 0" @click="goToPage(last_page - 1, per_page)">
                    <a
                        class="cursor-pointer w-10 min-w-min relative inline-flex items-center justify-center px-2 py-2 rounded bg-white text-sm font-medium text-gray-500 hover:bg-indigo-100 hover:text-indigo-900 shadow"
                        :class="{
                        'z-10 bg-indigo-100 border-indigo-800 text-indigo-800':
                        current_page === last_page - 1,
                        'bg-white border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-900': current_page !== last_page - 1,
                    }"
                    >{{ last_page - 1 }}</a>
                </div>
                <div v-show="last_page > 0" @click="goToPage(last_page, per_page)">
                    <a
                        class="cursor-pointer w-10 min-w-min relative inline-flex items-center justify-center px-2 py-2 rounded bg-white text-sm font-medium text-gray-500 hover:bg-indigo-100 hover:text-indigo-900 shadow"
                        :class="{
                        'z-10 bg-indigo-100 border-indigo-800 text-indigo-800':
                        current_page === last_page,
                        'bg-white border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-900': current_page !== last_page,
                    }"
                    >{{ last_page }}</a>
                </div>
            </div>

            <div
                v-show="current_page !== last_page"
                :class="{ disabled: nextDisabled }"
                id="nextPageButton"
                @click="goToPage(next_page, per_page)"
            >
                <a class="cursor-pointer relative inline-flex items-center px-2 py-2 rounded bg-white text-sm font-medium text-gray-500 hover:bg-indigo-100 hover:text-indigo-900 shadow" :aria-disabled="nextDisabled">
                    <span class="sr-only">Next</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                </a>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: {
        total: Number,
        per_page: Number,
        current_page: Number,
        last_page: Number,
        next_page: Number,
        prev_page: Number,
    },

    computed: {
        prevDisabled() {
            return this.current_page === 1;
        },
        nextDisabled() {
            return this.next_page === null;
        },

        from() {
            if (this.current_page === 1) {
                return 1;
            }
            else {
                return this.per_page * (this.current_page - 1);
            }
        },
        to() {
            if (this.current_page === 1) {
                return this.total > this.per_page ? this.per_page : this.total;
            } else {
                return this.total > this.per_page * this.current_page
                    ? this.per_page * this.current_page
                    : this.total - this.per_page * (this.current_page - 1);
            }
        }
    },
     
    data() {
        return {
            first_page: 1,
        };
    },
    methods: {
        goToPage(current_page, per_page) {
            this.$emit("pagination", { current_page, per_page });
        },
        perPage(event) {
            this.goToPage(this.current_page, event.target.value);
        },
    },
};
</script>