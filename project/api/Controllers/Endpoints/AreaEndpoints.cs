using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System.Collections.Generic;

namespace adx
{
    public class AreaEndpoints
    {
        public static AreaResponse GetAreas(RouteData routeData)
        {
            var page = routeData.Values.ContainsKey("page") ? routeData.Values["page"].ToString() : null;
            if (page == null)
            {
                var data = AreaService.GetAreas(null);
                return new AreaResponse() { Data = data, Count = data.Count, Page = -1 };
            }
            else
            {
                var data = AreaService.GetAreas(page);
                var count = AreaService.GetAreas(null).Count;
                return new AreaResponse() { Data = data, Count = count, Page = int.Parse(page) };
            }
        }

        public static AreaResponse GetArea(RouteData routeData)
        {
            var id = routeData.Values.ContainsKey("id") ? routeData.Values["id"].ToString() : null;
            var result = new AreaResponse() { Data = AreaService.GetArea(id) };
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



