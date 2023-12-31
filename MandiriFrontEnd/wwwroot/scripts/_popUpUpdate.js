﻿var DataSelected = {};
$(document).ready(function () {
    PopUpUpdate.Init();
})

var PopUpUpdate = {
    Init: function () {
        this.Event();
    },

    Fill: function (data) {
        DataSelected = data;
        $("#tbxUpdateName").val(data.Name);
        $("#tarUpdateRemark").val(data.Description);
    },

    Event: function () {
        $("#btnPopUpUpdateClose").on("click", function () {
            $("#PopUpUpdate").modal("toggle");
        })

        $("#btnPopUpUpdateSubmit").on("click", function () {
            PopUpUpdateFormTransaction.Submit();

        })
    }
}

var PopUpUpdateFormTransaction = {
    Submit: function () {
        let params = {
            categoryID: DataSelected.CategoryID,
            name: $("#tbxUpdateName").val(),
        }

        $.ajax({
            url: base_url + "Categories",
            type: "PUT",
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify(params),
            cache: false,
            success: function (data) {
                if (data != null) {
                    $("#PopUpUpdate").modal("toggle");
                    window.location.reload();
                    //var tblSummary = $("#tblSummary").DataTable();
                    //tblSummary.clear().rows.add(TableCategory.Data).draw();
                }

            },
            // Error handling
            error: function (error) {
                $("#PopUpUpdate").modal("toggle");
                window.location.reload();
                console.log(`Error ${error}`);
            }
        });

    }
}