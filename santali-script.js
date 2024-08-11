// Global variables to track data and current slice
let currentIndex = 0;
const itemsPerPage = 5;


let santaliDataElement = document.getElementById("santali");
let santaliHeadElement = document.getElementById("sanhead");


// Function to fetch and process JSON data
        function fetchSantaliData() {
            fetch('santali.json')
                .then(response => response.json())
                .then(sndata => {
                                // Get the ID from the URL
              const urlParams = new URLSearchParams(window.location.search);
              const termId = Number(urlParams.get('id'));
              const termIdSn = urlParams.get('id');
              
              // Find the term with the matching ID
              const selectedTerm = sndata.find(term => term.id === termId);
  
    // Call the fetchData function when the page loads
        if (termId == 0) {
           // Process the retrieved JSON data
                    displaySantaliData(sndata);
        }else{
              // Display the selected term
              displaysinSanData(selectedTerm, termIdSn);
        }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }

function manageLoadMoreButton(sndata) {
    let loadMoreBtn = document.getElementById("loadMoreBtn");

    // Remove the existing button if it exists
    if (loadMoreBtn) {
        loadMoreBtn.parentNode.removeChild(loadMoreBtn);
    }

    // Check if there are more items to load
    if (currentIndex < sndata.length) {
        // Create and append the "Load More" button
        loadMoreBtn = document.createElement('button');
        loadMoreBtn.id = "loadMoreBtn";
        loadMoreBtn.innerText = "Load More";
        loadMoreBtn.onclick = function() {
            displaySantaliData(sndata);
        };

        santaliDataElement.appendChild(loadMoreBtn);
    }
}

// Function to display JSON data on the HTML page
       function displaySantaliData(sndata) {

    if (currentIndex === 0) {
        santaliDataElement.innerHTML = '';

        
                  // Remove 'selected' class from all td elements
    let allTdElements = document.querySelectorAll("td");
    allTdElements.forEach((td) => {
        td.classList.remove("selected");
    });

    // Add 'selected' class to the clicked td element, if it exists
    let clickedTd = document.querySelector(`td[data-index=""]`);
        clickedTd.classList.add("selected");

    }
    
        santaliHeadElement.innerHTML= "Santali";

        let end = currentIndex + itemsPerPage;
    let currentSet = sndata.slice(currentIndex, end);

        
            // Iterate through each object in the array
              currentSet.forEach(snterm => {
                // Create HTML content for each user
                var santaliHTML = `
                    <div class="worddiv">
                    <div class="photolink">
                    <a href="/santali.html?id=${snterm.id}"><img src="${snterm.image}" class="terimg"></a>
                    </div>
                    <div class="inresdiv">
    <div style="display: flex; align-items: center;">
    <div style="flex: 1; margin-right: 0px;">
    <div>
    <img src="/assets/other/poojakalaash.png" class="pujakalas">
    </div></div>
    <h3 class="sanht"><a href="/santali.html?id=${snterm.id}">${snterm.term}</a></h3>
    <div style="flex: 1; margin-left: 0px;">
    <div>
    <img src="/assets/other/poojakalaash.png" class="pujakalas">
    </div>  
    </div>
</div>
                     <audio src="${snterm.audio}" controls><p>This device does not support our audio format.</p></audio>
                     <br>
                     <br>
                     <p class="meaning">${snterm.meaning}</p>
                        <p class="example">${snterm.example}</p>
                        </div>
                        </div>
<div style="text-align: center" class="flowers">🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷</div>`;
                // Append the HTML content to the userDataElement
                santaliDataElement.innerHTML += santaliHTML;
            });

                currentIndex += itemsPerPage;

    // Add or update the "Load More" button
    manageLoadMoreButton(sndata);

        }

  // Function to display JSON data on the HTML page
  function displaysinSanData(term, idn) {

      // Check if the term is defined
      if (term) {
          // Create HTML content for the selected term
          var santaliHTML = `
          <div style="text-align: center; margin: 20px;">
              <video src="${term.video}" poster="${term.image}" width="100%" height="300" none controls ><p>Your browser does not support the video file format.</p></video>
                  <div style="display: flex; align-items: center;">
                  <div style="flex: 1; margin-right: 0px;">
                  <div>
                  <img src="/assets/other/poojakalaash.png" class="sinpujakalas">
                  </div></div>
                  <h3 class="sanht">${term.term}</h3>
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
              <div style="text-align: center" class="flowers">🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷</div>`;
  
          // Set the HTML content to the userDataElement
          santaliDataElement.innerHTML = santaliHTML;
          santaliHeadElement.innerHTML = `${term.term}`;
      } else {
          // Display an error message or handle the situation accordingly
          santaliDataElement.innerHTML = `<h2 style="text-align: center; color: red; background-color: white; border: black solid 1px;">No Results For Term/Id ${idn}.</h2>`;
      }
  }

//Glossary Function
// Function to fetch and process JSON data
  function fetchSanIndexData(index) {
      fetch('santali.json')
          .then(response => response.json())
          .then(data => {
              const termindex = index.toLowerCase();
              const termindexhead = index;

            // Filter combined data based on user input
            const filteredData = data.filter(item => item.term.toLowerCase().startsWith(termindex));

                 //Change name of search page heading
          if (termindex.length == 0){
            santaliHeadElement.innerHTML = "Santali";
        } else if (termindex.length >= 1) {
            santaliHeadElement.innerHTML = termindexhead;  
        }

        //declare currentMoreGlossaryIndex
        let currentGsIndex = 0;

              // Display the selected term
              displaySanIndexData(filteredData, termindexhead, currentGsIndex);

         //set currentIndex to initial
         currentIndex = 0;

          })
          .catch(error => {
              console.error('Error fetching data:', error);
          });
  }
  

// Function to display JSON data on the HTML page
function displaySanIndexData(terms, idxhead, currentGsIndex) {
    var resultSanIndexHTML = '';

    if (currentGsIndex === 0) {
        santaliDataElement.innerHTML = resultSanIndexHTML;

            // Remove 'selected' class from all td elements
    let allTdElements = document.querySelectorAll("td");
    allTdElements.forEach((td) => {
        td.classList.remove("selected");
    });
    
    // Add 'selected' class to the clicked td element, if it exists
    let clickedTd = document.querySelector(`td[data-index="${idxhead}"]`);
        clickedTd.classList.add("selected");   
    }

        let end = currentGsIndex + itemsPerPage;
    let currentSet = terms.slice(currentGsIndex, end);

    // Create HTML content for each term
    currentSet.forEach(term => {
        resultSanIndexHTML = `
            <div class="worddiv">
            <div class="photolink">
            <a href="/santali.html?id=${term.id}"><img src="${term.image}" class="terimg"></a>
            </div>
                    <div class="inresdiv">
                  <div style="display: flex; align-items: center;">
                  <div style="flex: 1; margin-right: 0px;">
                  <div>
                  <img src="/assets/other/poojakalaash.png" class="pujakalas">
                  </div></div>
                  <h3 class="sanht"><a href="/santali.html?id=${term.id}">${term.term}</a></h3>
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
<div style="text-align: center" class="flowers">🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷🪷</div>`;

 // Set the accumulated HTML content to the englishDataElement
    santaliDataElement.innerHTML += resultSanIndexHTML;
  
});

if (terms.length === 0) {
    santaliDataElement.innerHTML = `<h2 style="text-align: center; color: red; background-color: white; border: black solid 1px;">No Results For Index ${idxhead}.</h2>`;
}

currentGsIndex += itemsPerPage;

manageLoadMoreGButton(terms, idxhead, currentGsIndex)

}

function manageLoadMoreGButton(terms, idxhead, currentGsIndex) {
    let loadMoreGsBtn = document.getElementById("loadMoreGsBtn");

    // Remove the existing button if it exists
    if (loadMoreGsBtn) {
        loadMoreGsBtn.parentNode.removeChild(loadMoreGsBtn);
    }

    // Check if there are more items to load
    if (currentGsIndex < terms.length) {
        // Create and append the "Load More" button
        loadMoreGsBtn = document.createElement('button');
        loadMoreGsBtn.id = "loadMoreGsBtn";
        loadMoreGsBtn.innerText = "Load More";
        loadMoreGsBtn.onclick = function() {
            displaySanIndexData(terms, idxhead, currentGsIndex);
        };

        santaliDataElement.appendChild(loadMoreGsBtn);
    }
}
