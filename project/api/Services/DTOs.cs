using System;
using System.Collections.Generic;

namespace adx
{
    public class UserRole
    {
        public const string Admin = "admin";
        public const string Seller = "seller";
        public const string Guest = "guest";
    }

    public class AdvertFilter
    {
        public string SelectedSectors { get; set; }
        public string SelectedCities { get; set; }
        public string SelectedTenures { get; set; }
        public string SelectedKeywords { get; set; }
        public string SelectedMinPrice { get; set; }
        public string SelectedMaxPrice { get; set; }
        public string UserId { get; set; }
        public string Page { get; set; }
    }

    #region ContentRequest
    public class ContentRequest
    {
        public ContentRequest() { }  //required for json serialisation        

        public ContentEntity Data { get; set; }
    }

    public class ContentResponse
    {
        public ContentResponse() { } //required for json serialisation        

        public List<ContentEntity> Data { get; set; }
    }
    #endregion

    #region AdvertRequest
    public class AdvertRequest
    {
        public AdvertRequest() { }  //required for json serialisation        

        public AdvertEntity Data { get; set; }
    }

    public class AdvertResponse
    {
        public AdvertResponse() { } //required for json serialisation        

        public List<AdvertEntity> Data { get; set; }

        public int Count { get; set; }

        public int Page { get; set; }
    }
    #endregion

    #region SellerRequest
    public class SellerRequest
    {
        public SellerRequest() { }  //required for json serialisation        

        public SellerEntity Data { get; set; }
    }

    public class SellerResponse
    {
        public SellerResponse() { } //required for json serialisation        

        public List<SellerEntity> Data { get; set; }

        public int Count { get; set; }

        public int Page { get; set; }
    }
    #endregion

    #region SectorRequest
    public class SectorRequest
    {
        public SectorRequest() { }  //required for json serialisation        

        public SectorEntity Data { get; set; }
    }

    public class SectorResponse
    {
        public SectorResponse() { } //required for json serialisation        

        public List<SectorEntity> Data { get; set; }

        public int Count { get; set; }

        public int Page { get; set; }
    }
    #endregion

    #region TagRequest
    public class TagRequest
    {
        public TagRequest() { }  //required for json serialisation        

        public TagEntity Data { get; set; }
    }

    public class TagResponse
    {
        public TagResponse() { } //required for json serialisation        

        public List<TagEntity> Data { get; set; }

        public int Count { get; set; }

        public int Page { get; set; }
    }
    #endregion


    public class EvaluationRequest
    {
        public string Enquiry_Type { get; set; }

        public string User_Type { get; set; }

        public string First_Name { get; set; }

        public string Last_Name { get; set; }

        public string Email { get; set; }

        public string Location { get; set; }

        public string Property_Type { get; set; }

        public string Price { get; set; }

        public string Area_Size { get; set; }
    }

    public class ValidationRequest { }

    public class User
    {
        public string Id { get; set; }
        public string Fullname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }
    }
}
