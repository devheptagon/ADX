using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System.Collections.Generic;

namespace adx
{
    public class TagEndpoints
    {
        public static TagResponse GetTags(RouteData routeData)
        {
            var page = routeData.Values.ContainsKey("page") ? routeData.Values["page"].ToString() : null;
            if (page == null)
            {
                var data = TagService.GetTags(null);
                return new TagResponse() { Data = data, Count = data.Count, Page = -1 };
            }
            else
            {
                var data = TagService.GetTags(page);
                var count = TagService.GetTags(null).Count;
                return new TagResponse() { Data = data, Count = count, Page = int.Parse(page) };
            }
        }

        public static TagResponse GetTag(RouteData routeData)
        {
            var id = routeData.Values.ContainsKey("id") ? routeData.Values["id"].ToString() : null;
            var result = new TagResponse() { Data = TagService.GetTag(id) };
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



