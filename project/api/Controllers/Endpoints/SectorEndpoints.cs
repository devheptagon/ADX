using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System.Collections.Generic;

namespace adx
{
    public class SectorEndpoints
    {
        public static SectorResponse GetSectors(RouteData routeData)
        {
            var page = routeData.Values.ContainsKey("page") ? routeData.Values["page"].ToString() : null;
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

        public static SectorResponse GetSector(RouteData routeData)
        {
            var id = routeData.Values.ContainsKey("id") ? routeData.Values["id"].ToString() : null;
            var result = new SectorResponse() { Data = SectorService.GetSector(id) };
            return result;
        }

        public static void AddSector(SectorEntity entity)
        {
            SectorService.AddSector(entity);
        }

        public static void UpdateSector(SectorEntity entity)
        {
            SectorService.UpdateSector(entity);
        }

        public static void DeleteSector(RouteData routeData)
        {
            var id = routeData.Values.ContainsKey("id") ? routeData.Values["id"].ToString() : null;
            if (id != null)
            {
                SectorService.DeleteSector(id);
            }
        }
    }
}



