var DataSelected = {};
$(document).ready(function () {
    PopUpUpdateItem.Init();
})

var PopUpUpdateItem = {
    Init: function () {
        this.Event();
    },

    Fill: function (data) {
        DataSelected = data;
        $("#selectCategoryItem").val(data.CategoryID);
        $("#tbxUpdateItemName").val(data.Name);
        $("#tarUpdateItemRemark").val(data.Description);
    },

    Event: function () {
        $("#btnPopUpUpdateItemClose").on("click", function () {
            $("#PopUpUpdateItem").modal("toggle");
        })

        $("#btnPopUpUpdateItemSubmit").on("click", function () {
            PopUpUpdateItemFormTransaction.Submit();

        })
    }
}

var PopUpUpdateItemFormTransaction = {
    Submit: function () {
        let params = {
            itemID: DataSelected.ItemID,
            categoryID: $("#selectCategoryItem").val(),
            name: $("#tbxUpdateItemName").val(),
            description: $("#tarUpdateItemRemark").val()
        }

        $.ajax({
            url: base_url + "Items",
            type: "PUT",
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify(params),
            cache: false,
            success: function (data) {
                if (data != null) {
                    $("#PopUpUpdateItem").modal("toggle");
                    window.location.reload();
                    //var tblSummary = $("#tblSummary").DataTable();
                    //tblSummary.clear().rows.add(TableCategory.Data).draw();
                }

            },
            // Error handling
            error: function (error) {
                $("#PopUpUpdateItem").modal("toggle");
                console.log(`Error ${error}`);
                window.location.reload();
            }
        });

    }
}