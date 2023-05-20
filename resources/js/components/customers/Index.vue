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
                                        @click="create"
                                    >
                                        <i class="fa fa-plus"></i> Add New
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-primary"
                                        @click="reload"
                                    >
                                        <i class="fa fa-refresh"></i> Reload
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
                                            class="btn btn-primary btn-sm"
                                            @click="edit(customer)"
                                        >
                                            <i class="fa fa-edit"></i>
                                        </button>
                                        <button
                                            type="button"
                                            class="btn btn-danger btn-sm"
                                            @click="destroy(customer)"
                                        >
                                            <i class="fa fa-trash"></i>
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
        <!-- Start Add New Customer Modal -->
        <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                            Add New Customer
                        </h1>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="store()" method="post">
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="form.name"
                                    name="name"
                                    id="name"
                                    placeholder="Enter Your Name"
                                />
                                <span
                                    class="error"
                                    v-if="form.errors.has('name')"
                                    v-html="form.errors.get('name')"
                                >
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="form.email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter Your email"
                                />
                                <span
                                    class="error"
                                    v-if="form.errors.has('email')"
                                    v-html="form.errors.get('email')"
                                >
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="form.phone"
                                    name="phone"
                                    id="phone"
                                    placeholder="Enter Your phone"
                                />
                                <span
                                    class="error"
                                    v-if="form.errors.has('phone')"
                                    v-html="form.errors.get('phone')"
                                >
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="address">Address</label>
                                <textarea
                                    class="form-control"
                                    v-model="form.address"
                                    name="address"
                                    id="address"
                                    rows="3"
                                ></textarea>
                                <span
                                    class="error"
                                    v-if="form.errors.has('address')"
                                    v-html="form.errors.get('address')"
                                >
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="total">Total</label>
                                <input
                                    type="number"
                                    class="form-control"
                                    v-model="form.total"
                                    name="total"
                                    id="total"
                                    placeholder="Enter Your Amount"
                                />
                                <span
                                    class="error"
                                    v-if="form.errors.has('total')"
                                    v-html="form.errors.get('total')"
                                >
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="image">Image</label><br />
                                <input
                                    type="file"
                                    @change="onFileChange"
                                    class="form-control-file"
                                    name="image"
                                    id="image"
                                    placeholder="image"
                                />
                                <img
                                    style="width: 150px"
                                    :src="imagePreview"
                                    alt=""
                                />
                            </div>
                            <div class="modal-footer">
                                <button
                                    type="button"
                                    class="btn btn-danger"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button type="submit" class="btn btn-primary">
                                    Save changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Add New Customer Modal -->

        <!-- Start Edit Customer Modal -->
        <div
            class="modal fade"
            id="EditModal"
            tabindex="-1"
            aria-labelledby="EditModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="EditModalLabel">
                            Update Customer
                        </h1>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="update()" method="post">
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="form.name"
                                    name="name"
                                    id="name"
                                    placeholder="Enter Your Name"
                                />
                                <span
                                    class="error"
                                    v-if="form.errors.has('name')"
                                    v-html="form.errors.get('name')"
                                >
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="form.email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter Your email"
                                />
                                <span
                                    class="error"
                                    v-if="form.errors.has('email')"
                                    v-html="form.errors.get('email')"
                                >
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="form.phone"
                                    name="phone"
                                    id="phone"
                                    placeholder="Enter Your phone"
                                />
                                <span
                                    class="error"
                                    v-if="form.errors.has('phone')"
                                    v-html="form.errors.get('phone')"
                                >
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="address">Address</label>
                                <textarea
                                    class="form-control"
                                    v-model="form.address"
                                    name="address"
                                    id="address"
                                    rows="3"
                                ></textarea>
                                <span
                                    class="error"
                                    v-if="form.errors.has('address')"
                                    v-html="form.errors.get('address')"
                                >
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="total">Total</label>
                                <input
                                    type="number"
                                    class="form-control"
                                    v-model="form.total"
                                    name="total"
                                    id="total"
                                    placeholder="Enter Your Amount"
                                />
                                <span
                                    class="error"
                                    v-if="form.errors.has('total')"
                                    v-html="form.errors.get('total')"
                                >
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="image">Image</label><br />
                                <input
                                    type="file"
                                    @change="onFileChange"
                                    class="form-control-file"
                                    name="image"
                                    id="image"
                                    placeholder="image"
                                />
                                <img
                                    style="width: 150px"
                                    :src="imagePreview"
                                    alt=""
                                />
                            </div>
                            <div class="modal-footer">
                                <button
                                    type="button"
                                    class="btn btn-danger"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button type="submit" class="btn btn-primary">
                                    Save changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Edit Customer Modal -->
    </div>
