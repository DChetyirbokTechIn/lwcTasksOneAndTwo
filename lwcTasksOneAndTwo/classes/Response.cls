public class Response {
    @AuraEnabled
    public Boolean isSuccess { get; set; }
    @AuraEnabled
    public String message { get; set; }

    public Response(Boolean isSuccess, String message) {
        this.isSuccess = isSuccess;
        this.message = message;
    }
}
