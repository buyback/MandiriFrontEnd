$(document).ready(function () {
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
        alert('Submitted');
        //call api
    }
}