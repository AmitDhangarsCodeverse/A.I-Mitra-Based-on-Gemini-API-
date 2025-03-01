/*All queries*/
// Querying the elements from the DOM
const slideBtn = document.querySelector(".fa-bars"); // Hamburger menu button
const promptsendBtn = document.querySelector(".sendBtn"); // Send button for prompt
const chatsec = document.querySelector(".chat-section"); // Chat section container
const intsec = document.querySelector(".interacton-section"); // Interaction section (missing from HTML, possibly a typo)
const utsec = document.querySelector(".utimate-wrapper"); // Wrapper for the main content (probably meant to be 'ultimate')
const randomQuery = document.querySelectorAll(".card a"); // All links inside the cards for random queries
const dashBoard = document.querySelector(".dashboard"); // Dashboard section
const promptinput = document.querySelector(".prompt-container"); // Container for the prompt input field
const slideBackBtn = document.querySelector(".arrow-btn"); // Arrow button to slide back
const recentsection = document.querySelector(".recentchats"); // Recent chats section
const newchatbtn = document.querySelector(".newchat"); // New chat button
const chatList = document.querySelector(".chat-list"); // List of chat messages
const deleteBtn = document.querySelector(".delete-icon"); // Delete button (not used in the script)
const inputForm = document.querySelector(".getPrompt"); // The input field for prompt

/*Functions*/
/***********************************************************************************************************/
// Function to slide in the chat section when the menu is opened
const BarSlider = () => {
  // Debugging statement to check function call
  chatsec.style.marginLeft = "-290px"; // Slide chat section left
  utsec.style.gap = "5rem";
  slideBackBtn.style.display = "flex";
};

// Function to slide back the chat section when the arrow button is clicked
const ArrowSlider = () => {
  chatsec.style.marginLeft="0px";
  slideBackBtn.style.display="none";
  utsec.style.gap = "0rem";
};

// Function to create and append a new chat element in the "recent chats" section
const RecentChatsElement = () => {
  let recentChat = document.createElement("div");
  recentChat.classList.add(".chat");
  recentChat.innerHTML = '<div class="chat"><i class="fa-regular fa-message"></i><p class="searchquery"></p> <i class="fa-solid fa-trash delete-icon"></i></div>';
  recentsection.appendChild(recentChat); // Add recent chat to the section
  recentsection.scrollTo(0, recentsection.scrollHeight); // Auto scroll to the bottom of the section
  
  // If promptUser text is longer than 30 characters, truncate it and add '...'
  if (promptUser.length > 30) {
    recentChat.querySelector("p").innerText = promptUser.slice(0, 27) + "..";
  } else {
    recentChat.querySelector("p").innerText = promptUser;
  }
};

// Function to reset the prompt input field for a new chat
const NewChat = () => {
  promptinput.querySelector(".getPrompt").value = ""; // Clear the input field
};

// Function to create an outgoing message element with the provided content and class
const OutgoingMessage = (content, LastClassName) => {
  let UserElement = document.createElement("div");
  UserElement.classList.add("message", LastClassName); // Add the outgoing class to the message
  UserElement.innerHTML = content;
  return UserElement; // Return the created element
};

// Variables to hold the API response text and copy button
let apiresponseTxt = null;
let copyBtn = null;

// Function to create the incoming message element and animate the loading state
const incomingMessageAnimation = () => {
  let bot = document.createElement("div");
  bot.className = "message-upcoming";
  bot.innerHTML = '<div class="message-content"><img src="Pages files/logo bot.webp" alt=""><p class="api-response-text"></p><i class="fa-regular copy"></i><div class="loading-indicator"><div class="loading-bar"></div><div class="loading-bar"></div><div class="loading-bar"></div></div></div>';
  chatList.appendChild(bot); // Append the bot message to the chat list
  apiresponseTxt = bot.querySelector(".api-response-text"); // Get the API response text element
  copyBtn = bot.querySelector(".fa-regular.copy"); // Get the copy button
  chatList.scrollTo(0, chatList.scrollHeight); // Auto scroll to the bottom of the chat list
};

// Event listener for each random query link, setting the prompt input value
randomQuery.forEach(suggest => {
  suggest.addEventListener('click', () => {
    inputForm.value = suggest.innerText; // Set the input field to the clicked suggestion
  });
});

// API details for content generation
const API_KEY = "AIzaSyB7SPNWcSI_NS-v3aU_VLMUFlCzcnkD1Sg";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

// Function to handle API response and display it in the chat
const APIresponse = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [{ text: promptUser }] // Pass the user's prompt to the API
        }]
      })
    });

    const data = await response.json();
    const responseText = data?.candidates[0].content.parts[0].text; // Get the API response text
    apiresponseTxt.innerText = responseText; // Set the response text
    CopyingResponse(responseText); // Handle copying functionality
  } catch (error) {
    console.log(error); // Log errors if any
  } finally {
    // Remove the loading animation and reset the copy button
    chatList.querySelector(".loading-indicator").remove();
    chatList.querySelector(".copy").classList.toggle("fa-copy");
  }
};

// Function to handle the response text copy action
const CopyingResponse = (copiedText) => {
  // This function can be extended to implement copying the text to clipboard
};

/************************************************************************************/
// Variable to store the prompt entered by the user
let promptUser = null;

// Function to fetch the prompt entered by the user and trigger the chat response
const getPrompt = () => {
  promptUser = promptinput.querySelector(".getPrompt").value.trim(); // Get and trim the user's input
  if (!promptUser) return; // If the prompt is empty, do nothing
  
  // Clear the input field
  promptinput.querySelector(".getPrompt").value = "";

  // HTML structure for the outgoing message
  const html = '<div class="message-container"><i class="fa-regular fa-circle-user"></i><p class="outgoing-text">Lorem ipsum</p><div>';
  const OutgoingMessageByUser = OutgoingMessage(html, "outgoing"); // Create the outgoing message
  
  if (OutgoingMessageByUser) {
    dashBoard.remove(); // Remove the dashboard section
    chatList.style.height = "485px"; // Adjust the height of the chat list
  }

  // Set the outgoing text to the user's prompt
  OutgoingMessageByUser.querySelector(".outgoing-text").innerText = promptUser;
  chatList.appendChild(OutgoingMessageByUser); // Append the outgoing message to the chat list
  chatList.scrollTo(0, chatList.scrollHeight); // Auto scroll to the bottom

  setTimeout(incomingMessageAnimation, 75); // Trigger the bot's incoming message animation after 75ms
  APIresponse(promptUser); // Call the API to get the bot's response
  RecentChatsElement(); // Add the chat to the recent chats list
};

/*Event handlers*/
// Event listeners for the actions
slideBtn.addEventListener('click', BarSlider); // Slide in the chat section when the menu is clicked
slideBackBtn.addEventListener('click', ArrowSlider); // Slide back when the arrow button is clicked
promptsendBtn.addEventListener('click', getPrompt); // Handle sending the prompt
newchatbtn.addEventListener('click', NewChat); // Reset the prompt input for a new chat
copyBtn.addEventListener('click', CopyingResponse); // Handle copying the API response text
