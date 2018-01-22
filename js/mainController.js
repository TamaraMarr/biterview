var MainController = (function(DataCtrl, UICtrl) {
    // fetching candidates data and displaying it on main page
    function candidatesDataSuccessHandler(candidatesData) {
        UICtrl.displayCandidatesData(candidatesData);
    };    
    function errorHandler(error) {
        console.log(error); // errors yet to be handled
    };

    // fetching candidate data and displaying it on single candidate page
    function candidateDataForSinglePageSuccessHandler(candidateData) {
        UICtrl.displaySingleCandidateInfo(candidateData);
        DataCtrl.getReportsData(reportsDataSuccessHandler);
    };

    // getting reports data and displaying it on single candidate page
    function reportsDataSuccessHandler(reportsData) {
        UICtrl.displayReportsData(reportsData);
    };
    
    // setting up event listeners and displaying single candidate page
    document.addEventListener("click", function(event) {
        if(event.target.getAttribute("data-candidate-id")){
            var candidateId = event.target.getAttribute("data-candidate-id");
            
            DataCtrl.fetchCandidatesData(candidateDataForSinglePageSuccessHandler, errorHandler, candidateId);
        };
    });

    // getting data for the modal
    function reportsDataForModalSuccessHandler(reportsData) {
        UICtrl.openModal(reportsData, eventArr[eventArr.length - 1])
    }

    // adding event listener for opening report details modal
    var eventArr = [];
    $(document).on("click", ".modalOpener", function(event) {
        eventArr.push(event.target.id);
        DataCtrl.getReportsData(reportsDataForModalSuccessHandler);
    })

    // adding event listener for closing report details modal on close button
    $(document).on("click", ".closeButton", function(event) {
        UICtrl.closeModal(event);
    })
    
    // adding event listener for closing report details modal on ESC key press
    $(document).keyup(function(event) {
        if (event.keyCode == 27) {
            UICtrl.closeModal(event);
       }
    });

    // pass filtered data to UICtrl
    function passFilteredData(filteredData) {
        UICtrl.displayFilteredResults(filteredData);
    }

    // filtering candidates on button press
    $(document).on("click", ".searchButton", function(event) {
        var searchedValue = $(".searchInputLine").val();
        DataCtrl.getFilteredData(searchedValue, passFilteredData);
    })

    // filtering candidates on enter key press
    $(document).on("keypress", ".searchInputLine", function(event) {
        var searchedValue = $(".searchInputLine").val();
        if(event.key == "Enter") {
            DataCtrl.getFilteredData(searchedValue, passFilteredData);
        }
    })

    // initializing the app
    function init() {
        DataCtrl.fetchCandidatesData(candidatesDataSuccessHandler, errorHandler);
    }

    return {
        init: init
    };

}) (DataController, UIController);

MainController.init();
