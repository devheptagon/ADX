using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System.Collections.Generic;

namespace adx
{
    public class SellerEndpoints
    {
        public static SellerResponse GetSellers(RouteData routeData)
        {
            var id = routeData.Values.ContainsKey("id") ? routeData.Values["id"].ToString() : null;
            var result = new SellerResponse() { Data = SellerService.GetSellers(id) };
            return result;
        }

        public static void AddSeller(SellerEntity entity)
        {
            SellerService.AddSeller(entity);
        }

        public static void UpdateSeller(SellerEntity entity)
        {
            SellerService.UpdateSeller(entity);
        }

        public static void DeleteSeller(RouteData routeData)
        {
            var id = routeData.Values.ContainsKey("id") ? routeData.Values["id"].ToString() : null;
            if (id != null)
            {
                SellerService.DeleteSeller(id);
            }
        }
    }
}



