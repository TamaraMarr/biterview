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
                errorHandler(error); // yet to handle errors!
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
                errorHandler(error); // yet to handle errors!
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
            // creating and styling card element
            var candidateCard = document.createElement('div');
            var divInsideCandidateCard = document.createElement('div');
            candidateCard.setAttribute("class", "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4");
            candidateCard.setAttribute("style", "margin: 15px 0; padding: 0 10px");
            divInsideCandidateCard.setAttribute("style", "border: solid 1px #FFA000; text-align: center; margin: 0 auto");

            // creating and styling avatar
            var candidateAvatar = document.createElement('img');
            if(!candidatesData[i].avatar) {
                candidateAvatar.setAttribute("src", "http://umsuka.co.za/wp-content/uploads/2015/04/temporary-profile-placeholder-350x350.jpg");
            } else {
                candidateAvatar.setAttribute("src", candidatesData[i].avatar);
            }
            candidateAvatar.setAttribute("width", "270px");
            candidateAvatar.setAttribute("style", "margin-top: 15px; padding: 5px");
            divInsideCandidateCard.appendChild(candidateAvatar);
            
            // creating and styling name; adding id
            var candidateName = document.createElement('h3');
            candidateName.setAttribute("style", "font-size: 1.5rem; color: #212121; text-align: center");
            candidateName.setAttribute("data-candidate-id", candidatesData[i].id);
            var name = document.createTextNode(candidatesData[i].name);
            candidateName.appendChild(name);
            divInsideCandidateCard.appendChild(candidateName);
            
            // creating and styling mail
            var candidateMail = document.createElement('p');
            candidateMail.setAttribute("style", "text-align: center");
            var email = document.createTextNode(candidatesData[i].email);
            candidateMail.appendChild(email);
            divInsideCandidateCard.appendChild(candidateMail);
            
            // finalizing cards
            candidateCard.appendChild(divInsideCandidateCard);

            // filling out the page
            document.getElementById("root").appendChild(candidateCard);
        }
    }

    function displaySingleCandidatePage() {
        document.
    }

    return {
        displayCandidatesData
    }
}) ();

var mainController = (function(DataCtrl, UICtrl) {
    // fetching candidates data and displaying it
    function candidatesDataSuccessHandler(candidatesData) {
        UICtrl.displayCandidatesData(candidatesData);
    };
    
    function candidatesDataErrorHandler(error) {
        console.log(error); // yet to handle errors!
    }

    DataCtrl.fetchCandidatesData(candidatesDataSuccessHandler, candidatesDataErrorHandler);

    // setting up event listeners
    document.addEventListener("click", function() {
        if(event.target.getAttribute("data-candidate-id")){
            var candidateId = event.target.getAttribute("data-candidate-id");
            localStorage.setItem("candidate-id", candidateId);

        };
    });

}) (dataController, UIController);

mainController.init();
