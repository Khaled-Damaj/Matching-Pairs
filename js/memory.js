document.querySelector(".control-button span").onclick = function () {
  // Ask the User To enter his name
  let user = prompt("Please enter your name");
  // if user is empty or null set user to user
  if (user === "" || user == null) {
    //set name to user
    user = "user";
  }
  // set name to variable user
  document.querySelector(".game-info .name span").textContent = user;
  //remove splach screen
  document.querySelector(".control-button").remove();
  counter();
};

let boxContainer = document.querySelector(".game-container");
let boxBtn = Array.from(document.querySelectorAll(".game-box")),
  order = [];
let count = 0;

//SHUFFLE ARRAY
for (var i = 0; i < boxBtn.length; i++) {
  let random = Math.floor(Math.random() * boxBtn.length);
  while (order.indexOf(random) !== -1) {
    random = Math.floor(Math.random() * boxBtn.length);
  }
  order.push(random);
}

boxBtn.forEach((box, index) => {
  box.style.order = order[index];
  box.onclick = () => {
    flip(box);
  };
});

function flip(box) {
  // add is-flipped class to the clicked element
  box.classList.add("is-flipped");

  let flippedEelements = boxBtn.filter((ele) =>
    ele.classList.contains("is-flipped")
  );
  // check if length is equal to 2
  if (flippedEelements.length === 2) {
    //First prevent the user from clicking another box
    stopClicking();
    // check the matched box
    isMatch(flippedEelements[0], flippedEelements[1]);
    // if all are matched
    if (count === 10) {
      setTimeout(function () {
        alert("Well Done!");
      }, 500);
    }
  }
}

function stopClicking() {
  //add stop-responsing class to the container to prevent the user from clicking on other boxes
  boxContainer.classList.add("stop-responsing");
  // set a timer of 1s then remove stop-responsing class
  setTimeout(() => {
    boxContainer.classList.remove("stop-responsing");
  }, 500);
}

function isMatch(firstBox, secondBox) {
  let tries = document.querySelector(".game-info .tries span");

  if (firstBox.dataset.web === secondBox.dataset.web) {
    count++;
    // we remove the is-flipped class then we add another class. The purpose of adding another class is to make
    // the condition that only 2 can be flipped
    firstBox.classList.remove("is-flipped");
    secondBox.classList.remove("is-flipped");

    firstBox.classList.add("matched");
    secondBox.classList.add("matched");
  } else {
    tries.textContent = Number(tries.textContent) + 1;
    setTimeout(() => {
      firstBox.classList.remove("is-flipped");
      secondBox.classList.remove("is-flipped");
    }, 500);
  }
}

function counter() {
  let sec1 = document.querySelector(".sec-1"),
    sec2 = document.querySelector(".sec-2"),
    min1 = document.querySelector(".min-1"),
    min2 = document.querySelector(".min-2");

  let myInterval = setInterval(() => {
    sec2.textContent = parseInt(sec2.textContent) + 1;
    if (parseInt(sec2.textContent) === 10) {
      sec1.textContent = parseInt(sec1.textContent) + 1;
      sec2.textContent = 0;
    }
    if (parseInt(sec1.textContent) === 6) {
      sec1.textContent = 0;
      sec2.textContent = 0;
      min2.textContent = parseInt(min2.textContent) + 1;
      if (parseInt(min2.textContent) === 10) {
        min1.textContent = parseInt(min1.textContent) + 1;
        min2.textContent = 0;
      }
      if (parseInt(min1.textContent) === 6) {
        min1.textContent = 0;
        min2.textContent = 0;
        sec1.textContent = 0;
        sec2.textContent = 0;
      }
    }
    if (count === 10) {
      clearInterval(myInterval);
    }
  }, 1000);
}
