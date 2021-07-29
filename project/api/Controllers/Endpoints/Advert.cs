using adx.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace adx
{
    public partial class v1Controller : ControllerBase
    {
        [AllowAnonymous]
        [HttpPost("adverts")]
        public AdvertResponse GetAdverts([FromBody] AdvertFilter request)
        {
            var page = !string.IsNullOrEmpty(request?.Page) ? request?.Page.ToString() : null;
            if (string.IsNullOrEmpty(page))
            {
                var data = AdvertService.GetAdverts(request);
                return new AdvertResponse() { Data = data, Count = data.Count, Page = -1 };
            }
            else
            {
                var data = AdvertService.GetAdverts(request);
                request.Page = null;
                var count = AdvertService.GetAdverts(request).Count;
                return new AdvertResponse() { Data = data, Count = count, Page = int.Parse(page) };
            }
        }

        [AllowAnonymous]
        [HttpGet("advert/{id?}")]
        public AdvertResponse GetAdvert()
        {
            var id = RouteData.Values.ContainsKey("id") ? RouteData.Values["id"].ToString() : null;
            var result = new AdvertResponse() { Data = AdvertService.GetAdvert(id) };
            return result;
        }

        [Authorize]
        [HttpPost("advert")]
        public void AddAdvert([FromBody] AdvertEntity request)
        {
            if (!AppHelper.IsAdmin(this.HttpContext) && !AppHelper.IsSeller(this.HttpContext)) return;

            System.Guid id = AdvertService.AddAdvert(request);
            AdvertService.RefreshDependencies(id.ToString(), request.sectors, request.tags, request.tenures);
        }

        [Authorize]
        [HttpPatch("advert")]
        public void UpdateAdvert([FromBody] AdvertEntity request)
        {
            var isAdmin = AppHelper.IsAdmin(this.HttpContext);
            var isOwner = AppHelper.IsAdvertOwner(this.HttpContext, request.id?.ToString());
            if (!isAdmin && !isOwner) return;

            AdvertService.UpdateAdvert(request);
            AdvertService.RefreshDependencies(request.id?.ToString(), request.sectors, request.tags, request.tenures);
        }

        [Authorize]
        [HttpDelete("adverts/{id?}")]
        public void DeleteAdvert()
        {
            var id = RouteData.Values.ContainsKey("id") ? RouteData.Values["id"].ToString() : null;
            var isAdmin = AppHelper.IsAdmin(this.HttpContext);
            var isOwner = AppHelper.IsAdvertOwner(this.HttpContext, id);
            if (!isAdmin && !isOwner) return;

            AdvertService.DeleteAdvert(id);
        }
    }


}
