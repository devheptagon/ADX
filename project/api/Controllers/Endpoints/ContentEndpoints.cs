using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace adx
{
    public class ContentEndpoints
    {
        public static ContentResponse GetContents()
        {
            return new ContentResponse() { Data = ContentService.GetContents() };
        }

        public static string UpdateContents(ContentRequest request)
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
    }
}
