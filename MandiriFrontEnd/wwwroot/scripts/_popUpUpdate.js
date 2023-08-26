var DataSelected = {};
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
            //let form = $("#formTransaction");
            //if (form.parsley().validate()) {
            PopUpUpdateFormTransaction.Submit();
            //}

        })
    }
}

var PopUpUpdateFormTransaction = {
    Submit: function () {
        alert('Updated');
        
        var params = {
            Id: DataSelected.CategoryID,
            Name: DataSelected.Name,
            Description: DataSelected.Description
        }

        //call api

    }
}