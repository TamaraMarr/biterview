var UIController = (function() {
    // rendering main page
    function displayCandidatesData(candidatesData) {
        // displaying the search line
        $("#root").append("<input type='text' placeholder='Search candidates by name' class='col-10 searchInputLine'>")
                  .append("<input type='button' value='Search' class='col-2 searchButton'>")

        if(candidatesData.length === 0) {
            // handling no results
            var errorNote = document.createElement("p");
            var name = document.createTextNode("No Results Found");
            errorNote.appendChild(name);
            errorNote.setAttribute("class", "col-12 error");
            document.getElementById("root").appendChild(errorNote);
        } else {
            // displaying the candidates' cards
            for(var i = 0; i < candidatesData.length; i++) {
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
    }
    // filtering results
    function displayFilteredResults(filteredResults) {
        $('#root').text("");

        displayCandidatesData(filteredResults);
    }

    // displaying upper part of the single candidate page
    function displaySingleCandidateInfo(candidateData) {
        $('#root').text("");
        
        // get dob string
        var DOB = Util.formatDate(candidateData.birthday);

        // displaying user main info
        $('#root').append($("<div class='col-12 single_candidateInfoDiv'>")
            .append($('<div>')
                .addClass("col-4 single_candidateInfoDivOneOfThree")
                .append($("<img style='width: 100%'>")
                    .attr("src", candidateData.avatar ? candidateData.avatar : "http://umsuka.co.za/wp-content/uploads/2015/04/temporary-profile-placeholder-350x350.jpg"))
            )
            .append($('<div>')
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
                    .text(candidateData.email))
            )
            .append($('<div>')
                .addClass('col-4 single_candidateInfoDivOneOfThree')
                .append($("<h3>")
                    .addClass("single_candidateInfoTitles")
                    .text("Date of Birth:"))
                .append($("<p>")
                    .addClass("single_candidateInfoContent")
                    .text(DOB))
                .append($("<h3>")
                    .addClass("single_candidateInfoTitles")
                    .text("Education"))
                .append($("<p>")
                    .addClass("single_candidateInfoContent")
                    .text(candidateData.education))
            )
        );
    }
    
    // displaying lower part of the single candidate page
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

        // displaying table headers
        $(".reportsArea").append($("<table id='table'>")
                .append($("<tr>")
                    .append($("<th>")
                        .text("Company")
                    )
                    .append($("<th>")
                        .text("Interview Date")
                    )
                    .append($("<th colspan='2'>")
                        .text("Status")
                    )
                ));

        // displaying the rest of the table
        if(filteredCandidateData.length === 0) {
            $('#table')
                .after($("<p class='error'>")
                    .text("There is no data available for this user"))
        } else {
            for(var i = 0; i < filteredCandidateData.length; i++) {
                $('#table').append($("<tr>")
                    .append($("<td>")
                        .text(filteredCandidateData[i].companyName)
                    )
                    .append($("<td>")
                        .text(Util.formatDate(filteredCandidateData[i].interviewDate))
                    )
                    .append($("<td>")
                        .text(filteredCandidateData[i].status)
                    )
                    .append($("<td class='eye'>")
                        .append($("<img class='modalOpener' id='" + i + "'>")
                            .css("width", "50%")
                            .attr("src", "https://d30y9cdsu7xlg0.cloudfront.net/png/5968-200.png")
                        ) 
                    )
                )
            }
            $("#table").after($("<div class='hiddenInfoDiv'>")
                .text(JSON.stringify(filteredCandidateData))
                .css("display", "none")  
            )
        }
    }

    // opening and displaying modal
    function openModal(reportsData, eventId) {
        var dataForDisplaying = reportsData[eventId]
        
        $("#root").append($("<div class='outerModalDiv'>")
            .append($("<div class='innerModalDiv'>")
                .append($("<div class='innerInnerModalDiv'>")
                    .append($("<div class='mostInnerModalDiv'>")
                        .append($("<h2 class='col-12'>")
                            .text($('#candidate-name').html())
                        )
                        .append($("<div class='col-5' style='float: left'>")
                            .append($("<h3 class='leftH3'>")
                                .text("Company:")
                            )
                            .append($("<p class='leftP'>")
                                .text(dataForDisplaying.companyName)
                            )
                            .append($("<h3 class='leftH3'>")
                                .text("Interview Date:")
                            )
                            .append($("<p class='leftP'>")
                                .text(Util.formatDate(dataForDisplaying.interviewDate))
                            )
                            .append($("<h3 class='leftH3'>")
                                .text("Phase:")
                            )
                            .append($("<p class='leftP'>")
                                .text(dataForDisplaying.phase)
                            )
                            .append($("<h3 class='leftH3'>")
                                .text("Status:")
                            )
                            .append($("<p class='leftP'>")
                                .text(dataForDisplaying.status)
                            )
                        )
                        .append($("<div class='col-7' id='rightDiv'>")
                            .append($("<h3 class='rightH3'>")
                                .text("Notes:")
                            )
                            .append($("<p>")
                                .text(dataForDisplaying.note)
                            )
                        )
                        .append($("<img src='https://image.flaticon.com/icons/svg/54/54528.svg'>")
                            .addClass("closeButton")
                        )
                    )
                )
            ))
    }

    // closing modal
    function closeModal(event) {
        // if(event.target.className === "mostInnerModalDiv" || event.target.className === "leftP" ||
        //     event.target.className === "leftH3" || event.target.className === "rightP" ||
        //     event.target.className === "rightH3" || event.target.className === "modal") {
        //     return;
        // } CLOSING ON CLICK OUTSIDE THE MODAL BODY - IN PROGRESS
            
        $('.outerModalDiv').remove();
    }

    return {
        displayCandidatesData: displayCandidatesData,
        displaySingleCandidateInfo: displaySingleCandidateInfo,
        displayReportsData: displayReportsData,
        openModal: openModal,
        closeModal: closeModal,
        displayFilteredResults: displayFilteredResults
    }
}) ();