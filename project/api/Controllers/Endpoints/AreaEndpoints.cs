using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System.Collections.Generic;

namespace adx
{
    public class AreaEndpoints
    {
        public static AreaResponse GetAreas(RouteData routeData)
        {
            var id = routeData.Values.ContainsKey("id") ? routeData.Values["id"].ToString() : null;
            var result = new AreaResponse() { Data = AreaService.GetAreas(id) };
            return result;
        }

        public static void AddArea(AreaEntity entity)
        {
            AreaService.AddArea(entity);
        }

        public static void UpdateArea(AreaEntity entity)
        {
            AreaService.UpdateArea(entity);
        }

        public static void DeleteArea(RouteData routeData)
        {
            var id = routeData.Values.ContainsKey("id") ? routeData.Values["id"].ToString() : null;
            if (id != null)
            {
                AreaService.DeleteArea(id);
            }
        }
    }
}



