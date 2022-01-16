import {addNewData} from './api';

class Form {
  constructor(form) {
    this.form = form;
    this.select = form.querySelector('.custom-select');
    this.selectPlaceholder = this.select.querySelector('.custom-select__text');
    this.input = form.querySelector('.custom-input input');
    this.submit = form.querySelector('.btn');

    this.submitAction = this.submitAction.bind(this);

    this.init();
  }

  init() {
    this.setFormListeners();
  }

  setFormListeners() {
    this.submit.addEventListener('click', this.submitAction);
  }

  submitAction(e) {
    e.preventDefault();
    if (!this.select.classList.contains('is-valid') || this.input.value === '') {
      throw new Error('форма не валидна');
    }

    this.selectedItem = this.select.querySelector('.custom-select__item[aria-selected="true"]');

    addNewData({
      category: this.selectedItem.textContent,
      price: this.input.value,
    });

    this.clearForm();
  }

  clearForm() {
    this.input.value = '';
    this.selectPlaceholder.textContent = 'Категория';
    this.selectedItem.ariaSelected = false;
  }
}

const initForm = () => {
  const formNode = document.querySelector('.expenses-form');

  if (!formNode) {
    return;
  }

  const form = new Form(formNode);
};

export {initForm};
