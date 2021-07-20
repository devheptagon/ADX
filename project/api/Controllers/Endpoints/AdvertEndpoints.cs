using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System.Collections.Generic;

namespace adx
{
    public class AdvertEndpoints
    {
        public static AdvertResponse GetAdverts(AdvertFilter filter)
        {
            var page = !string.IsNullOrEmpty(filter?.Page) ? filter?.Page.ToString() : null;
            if (string.IsNullOrEmpty(page))
            {
                var data = AdvertService.GetAdverts(filter);
                return new AdvertResponse() { Data = data, Count = data.Count, Page = -1 };
            }
            else
            {
                var data = AdvertService.GetAdverts(filter);
                filter.Page = null;
                var count = AdvertService.GetAdverts(filter).Count;
                return new AdvertResponse() { Data = data, Count = count, Page = int.Parse(page) };
            }
        }

        public static AdvertResponse GetAdvert(RouteData routeData)
        {
            var id = routeData.Values.ContainsKey("id") ? routeData.Values["id"].ToString() : null;
            var result = new AdvertResponse() { Data = AdvertService.GetAdvert(id) };
            return result;
        }
    }
}



