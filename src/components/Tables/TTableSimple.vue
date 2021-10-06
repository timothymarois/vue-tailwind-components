<template>
    <table class="min-w-full divide-y divide-gray-200 bg-gray-50">
        <thead v-if="!hideHeader" class="bg-white text-indigo-800">
            <tr>
                <th v-for="(h,hindex) in headers"
                    class="p-4 text-sm font-normal text-left"
                    :key="hindex"
                    :class="(h.class) ? h.class : 'text-left'"
                    :style="(h.width) ? 'width:'+h.width+';' : ''"
                >
                    <slot :name="'header.'+h.value" v-bind:header="h"><span class="font-bold my-auto">{{ h.title }}</span></slot>
                </th>
            </tr>
        </thead>
        <tbody v-if="items && items.length > 0" class="tbody bg-white overflow-scroll">
            <tr 
                v-for="(item,rindex) in items" :key="rindex" 
                class="hover:bg-indigo-100 transition duration-150 text-gray-800 hover:text-indigo-900"
                :class="(item.class ? item.class+' trow' : 'trow')"
            >
                <td 
                    v-for="(h) in headers" 
                    :key="h.value" 
                    class="p-4 border-0 relative font-normal"
                    :class="(h.class) ? h.class : 'text-left'"
                >
                    <slot :name="'column.'+h.value" v-bind:column="item" v-bind:index="rindex">{{ item[h.value] }}</slot>
                </td>
            </tr>
        </tbody>
        <tbody v-else >
            <tr>
                <td :colspan="headers.length" class="text-center">{{ messageText }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'TTableSimple',
    props: {
        headers: {
            type: Array,
            default: []
        },
        items: {
            type: Array,
            default: []
        },
        loading : {
            type: Boolean,
            default: false
        },
        hideHeader : {
            type: Boolean,
            default: false
        },
        nodata: {
            type: String,
            default: 'No results found.'
        },
        loadingText: {
            type: String,
            default: 'Loading... Please wait'
        },
    },
    computed: {
        messageText() {
            if (this.loading) return this.loadingText
            return this.nodata
        }
    }
}
</script>