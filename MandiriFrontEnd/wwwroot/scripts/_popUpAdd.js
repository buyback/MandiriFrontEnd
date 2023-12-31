﻿$(document).ready(function () {
    PopUpAdd.Init();
})

var PopUpAdd = {
    Init: function() {
        this.Event();
    },

    Event: function () {
        $("#btnPopUpClose").on("click", function () {
            $("#PopUpAdd").modal("toggle");
        })

        $("#btnPopUpSubmit").on("click", function () {
            //let form = $("#formTransaction");
            //if (form.parsley().validate()) {
            PopUpAddFormTransaction.Submit();
            //}
                
        })
    }

}

var PopUpAddFormTransaction = {
    Submit: function () {
        let params = {
            categoryid: 1,
            name: $("#tbxPopUpAddName").val()
        }

        $.ajax({
            url: base_url + "Categories",
            type: "POST",
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify(params),
            cache:false,
            success: function (data) {
                if (data != null) {
                    $("#PopUpAdd").modal("toggle");
                    //var tblSummary = $("#tblSummary").DataTable();
                    //tblSummary.clear().rows.add(TableCategory.Data).draw();
                }

            },
            // Error handling
            error: function (error) {
                $("#PopUpAdd").modal("toggle");
                console.log(`Error ${error}`);
                window.location.reload();
            }
        });
    }


}