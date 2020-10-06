import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { fireEvent, registerListener, unregisterAllListeners } from "c/pubsub";
import { CurrentPageReference } from "lightning/navigation";

const SUCCESS_TITLE = 'Contact created!';
const SUCCESS_VARIANT = 'success';

const ERROR_TITLE = `Can't create contact!`;
const ERROR_VARIANT = 'error';

export default class CreateModalWindow extends LightningElement {
    @wire(CurrentPageReference)
    pageRef;

    showModal = false;

    searchParam = '';

    connectedCallback() {
        registerListener('searchbtnclick', this.searchValueHandler, this);
    }

    disconnectedCallback() {
        unregisterAllListeners();
    }


    @api
    openModal() {
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
    }

    submitCreation() {
        this.template.querySelector('lightning-record-edit-form').submit();
        this.showModal = false;
    }

    searchValueHandler(searchParam) {
        this.searchParam = searchParam;
    }

    handleSuccess(event) {
        if (event.detail.id) {
            fireEvent(this.pageRef, 'refresh', this.searchParam);

            this.showDispatchEvent(SUCCESS_TITLE, SUCCESS_VARIANT, event.detail.id);
        }
    }

    handleError(event) {
        this.showDispatchEvent(ERROR_TITLE, ERROR_VARIANT, event.message);
    }

    showDispatchEvent(title, variant, message) {
        this.dispatchEvent(
            new ShowToastEvent({ title, variant, message })
        );
    }

}