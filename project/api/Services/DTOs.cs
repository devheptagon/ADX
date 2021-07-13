namespace adx
{
    #region Meta
    public class MetaRequest
    {
        public MetaRequest() { }  //required for json serialisation

        #region Props
        public string app_name { get; set; }
        #endregion
    }

    public class MetaResponse
    {
        public MetaResponse() { } //required for json serialisation        

        #region Props

        public string result { get; set; }
        #endregion

    }
    #endregion

}
