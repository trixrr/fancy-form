// Questions array
const questions = [{
    question: 'Enter your first name'
  },
  {
    question: 'Enter your last name'
  },
  {
    question: 'Enter your email',
    pattern: /\S+@\S+\.\S+/
  },
  {
    question: 'Create a password',
    type: 'password'
  }

];

// transition times 
const shakeTime = 100; // shake trans time
const switchTime = 200; // transition between questions


// init position at first question
let position = 0;

// init dom elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

// Events 



// Get question on DOM LOAD
document.addEventListener('DOMContentLoaded', getQuestion);

// Next button click
nextBtn.addEventListener('click', validate);

// Functions

// Get question form array & add to mark up
function getQuestion() {
  // Get the current question
  inputLabel.innerHTML = questions[position].question;
  // Get current type
  inputField.type = questions[position].type || 'text';
  // Get the current answer
  inputField.value = questions[position].answer || '';
  // Focus on element
  inputField.focus();

  // Set progress bar
  progress.style.width = (position * 100) / questions.length + '%';

  // Add user icon or Back arrow depending on question
  prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

  showQuestion();
}

// display question to user 
function showQuestion() {
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = '';
  inputProgress.style.width = '100%';
}

// Hide question from user 
function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = 'none';
  inputGroup.style.border = null;
}

// Transform to create shake motion
function transform(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;

}

//  Validate field
function validate() {
  //  make sure pattern matche if there is one
  if (!inputField.value.match(questions[position].pattern || /.+/)) {
    inputFail();
  } else {
    inputPass();
  }
}

// Field Input fail
function inputFail() {
  formBox.className = 'error';
  // repeat shake motion - set i to number of shakes
  for (let i = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(transform, shakeTime * 6, 0, 0);
    inputField.focus();
  }
}

// Field input passed
function inputPass() {
  formBox.className = '';
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime * 1, 0, 0);

  // increment position
  position++;

  // if new question, hide current and get next
  if (questions[position]) {
    hideQuestion();
    getQuestion();
  } else {
    // remove if no more questions
    hideQuestion();
    formBox.className = 'close';
    progress.style.width = '100%';

    // form complete
    formComplete();
  }
}