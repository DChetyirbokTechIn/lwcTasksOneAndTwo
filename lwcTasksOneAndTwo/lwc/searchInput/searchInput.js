import { LightningElement, wire } from 'lwc';
import { fireEvent } from "c/pubsub";
import { CurrentPageReference } from "lightning/navigation";

export default class SearchInput extends LightningElement {
    @wire(CurrentPageReference)
    pageRef;
    searchValue = '';

    searchKeyUpHandle(event) {
        this.searchValue = event.target.value;
    }

    serchClickHandle() {
        fireEvent(this.pageRef, 'searchbtnclick', this.searchValue);
    }
}

