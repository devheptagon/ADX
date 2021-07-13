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

        #region Sector Endpoints
        [HttpGet("sectors")]
        [HttpGet("sectors/{id?}")]
        public SectorResponse GetSectors() { return SectorEndpoints.GetSectors(RouteData); }

        [HttpPost("sectors")]
        public void AddSector([FromBody] SectorRequest request) { SectorEndpoints.AddSector(request.Data); }

        [HttpPatch("sectors")]
        public void UpdateSector([FromBody] SectorRequest request) { SectorEndpoints.UpdateSector(request.Data); }

        [HttpDelete("sectors/{id?}")]
        public void DeleteSector() { SectorEndpoints.DeleteSector(RouteData); }
        #endregion

        #region Tag Endpoints
        [HttpGet("tags")]
        [HttpGet("tags/{id?}")]
        public TagResponse GetTags() { return TagEndpoints.GetTags(RouteData); }

        [HttpPost("tags")]
        public void AddTag([FromBody] TagRequest request) { TagEndpoints.AddTag(request.Data); }

        [HttpPatch("tags")]
        public void UpdateTag([FromBody] TagRequest request) { TagEndpoints.UpdateTag(request.Data); }

        [HttpDelete("tags/{id?}")]
        public void DeleteTag() { TagEndpoints.DeleteTag(RouteData); }
        #endregion
    }


}
