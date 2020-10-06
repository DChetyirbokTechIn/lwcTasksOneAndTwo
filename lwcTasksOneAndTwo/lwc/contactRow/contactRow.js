import { LightningElement, api } from 'lwc';
import { NavigationMixin } from "lightning/navigation";

export default class ContactRow extends NavigationMixin(LightningElement) {
    @api
    row;

    deleteHadlerClick() {
        this.template.querySelector('c-delete-modal-window').openModal();
    }

    accountClickHandler(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.target.dataset.id,
                objectApiName: 'Account',
                actionName: 'view'
            }
        });
    }
}