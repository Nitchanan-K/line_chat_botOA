// JavaScript for adding new cards
const form = document.querySelector("form");
const cardContainer = document.getElementById("card-container");
export let text_from_html;

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission

  // Get form data
  const activity = document.getElementById("activity").value;
  const duration = document.getElementById("duration").value;
  const date = document.getElementById("date").value;
  const note = document.getElementById("note").value;

  // Create card HTML
  const cardHtml = `
    <div class="card">
      <h3>${activity}</h3>
      <p>Duration: ${duration} minutes</p>
      <p>Date: ${date}</p>
      <p>Note: ${note}</p>
    </div>
  `;

  // Add card to container
  cardContainer.innerHTML += cardHtml;
 
  // Clear form inputs
  form.reset();
  let text = document.getElementsByClassName("card")
  console.log(text[0].textContent)
  text_from_html = text[0].textContent
  console.log(text_from_html)
  return text_from_html
});


