
// first we  take take element by there id 

const quoteElement = document.getElementById('Quote-Add');
const authorElement = document.getElementById('author');
const changeButton = document.getElementById('change-quote');

// now i make async function which will help me to fetch data we can use axios also but i used fetch 

async function fetchData() {
// instead of .then i used try function 

               try {
        const response = await fetch('https://api.freeapi.app/api/v1/public/quotes/quote/random');
        const data = await response.json();
        
        console.log(data); // Log the response structure

        if (data.success && data.data) { // Ensure data exists
            quoteElement.textContent = `Quote: "${data.data.content}"`;
            authorElement.textContent = `Author: ${data.data.author}`;
        } else {
            quoteElement.textContent = "No quote found.";
            authorElement.textContent = "";
        }
    } catch (error) {
        console.error('Error fetching quote:', error);
        quoteElement.textContent = "Failed to fetch a quote.";
        authorElement.textContent = "";
    }
}

// this is eventlistener 
changeButton.addEventListener('click', fetchData);

// Fetch a quote when the page loads
fetchData();