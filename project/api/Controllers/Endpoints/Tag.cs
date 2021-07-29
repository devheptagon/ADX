using adx.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace adx
{

    public partial class v1Controller : ControllerBase
    {
        [AllowAnonymous]
        [HttpGet("tags")]
        [HttpGet("tags/{page?}")]
        public TagResponse GetTags()
        {
            var page = RouteData.Values.ContainsKey("page") ? RouteData.Values["page"].ToString() : null;
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

        [AllowAnonymous]
        [HttpGet("tag/{id?}")]
        public TagResponse GetTag()
        {
            var id = RouteData.Values.ContainsKey("id") ? RouteData.Values["id"].ToString() : null;
            var result = new TagResponse() { Data = TagService.GetTag(id) };
            return result;
        }

        [Authorize]
        [HttpPost("tags")]
        public void AddTag([FromBody] TagRequest request)
        {
            if (!AppHelper.IsAdmin(this.HttpContext)) return;
            TagService.AddTag(request.Data);
        }

        [Authorize]
        [HttpPatch("tags")]
        public void UpdateTag([FromBody] TagRequest request)
        {
            if (!AppHelper.IsAdmin(this.HttpContext)) return;
            TagService.UpdateTag(request.Data);
        }

        [Authorize]
        [HttpDelete("tags/{id?}")]
        public void DeleteTag()
        {
            if (!AppHelper.IsAdmin(this.HttpContext)) return;
            var id = RouteData.Values.ContainsKey("id") ? RouteData.Values["id"].ToString() : null;
            if (id != null)
            {
                TagService.DeleteTag(id);
            }
        }
    }


}
