// Assuming data1.json and data2.json both have an array of objects with a 'name' property
const dataUrl1 = 'santali.json';
const dataUrl2 = 'english.json';

// Set the variables for searchbox
const searchBox = document.getElementById('searchbox');

// Declare Search Page Heading
const searchHeadElement = document.getElementById("searchhead");

// Set the variables for results container
const sanresultsContainer = document.getElementById('sanresults');
const enresultsContainer = document.getElementById('enresults');
const otherResults = document.getElementById('oresults');

// Set the variables for results header
const sansearchhead = document.getElementById('sansearchhead');
const engsearchhead = document.getElementById('ensearchhead');

// Set the variables for flags
const santaliFlags = document.getElementById("flagsantali");
const englishFlags = document.getElementById("flagenglish");

//Define glossary bothindex variable
let BothIndex;

//Search page result display
// Function to retrieve form data from URL parameters as JSON
function getFormDataAsJSON() {
    // Get the URL parameters
    var urlParams = new URLSearchParams(window.location.search);

    // Create an empty JSON object
    var formDataJSON = {};

    // Iterate through URL parameters and add them to the JSON object
    urlParams.forEach(function (value, key) {
        formDataJSON[key] = value;
    });

    // Display form data on webpage
    var searchedTerm = formDataJSON.search.toLowerCase();
    var srchdTerm = formDataJSON.search;
    // call search data function
    searchData(searchedTerm, srchdTerm);

}

// Call the function when the page loads
getFormDataAsJSON();