</template>

<script>
import Form from "vform";
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
            imagePreview: null,
            form: new Form({
                id: "",
                name: "",
                email: "",
                phone: "",
                address: "",
                total: "",
                image: "",
            }),
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
        onFileChange(event) {
            this.form.image = event.target.files[0];
            let reader = new FileReader();
            reader.addEventListener(
                "load",
                function () {
                    this.imagePreview = reader.result;
                }.bind(this),
                false
            );
            if (this.form.image) {
                if (/\.(jpe?g|png|gif)$/i.test(this.form.image.name)) {
                    reader.readAsDataURL(this.form.image);
                }
            }
        },
        create() {
            this.form.reset();
            this.form.clear();
            $("#exampleModal").modal("show");
        },
        store() {
            this.$Progress.start();
            this.form.busy = true;
            this.form
                .post("/api/customers")
                .then((response) => {
                    this.getData();
                    $("#exampleModal").modal("hide");
                    if (this.form.successful) {
                        this.$Progress.finish();
                        this.$snotify.success("Customer Successfully Saved");
                    } else {
                        this.$Progress.fail();
                        this.$snotify.error(
                            "Something went wrong try again later.",
                            "Error"
                        );
                    }
                })
                .catch((error) => {
                    this.$Progress.fail();
                    console.log(error);
                });
        },
        edit(customer) {
            this.form.reset();
            this.form.clear();
            this.form.fill(customer);
            $("#EditModal").modal("show");
        },
        update() {
            this.$Progress.start();
            this.form.busy = true;
            this.form
                .put("/api/customers/" + this.form.id)
                .then((response) => {
                    this.getData();
                    $("#EditModal").modal("hide");
                    if (this.form.successful) {
                        this.$Progress.finish();
                        this.$snotify.success("Customer Update Successfully");
                    } else {
                        this.$Progress.fail();
                        this.$snotify.error(
                            "Something went wrong try again later.",
                            "Error"
                        );
                    }
                })
                .catch(function (error) {
                    this.$Progress.fail();
                    console.log(error);
                });
        },
        destroy(customer) {
            this.$snotify.clear();
            this.$snotify.confirm(
                "You can not recover this data again!",
                "Are You Sure?",
                {
                    showProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    buttons: [
                        {
                            text: "Yes",
                            action: (toast) => {
                                this.$snotify.remove(toast.id);
                                this.$Progress.start();
                                this.form
                                    .delete("/api/customers/" + customer.id)
                                    .then((response) => {
                                        this.getData();
                                        this.$Progress.finish();
                                        this.$snotify.success(
                                            "Customer Deleted Successfully"
                                        );
                                    })
                                    .catch(function (error) {
                                        this.$Progress.fail();
                                        console.log(error);
                                    });
                            },
                            bold: true,
                        },
                        {
                            text: "No",
                            action: (toast) => {
                                this.$snotify.remove(toast.id);
                            },
                            bold: true,
                        },
                    ],
                }
            );
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
<style>
.form-group {
    margin-bottom: 10px;
}
.error {
    color: red;
}
</style>
