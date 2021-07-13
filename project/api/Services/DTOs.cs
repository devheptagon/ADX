using System.Collections.Generic;

namespace adx
{
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
    }
    #endregion

}
