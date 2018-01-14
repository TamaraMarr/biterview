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