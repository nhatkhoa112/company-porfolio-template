//LocalStorge Object
let localObj = {};
// Nav
let nav = document.querySelector(".header");
let navLinks = document.getElementById("nav-links");
let btnToggle = document.getElementById("toggle");
let allLinks = document.querySelectorAll('#nav-links li a');
let allSectionsId = document.querySelectorAll('body > div[id]');
// Landing
let backgroundLanding = document.getElementById("landing");
let arrImages = ["01.jpg", "02.jpg", "03.webp", "04.jpg", "05.webp", "06.jpg","07.jpg", "08.webp", "09.png"];
let timeHundel = 5000;
// skills
let skills = document.getElementById("skills");
let progress = document.querySelectorAll(".progress span");
//Gallery
let galleryImages = document.querySelectorAll(".gallery .images-box img");
// Setting Box
let btnSettings = document.getElementById("btn-settings");
let settingsBox = document.querySelector(".settings");
let colorsList = document.querySelectorAll(".colors-list li");
let bgRandom = document.querySelectorAll(".random-bg span");
let navOpt = document.querySelectorAll(".nav-op span");
let rest = document.querySelector(".rest");
// Go Top 
let btnTop = document.querySelector(".go-top");


//Change Background Landing Section
let setIntId = setInterval( handelRandomBg, timeHundel );
clearInterval(setIntId);







// Fetch Data Form [LocalStorage]
if (window.localStorage.getItem("settings")) {
  // data in local Storge
  let allSettings = JSON.parse(window.localStorage.getItem("settings"));

  localObj = allSettings;

  // Color Option
  if (allSettings.color) {
    //Change Main Color
    document.documentElement.style.setProperty("--mainColor", allSettings.color);
    //Func Handel Remove Class 
    handelRemoveClass(colorsList, "active-color");
    //Add Class active-color
    document.querySelector(`.colors-list li[data-color="${allSettings.color}"]`).classList.add("active-color");
  }
  // Background Option
  if (allSettings.bg) {
    //Func Handel Remove Class 
    handelRemoveClass(bgRandom, "active-select");

    document.querySelector(`.random-bg span[class="${allSettings.bg}"]`).classList.add("active-select");

    if (allSettings.bg == "yes") {

      setIntId = setInterval( handelRandomBg, timeHundel );

    }
    else if (allSettings.bg == "no") {

      clearInterval(setIntId);

    }


  }
  // NavBar Option
  if (allSettings.nav) {

    //Func Handel Remove Class 
    handelRemoveClass(navOpt, "active-select");

    document.querySelector(`.nav-op span[class="${allSettings.nav}"]`).classList.add("active-select");

    if (allSettings.nav == "yes") {

      nav.classList.add("nav-fixed");
    }
    else if (allSettings.nav == "no") {
      nav.classList.remove("nav-fixed");
    }

  }

}

// [NavBar] Icon Toggel Class (.show) => MediaQuery Mobile
btnToggle.addEventListener('click', () => {
  navLinks.classList.toggle("show");
})

// [NavBar] Event Click Go To Scection
allLinks.forEach(ele => {
  ele.addEventListener('click', (e) => {
    //handel event
    e.preventDefault();
    // document.getElementById()
    document.getElementById(e.currentTarget.dataset.link).scrollIntoView({behavior: "smooth"});
  });
});

// [Gallary]
galleryImages.forEach(img => {
  img.addEventListener('click', (e) => {
    let imgSrc = e.currentTarget.src;
    // Func Create & append & show Image
    viewImage(imgSrc);
    // Close Event 
    let btnClose = document.querySelector(".close");
    btnClose.addEventListener('click', (e) => {
      btnClose.parentElement.parentElement.remove();
    })
    // overlay Event
    let overlay = document.querySelector(".overlay");
    overlay.addEventListener('click', (e) => {
      overlay.parentElement.remove();
    })

  })
})









