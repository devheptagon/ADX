using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System.Collections.Generic;

namespace adx
{
    public class AdvertEndpoints
    {
        public static AdvertResponse GetAdverts(RouteData routeData)
        {
            var id = routeData.Values.ContainsKey("id") ? routeData.Values["id"].ToString() : null;
            var result = new AdvertResponse() { Data = AdvertService.GetAdverts(id) };
            return result;
        }
    }
}



