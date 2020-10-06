import { LightningElement, api, wire } from 'lwc';
import deleteContacts from '@salesforce/apex/ContactController.deleteContacts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { fireEvent, registerListener, unregisterAllListeners } from "c/pubsub";
import { CurrentPageReference } from "lightning/navigation";


const SUCCESS_TITLE = 'Contact deleted!';
const SUCCESS_VARIANT = 'success';

const ERROR_TITLE = 'Error!';
const ERROR_VARIANT = 'error';

export default class DeleteModalWindow extends LightningElement {
    @wire(CurrentPageReference)
    pageRef;

    @api
    contactId;

    showModal = false;

    searchParam = '';

    @api
    openModal() {
        this.showModal = true;
    }

    connectedCallback() {
        registerListener('searchbtnclick', this.searchValueHandler, this);
    }

    disconnectedCallback() {
        unregisterAllListeners();
    }

    closeModal() {
        this.showModal = false;
    }

    submitDeleteon() {
        this.showModal = false;

        let title, message, variant;

        deleteContacts({ contactId: this.contactId })
            .then(result => {
                if (result.isSuccess) {
                    title = SUCCESS_TITLE;
                    variant = SUCCESS_VARIANT;
                    message = result.message;
                } else {
                    title = ERROR_TITLE;
                    variant = ERROR_VARIANT;
                    message = result.message;
                }

                fireEvent(this.pageRef, 'refresh', this.searchParam);
            })
            .catch(error => {
                title = ERROR_TITLE;
                variant = ERROR_VARIANT;
                message = error.body.message;
            })
            .finally(() => {
                this.dispatchEvent(
                    new ShowToastEvent({ title, message, variant })
                );
            });
    }

    searchValueHandler(searchParam) {
        this.searchParam = searchParam;
    }
}