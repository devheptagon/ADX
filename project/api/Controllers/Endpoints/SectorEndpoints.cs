using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System.Collections.Generic;

namespace adx
{
    public class SectorEndpoints
    {
        public static SectorResponse GetSectors(RouteData routeData)
        {
            var id = routeData.Values.ContainsKey("id") ? routeData.Values["id"].ToString() : null;
            var result = new SectorResponse() { Data = SectorService.GetSectors(id) };
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



