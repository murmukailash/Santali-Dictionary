// Global variables to track data and current slice
let currentEnIndex = 0;
const itemsPerEnPage = 5;

let englishDataElement = document.getElementById("english");
let englishHeadElement = document.getElementById("enghead");

// Function to fetch and process JSON data
        function fetchEnglishData() {
            fetch('english.json')
                .then(response => response.json())
                .then(endata => {

             // Get the ID from the URL
              const urlParams = new URLSearchParams(window.location.search);
              const termId = Number(urlParams.get('id'));
              const termIdS = urlParams.get('id');

              // Find the term with the matching ID
              const selectedTerm = endata.find(term => term.id === termId);
  
    // Call the fetchData function when the page loads
        if (termId == 0) {
           // Process the retrieved JSON data
                    displayEnglishData(endata);
        }else{
              // Display the selected term
              displaysinEngData(selectedTerm, termIdS);
        }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
      
        function manageLoadMoreEnBtn(endata) {
            let loadMoreEnBtn = document.getElementById("loadMoreEnBtn");
        
            // Remove the existing button if it exists
            if (loadMoreEnBtn) {
                loadMoreEnBtn.parentNode.removeChild(loadMoreEnBtn);
            }
        
            // Check if there are more items to load
            if (currentEnIndex < endata.length) {
                // Create and append the "Load More" button
                loadMoreEnBtn = document.createElement('button');
                loadMoreEnBtn.id = "loadMoreEnBtn";
                loadMoreEnBtn.innerText = "Load More";
                loadMoreEnBtn.onclick = function() {
                    displayEnglishData(endata);
                };
        
                englishDataElement.appendChild(loadMoreEnBtn);
            }
        }
        

// Function to display JSON data on the HTML page
       function displayEnglishData(endata) {            

          if (currentEnIndex === 0) {
             //Clear Previous Results
             englishDataElement.innerHTML= '';

             // Remove 'selected' class from all td elements
    let allTdElements = document.querySelectorAll("td");
    allTdElements.forEach((td) => {
        td.classList.remove("selected");
    });

    // Add 'selected' class to the clicked td element, if it exists
    let clickedTd = document.querySelector(`td[data-index=""]`);
        clickedTd.classList.add("selected");
        }

        englishHeadElement.innerHTML= "English";

        let endEng = currentEnIndex + itemsPerEnPage;
        let currentEnSet = endata.slice(currentEnIndex, endEng);
        
            // Iterate through each object in the array
            currentEnSet.forEach(enterm => {
                // Create HTML content for each user
                var englishHTML = `
                    <div class="worddiv">
                    <div class="photolink">
                    <a href="/english.html?id=${enterm.id}"><img src="${enterm.image}" class="terimg"></a>
                    </div>
                    <div class="inresdiv">
                     <div style="display: flex; align-items: center;">
                     <div style="flex: 1; margin-right: 0px;">
                     <div>
                     <img src="/assets/other/poojakalaash.png" class="pujakalas">
                     </div></div>
                     <h3 class="enght"><a href="/english.html?id=${enterm.id}">${enterm.term}</a></h3>
                     <div style="flex: 1; margin-left: 0px;">
                     <div>
                     <img src="/assets/other/poojakalaash.png" class="pujakalas">
                     </div>  
                     </div>
                 </div>
                  <audio src="${enterm.audio}" controls><p>This device does not support our audio format.</p></audio>
                  <br>
                  <br>
                        <p class="meaning">${enterm.meaning}</p>
                        <p class="example">${enterm.example}</p>
              </div>
              </div>             
<div style="text-align: center" class="flowers">🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺</div>`;
                // Append the HTML content to the userDataElement
                englishDataElement.innerHTML += englishHTML;
            });

            currentEnIndex += itemsPerEnPage;

            // Add or update the "Load More" button
            manageLoadMoreEnBtn(endata);

        }

  // Function to display JSON data on the HTML page
  function displaysinEngData(term, iden) {
  
      // Check if the term is defined
      if (term) {
          // Create HTML content for the selected term
          var englishHTML = `
              <div style="text-align: center; margin: 20px;">
              <video src="${term.video}" poster="${term.image}" width="100%" height="300" none controls ><p>Your browser does not support the video file format.</p></video>
                  <div style="display: flex; align-items: center;">
                  <div style="flex: 1; margin-right: 0px;">
                  <div>
                  <img src="/assets/other/poojakalaash.png" class="sinpujakalas">
                  </div></div>
                  <h3 class="enght">${term.term}</h3>
                  <div style="flex: 1; margin-left: 0px;">
                  <div>
                  <img src="/assets/other/poojakalaash.png" class="sinpujakalas">
                  </div>  
                  </div>
              </div>
                  <audio src="${term.audio}" controls><p>This device does not support our audio format.</p></audio>
                  <br>
                  <br>
                  <p class="meaning">${term.meaning}</p>
                  <p class="example">${term.example}</p>
        </div>
              <div style="text-align: center" class="flowers">🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺</div>`;
  
          // Set the HTML content to the userDataElement
          englishDataElement.innerHTML = englishHTML;
          englishHeadElement.innerHTML = `${term.term}`;
      } else {
          // Display an error message or handle the situation accordingly
          englishDataElement.innerHTML = `<h2 style="text-align: center; color: red; background-color: white; border: black solid 1px;">No Results For Term/Id ${iden}.</h2>`;
      }
  }

//Glossary Function
// Function to fetch and process JSON data
  function fetchIndexData(index) {
      fetch('english.json')
          .then(response => response.json())
          .then(data => {
              const termindex = index.toLowerCase();
              const termindexhead = index;

            // Filter combined data based on user input
            const filteredData = data.filter(item => item.term.toLowerCase().startsWith(termindex));

                 //Change name of search page heading
          if (termindex.length == 0){
        englishHeadElement.innerHTML = "English";
    } else if (termindex.length >= 1) {
        englishHeadElement.innerHTML = termindexhead;  
        };

         //declare currentMoreGlossaryIndex
         let currentGeIndex = 0;

              // Display the selected term
              displayEngIndexData(filteredData, termindexhead, currentGeIndex);

        //set currentEnIndex to initial
         currentEnIndex = 0;
          })
          .catch(error => {
              console.error('Error fetching data:', error);
          });
  }
  
// Function to display JSON data on the HTML page
function displayEngIndexData(terms, idxhead, currentGeIndex) {
    var resultEngIndexHTML = '';
    
    if (currentGeIndex === 0) {
        englishDataElement.innerHTML = resultEngIndexHTML;

              // Remove 'selected' class from all td elements
    let allTdElements = document.querySelectorAll("td");
    allTdElements.forEach((td) => {
        td.classList.remove("selected");
    });

    // Add 'selected' class to the clicked td element, if it exists
    let clickedTd = document.querySelector(`td[data-index="${idxhead}"]`);
        clickedTd.classList.add("selected");
}

        let endEn = currentGeIndex + itemsPerEnPage;
        let currentEngSet = terms.slice(currentGeIndex, endEn);

    // Create HTML content for each term
    currentEngSet.forEach(term => {
        resultEngIndexHTML = `
            <div class="worddiv">
            <div class="photolink">
            <a href="/english.html?id=${term.id}"><img src="${term.image}" class="terimg"></a>
            </div>
            <div class="inresdiv">
                <div style="display: flex; align-items: center;">
                <div style="flex: 1; margin-right: 0px;">
                <div>
                <img src="/assets/other/poojakalaash.png" class="pujakalas">
                </div></div>
                <h3 class="enght"><a href="/english.html?id=${term.id}">${term.term}</a></h3>
                <div style="flex: 1; margin-left: 0px;">
                <div>
                <img src="/assets/other/poojakalaash.png" class="pujakalas">
                </div>  
                </div>
            </div>
                <audio src="${term.audio}" controls><p>This device does not support our audio format.</p></audio>
                <br>
                <br>
                <p class="meaning">${term.meaning}</p>
                <p class="example">${term.example}</p>
      </div>
      </div>
<div style="text-align: center" class="flowers">🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺</div>`;
    
  // Set the accumulated HTML content to the englishDataElement
  englishDataElement.innerHTML += resultEngIndexHTML;

});

    if (terms.length == 0) {
    englishDataElement.innerHTML = `<h2 style="text-align: center; color: red; background-color: white; border: black solid 1px;">No Results For Index ${idxhead}.</h2>`;
}

currentGeIndex += itemsPerEnPage;

manageLoadMoreGeButton(terms, idxhead, currentGeIndex)
}

function manageLoadMoreGeButton(terms, idxhead, currentGeIndex) {
    let loadMoreGeBtn = document.getElementById("loadMoreGeBtn");

    // Remove the existing button if it exists
    if (loadMoreGeBtn) {
        loadMoreGeBtn.parentNode.removeChild(loadMoreGeBtn);
    }

    // Check if there are more items to load
    if (currentGeIndex < terms.length) {
        // Create and append the "Load More" button
        loadMoreGeBtn = document.createElement('button');
        loadMoreGeBtn.id = "loadMoreGeBtn";
        loadMoreGeBtn.innerText = "Load More";
        loadMoreGeBtn.onclick = function() {
            displayEngIndexData(terms, idxhead, currentGeIndex);
        };

        englishDataElement.appendChild(loadMoreGeBtn);
    }
}
