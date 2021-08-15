using adx.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Security.Claims;
using System.Text;

namespace adx
{
    //v1
    [Route("[controller]")]
    [ApiController]
    public partial class v1Controller : ControllerBase
    {
        public v1Controller() { }

        [Authorize]
        [HttpPost("upload")]
        [Consumes("multipart/form-data")]
        [RequestFormLimits(ValueLengthLimit = int.MaxValue, MultipartBodyLengthLimit = long.MaxValue)]
        public string UploadFile([FromForm(Name = "file")] IFormFile file)
        {
            return AppHelper.Upload(file);
        }

        [AllowAnonymous]
        [HttpGet("images/{id?}")]
        public IActionResult GetImage()
        {
            var filename = (string)RouteData.Values["id"];
            if (string.IsNullOrEmpty(filename)) return null;
            FileStream image = null;
            try
            {
                image = System.IO.File.OpenRead(AppHelper.uploadPath + filename);
            }
            catch
            {
                image = System.IO.File.OpenRead(AppHelper.assetsPath + "na.jpg");
            }

            return File(image, "image/jpeg");
        }

    }


}
