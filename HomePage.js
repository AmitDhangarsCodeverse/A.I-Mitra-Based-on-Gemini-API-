/*Typing Effect*/
// JavaScript for infinite typing effect
function typeTexts(elementId, texts, speed, delay) {
 let i = 0; // Index to track the current text
 const element = document.querySelector(".msg");

 function type() {
   let text = texts[i];
   let j = 0;

   // Clear the current text before typing the next one
   element.innerHTML = '';

   function typeOneByOne() {
     if (j < text.length) {
       element.innerHTML += text.charAt(j); // Add one character at a time
       j++;
       setTimeout(typeOneByOne, speed); // Call the function recursively with delay
     } else {
       // After finishing typing current text, wait for a moment before typing the next one
       i++;
       if (i === texts.length) {
         i = 0; // Reset index to 0 to start over when the last text finishes
       }
       setTimeout(type, delay); // Delay before starting next text
     }
   }

   typeOneByOne(); // Start typing the current text
 }

 type(); // Start the typing effect
}

// Example usage with multiple texts
const texts = [
 "Welcome to A.I Mitra..","How to Order Food Online:)",
 "How to write an Article.","How to Build Kidney Touching Career.","Tell me a Joke of the Day.","For Your Kind Information I am Created By Amit Dhangar and I am in Beta Version :)"
];
const typingSpeed = 100; // Speed of typing (in milliseconds)
const delayBetweenTexts = 500; // Delay between each text (in milliseconds)
typeTexts('msg', texts, typingSpeed, delayBetweenTexts);


/*Image changing Fucntion*/

let img=document.querySelector(".img");
let imgCollect=["Images Collection/ai-generated-a-beautiful-young-woman-blowing-bubbles-enjoying-the-outdoors-generated-by-ai-free-photo.jpg","A.I Generated/Image4.avif","A.I Generated/Image5.avif","A.I Generated/image9.webp","A.I Generated/image10.avif","A.I Generated/image13.webp"];

let i=0;
let speed=4000;

function slide(){
  img.setAttribute("src",imgCollect[i]);
  if(i<imgCollect.length-1){
     i++;
  }
  else{
    i=0;
  }
  setTimeout(slide,speed);
};  
slide();


