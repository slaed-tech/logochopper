// VARS
const INIT_SPLIDE_ACTIVE = true;

const POP_UP_ID = ".popup_wrapper";
const POP_CALLBACK_SELECTOR = ".type__callback";

// ON LOAD DOAM
document.addEventListener("DOMContentLoaded", () => {
    try {
        formValidateInit();
    } catch (error) {
        console.log(`Form validate went wrong: ${error}`);
    }

    // try {
    //     formLabel();
    // } catch (error) {
    //     console.log(`Form label went wrong: ${error}`);
    // }

    try {
        popUpInit();
    } catch (error) {
        console.log(`Popup init went wrong: ${error}`);
    }

    try {
        goBackInit();
    } catch (error) {
        console.log(`Go-back init went wrong: ${error}`);
    }

    try {
        if (INIT_SPLIDE_ACTIVE) initSplide();
    } catch (error) {
        console.log(`Splide init went wrong: ${error}`);
    }

    try {
        headerBehaviour();
    } catch (error) {
        console.log(`CAN'T FIND HEADER: ${error}`);
    }

    try {
        burgerMenu();
    } catch (error) {
        console.log(`CAN'T FIND BURGER MENU: ${error}`);
    }
})

// FUNCTIONS
// burger menu
function burgerMenu() {
    let header = document.querySelector("header");
    let nav = document.querySelector("nav");
    let nav_list = nav.querySelector(".nav__wrap");
    let nav_btn = document.querySelector(".burger-menu__btn");
    let nav_link = nav.querySelectorAll(".link");

    let body = document.querySelector("body");

    if (nav != undefined || nav != null) {
        
        nav_btn.addEventListener("click", () => {
            nav_btn.classList.toggle("active");
            nav.classList.toggle("active");
            
            body.classList.toggle("stop-scroll");
        })

        nav_link.forEach(el => {
            el.addEventListener("click", () => {
                nav_btn.classList.toggle("active");
                nav.classList.toggle("active");
                
                body.classList.toggle("stop-scroll");
            })
        })

    } else {
        console.log("CAN'T FIND NAV");
    }    
}

// header behaviour
function headerBehaviour() {
    let lastScrollTop = 0;
    window.addEventListener("scroll", () => {
        let header = document.querySelector('header');
        let nav = header.querySelector(".nav__wrap");

        if (header != undefined || header != null) {
            let offsetTop = header.offsetTop + window.scrollY;
            let st = window.pageYOffset || document.documentElement.scrollTop;

            if (st > lastScrollTop && offsetTop != 0){
                header.classList.remove("fixed");
                header.classList.remove("static");
            } else if (st < lastScrollTop && offsetTop != 0) {
                header.classList.remove("static");
                header.classList.add("fixed");
            } else {
                header.classList.add("static");
                header.classList.remove("fixed");
            }
            lastScrollTop = st <= 0 ? 0 : st;
        } else {
            console.log("CAN'T FIND HEADER");
        }
    })
}

// select element
function select(parent, selector) {
    if (typeof(parent) != undefined && parent != null) {
        let element = parent.querySelector(selector);
        
        if (typeof(element) != undefined && element != null) {
            return element
        }
    }
    console.log(`Can't find the element by selector: ${selector} in ${parent}`);
}

function selectAll(parent, selector) {
    if (typeof(parent) != undefined && parent != null) {
        let element = parent.querySelectorAll(selector);
        
        if (typeof(element) != undefined && element != null) {
            return element
        }
    }
    console.log(`Can't find the element by selector: ${selector} in ${parent}`);
}

// slider
function initSplide() {
    let options = {
        "bg__slider": {
            type: "loop",
            arrows: false,
            pagination: false,
            speed: 1000,
            autoplay: true,
            interval: 6000,
            loop: true,
            drag: false,
            pauseOnHover: false,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        },
        "blog__slider": {
            type: "slide",
            rewindByDrag: true,
            gap: "30px",
            autoWidth: true,
            arrows: false,
            pagination: false,
            drag: "free",
            speed: 50,
        },
        "review__slider": {
            type: "slide",
            rewindByDrag: true,
            gap: "30px",
            autoWidth: true,
            autoHeight: true,
            arrows: false,
            pagination: true,
            speed: 500,
            perMove: 1,
            interval: 3000,
            loop: true,
        },
    };
    let splides = selectAll(document, ".splide");
    for (let i = 0; i < splides.length; i++) {
        let style = splides[i].classList[0];
        let op = options[style];  
        new Splide(splides[i], op).mount();
    }
}

// header behaviour
window.addEventListener("scroll", () => {
    let nav = select(document, "header");
    let offsetTop = nav.offsetTop + window.scrollY;

    if (offsetTop > 0) {
        nav.classList.add("fixed");
    }
    else {
        nav.classList.remove("fixed");
    }
})

