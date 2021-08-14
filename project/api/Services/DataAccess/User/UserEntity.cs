
public class UserEntity
{
    public System.Guid? id { get; set; }

    public string fullname { get; set; }
    public string email { get; set; }
    public string phone { get; set; }
    public string avatar { get; set; }
    public string line1 { get; set; }
    public string line2 { get; set; }
    public string city { get; set; }
    public string postcode { get; set; }
    public string seller_until { get; set; }
    public bool active { get; set; }

    public string token { get; set; }
    public string role { get; set; }
    public string password { get; set; }
}
