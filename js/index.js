var BASE_URL = "http://localhost:3333/api/";

var dataController = (function() {
    // get candidates data
    function fetchCandidatesData(successHandler, errorHandler, candidateId) {
        if(!candidateId) {
            candidateId = "";
        }

        fetch(BASE_URL + "candidates/" + candidateId)
            .then(function(candidatesData) {
                return candidatesData.json();
            })
            .then(function(candidatesData) {
                // console.log("kandidati");
                // console.log(candidatesData);
                successHandler(candidatesData);
            })
            .catch(function(error) {
                errorHandler(error); // yet to handle errors!
            })
    };

    // get reports data
    function getReportsData(callback) {
        var request = $.ajax({
            url: BASE_URL + "reports",
            type: "GET",
            dataType: "json"
        });
        
        request.done(function(reportsData) {
            callback(reportsData);
        });
    }

    // get company data
    function getCompanyData(callback) {
        var request = $.ajax({
            url: BASE_URL + "companies",
            type: "GET",
            dataType: "json"
        });
        
        request.done(function(companyData) {
            // console.log(companyData);
            callback(companyData);
        });
    }

    return {
        fetchCandidatesData: fetchCandidatesData,
        getReportsData: getReportsData,
        getCompanyData: getCompanyData
    }
}) ();

var UIController = (function() {
    // render main page
    function displayCandidatesData(candidatesData) {
        // console.log(candidatesData);
        for(var i = 0; i < candidatesData.length; i++) {
            // creating and styling card element
            var candidateCard = document.createElement("div");
            var divInsideCandidateCard = document.createElement("div");
            candidateCard.setAttribute("class", "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4");
            candidateCard.setAttribute("style", "margin: 15px 0; padding: 0 10px");
            divInsideCandidateCard.setAttribute("style", "border: solid 1px #FFA000; text-align: center; margin: 0 auto");

            // creating and styling avatar
            var candidateAvatar = document.createElement("img");
            if(!candidatesData[i].avatar) {
                candidateAvatar.setAttribute("src", "http://umsuka.co.za/wp-content/uploads/2015/04/temporary-profile-placeholder-350x350.jpg");
            } else {
                candidateAvatar.setAttribute("src", candidatesData[i].avatar);
            }
            candidateAvatar.setAttribute("width", "270px");
            candidateAvatar.setAttribute("style", "margin-top: 15px; padding: 5px");
            divInsideCandidateCard.appendChild(candidateAvatar);
            
            // creating and styling name; adding id
            var candidateName = document.createElement("h3");
            candidateName.setAttribute("style", "font-size: 1.5rem; color: #212121; text-align: center");
            candidateName.setAttribute("data-candidate-id", candidatesData[i].id);
            var name = document.createTextNode(candidatesData[i].name);
            candidateName.appendChild(name);
            divInsideCandidateCard.appendChild(candidateName);
            
            // creating and styling mail
            var candidateMail = document.createElement("p");
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
    
    // render single candidate page
    function displaySingleCandidateInfo(candidateData) {
        $('#root').text("");
        // console.log(candidateData);
        
        // get dob string
        var DOB = new Date(candidateData.birthday);
        var DOBString = DOB.getDate() + "." + DOB.getMonth() + "." + DOB.getFullYear() + ".";

        // displaying user main info
        $('#root').append($("<div class='col-12 single_candidateInfoDiv'>")
            .append(
            $('<div>')
              .addClass("col-4 single_candidateInfoDivOneOfThree")
              .append($("<img style='width: 100%'>")
              .attr("src", candidateData.avatar ? candidateData.avatar : "http://umsuka.co.za/wp-content/uploads/2015/04/temporary-profile-placeholder-350x350.jpg"))
            ).append(
            $('<div>')
                .addClass('col-4 single_candidateInfoDivOneOfThree')
                .append($("<h3>")
                    .addClass("single_candidateInfoTitles")
                    .text("Name:"))
                .append($("<p>")
                    .addClass("single_candidateInfoContent")
                    .attr("id", "candidate-name")
                    .text(candidateData.name))
                .append($("<h3>")
                    .addClass("single_candidateInfoTitles")
                    .text("Email:"))
                .append($("<p>")
                    .addClass("single_candidateInfoContent")                
                    .text(candidateData.name))
            ).append(
            $('<div>')
                .addClass('col-4 single_candidateInfoDivOneOfThree')
                .append($("<h3>")
                    .addClass("single_candidateInfoTitles")
                    .text("Date of Birth:"))
                .append($("<p>")
                    .addClass("single_candidateInfoContent")
                    .text(DOBString))
                .append($("<h3>")
                    .addClass("single_candidateInfoTitles")
                    .text("Education"))
                .append($("<p>")
                    .addClass("single_candidateInfoContent")
                    .text(candidateData.education))
        ));
    }

    function displayReportsData(reportsData) {
        // making header
        $("#root").append($("<div class='reportsArea'>")
                .addClass("col-12")
                .append($("<h1>")
                    .text("Reports")
                ))
        
        // filtering data and collecting the ones relevant to the concrete candidate
        var filteredCandidateData = [];
        var candidateName = $('#candidate-name').html();
        
        for(var i = 0; i < reportsData.length; i++) {
            if(reportsData[i].candidateName === candidateName) {
                filteredCandidateData.push(reportsData[i]);
            }
        }
        console.log(filteredCandidateData);

        $(".reportsArea").append($("<table id='table'>"));

        // displaying table based on the filtered data
        for(var i = 0; i < filteredCandidateData.length; i++) {
            $('#table').append($("<>"));
        }
    }

    return {
        displayCandidatesData: displayCandidatesData,
        displaySingleCandidateInfo: displaySingleCandidateInfo,
        displayReportsData: displayReportsData
    }
}) ();

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
        // var candidateId = localStorage.getItem("candidate-id");
        UICtrl.displaySingleCandidateInfo(candidateData);
    };

    // getting reports data and displaying it on single candidate page
    function reportsDataSuccessHandler(reportsData) {
        // var candidateId = localStorage.getItem("candidate-id");
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

}) (dataController, UIController);

mainController.init();
