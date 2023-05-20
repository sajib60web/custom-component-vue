<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="col">
                                <h4>Customer List</h4>
                            </div>
                            <div class="col">
                                <div class="float-end">
                                    <button
                                        type="button"
                                        class="btn btn-primary"
                                    >
                                        Add New Customer
                                        <i class="fas fa-plus"></i>
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-primary"
                                        @click="reload"
                                    >
                                        Reload
                                        <i class="fas fa-sync"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="m-3">
                        <div class="row">
                            <div class="col-md-2">
                                <strong>Search By: </strong>
                            </div>
                            <div class="col-md-3">
                                <select
                                    v-model="queryField"
                                    class="form-select"
                                >
                                    <option value="name">Name</option>
                                    <option value="email">Email</option>
                                    <option value="phone">Phone</option>
                                    <option value="address">Address</option>
                                    <option value="total">Total</option>
                                </select>
                            </div>
                            <div class="col-md-7">
                                <input
                                    type="text"
                                    v-model="query"
                                    class="form-control"
                                    placeholder="Search"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <table
                            class="table table-hover table-borderd table-striped"
                        >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <!-- <th>Address</th> -->
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(customer, index) in customers"
                                    :key="customer.id"
                                >
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ customer.name }}</td>
                                    <td>{{ customer.email }}</td>
                                    <td>{{ customer.phone }}</td>
                                    <!-- <td>{{ customer.address }}</td> -->
                                    <td>{{ customer.total }}</td>
                                    <td>
                                        <button
                                            type="button"
                                            class="btn btn-primary"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            class="btn btn-danger"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <pagination
                            v-if="pagination.last_page > 1"
                            :pagination="pagination"
                            :offset="5"
                            @paginate="query === '' ? getData() : searchData()"
                        >
                        </pagination>
                    </div>
                </div>
            </div>
        </div>
        <vue-progress-bar></vue-progress-bar>
        <vue-snotify></vue-snotify>
    </div>
</template>

<script>
export default {
    data() {
        return {
            customers: [],
            pagination: {
                current_page: 1,
            },
            // Search field
            queryField: "name",
            query: "",
        };
    },
    mounted() {
        this.getData();
        console.log(this.query);
    },
    methods: {
        getData() {
            this.$Progress.start();
            axios
                .get("/api/customers?page=" + this.pagination.current_page)
                .then((response) => {
                    this.customers = response.data.data;
                    this.pagination = response.data.meta;
                    // console.log(response);
                    this.$Progress.finish();
                })
                .catch((e) => {
                    console.log(e);
                    this.$Progress.fail();
                });
        },
        searchData() {
            this.$Progress.start();
            axios
                .get(
                    "/api/search/customer/" +
                        this.queryField +
                        "/" +
                        this.query +
                        "?page=" +
                        this.pagination.current_page
                )
                .then((response) => {
                    this.customers = response.data.data;
                    this.pagination = response.data.meta;
                    // console.log(response);
                    this.$Progress.finish();
                })
                .catch((e) => {
                    console.log(e);
                    this.$Progress.fail();
                });
        },
        reload() {
            this.$Progress.start();
            this.getData();
            this.query = "";
            this.queryField = "name";
            this.$snotify.success("Data Successfully Refresh", "Success");
        },
    },
    watch: {
        query: function (newQ, old) {
            if (this.queryField == "") {
                alert("Places select field");
                return;
            }
            if (newQ === "") {
                this.getData();
            } else {
                this.searchData();
            }
        },
    },
};
</script>
