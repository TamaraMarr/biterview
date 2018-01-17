var DataController = (function() {
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

    // fetch candidates data and return filtered ones
    function getFilteredData(searchedValue, callback) {
        var filteredData = [];
        var searchString = searchedValue.toLowerCase();

        function successHandler(allData) {
            allData.filter(function(candidate) {
                var name = candidate.name.toLowerCase();
                if(name.includes(searchString)) {
                    filteredData.push(candidate);
                }
            });
            
            callback(filteredData);
        }

        function errorHandler(error) {
            console.log(error); // errors yet to be handled
        }

        fetchCandidatesData(successHandler, errorHandler);
    }

    return {
        fetchCandidatesData: fetchCandidatesData,
        getReportsData: getReportsData,
        getFilteredData: getFilteredData
    }
}) ();