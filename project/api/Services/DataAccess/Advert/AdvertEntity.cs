
using System.Collections.Generic;

public struct AdvertEntity
{
    public System.Guid? id { get; set; }
    public System.Guid? seller_id { get; set; }

    public string title { get; set; }
    public string description { get; set; }
    public string status { get; set; }
    public string freeHoldPrice { get; set; }
    public string leaseHoldPrice { get; set; }
    public string weeklyProfit { get; set; }
    public string monthlyProfit { get; set; }
    public string annualProfit { get; set; }
    public string weeklyTurnover { get; set; }
    public string monthlyTurnover { get; set; }
    public string annualTurnover { get; set; }
    public string line1 { get; set; }
    public string line2 { get; set; }
    public string city { get; set; }
    public string postcode { get; set; }
    public string create_date { get; set; }

    public string images { get; set; }

    //non-table fields
    public string sectors { get; set; }
    public string tags { get; set; }
    public string tenures { get; set; }
    public SellerEntity seller { get; set; }

}
