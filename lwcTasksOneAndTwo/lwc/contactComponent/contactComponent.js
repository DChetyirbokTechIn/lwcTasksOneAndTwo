import { LightningElement } from 'lwc';

export default class ContactComponent extends LightningElement {
    newButtonClickHandle() {
        this.template.querySelector('c-create-modal-window').openModal();
    }
}

