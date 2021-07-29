using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System.Collections.Generic;

namespace adx
{
    public class UserEndpoints
    {
        public static UserResponse GetUsers(RouteData routeData)
        {
            var page = routeData.Values.ContainsKey("page") ? routeData.Values["page"].ToString() : null;
            if (page == null)
            {
                var data = UserService.GetUsers(null);
                return new UserResponse() { Data = data, Count = data.Count, Page = -1 };
            }
            else
            {
                var data = UserService.GetUsers(page);
                var count = UserService.GetUsers(null).Count;
                return new UserResponse() { Data = data, Count = count, Page = int.Parse(page) };
            }
        }

        public static UserResponse GetUser(RouteData routeData)
        {
            //id = seller_id or user_id
            var id = routeData.Values.ContainsKey("id") ? routeData.Values["id"].ToString() : null;

            var result = new UserResponse() { Data = UserService.GetUser(id) };
            return result;
        }

        public static void AddUser(UserEntity entity)
        {
            UserService.AddUser(entity);
        }

        public static void UpdateUser(UserEntity entity)
        {
            UserService.UpdateUser(entity);
        }

    }
}



