using adx.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace adx
{

    public partial class v1Controller : ControllerBase
    {
        [AllowAnonymous]
        [HttpGet("enquiries")]
        public EvaluationResponse GetEnquirys()
        {
            if (!AppHelper.IsAdmin(this.HttpContext)) return null;
            var data = EnquiryService.GetEnquirys();
            return new EvaluationResponse() { Data = data, Count = data.Count, Page = -1 };
        }

        [AllowAnonymous]
        [HttpPost("enquiries")]
        public void AddEnquiry([FromBody] EvaluationRequest request)
        {
            EnquiryService.AddEnquiry(request.Data);
        }

        [Authorize]
        [HttpDelete("enquiries/{id?}")]
        public void DeleteEnquiry()
        {
            if (!AppHelper.IsAdmin(this.HttpContext)) return;
            var id = RouteData.Values.ContainsKey("id") ? RouteData.Values["id"].ToString() : null;
            if (id != null)
            {
                EnquiryService.DeleteEnquiry(id);
            }
        }
    }


}
