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

        #region Seller Endpoints
        [HttpGet("sellers")]
        [HttpGet("sellers/{id?}")]
        public SellerResponse GetSellers() { return SellerEndpoints.GetSellers(RouteData); }

        [HttpPost("sellers")]
        public void AddSeller([FromBody] SellerRequest request) { SellerEndpoints.AddSeller(request.Data); }

        [HttpPatch("sellers")]
        public void UpdateSeller([FromBody] SellerRequest request) { SellerEndpoints.UpdateSeller(request.Data); }

        [HttpDelete("sellers/{id?}")]
        public void DeleteSeller() { SellerEndpoints.DeleteSeller(RouteData); }
        #endregion

        #region Area Endpoints
        [HttpGet("areas")]
        [HttpGet("areas/{id?}")]
        public AreaResponse GetAreas() { return AreaEndpoints.GetAreas(RouteData); }

        [HttpPost("areas")]
        public void AddArea([FromBody] AreaRequest request) { AreaEndpoints.AddArea(request.Data); }

        [HttpPatch("areas")]
        public void UpdateArea([FromBody] AreaRequest request) { AreaEndpoints.UpdateArea(request.Data); }

        [HttpDelete("areas/{id?}")]
        public void DeleteArea() { AreaEndpoints.DeleteArea(RouteData); }
        #endregion

    }


}
