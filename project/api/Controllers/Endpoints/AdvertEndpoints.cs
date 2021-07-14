using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System.Collections.Generic;

namespace adx
{
    public class AdvertEndpoints
    {
        public static AdvertResponse GetAdverts(RouteData routeData)
        {
            var page = routeData.Values.ContainsKey("page") ? routeData.Values["page"].ToString() : "1";
            var result = new AdvertResponse() { Data = AdvertService.GetAdverts(null, page) };
            return result;
        }

        public static AdvertResponse GetAdvert(RouteData routeData)
        {
            var id = routeData.Values.ContainsKey("id") ? routeData.Values["id"].ToString() : null;
            var result = new AdvertResponse() { Data = AdvertService.GetAdvert(id) };
            return result;
        }
    }
}



