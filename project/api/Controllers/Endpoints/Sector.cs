using adx.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace adx
{

    public partial class v1Controller : ControllerBase
    {
        [AllowAnonymous]
        [HttpGet("sectors")]
        [HttpGet("sectors/{page?}")]
        public SectorResponse GetSectors()
        {
            var page = RouteData.Values.ContainsKey("page") ? RouteData.Values["page"].ToString() : null;
            if (page == null)
            {
                var data = SectorService.GetSectors(null);
                return new SectorResponse() { Data = data, Count = data.Count, Page = -1 };
            }
            else
            {
                var data = SectorService.GetSectors(page);
                var count = SectorService.GetSectors(null).Count;
                return new SectorResponse() { Data = data, Count = count, Page = int.Parse(page) };
            }
        }

        [AllowAnonymous]
        [HttpGet("sector/{id?}")]
        public SectorResponse GetSector()
        {
            var id = RouteData.Values.ContainsKey("id") ? RouteData.Values["id"].ToString() : null;
            var result = new SectorResponse() { Data = SectorService.GetSector(id) };
            return result;
        }

        [Authorize]
        [HttpPost("sectors")]
        public void AddSector([FromBody] SectorRequest request)
        {
            if (!AppHelper.IsAdmin(this.HttpContext)) return;
            SectorService.AddSector(request.Data);
        }

        [Authorize]
        [HttpPatch("sectors")]
        public void UpdateSector([FromBody] SectorRequest request)
        {
            if (!AppHelper.IsAdmin(this.HttpContext)) return;
            SectorService.UpdateSector(request.Data);
        }

        [Authorize]
        [HttpDelete("sectors/{id?}")]
        public void DeleteSector()
        {
            if (!AppHelper.IsAdmin(this.HttpContext)) return;
            var id = RouteData.Values.ContainsKey("id") ? RouteData.Values["id"].ToString() : null;
            if (id != null)
            {
                SectorService.DeleteSector(id);
            }
        }
    }


}
