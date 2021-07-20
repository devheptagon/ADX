using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System.Collections.Generic;

namespace adx
{
    public class SellerEndpoints
    {
        public static SellerResponse GetSellers(RouteData routeData)
        {
            var page = routeData.Values.ContainsKey("page") ? routeData.Values["page"].ToString() : null;
            if (page == null)
            {
                var data = SellerService.GetSellers(null);
                return new SellerResponse() { Data = data, Count = data.Count, Page = -1 };
            }
            else
            {
                var data = SellerService.GetSellers(page);
                var count = SellerService.GetSellers(null).Count;
                return new SellerResponse() { Data = data, Count = count, Page = int.Parse(page) };
            }
        }

        public static SellerResponse GetSeller(RouteData routeData)
        {
            var id = routeData.Values.ContainsKey("id") ? routeData.Values["id"].ToString() : null;
            var result = new SellerResponse() { Data = SellerService.GetSeller(id) };
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