// Search Page Input And Result Handling
function searchData(sTerm, srchdTerm) {
    const searchTerm = searchBox.value.toLowerCase();
    const srchTerm = searchBox.value;

    // Fetch data from data1.json and data2.json simultaneously
    Promise.all([fetch(dataUrl1), fetch(dataUrl2)])
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(dataArray => {
            // Combine data from both sources
            var combinedData = [...dataArray[0], ...dataArray[1]];

            // search the filter term either from url parameter or from search box
            let toFilterTerm;
            if (searchTerm.length >= 1) {
                toFilterTerm = searchTerm;
            } else {
                toFilterTerm = sTerm;
            }

            // Heading Change term
            let toHeadTerm;
            if (searchTerm.length >= 1) {
                toHeadTerm = srchTerm;
            } else {
                toHeadTerm = srchdTerm;
            }

            // Filter combined data based on user input
            const filteredData = combinedData.filter(item => item.term.toLowerCase().includes(toFilterTerm));

            // Display results
            displayResults(filteredData, dataArray, toHeadTerm);

            //Change name of search page heading
            if (toFilterTerm == undefined) {
                searchHeadElement.innerHTML = "Search";
                sansearchhead.style.display = "none";
                engsearchhead.style.display = "none";
                santaliFlags.style.display = "none";
                englishFlags.style.display = "none";
                otherResults.style.display = "block";
                otherResults.innerHTML = `<h2 style="text-align : center; background-color: white; color: red; border: black solid 1px;">Please Type Something To Search!</h2>`;
            } else if (toFilterTerm.length >= 1) {
                searchHeadElement.innerHTML = toHeadTerm;
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayResults(results, dataArray, toHeadTerm) {
    // Reset the display if search is performed again
   let sanDisplayLimit = 0;
   let enDisplayLimit = 0;

    // Remove 'selected' class from all td elements
    let allTdElements = document.querySelectorAll("td");
    allTdElements.forEach((td) => {
        td.classList.remove("selected");
    });

    // Clear previous results
    sanresultsContainer.innerHTML = '';
    enresultsContainer.innerHTML = '';

    // Display limited results initially and a Load More button
    const sanResults = results.filter(result => dataArray[0].includes(result)) || [];
    const enResults = results.filter(result => dataArray[1].includes(result)) || [];

    if (sanResults.length >= 1) {
        displayLimitedResults(sanResults, sanresultsContainer, 'san', sanDisplayLimit);
    }

    if (enResults.length >= 1) {
        displayLimitedResults(enResults, enresultsContainer, 'en', enDisplayLimit);
    }

    // Check if there are any results for dataArray[0]
    const hasResultsInDataArray0 = sanResults.length > 0;

    // If no results in dataArray[0], display the "No Results" message for san container
    if (!hasResultsInDataArray0) {
        sanresultsContainer.innerHTML = `<h2 style="text-align: center; color: red; background-color: white; border: black solid 1px;">No Results For Term ${toHeadTerm}.</h2>`;
    };

    // Check if there are any results for dataArray[1]
    const hasResultsInDataArray1 = enResults.length > 0;

    // If no results in dataArray[1], display the "No Results" message for English container
    if (!hasResultsInDataArray1) {
        enresultsContainer.innerHTML = `<h2 style="text-align: center; color: red; background-color: white; border: black solid 1px;">No Results For Term ${toHeadTerm}.</h2>`;
    };

    // Check if results array is empty
    if (results.length === 0) {
        // Hide the element with ID "sancontainer"
        sanresultsContainer.style.display = "none";
        enresultsContainer.style.display = "none";
        sansearchhead.style.display = "none";
        engsearchhead.style.display = "none";
        santaliFlags.style.display = "none";
        englishFlags.style.display = "none";
        otherResults.style.display = "block";
        otherResults.innerHTML = `<h2 style ="color: red; background-color: white; border: black solid 1px;">No Results Found!</h2>`;
    } else {

        // Show the element with ID "sanresultsContainer"
        sanresultsContainer.style.display = "block";
        enresultsContainer.style.display = "block";
        sansearchhead.style.display = "block";
        engsearchhead.style.display = "block";
        santaliFlags.style.display = "flex";
        englishFlags.style.display = "flex";
        sansearchhead.innerHTML = "Santali";
        engsearchhead.innerHTML = "English";
        otherResults.innerHTML = "";
    }
}

function displayLimitedResults(results, container, type, displayLimit) {

    if (type == 'san') {

        let endSan = displayLimit + 5;
        let currentSanSet = results.slice(displayLimit, endSan);

        currentSanSet.forEach(result => {

            // Result is from dataArray[0]
            sanresultsContainer.innerHTML += `
                    <div class="worddiv">
                    <div class="photolink">
                    <a href="/santali.html?id=${result.id}"><img src="${result.image}" class="terimg"></a>
                    </div>
                    <div class="inresdiv">
                        <div style="display: flex; align-items: center;">
                        <div style="flex: 1; margin-right: 0px;">
                        <img src="/assets/other/poojakalaash.png" class="pujakalas">
                        </div>
                        <h3 class="sanht"><a href="/santali.html?id=${result.id}">${result.term}</a></h3>
                        <div style="flex: 1; margin-left: 0px;">
                        <img src="/assets/other/poojakalaash.png" class="pujakalas">
                        </div>
                        </div>
                        <audio src="${result.audio}" controls><p>This device does not support our audio format.</p></audio>
                        <br>
                        <br>
                        <p class="meaning">${result.meaning}</p>
                        <p class="example">${result.example}</p>
                     </div>
                    </div>
                    <div style="text-align: center" class="flowers">🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷</div>`;

        });

        // Add a Load More button if there are more results to display
        let loadMoreSanBtn = document.getElementById("loadMoreSanBtn");

        // Remove the existing button if it exists
        if (loadMoreSanBtn) {
            loadMoreSanBtn.parentNode.removeChild(loadMoreSanBtn);
        }

        if (results.length > endSan) {
            loadMoreSanBtn = document.createElement('button');
            loadMoreSanBtn.id = "loadMoreSanBtn";
            loadMoreSanBtn.textContent = 'Load More';
            loadMoreSanBtn.onclick = function () {

                displayLimit += 5;
                displayLimitedResults(results, container, type, displayLimit); // Re-call displayResults or adjust as necessary

            };
            container.appendChild(loadMoreSanBtn);
        }

    }

    if (type == 'en') {

        let endEng = displayLimit + 5;
        let currentEnSet = results.slice(displayLimit, endEng);

        currentEnSet.forEach(result => {

            enresultsContainer.innerHTML += `
                    <div class="worddiv">
                    <div class="photolink">
                    <a href="/english.html?id=${result.id}"><img src="${result.image}" class="terimg"></a>
                    </div>
                    <div class="inresdiv">
                        <div style="display: flex; align-items: center;">
                              <div style="flex: 1; margin-right: 0px;">
                             <img src="/assets/other/poojakalaash.png" class="pujakalas">
                             </div>
                            <h3 class="enght"><a href="/english.html?id=${result.id}">${result.term}</a></h3>
                             <div style="flex: 1; margin-left: 0px;">
                             <img src="/assets/other/poojakalaash.png" class="pujakalas"> 
                             </div>
                         </div>
                        <audio src="${result.audio}" controls><p>This device does not support our audio format.</p></audio>
                        <br>
                        <br>
                        <p class="meaning">${result.meaning}</p>
                        <p class="example">${result.example}</p>
                        </div>
                        </div>
                    <div style="text-align: center" class="flowers">🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺</div>`;

        });


        // Add a Load More button if there are more results to display
        let loadMoreEngBtn = document.getElementById("loadMoreEngBtn");

        // Remove the existing button if it exists
        if (loadMoreEngBtn) {
            loadMoreEngBtn.parentNode.removeChild(loadMoreEngBtn);
        }

        if (results.length > endEng) {
            loadMoreEngBtn = document.createElement('button');
            loadMoreEngBtn.id = "loadMoreEngBtn";
            loadMoreEngBtn.textContent = 'Load More';
            loadMoreEngBtn.onclick = function () {

                displayLimit += 5;
                displayLimitedResults(results, container, type, displayLimit); // Adjust accordingly

            };
            container.appendChild(loadMoreEngBtn);
        }


    }

}

// Index page Search form submission
function submitForm() {
    // Access form data using document.forms
    var formData = new FormData(document.forms[0]);

    // Create a URLSearchParams object and append form data
    var urlParams = new URLSearchParams();
    formData.forEach(function (value, key) {
        urlParams.append(key, value);
    });

    // Redirect to target_page.html with form data in URL parameters
    window.location.href = "search.html?" + urlParams.toString();

    // Prevent the form from submitting in the default way
    return false;
}

//Fetch Indexed Data
function fetchBothIndex(BothIndex) {
    searchHeadElement.innerHTML = BothIndex;
    sansearchhead.style.display = "block";
    engsearchhead.style.display = "block";
    santaliFlags.style.display = "flex";
    englishFlags.style.display = "flex";

    // Remove 'selected' class from all td elements
    let allTdElements = document.querySelectorAll("td");
    allTdElements.forEach((td) => {
        td.classList.remove("selected");
    });

    // Add 'selected' class to the clicked td element, if it exists
    let clickedTd = document.querySelector(`td[data-index="${BothIndex}"]`);
    clickedTd.classList.add("selected");
    fetchSanSrchIndexData(BothIndex);
    fetchEngSrchIndexData(BothIndex);

};


//Glossary Function
// Function to fetch and process JSON data
function fetchEngSrchIndexData(index) {
    fetch('english.json')
        .then(response => response.json())
        .then(data => {
            const termindex = index.toLowerCase();
            const termindexhead = index;

            // Filter combined data based on user input
            const filteredData = data.filter(item => item.term.toLowerCase().startsWith(termindex));

            //Change name of search page heading
            if (termindex.length == 0) {
                engsearchhead.innerHTML = "English";
            } else if (termindex.length >= 1) {
                engsearchhead.innerHTML = termindexhead;
            };

            //declare currentMoreGlossaryIndex
            let currentGeIndex = 0;

            // Display the selected term
            displayEngSrchIndexData(filteredData, termindexhead, currentGeIndex);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Function to display JSON data on the HTML page
function displayEngSrchIndexData(terms, idxhead, currentGeIndex) {
    var resultEngIndexHTML = '';

    if (currentGeIndex === 0) {
        enresultsContainer.innerHTML = resultEngIndexHTML;
    }

    let endGlEn = currentGeIndex + 5;
    let currentEngGlSet = terms.slice(currentGeIndex, endGlEn);

    // Create HTML content for each term
    currentEngGlSet.forEach(term => {
        resultEngIndexHTML = `
            <div class="worddiv">
            <div class="photolink">
            <a href="/english.html?id=${term.id}"><img src="${term.image}" class="terimg"></a>
            </div>
            <div class="inresdiv">
                <div style="display: flex; align-items: center;">
                <div style="flex: 1; margin-right: 0px;">
                <img src="/assets/other/poojakalaash.png" class="pujakalas">
                </div>
                <h3 class="enght"><a href="/english.html?id=${term.id}">${term.term}</a></h3>
                <div style="flex: 1; margin-left: 0px;">
                <img src="/assets/other/poojakalaash.png" class="pujakalas"> 
                </div>
            </div>
                <audio src="${term.audio}" controls><p>This device does not support our audio format.</p></audio>
                    <br>
                    <br>
                <p class="meaning">${term.meaning}</p>
                <p class="example">${term.example}</p>
      </div></div>
            <div style="text-align: center" class="flowers">🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺</div>`;

        // Set the accumulated HTML content to the enresultsContainer
        enresultsContainer.innerHTML += resultEngIndexHTML;

    });

    if (terms.length == 0) {
        enresultsContainer.style.display = "block";
        otherResults.style.display = "none";
        enresultsContainer.innerHTML = `<h2 style="text-align: center; color: red; background-color: white; border: black solid 1px;">No Results For Index ${idxhead}.</h2>`;
    } else {
        enresultsContainer.style.display = "block";
        otherResults.style.display = "none";
    }

    currentGeIndex += 5;

    manageLoadMoreEngGeButton(terms, idxhead, currentGeIndex);
}

function manageLoadMoreEngGeButton(terms, idxhead, currentGeIndex) {
    let loadMoreSrchGeBtn = document.getElementById("loadMoreSrchGeBtn");

    // Remove the existing button if it exists
    if (loadMoreSrchGeBtn) {
        loadMoreSrchGeBtn.parentNode.removeChild(loadMoreSrchGeBtn);
    }

    // Check if there are more items to load
    if (currentGeIndex < terms.length) {
        // Create and append the "Load More" button
        loadMoreSrchGeBtn = document.createElement('button');
        loadMoreSrchGeBtn.id = "loadMoreSrchGeBtn";
        loadMoreSrchGeBtn.innerText = "Load More";
        loadMoreSrchGeBtn.onclick = function () {
            displayEngSrchIndexData(terms, idxhead, currentGeIndex);
        };

        enresultsContainer.appendChild(loadMoreSrchGeBtn);
    }
}


//Glossary Function
// Function to fetch and process JSON data
function fetchSanSrchIndexData(index) {
    fetch('santali.json')
        .then(response => response.json())
        .then(data => {
            const sntermindex = index.toLowerCase();
            const sntermindexhead = index;

            // Filter combined data based on user input
            const snfilteredData = data.filter(item => item.term.toLowerCase().startsWith(sntermindex));

            //Change name of search page heading
            if (sntermindex.length == 0) {
                sansearchhead.innerHTML = "Santali";
            } else if (sntermindex.length >= 1) {
                sansearchhead.innerHTML = sntermindexhead;
            }


            //declare currentMoreGlossaryIndex
            let currentGsIndex = 0;

            // Display the selected term
            displaySanSrchIndexData(snfilteredData, sntermindexhead, currentGsIndex);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Function to display JSON data on the HTML page
function displaySanSrchIndexData(terms, snidxhead, currentGsIndex) {
    var resultSanIndexHTML = '';

    if (currentGsIndex === 0) {
        sanresultsContainer.innerHTML = resultSanIndexHTML;
    }

    let endSnGl = currentGsIndex + 5;
    let currentSnSet = terms.slice(currentGsIndex, endSnGl);


    // Create HTML content for each term
    currentSnSet.forEach(term => {
        resultSanIndexHTML = `
            <div class="worddiv">
            <div class="photolink">
            <a href="/santali.html?id=${term.id}"><img src="${term.image}" class="terimg"></a>
            </div>
            <div class="inresdiv">
                <div style="display: flex; align-items: center;">
                <div style="flex: 1; margin-right: 0px;">
                <img src="/assets/other/poojakalaash.png" class="pujakalas">
               </div>
                <h3 class="sanht"><a href="/santali.html?id=${term.id}">${term.term}</a></h3>
                <div style="flex: 1; margin-left: 0px;">
                <img src="/assets/other/poojakalaash.png" class="pujakalas">
                </div>
            </div>
                <audio src="${term.audio}" controls><p>This device does not support our audio format.</p></audio>
                <br>
                <br>
                <p class="meaning">${term.meaning}</p>
                <p class="example">${term.example}</p>
      </div>
      </div>
            <div style="text-align: center" class="flowers">🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷</div>`;
        // Set the accumulated HTML content to the sanresultsContainer
        sanresultsContainer.innerHTML += resultSanIndexHTML;
    });
    if (terms.length === 0) {
        sanresultsContainer.style.display = "block";
        otherResults.style.display = "none";
        sanresultsContainer.innerHTML = `<h2 style="text-align: center; color: red; background-color: white; border: black solid 1px;">No Results For Index ${snidxhead}.</h2>`;
    } else {
        sanresultsContainer.style.display = "block";
        otherResults.style.display = "none";
    }

    currentGsIndex += 5;

    manageLoadMoreSanGsButton(terms, snidxhead, currentGsIndex);
}

function manageLoadMoreSanGsButton(terms, snidxhead, currentGsIndex) {
    let loadMoreSrchGsBtn = document.getElementById("loadMoreSrchGsBtn");

    // Remove the existing button if it exists
    if (loadMoreSrchGsBtn) {
        loadMoreSrchGsBtn.parentNode.removeChild(loadMoreSrchGsBtn);
    }

    // Check if there are more items to load
    if (currentGsIndex < terms.length) {
        // Create and append the "Load More" button
        loadMoreSrchGsBtn = document.createElement('button');
        loadMoreSrchGsBtn.id = "loadMoreSrchGsBtn";
        loadMoreSrchGsBtn.innerText = "Load More";
        loadMoreSrchGsBtn.onclick = function () {
            displaySanSrchIndexData(terms, snidxhead, currentGsIndex);
        };

        sanresultsContainer.appendChild(loadMoreSrchGsBtn);
    }
}

// Fetch and display All
function fetchAllSearchData() {
    // Remove 'selected' class from all td elements
    let allTdElements = document.querySelectorAll("td");
    allTdElements.forEach((td) => {
        td.classList.remove("selected");
    });

    // Add 'selected' class to the clicked td element, if it exists
    let clickedTd = document.querySelector(`td[data-index=""]`);
    clickedTd.classList.add("selected");

    // Fetch data from data1.json and data2.json simultaneously
    Promise.all([fetch(dataUrl1), fetch(dataUrl2)])
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(dataArray => {
            // Combine data from both sources
            const combinedData = [...dataArray[0], ...dataArray[1]];

            // Display results
            displayAllResults(combinedData, dataArray);
            //Change name of search page heading
            searchHeadElement.innerHTML = "All";
            otherResults.style.display = "none";
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayAllResults(allresults, dataAllArray) {
    // Show the element with ID "sancontainer"
    sanresultsContainer.style.display = "block";
    enresultsContainer.style.display = "block";
    sansearchhead.style.display = "block";
    engsearchhead.style.display = "block";
    santaliFlags.style.display = "flex";
    englishFlags.style.display = "flex";
    sansearchhead.innerHTML = "Santali";
    engsearchhead.innerHTML = "English";
    otherResults.style.display = "none";

    let sanAllDisplayLimit = 0; // Initial display limit for Santali results
    let enAllDisplayLimit = 0; // Initial display limit for English results

    // Clear previous results
    sanresultsContainer.innerHTML = '';
    enresultsContainer.innerHTML = '';

    // Display limited results initially and a Load More button
    const sanAllResults = allresults.filter(result => dataAllArray[0].includes(result));
    const enAllResults = allresults.filter(result => dataAllArray[1].includes(result));

    if (sanAllResults.length >= 1) {
        displayLimitedAllResults(sanAllResults, sanresultsContainer, 'san', sanAllDisplayLimit);
    } else if (dataAllArray[0].length == 0) {
        // Display an error message or handle the situation accordingly
        sanresultsContainer.innerHTML = `<h2 style="text-align: center; color: red; background-color: white; border: black solid 1px;">No Results.</h2>`;
    }

    if (enAllResults.length >= 1) {
        displayLimitedAllResults(enAllResults, enresultsContainer, 'en', enAllDisplayLimit);
    } else if (dataAllArray[1].length == 0) {
        // Display an error message or handle the situation accordingly
        enresultsContainer.innerHTML = `<h2 style="text-align: center; color: red; background-color: white; border: black solid 1px;">No Results.</h2>`;
    };

    // Check if results array is empty
    if (allresults.length === 0) {
        // Hide the element with ID "sancontainer"
        sanresultsContainer.style.display = "none";
        enresultsContainer.style.display = "none";
        sansearchhead.style.display = "none";
        engsearchhead.style.display = "none";
        santaliFlags.style.display = "none";
        englishFlags.style.display = "none";
        otherResults.style.display = "block";
        otherResults.innerHTML = `<h2 style ="color: red; background-color: white; border: black solid 1px;">No Results Found!</h2>`;
    }

}

function displayLimitedAllResults(results, container, type, displayAllLimit) {

    if (type == 'san') {

        let endAllSan = displayAllLimit + 5;
        let currentAllSanSet = results.slice(displayAllLimit, endAllSan);

        currentAllSanSet.forEach(result => {

            // Result is from dataArray[0]
            sanresultsContainer.innerHTML += `
             <div class="worddiv">
             <div class="photolink">
             <a href="/santali.html?id=${result.id}"><img src="${result.image}" class="terimg"></a>
             </div>
             <div class="inresdiv">
                 <div style="display: flex; align-items: center;">
                 <div style="flex: 1; margin-right: 0px;">
                 <img src="/assets/other/poojakalaash.png" class="pujakalas">
                 </div>
                 <h3 class="sanht"><a href="/santali.html?id=${result.id}">${result.term}</a></h3>
                 <div style="flex: 1; margin-left: 0px;">
                 <img src="/assets/other/poojakalaash.png" class="pujakalas">
                 </div>
             </div>
             <audio src="${result.audio}" controls><p>This device does not support our audio format.</p></audio>
                 <br>
                 <br>
                 <p class="meaning">${result.meaning}</p>
                 <p class="example">${result.example}</p>
       </div>
       </div>
             <div style="text-align: center" class="flowers">🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷</div>`;

        });

        // Add a Load More button if there are more results to display
        let loadMoreAllSanBtn = document.getElementById("loadMoreAllSanBtn");

        // Remove the existing button if it exists
        if (loadMoreAllSanBtn) {
            loadMoreAllSanBtn.parentNode.removeChild(loadMoreAllSanBtn);
        }

        if (results.length > endAllSan) {
            loadMoreAllSanBtn = document.createElement('button');
            loadMoreAllSanBtn.id = "loadMoreAllSanBtn";
            loadMoreAllSanBtn.textContent = 'Load More';
            loadMoreAllSanBtn.onclick = function () {

                displayAllLimit += 5;
                displayLimitedAllResults(results, container, type, displayAllLimit); // Re-call displayResults or adjust as necessary

            };
            container.appendChild(loadMoreAllSanBtn);
        }

    }

    if (type == 'en') {

        let endAllEng = displayAllLimit + 5;
        let currentAllEnSet = results.slice(displayAllLimit, endAllEng);

        currentAllEnSet.forEach(result => {

            // Result is from dataArray[1]
            enresultsContainer.innerHTML += `
           <div class="worddiv">
           <div class="photolink">
           <a href="/english.html?id=${result.id}"><img src="${result.image}" class="terimg"></a>
           </div>
           <div class="inresdiv">
               <div style="display: flex; align-items: center;">
               <div style="flex: 1; margin-right: 0px;">
               <img src="/assets/other/poojakalaash.png" class="pujakalas">
               </div>
               <h3 class="enght"><a href="/english.html?id=${result.id}">${result.term}</a></h3>
               <div style="flex: 1; margin-left: 0px;">
               <img src="/assets/other/poojakalaash.png" class="pujakalas"> 
               </div>
           </div>
               <audio src="${result.audio}" controls><p>This device does not support our audio format.</p></audio>
               <br>
               <br>
               <p class="meaning">${result.meaning}</p>
               <p class="example">${result.example}</p>
     </div>
     </div>
           <div style="text-align: center" class="flowers">🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺</div>`;

        });


        // Add a Load More button if there are more results to display
        let loadMoreAllEnBtn = document.getElementById("loadMoreAllEnBtn");

        // Remove the existing button if it exists
        if (loadMoreAllEnBtn) {
            loadMoreAllEnBtn.parentNode.removeChild(loadMoreAllEnBtn);
        }

        if (results.length > endAllEng) {
            loadMoreAllEnBtn = document.createElement('button');
            loadMoreAllEnBtn.id = "loadMoreAllEnBtn";
            loadMoreAllEnBtn.textContent = 'Load More';
            loadMoreAllEnBtn.onclick = function () {

                displayAllLimit += 5;
                displayLimitedAllResults(results, container, type, displayAllLimit); // Adjust accordingly

            };
            container.appendChild(loadMoreAllEnBtn);
        }


    }

}