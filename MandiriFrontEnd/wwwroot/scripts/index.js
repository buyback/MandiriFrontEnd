var TableCategory = {
    Data: [],
}

var TableItem = {
    Data: [],
}

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
    }
}

var Table = {
    Init: function () {
        this.Fill();

        TableCategory.Data.push({
            CategoryID: 1,
            Name: 'Beauty',
        }),
            TableCategory.Data.push({
                CategoryID: 2,
                Name: 'Electronics',
            }),
            TableCategory.Data.push({
                CategoryID: 3,
                Name: 'Books',
            })

        var tblSummary = $("#tblSummary").DataTable();
        tblSummary.clear().rows.add(TableCategory.Data).draw();


        TableItem.Data.push({
            CategoryID: 1,
            Name: 'Beauty',
            Item: "Facial Wash",
            Description: "Biore"
        }),
        TableItem.Data.push({
            CategoryID: 1,
            Name: 'Beauty',
            Item: "Toner",
            Description: "Skintific"
        }),
        TableItem.Data.push({
            CategoryID: 2,
            Name: 'Electronics',
            Item: 'Handphone',
            Description: "Iphone IMAX",
        }),
        TableItem.Data.push({
            CategoryID: 3,
            Name: 'Books',
            Item: 'Comics',
            Description: "Miiko",
        })

        var tblSummaryItem = $("#tblSummaryItem").DataTable();
        tblSummaryItem.clear().rows.add(TableItem.Data).draw();

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
                Table.Event();
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
                { data: "Item" },
                { data: "Description" },
            ],
            "columnDefs": [
                { "targets": [0, 1], "className": "dt-center" },
            ],
            "fnDrawCallback": function () {
                Table.Event();
            }
        });


        //var tblSummary = $("#tblSummary").DataTable({
        //    "orderCellsTop": true,
        //    "proccessing": true,
        //    "serverSide": true,
        //    "order": [[2, 'desc']],
        //    "language": {
        //        "emptyTable": "No data available in table",
        //    },
        //    //"ajax": {
        //    //    "url": "/api/project/projectactivity/apd/baseline/log",
        //    //    "type": "POST",
        //    //    "datatype": "json",
        //    //},
        //    "filter": false,
        //    "destroy": true,
        //    "columns": [
        //        {
        //            mRender: function (data, type, full) {
        //                return `<button type='button' title='download' class='btn btn-xs btn-blue lDownload'>Download
        //                        <i class='fa fa-download' aria-hidden='true'></i>
        //                        </button > `;
        //            }
        //        },
        //    ],
        //    "columnDefs": [
        //        /*{ "targets": [0, 1, 2, 3], "className": "dt-center" },*/
        //    ],
        //    "fnDrawCallback": function () {
        //        _dataLogBaseLine = tblSummary.data();
        //        Common.CheckError.List(tblSummary.data());
        //        App.unblockUI("#tblSummary");
        //    }
        //});


    },

    Event: function () {

        $("#tblSummary tbody").on("click", "button.btnView", function (e) {
            let table = $("#tblSummary").DataTable();
            let data = table.row($(this).parents("tr")).data();
            if (data != null) {
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
                let text;
                if (confirm("Are you sure to delete this record?") == true) {
                    alert('Successfully deleted');
                } else {
                }
            }
            e.preventDefault();

        });
    }
}