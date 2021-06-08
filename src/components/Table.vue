<template>
    <div class="table-container">
        <table class="table">
            <thead>
                <tr>
                    <th v-for="(column, i) in columns" :key="i" >{{ column.title }}</th>
                </tr>
            </thead>
            <tbody v-if="!(items || []).length">
                <tr>
                    <td :colspan="(columns || []).length" style="text-align: center">
                        Não há linhas para serem exibidas
                    </td>
                </tr>
            </tbody>
            <tbody>
                <tr v-for="(item, i) in items" :key="i">
                    <td v-for="(column, j) in columns" :key="j">
                        <slot :name="column.property" :item="item" :column="column">
                            {{getText(column, item)}}
                        </slot>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import _ from 'lodash'

export default {
    name: 'Table',
    props: ['columns', 'items'],
    methods: {
        getText(column, item) {
            return _.get(item, column.property)
        }
    }
}
</script>

<style lang="scss">
    .table-container {
        .table {
            width: 100%;
            &, td, th {
                border-collapse: collapse;
            }

            td,th {
                padding: 8px;
                text-align: left;
            }

            thead th {
                background-color: $primary;
                color: $white;
            }

            tbody tr {
                border-bottom: 1px solid $primary;
            }
        }
    }
</style>