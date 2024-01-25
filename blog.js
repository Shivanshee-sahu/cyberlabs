const quoteText=document.querySelector(".quote"),
authorname=document.querySelector(".author"),
soundbtn=document.querySelector(".sound"),
copybtn=document.querySelector(".copy"),
quoteBtn=document.querySelector(".nq");
function randomQuote(){
    quoteBtn.classList.add("loading")
    quoteBtn.innerText="Loading Quote..."
    fetch("https://api.quotable.io/random").then(res=>res.json()).then(result=>{
        console.log(result)
        quoteText.innerText=result.content;
        authorname.innerText=result.author;
        quoteBtn.innerText="New Quote"
        quoteBtn.classList.remove("loading")
    })
}
soundbtn.addEventListener("click",()=>{
    let utterance=new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorname.innerText}`);

    speechSynthesis.speak(utterance);
})
copybtn.addEventListener("click",()=>{
    navigator.clipboard.writeText(quoteText.innerText)
})
quoteBtn.addEventListener("click",randomQuote);

//--------------------------------Questions-----------------//

var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
