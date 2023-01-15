let btn=document.querySelectorAll("button")

btn.forEach(e=>{
  e.addEventListener("click",function(){
    e.classList.add("active")
  const audio = document.querySelector(`audio[data-key="${e.textContent.charCodeAt()}"]`);
  audio.play()
  setTimeout(() => {
    e.classList.remove("active")
  }, 1000);
  })
})

window.addEventListener("keydown",(e)=>{
  const audio = document.querySelector(`audio[data-key="${e.key.toUpperCase().charCodeAt()}"]`);
  audio.play()
  const btupn = document.querySelector(`button[data-key="${e.key.toUpperCase().charCodeAt()}"]`);
  btupn.classList.add("active")
  setTimeout(() => {
    btupn.classList.remove("active")
  }, 1000);
})
