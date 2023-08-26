var TableCategory = {
    Data: [],
}

var TableItem = {
    Data: [],
}

var DataSelected = {};

$(document).ready(function () {
    Control.Init();
    Table.Init();
})

var Control = {
    Init: function () {
        this.Event();
    },

    Event: function () {

        $("#btnAdd").on('click', function () {
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
            Description: "Beauty",
        }),
            TableCategory.Data.push({
                CategoryID: 2,
                Name: 'Electronics',
                Description: "Electronics",
            }),
            TableCategory.Data.push({
                CategoryID: 3,
                Name: 'Books',
                Description: "Books",
            })

        var tblSummary = $("#tblSummary").DataTable();
        tblSummary.clear().rows.add(TableCategory.Data).draw();

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
            "order": [[2, 'desc']],
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
        $("#tblSummary tbody").on("click", "button.btnUpdate", function (e) {
            let table = $("#tblSummary").DataTable();
            let data = table.row($(this).parents("tr")).data();
            if (data != null) {
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
        });
    }
}