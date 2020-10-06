public with sharing class ContactWrapper {
    @AuraEnabled
    public String id { get; set; }
    @AuraEnabled
    public String firstName { get; set; }
    @AuraEnabled
    public String lastName { get; set; }
    @AuraEnabled
    public String email { get; set; }
    @AuraEnabled
    public String accountId { get; set; }
    @AuraEnabled
    public String accountName { get; set; }
    @AuraEnabled
    public String mobilePhone { get; set; }
    @AuraEnabled
    public String createdDate { get; set; }

    public ContactWrapper(Contact contact) {
        this.id = contact.Id;
        this.firstName = contact.FirstName;
        this.lastName = contact.LastName;
        this.email = contact.Email;
        this.accountId = contact.Account.Id;
        this.accountName = contact.Account.Name;
        this.mobilePhone = contact.MobilePhone;
        this.createdDate = contact.CreatedDate.format('dd/MM/yyyy, h:mm a');
    }
}