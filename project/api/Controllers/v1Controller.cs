using adx.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace adx
{
    //v1
    [Route("[controller]")]
    [ApiController]
    public class v1Controller : ControllerBase
    {
        public v1Controller() { }

        [Authorize]
        [HttpPost("validate")]
        public IActionResult ValidateToken([FromBody] ValidationRequest request)
        {
            //if token is invalid, it will throw 401 beforehand
            return Ok("valid");
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public User Login([FromBody] User login)
        {
            return AuthEndpoints.Login(login);
        }

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
            var image = System.IO.File.OpenRead(AppHelper.uploadPath + filename);
            return File(image, "image/jpeg");
        }

        [AllowAnonymous]
        [HttpPost("eval")]
        public void SaveEvaluationRequest([FromBody] EvaluationRequest request)
        {
            //todo: evaluationrequesti html olarak mail at
        }

        #region Content Endpoints
        [AllowAnonymous]
        [HttpGet("contents")]
        public ContentResponse GetContents() { return ContentEndpoints.GetContents(); }

        [Authorize]
        [HttpPatch("contents")]
        public string UpdateContents([FromBody] ContentRequest request)
        {
            if (!AppHelper.IsAdmin(this.HttpContext)) return null;
            return ContentEndpoints.UpdateContents(request);
        }
        #endregion

        #region Advert Endpoints
        [AllowAnonymous]
        [HttpPost("adverts")]
        public AdvertResponse GetAdverts([FromBody] AdvertFilter request)
        {
            return AdvertEndpoints.GetAdverts(request);
        }

        [AllowAnonymous]
        [HttpGet("advert/{id?}")]
        public AdvertResponse GetAdvert() { return AdvertEndpoints.GetAdvert(RouteData); }
        #endregion

        #region Seller Endpoints
        [AllowAnonymous]
        [HttpGet("sellers")]
        [HttpGet("sellers/{page?}")]
        public SellerResponse GetSellers() { return SellerEndpoints.GetSellers(RouteData); }

        [AllowAnonymous]
        [HttpGet("seller/{id?}")]
        public SellerResponse GetSeller() { return SellerEndpoints.GetSeller(RouteData); }

        [Authorize]
        [HttpPost("sellers")]
        public void AddSeller([FromBody] SellerRequest request)
        {
            if (!AppHelper.IsAdmin(this.HttpContext)) return;
            SellerEndpoints.AddSeller(request.Data);
        }

        [Authorize]
        [HttpPatch("sellers")]
        public void UpdateSeller([FromBody] SellerRequest request)
        {
            if (!AppHelper.IsAdmin(this.HttpContext)) return;
            SellerEndpoints.UpdateSeller(request.Data);
        }

        [Authorize]
        [HttpDelete("sellers/{id?}")]
        public void DeleteSeller()
        {
            if (!AppHelper.IsAdmin(this.HttpContext)) return;
            SellerEndpoints.DeleteSeller(RouteData);
        }
        #endregion        

        #region Sector Endpoints
        [AllowAnonymous]
        [HttpGet("sectors")]
        [HttpGet("sectors/{page?}")]
        public SectorResponse GetSectors() { return SectorEndpoints.GetSectors(RouteData); }

        [AllowAnonymous]
        [HttpGet("sector/{id?}")]
        public SectorResponse GetSector() { return SectorEndpoints.GetSector(RouteData); }

        [Authorize]
        [HttpPost("sectors")]
        public void AddSector([FromBody] SectorRequest request)
        {
            if (!AppHelper.IsAdmin(this.HttpContext)) return;
            SectorEndpoints.AddSector(request.Data);
        }

        [Authorize]
        [HttpPatch("sectors")]
        public void UpdateSector([FromBody] SectorRequest request)
        {
            if (!AppHelper.IsAdmin(this.HttpContext)) return;
            SectorEndpoints.UpdateSector(request.Data);
        }

        [Authorize]
        [HttpDelete("sectors/{id?}")]
        public void DeleteSector()
        {
            if (!AppHelper.IsAdmin(this.HttpContext)) return;
            SectorEndpoints.DeleteSector(RouteData);
        }
        #endregion

        #region Tag Endpoints
        [AllowAnonymous]
        [HttpGet("tags")]
        [HttpGet("tags/{page?}")]
        public TagResponse GetTags() { return TagEndpoints.GetTags(RouteData); }

        [AllowAnonymous]
        [HttpGet("tag/{id?}")]
        public TagResponse GetTag() { return TagEndpoints.GetTag(RouteData); }

        [Authorize]
        [HttpPost("tags")]
        public void AddTag([FromBody] TagRequest request)
        {
            if (!AppHelper.IsAdmin(this.HttpContext)) return;
            TagEndpoints.AddTag(request.Data);
        }

        [Authorize]
        [HttpPatch("tags")]
        public void UpdateTag([FromBody] TagRequest request)
        {
            if (!AppHelper.IsAdmin(this.HttpContext)) return;
            TagEndpoints.UpdateTag(request.Data);
        }

        [Authorize]
        [HttpDelete("tags/{id?}")]
        public void DeleteTag()
        {
            if (!AppHelper.IsAdmin(this.HttpContext)) return;
            TagEndpoints.DeleteTag(RouteData);
        }

        #endregion
    }


}
