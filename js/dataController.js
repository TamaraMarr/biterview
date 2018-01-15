var dataController = (function() {
    var BASE_URL = "http://localhost:3333/api/";
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
            callback(companyData);
        });
    }

    // fetch candidates data and return filtered ones
    function getFilteredData(searchedValue, callback) {
        var filteredData = [];
        var searchString = searchedValue.toLowerCase();

        function successHandler(allData) {
            // filter and return through callback
            filteredData = allData.filter(function(candidate) {
                var name = candidate.name.toLowerCase();
                if(name.includes(searchString)) {
                    return candidate;
                }
            });
        }
        console.log(filteredData)

        function errorHandler(error) {
            console.log(error);
        }

        fetchCandidatesData(successHandler, errorHandler);
    }

    return {
        fetchCandidatesData: fetchCandidatesData,
        getReportsData: getReportsData,
        getCompanyData: getCompanyData,
        getFilteredData: getFilteredData
    }
}) ();