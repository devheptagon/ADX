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
    public class UserRequest
    {
        public UserRequest() { }  //required for json serialisation        

        public UserEntity Data { get; set; }
    }

    public class UserResponse
    {
        public UserResponse() { } //required for json serialisation        

        public List<UserEntity> Data { get; set; }

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
        public EvaluationRequest() { }  //required for json serialisation        

        public EnquiryEntity Data { get; set; }
    }

    public class EvaluationResponse
    {
        public EvaluationResponse() { }  //required for json serialisation        

        public List<EnquiryEntity> Data { get; set; }

        public int Count { get; set; }

        public int Page { get; set; }
    }

    #region MessageRequest
    public class MessageRequest
    {
        public MessageRequest() { }  //required for json serialisation        

        public MessageEntity Data { get; set; }
    }

    public class MessageResponse
    {
        public MessageResponse() { } //required for json serialisation        

        public List<MessageEntity> Data { get; set; }

        public int Count { get; set; }

        public int Page { get; set; }
    }
    #endregion

    #region UpgradeRequest
    public class UpgradeRequest
    {
        public UpgradeRequest() { }  //required for json serialisation        

        public UpgradeEntity Data { get; set; }
    }
    #endregion

    public class ValidationRequest { }


}
