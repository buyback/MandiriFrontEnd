var TableCategory = {
    Data: [],
}

var TableItem = {
    Data: [],
}

var base_url = "https://microservicemandiri.azurewebsites.net/";
var base_heroku = "https://cors-anywhere.herokuapp.com/";

$(document).ready(function () {
    Control.Init();
    Table.Init();
})

var Control = {
    Init: function () {
        this.Event();
    },

    Event: function () {

        $("#btnAddCategory").on('click', function () {
            $("#PopUpAdd").modal("toggle");
        })

        $("#btnAddItem").on('click', function () {
            $("#PopUpAddItem").modal("toggle");
        })
    }
}

var Table = {
    Init: function () {
        this.Fill();
        this.Fetch();
    },

    Event: function () {

        $("#tblSummary tbody").on("click", "button.btnView", function (e) {

            let table = $("#tblSummary").DataTable();
            let data = table.row($(this).parents("tr")).data();
            if (data != null) {
                DataSelected = data;
                $(".btnActionUpdate").hide();
                $("#UpdateTitle").text("Detail")
                PopUpUpdate.Fill(data);
                $("#PopUpUpdate").modal("toggle");
            }
        });


        $("#tblSummary tbody").on("click", "button.btnUpdate", function (e) {

            let table = $("#tblSummary").DataTable();
            let data = table.row($(this).parents("tr")).data();
            if (data != null) {
                DataSelected = data;
                $(".btnActionUpdate").show();
                $("#UpdateTitle").text("Update Category")
                PopUpUpdate.Fill(data);
                $("#PopUpUpdate").modal("toggle");
            }
        });

        $("#tblSummary tbody").on("click", "button.btnDelete", function (e) {
            let table = $("#tblSummary").DataTable();
            let data = table.row($(this).parents("tr")).data();
            if (data != null) {
                DataSelected = data;
                if (confirm("Are you sure to delete this record?") == true) {
                    Transaction.Delete();

                } else {
                }
            }
            e.preventDefault();

        });

        $("#tblSummaryItem tbody").on("click", "button.btnViewItem", function (e) {
            let table = $("#tblSummaryItem").DataTable();
            let data = table.row($(this).parents("tr")).data();
            if (data != null) {
                DataSelected = data;
                $(".btnActionItemUpdate").hide();
                $("#UpdateItemTitle").text("Detail")
                PopUpUpdateItem.Fill(data);
                $("#PopUpUpdateItem").modal("toggle");
            }
        });


        $("#tblSummaryItem tbody").on("click", "button.btnUpdateItem", function (e) {
            let table = $("#tblSummaryItem").DataTable();
            let data = table.row($(this).parents("tr")).data();
            if (data != null) {
                DataSelected = data;
                $(".btnActionUpdate").show();
                $("#UpdateTitle").text("Update Category")
                PopUpUpdateItem.Fill(data);
                $("#PopUpUpdateItem").modal("toggle");
            }
        });

        $("#tblSummaryItem tbody").on("click", "button.btnDeleteItem", function (e) {
            let table = $("#tblSummaryItem").DataTable();
            let data = table.row($(this).parents("tr")).data();
            if (data != null) {
                DataSelected = data;
                if (confirm("Are you sure to delete this record?") == true) {
                    Transaction.DeleteItem();

                } else {
                }
            }
            e.preventDefault();

        });
    },

    Fetch: function () {


        $.ajax({

            url: base_url + "Categories",
            type: "GET",
            success: function (data) {
                if (data != null) {
                    let xClass = document.getElementsByClassName("slsCategory")

                    for (let i = 0; i < data.length; i++) {
                        TableCategory.Data.push({
                            CategoryID: data[i].categoryID,
                            Name: data[i].name,
                        })

                        // add options
                        let option = document.createElement("option");
                        let opt2 = document.createElement("option");
                        option.text = data[i].name;
                        option.value = data[i].categoryID;
                        opt2.text = data[i].name;
                        opt2.value = data[i].categoryID;
                        xClass[0].add(option);
                        xClass[1].add(opt2);
                    };

                    let tblSummary = $("#tblSummary").DataTable();
                    tblSummary.clear().rows.add(TableCategory.Data).draw();

                    // create select option
                    
                }

                // get item

                $.ajax({
                    url: base_url + "Items",
                    type: "GET",
                    success: function (data) {
                        if (data != null) {

                            for (let i = 0; i < data.length; i++) {
                                TableItem.Data.push({
                                    ItemID: data[i].itemID,
                                    CategoryID: data[i].categoryID,
                                    Name: data[i].name,
                                    Description: data[i].description

                                })
                            };

                            var tblSummaryItem = $("#tblSummaryItem").DataTable();
                            tblSummaryItem.clear().rows.add(TableItem.Data).draw();
                        }

                    },
                    // Error handling
                    error: function (error) {
                        //console.log(`Error ${error}`);
                    }
                });


            },
            // Error handling
            error: function (error) {
                //console.log(`Error ${error}`);
            }
        });

    },

    Fill: function () {

        //$("#tblSummary").DataTable().clear().draw();

        var tblSummary = $("#tblSummary").DataTable({
            "filter": false,
            "orderCellsTop": true,
            "language": {
                "emptyTable": "No data available in table",
            },
            "destroy": true,
            "order": [[1, 'asc']],
            "columns": [
                {
                    mRender: function (data,type,full) {
                        let strHTML = "";
                        strHTML += `<button type='button' class='btn btn-sm btn-info btnView' title='View'>
                        <i class='fa fa-hand-pointer'></i>
                        </button>`;
                        strHTML += `<button type='button' class='btn btn-sm btn-info btnUpdate' title='Update'>
                        <i class='fa fa-pencil-alt'></i>
                        </button>`;
                        strHTML += `<button type='button' class='btn btn-sm btn-info btnDelete' title='Delete'>
                        <i class='fa fa-eraser'></i>
                        </button>`;
                        return strHTML;
                    }
                },
                { data: "Name" },
            ],
            "columnDefs": [
                { "targets": [0, 1], "className": "dt-center" },
            ],
            "fnDrawCallback": function () {
            }
        });

        var tblSummaryItem = $("#tblSummaryItem").DataTable({
            "filter": false,
            "orderCellsTop": true,
            "language": {
                "emptyTable": "No data available in table",
            },
            "destroy": true,
            "order": [[1, 'asc']],
            "columns": [
                {
                    mRender: function (data, type, full) {
                        let strHTML = "";
                        strHTML += `<button type='button' class='btn btn-sm btn-info btnViewItem' title='View'>
                        <i class='fa fa-hand-pointer'></i>
                        </button>`;
                        strHTML += `<button type='button' class='btn btn-sm btn-info btnUpdateItem' title='Update'>
                        <i class='fa fa-pencil-alt'></i>
                        </button>`;
                        strHTML += `<button type='button' class='btn btn-sm btn-info btnDeleteItem' title='Delete'>
                        <i class='fa fa-eraser'></i>
                        </button>`;
                        return strHTML;
                    }
                },
                {
                    mRender: function (data, type, full) {
                        let categoryName = TableCategory.Data.filter(x => x.CategoryID == full.CategoryID)[0].Name;

                        if (categoryName != null) {
                            return categoryName;
                        }
                            
                    }
                },
                { data: "Name" },
                { data: "Description" },
            ],
            "columnDefs": [
                { "targets": [0, 1], "className": "dt-center" },
            ],
            "fnDrawCallback": function () {
            }
        });

        Table.Event();
    },

}

var Transaction = {
    Delete: function () {
        let params = {
            categoryID: DataSelected.CategoryID
        }

        $.ajax({
            url: base_url + "Categories?categoryID=" + DataSelected.CategoryID,
            type: "DELETE",
            cache: false,
            success: function (data) {
                if (data != null) {
                    alert('Successfully Deleted');
                    window.location.reload();
                }

            },
            // Error handling
            error: function (error) {
                console.log(`Error ${error}`);
            }
        });
    },

    DeleteItem: function () {
        let params = {
            itemID: DataSelected.ItemID
        }

        $.ajax({
            url: base_url + "Items?itemID=" + DataSelected.ItemID,
            type: "DELETE",
            cache: false,
            success: function (data) {
                if (data != null) {
                    alert('Successfully Deleted');
                    window.location.reload();
                }

            },
            // Error handling
            error: function (error) {
                console.log(`Error ${error}`);
            }
        });
    }
}
