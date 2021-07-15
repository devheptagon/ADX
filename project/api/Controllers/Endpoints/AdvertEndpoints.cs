using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System.Collections.Generic;

namespace adx
{
    public class AdvertEndpoints
    {
        public static AdvertResponse GetAdverts(AdvertFilter filter)
        {
            var result = new AdvertResponse() { Data = AdvertService.GetAdverts(filter) };
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



