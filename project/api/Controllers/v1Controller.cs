using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace adx
{
    [Route("[controller]")]
    [ApiController]
    public class v1Controller : ControllerBase
    {
        public v1Controller()
        {

        }

        // GET /v1
        [HttpGet("contents")]
        public ContentResponse GetContents()
        {
            return new ContentResponse() { Data = ContentService.GetContents() };
        }


        // POST /v1
        [HttpPost("contents")]
        public string UpdateContents([FromBody] ContentRequest request)
        {
            var content = ContentService.GetContents()[0];
            content.about = request.Data.about == null ? content.about : request.Data.about;
            content.address = request.Data.address == null ? content.address : request.Data.address;
            content.email = request.Data.email == null ? content.email : request.Data.email;
            content.facebook = request.Data.facebook == null ? content.facebook : request.Data.facebook;
            content.instagram = request.Data.instagram == null ? content.instagram : request.Data.instagram;
            content.linkedin = request.Data.linkedin == null ? content.linkedin : request.Data.linkedin;
            content.phone = request.Data.phone == null ? content.phone : request.Data.phone;
            content.terms = request.Data.terms == null ? content.terms : request.Data.terms;
            content.twitter = request.Data.twitter == null ? content.twitter : request.Data.twitter;
            content.youtube = request.Data.youtube == null ? content.youtube : request.Data.youtube;

            ContentService.UpdateContent(content);
            return "OK";
        }

        //// POST /v1/adclick
        //[HttpPost("adclick")]
        //public AdClickResponse AdClickHandler([FromBody] AdClickRequest request)
        //{
        //    return base.AdClickHandler(request, false);
        //}

    }


}
