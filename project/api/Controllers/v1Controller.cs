using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace adx
{
    //v1
    [Route("[controller]")]
    [ApiController]
    public class v1Controller : ControllerBase
    {
        public v1Controller()
        {

        }

        #region Content Endpoints
        [HttpGet("contents")]
        public ContentResponse GetContents() { return ContentEndpoints.GetContents(); }

        [HttpPost("contents")]
        public string UpdateContents([FromBody] ContentRequest request) { return ContentEndpoints.UpdateContents(request); }
        #endregion

        #region Advert Endpoints
        [HttpGet("adverts")]
        [HttpGet("adverts/{id?}")]
        public AdvertResponse GetAdverts() { return AdvertEndpoints.GetAdverts(RouteData); }
        #endregion

    }


}
