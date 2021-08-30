// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
let modal = document.querySelector('#modal');
modal.classList.add('hidden');
document.addEventListener('DOMContentLoaded', function(){
  let glyphs = document.querySelectorAll('span.like-glyph');
  glyphs.forEach(glyph => glyph.addEventListener('click', function(e){
    // console.log('Clicked!', e.target.className);
    mimicServerCall()
    .then(function(resp){
      if (resp === 'Pretend remote server notified of action!'){
        switch (true){
          case e.target.className === 'like-glyph':
            // console.log('LIKE')
            glyph.textContent = FULL_HEART;
            glyph.classList.add('activated-heart');
            break;
          case e.target.classname !== 'like-glyph':
            // console.log('UNLIKE')
            glyph.textContent = EMPTY_HEART;
            glyph.classList.remove('activated-heart');
            break;
        }

      }
    })
    .catch(function(error){
      if (error === "Random server error. Try again."){
        let p = modal.querySelector('p');
        p.textContent = error
        modal.classList.remove('hidden');
        setTimeout(function(){modal.classList.add('hidden')}, 3000)

      }
    });
  }))
})



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  })
}