// go-back button behaviour
function goBackInit() {
    window.addEventListener("scroll", () => {
        let back = select(document, "#go-back");
        let btn = select(back, ".ico_wrap");
    
        let start = select(document, btn.getAttribute('data-start'));
        let footer = document.querySelector('footer');

        let offsetTop_back = back.offsetTop + window.scrollY;
        let offsetTop_start = start.offsetTop;
        let offsetTop_footer = footer.offsetTop;

        if (offsetTop_back > offsetTop_start && offsetTop_back < offsetTop_footer) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    })
}

// function formLabel() {
//     let input_label = document.querySelector(".form_gor").querySelector("label[for='phone']");
//     let btn_label   = document.querySelectorAll(".form_gor_label");
//     let il_style = window.getComputedStyle(input_label);


//     let il_height = input_label.offsetHeight;
//     let il_margin = il_style.marginBottom;
//     let bl_height = parseInt(il_height) + parseInt(il_margin);

//     btn_label.forEach(el => {
//         el.style.height = `${bl_height}px`;
//     })
// }

// init tel valid
function intlTelInit() {
    let phoneInputField = document.querySelectorAll('._tel');

    let phoneInit = phoneInputField.forEach(el => {
        window.intlTelInput(el, {
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
            dropdownContainer: el.parentNode,
            initialCountry: "ua",
            preferenceCountries: ["ua", "us", "uk"],
            excludeCountries: ["ru"],
            formatOnDisplay: true,
            nationalMode: true,
        });
    })

    let reset = function() {
        phoneInputField.forEach(el => {el.classList.remove("error")});
    };

    // on blur: validate
    function addEvent(el) {
        reset();

        if (el.value.trim()) {
            if (phoneInit.isValidNumber()) {
            // validMsg.classList.remove("hide");
            } else {
                el.classList.add("error");
                let errorCode = phoneInit.getValidationError();
                // errorMsg.innerHTML = errorMap[errorCode];
                // errorMsg.classList.remove("hide");
            }
        }
    }
    phoneInputField.forEach(el => { addEvent(el); });

    // on keyup / change flag: reset
    phoneInputField.forEach(el => { el.addEventListener('change', reset); });
    phoneInputField.forEach(el => { el.addEventListener('keyup', reset); });
}

// form validation init
function formValidateInit() {
    // init tel
    intlTelInit();

    // form
    const form_selector = ".feedback__form";
    const form = document.querySelectorAll(form_selector);

    // on submit
    for (let i = 0; i < form.length; i++) {
        form[i].addEventListener("submit", (e) => { e.preventDefault(); formSend(form[i]) });
    }

    // form send
    function formSend(form) {
        // test for valid
        let valid = isValid(form);

        // callback
        if (valid) {
            popClose(form.parentNode.parentNode);
            popExpand(document.querySelector(POP_CALLBACK_SELECTOR));
        } else {
            console.log(`ERROR ON: ${form}`);
        }
    }

    // is valid
    function isValid(form) {
        let error = 0;
        let req_selector = "._req";
        let formReq = form.querySelectorAll(req_selector);

        formReq.forEach(input => {
            formRemoveError(input);

            if (input.getAttribute('type') == 'email') {
                if (!emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute('type') == 'tel') {
                if(!telTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute('name') == 'name') {
                if(!nameTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value == '') {
                    formAddError(input);
                    error++;
                }
            }
        })

        console.log(`${error} ERRORS ON: ${form}`);
        return (error > 0) ? false : true;
    }
    
    // form add error
    function formAddError(input) {
        input.parentNode.classList.add("_error");
        input.classList.add("_error");
    }

    // form remove error
    function formRemoveError(input) {
        input.parentNode.classList.remove("_error");
        input.classList.remove("_error");
    }

    // email test
    function emailTest(input) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(input.value);
    }

    // tel test
    function telTest(input) {
        return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g.test(input.value);
    }

    // name test
    function nameTest(input) {
        return /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/g.test(input.value);
    }
}

function popExpand(popUp) {
    try {
        let overlay = popUp.querySelector('.overlay');

        popUp.style.height = window.getComputedStyle.height;
        overlay.style.height = window.getComputedStyle.height;
    
        popUp.classList.add("show");
        document.querySelector("body").classList.add("hide_sb");
    } catch (error) {
        console.log(`Pop-up expand went wrond: ${error}`);
    }

}

function popClose(popUp) {
    try {
        popUp.classList.remove("show");
        document.querySelector("body").classList.remove("hide_sb"); 
    } catch (error) {
        console.log(`Pop-up close went wrond: ${error}`);
    }
 
}

function popUpInit() {
    // pop-ups
    let parent_id = POP_UP_ID;
    let parent = document.querySelectorAll(parent_id);

    // events
    parent.forEach(popUp => {
        let overlay = popUp.querySelector('.overlay');
        let close = popUp.querySelector(".close");
        
        overlay.addEventListener("click", () => {
            popClose(popUp);
        })
        close.addEventListener("click", () => {
            popClose(popUp);
        })
    })
}