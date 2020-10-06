import { LightningElement, track, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import { registerListener, unregisterAllListeners } from "c/pubsub";
import { CurrentPageReference, NavigationMixin } from "lightning/navigation";

export default class ContactsTable extends LightningElement {
    @wire(CurrentPageReference)
    pageRef;
    @track
    wrapContacts;
    @track
    error;
    searchParam = '';
    showModal = false;

    connectedCallback() {
        registerListener('searchbtnclick', this.searchBtnClickHandler, this);
        registerListener('refresh', this.getContacts, this);

        this.getContacts(this.searchParam);
    }

    disconnectedCallback() {
        unregisterAllListeners();
    }

    searchBtnClickHandler(searchParam) {
        this.getContacts(searchParam);
    }

    getContacts(searchParam) {
        getContacts({ searchParam })
            .then(result => {
                this.wrapContacts = result;
                this.searchParam = '';
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.wrapContacts = undefined;
            });
    }
}