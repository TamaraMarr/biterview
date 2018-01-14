var mainController = (function(DataCtrl, UICtrl) {
    // fetching candidates data and displaying it on main page
    function candidatesDataSuccessHandler(candidatesData) {
        UICtrl.displayCandidatesData(candidatesData);
    };    
    function errorHandler(error) {
        console.log(error); // yet to handle errors!
    };

    DataCtrl.fetchCandidatesData(candidatesDataSuccessHandler, errorHandler);

    // fetching candidate data and displaying it on single candidate page
    function candidateDataForSinglePageSuccessHandler(candidateData) {
        UICtrl.displaySingleCandidateInfo(candidateData);
    };

    // getting reports data and displaying it on single candidate page
    function reportsDataSuccessHandler(reportsData) {
        UICtrl.displayReportsData(reportsData);
    };
    
    // setting up event listeners and displaying single candidate page
    document.addEventListener("click", function() {
        if(event.target.getAttribute("data-candidate-id")){
            var candidateId = event.target.getAttribute("data-candidate-id");
            
            DataCtrl.fetchCandidatesData(candidateDataForSinglePageSuccessHandler, errorHandler, candidateId);
            DataCtrl.getReportsData(reportsDataSuccessHandler);
        };
    });

    // getting data for the modal
    function reportsDataForModalSuccessHandler(reportsData) {
        UICtrl.openModal(reportsData)
    }

    // adding event listener for report details modal
    $(document).on("click", ".modalOpener", function() {
        DataCtrl.getReportsData(reportsDataForModalSuccessHandler);
    })

}) (dataController, UIController);

mainController.init();
