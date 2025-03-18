const quoteElement = document.getElementById("Quote-Add");
const authorElement = document.getElementById("author");
const changeButton = document.getElementById("change-quote");
const copyButton = document.getElementById("copy-quote");
const copyMessage = document.getElementById("copy-message");
const twitterShareButton = document.getElementById("twitter-share");

// Fetch and display a new quote
async function fetchData() {
    try {
        const response = await fetch("https://api.freeapi.app/api/v1/public/quotes/quote/random");
        const data = await response.json();

        const quoteText = ` Quote:-  "${data.data.content}"`;
        const authorText = `Author :- ${data.data.author}`;

        quoteElement.textContent = quoteText;
        authorElement.textContent = authorText;

        // Update Twitter share link
        updateTwitterShareLink(quoteText, authorText);
    } catch (error) {
        console.error("Error fetching quote:", error);
        quoteElement.textContent = "Failed to fetch a quote.";
    }
}

// Update Twitter share link dynamically
function updateTwitterShareLink(quote, author) {
    const tweetText = `${quote} ${author}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    twitterShareButton.href = tweetUrl;
}

// Copy the quote to clipboard
copyButton.addEventListener("click", () => {
    const quoteText = `${quoteElement.textContent} ${authorElement.textContent}`;

    // Create a temporary textarea to copy text
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = quoteText;
    document.body.appendChild(tempTextArea);

    // Select and copy the text
    tempTextArea.select();
    document.execCommand("copy");

    // Remove the temporary textarea
    document.body.removeChild(tempTextArea);

    // Show confirmation message
    copyMessage.style.display = "block";
    setTimeout(() => {
        copyMessage.style.display = "none";
    }, 1500);
});

// Fetch a quote when the page loads
fetchData();
changeButton.addEventListener("click", fetchData);
