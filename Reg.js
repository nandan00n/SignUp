const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
// const confirmPasswordEl = document.querySelector('#confirm-password');
const mobileEl = document.querySelector('#mobile');
const cityEl = document.querySelector('#city');
const zipEl = document.querySelector('#zip');

const form = document.querySelector('#signup');


const checkUsername = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};


const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;


    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};

const checkPasswordSecure = () => {
    let valid = false;


    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(mobileEl, 'cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'invalid');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};

const checkMobile = () => {
    let valid = false;


    const mobile = mobileEl.value.trim();

    if (!isRequired(mobile)) {
        showError(mobileEl, 'Mobile cannot be blank.');
    } else if (!isMobiles(mobile)) {
        showError(mobileEl, 'Please Your 10 Digit Mobile Number');
    } else {
        showSuccess(mobileEl);
        valid = true;
    }

    return valid;
};

const checkCity = () => {
    let valid = false;

    const city = cityEl.value.trim();

    if (!isRequired(city)) {
        showError(cityEl, 'city cannot be blank.');
    } else if (!isCity(city)) {
        showError(cityEl, 'Please your city Name');
    } else {
        showSuccess(cityEl);
        valid = true;
    }

    return valid;
};

const checkZip = () => {
    let valid = false;

    const zip = zipEl.value.trim();

    if (!isRequired(zip)) {
        showError(zipEl, 'zip cannot be blank.');
    } else if (!isZip(zip)) {
        showError(zipEl, 'Please enter valid zip ');
    } else {
        showSuccess(zipEl);
        valid = true;
    }

    return valid;
};

// const checkZip = () => {
//     let valid = false;


//     const zip = zipEl.value.trim();

//     if (!isRequired(zip)) {
//         showError(zipEl, 'Zip cannot be empty');
//     } else if (!isZip(zip)) {
//         showError(zipEl, 'invalid');
//     } else {
//         showSuccess(zipEl);
//         valid = true;
//     }

//     return valid;
// };

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const isMobiles = (mobile) => {
    const re = new RegExp("^(?=.*[0-9])(?=.{10,})");
    return re.test(mobile);
};

const isCity = (city) => {
    const re = new RegExp("^(?=.*[a-zA-Z])(?=.{3,})");
    return re.test(city);
};

const isZip = (zip) => {
    const re = new RegExp("^(?=.*[0-9])");
    return re.test(zip);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isMobiles = checkMobile();
        isCity = checkCity();
        isZip = checkZip();

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&
        isMobiles &&
        isCity &&
        isZip;

    // submit to the server if the form is valid
    if (isFormValid) {

    }
});


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'mobile':
            checkMobile();
            break;
        case 'city':
            checkCity();
            break;
        case 'zip':
            checkZip();
            break;
    }
}));