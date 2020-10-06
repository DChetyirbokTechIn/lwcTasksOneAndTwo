public with sharing class ContactController {
    private final static String SUCCESSFUL_DELETION = 'Contact deleted successfully';

    @AuraEnabled
    public static List<ContactWrapper> getContacts(String searchParam) {
        String searchWrap = '%' + searchParam + '%';
        List<ContactWrapper> wrapContacts = new List<ContactWrapper>();
        for (Contact contactItem : [
            SELECT Id, FirstName, LastName, Email, Account.Id, Account.Name, MobilePhone, CreatedDate 
            FROM Contact
            WHERE FirstName LIKE :searchWrap
            ORDER BY FirstName
        ]) {
            wrapContacts.add(new ContactWrapper(contactItem));
        }
        return wrapContacts;
    }

    @AuraEnabled
    public static Response deleteContacts(String contactId) {
        Contact contactToDelete = [
            SELECT Id 
            FROM Contact 
            WHERE Id = :contactId
        ];

        Boolean isSuccess = true;
        String message = SUCCESSFUL_DELETION;
        
        try {
            delete contactToDelete;
        } catch (DmlException e) {
            isSuccess = false;
            message = e.getMessage();
        }

        return new Response(isSuccess, message);
    }
}