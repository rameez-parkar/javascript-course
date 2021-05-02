'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const buttonCloseModal = document.querySelector('.close-modal');
const buttonShowModals = document.querySelectorAll('.show-modal');

const openModal = function() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

const closeModal = function() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

const keyDown = function(event) {
  if(event.key.toLowerCase() === 'escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
}

buttonShowModals.forEach((button) => {
  button.addEventListener('click', openModal);
});

buttonCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', keyDown);
