using adx.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

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
            AdvertService.UpdateDependencies(id.ToString(), request.sectors, request.tags, request.tenures);
        }

        [Authorize]
        [HttpPatch("advert")]
        public void UpdateAdvert([FromBody] AdvertEntity request)
        {
            var isAdmin = AppHelper.IsAdmin(this.HttpContext);
            var advert = AdvertService.GetAdvert(request.id?.ToString()).First();
            var userId = AppHelper.GetUserIdFromClaim(HttpContext);
            var isOwner = advert.seller_id.ToString() == userId;
            if (!isAdmin && !isOwner) return;

            AdvertService.UpdateAdvert(request);
            AdvertService.UpdateDependencies(request.id?.ToString(), request.sectors, request.tags, request.tenures);
        }

        [Authorize]
        [HttpDelete("adverts/{id?}")]
        public void DeleteAdvert()
        {
            var advertId = RouteData.Values.ContainsKey("id") ? RouteData.Values["id"].ToString() : null;
            var isAdmin = AppHelper.IsAdmin(this.HttpContext);
            var advert = AdvertService.GetAdvert(advertId).First();
            var userId = AppHelper.GetUserIdFromClaim(HttpContext);

            var isOwner = advert.seller_id.ToString() == userId;
            if (!isAdmin && !isOwner) return;

            AdvertService.DeleteAdvert(advertId);
        }
    }


}
