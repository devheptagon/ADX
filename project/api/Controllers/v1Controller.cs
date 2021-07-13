using Microsoft.AspNetCore.Mvc;

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
        [HttpGet]
        public string Get()
        {
            return "hi";
        }

        // POST /v1
        [HttpPost]
        public string Post([FromBody] MetaRequest request)
        {
            return "hi - post";
        }

        //// POST /v1/adclick
        //[HttpPost("adclick")]
        //public AdClickResponse AdClickHandler([FromBody] AdClickRequest request)
        //{
        //    return base.AdClickHandler(request, false);
        //}

    }


}
