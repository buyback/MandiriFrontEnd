$(document).ready(function () {
    PopUpAddItem.Init();
})

var PopUpAddItem = {
    Init: function() {
        this.Event();
    },

    Event: function () {
        $("#btnPopUpCloseItem").on("click", function () {
            $("#PopUpAddItem").modal("toggle");
        })

        $("#btnPopUpSubmitItem").on("click", function () {
            PopUpAddItemFormTransaction.Submit();
                
        })
    }

}

var PopUpAddItemFormTransaction = {
    Submit: function () {
        let params = {
            itemID: 0,
            categoryID: $("#selectCategory").val(),
            name: $("#tbxPopUpAddItemName").val(),
            description: $("#tarPopUpAddItemRemark").val()
        }

        $.ajax({
            url: base_url + "Items",
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