//BOM ====> Window Scroll
window.onscroll = function () {

  // [NavBar]  When Scroll Add Class active In NavBar
  allSectionsId.forEach(sec => {

    if (window.scrollY >= (sec.offsetTop - 100)) {

        //Func Handel Remove Class active
        handelRemoveClass(allLinks, "active");

        // Add Class active
        allLinks.forEach(ele => {
      
          if (ele.dataset.link == sec.id) {
      
            ele.classList.add('active');
          }
        });

    }
    
  });

  // [Skills] skills progress span width = dataset.progress
  if (window.scrollY >= (skills.offsetTop - 100) & window.scrollY <= ((skills.offsetHeight / 2) + skills.offsetTop )) {
    progress.forEach(ele => {
      ele.style.width = ele.dataset.progress;
      ele.classList.add('pseudo');
      
    })

  }
  else {
    progress.forEach(ele => {
      ele.style.width = 0;
      ele.classList.remove('pseudo');
    })
  }

}

//[Settings]
//------------------------------------
//Toggle Show Settings
btnSettings.addEventListener('click', (e) => {
  settingsBox.classList.toggle("show-settings");
});

//Change Main Color 
colorsList.forEach(ele => {

  ele.addEventListener('click', (e) => {
    let color = e.currentTarget.dataset.color;

    //Func Handel Remove Class active-color
    handelRemoveClass(colorsList, "active-color");

    // Change --mainColor
    document.documentElement.style.setProperty("--mainColor", color);

    // Add Color To LocalStorge
    localObj.color = color;

    // Save Data To LocalStorge
    sendLocalStorge(localObj);

    // Add Class active-color
    ele.classList.add("active-color");

  });
});

// Random Background =====> { Yes || No }
bgRandom.forEach(ele => {

  ele.addEventListener('click', (e) => {
    //Func Handel Remove Class 
    handelRemoveClass(bgRandom, "active-select");
    let change = e.currentTarget.className;

    if (change == "yes") {

      localObj.bg = change;
      sendLocalStorge(localObj);
      setIntId = setInterval( handelRandomBg, timeHundel );

    }
    else if (change == "no") {

      localObj.bg = change;
      sendLocalStorge(localObj);
      clearInterval(setIntId);

    }

    ele.classList.add("active-select");

  });
});

//Nav Bar Fixed
navOpt.forEach(ele => {

  ele.addEventListener('click', (e) => {
    //Func Handel Remove Class 
    handelRemoveClass(navOpt, "active-select");
    let change = e.currentTarget.className;

    if (change == "yes") {

      localObj.nav = change;
      sendLocalStorge(localObj);
      nav.classList.add("nav-fixed");

    }
    else if (change == "no") {

      localObj.nav = change;
      sendLocalStorge(localObj);
      nav.classList.remove("nav-fixed");

    }

    ele.classList.add("active-select");

  });
});

// Rest Option
rest.addEventListener('click', () => {
  window.localStorage.removeItem("settings");
  window.location.reload();
})


// Button Go Top Scroll
btnTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

let button = document.querySelector('input[type="submit"]')
button.addEventListener('click', (e) => {
  e.preventDefault()
  alert(`Not working at the moment`)
})

//-------------------------------------
// Functions
//-------------------------------------
//Func Handel Remove Class 
function handelRemoveClass(elements, className) {
  elements.forEach(ele => {
    ele.classList.remove(className);
  });
}
//Func Local Storge
function sendLocalStorge(obj) {
  window.localStorage.setItem("settings", JSON.stringify(obj))
}
// Random Background
function handelRandomBg() {
  // Random Nummber between arrImages Length
  let randomIndex = Math.floor(Math.random() * arrImages.length);

  // change Image
  backgroundLanding.style.backgroundImage = `url("./assets/images/${arrImages[randomIndex]}")`;
}
//Fuc Create overlay & po
function viewImage(imgPath) {
  // Create view
  let view = document.createElement('div');
  view.className = 'view';

  // Create overlay
  let overlay = document.createElement('div');
  overlay.className = 'overlay';

  // create popup
  let popup = document.createElement('div');
  popup.className = 'popup';

  // img
  let img = document.createElement('img');
  img.src = imgPath;

  // close
  let close = document.createElement('div');
  close.className = 'close';
  close.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

  //append
  popup.append(close);
  popup.append(img);
  view.append(overlay);
  view.append(popup);
  document.body.appendChild(view);

}

