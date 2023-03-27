import { mdiArrowCollapseLeft, mdiArrowCollapseRight, mdiChevronLeft, mdiChevronRight } from '@mdi/js';

const tableGeneral = {

    props: {
        headers: Array,
        data: Array,
    },

    data: (app) => ({

        table: {
            data: [],
            options: {
                itemsPerPage: 15,
                page: 1
            },
            headerProps: {
                sortable: false
            },
            footerProps: {
                itemsPerPageOptions: [
                    15,
                    25,
                    50,
                    100,
                ],
                itemsPerPageText: '',
                pageText: `{0}-{1}, ${ app.$t('Total') } {2}`,
                itemsPerPageAllText: app.$t('All'),
                firstPage: '',
                firstPageText: '',
                showFirstLastPage: true,
                firstIcon: mdiArrowCollapseLeft,
                lastIcon: mdiArrowCollapseRight,
                prevIcon: mdiChevronLeft,
                nextIcon: mdiChevronRight
            },
        }

    }),

    async fetch() {
        await this.setTable(this.data)
    },

    mounted() {
        this.setTable(this.data)
    },

    watch: {
        data: {
            deep: true,
            handler(val) {
                this.setTable(val)
            }
        },
    },

    methods: {
        setTable(data) {
            if (data) {this.table.data = data}
        },
    }
};

export default tableGeneral
