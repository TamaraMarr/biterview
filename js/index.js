var BASE_URL = "http://localhost:3333/api/";

var dataController = (function() {
    function fetchCompanyData(successHandler, errorHandler) {
        fetch(BASE_URL + "companies")
            .then(function(companyData) {
                return companyData.json();
            })
            .then(function(companyData) {
                // console.log("kompanije");
                // console.log(companyData);
                successHandler(companyData);
            })
            .catch(function(error) {
                errorHandler(error);
            })
    };

    function fetchCandidatesData(successHandler, errorHandler) {
        fetch(BASE_URL + "candidates")
            .then(function(candidatesData) {
                return candidatesData.json();
            })
            .then(function(candidatesData) {
                console.log("kandidati");
                console.log(candidatesData);
                successHandler(candidatesData);
            })
            .catch(function(error) {
                errorHandler(error);
            });
    }

    return {
        fetchCompanyData: fetchCompanyData,
        fetchCandidatesData: fetchCandidatesData
    }
}) ();

var UIController = (function() {
    function displayCandidatesData(candidatesData) {
        console.log(candidatesData);
        for(var i = 0; i < candidatesData.length; i++) {
            // 
            var candidateCard = document.createElement('div');
            candidateCard.setAttribute("class", "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4")

            var candidateAvatar = document.createElement('img');
            if(!candidatesData[i].avatar) {
                candidateAvatar.setAttribute("src", "http://www.autodeskfusionlifecycle.com/app/uploads/2017/06/default-user.png");
            } else {
                candidateAvatar.setAttribute("src", candidatesData[i].avatar);
            }
            candidateAvatar.setAttribute("width", "100%");

            var candidateName = document.createElement('h2');
            var candidateMail = document.createElement('p');

            
            candidateCard.appendChild(candidateAvatar);
            document.getElementById("root").appendChild(candidateCard);
        }
    }

    return {
        displayCandidatesData
    }
}) ();

var mainController = (function(DataCtrl, UICtrl) {
    // fetching candidates data
    function candidatesDataSuccessHandler(candidatesData) {
        console.log(candidatesData);
        UICtrl.displayCandidatesData(candidatesData);
    };
    
    function candidatesDataErrorHandler(error) {
        console.log(error);
    }

    DataCtrl.fetchCandidatesData(candidatesDataSuccessHandler, candidatesDataErrorHandler);

}) (dataController, UIController);

mainController.init();
