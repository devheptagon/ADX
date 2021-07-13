using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System.Collections.Generic;

namespace adx
{
    public class TagEndpoints
    {
        public static TagResponse GetTags(RouteData routeData)
        {
            var id = routeData.Values.ContainsKey("id") ? routeData.Values["id"].ToString() : null;
            var result = new TagResponse() { Data = TagService.GetTags(id) };
            return result;
        }

        public static void AddTag(TagEntity entity)
        {
            TagService.AddTag(entity);
        }

        public static void UpdateTag(TagEntity entity)
        {
            TagService.UpdateTag(entity);
        }

        public static void DeleteTag(RouteData routeData)
        {
            var id = routeData.Values.ContainsKey("id") ? routeData.Values["id"].ToString() : null;
            if (id != null)
            {
                TagService.DeleteTag(id);
            }
        }
    }
}



