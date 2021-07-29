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

    public partial class v1Controller : ControllerBase
    {
        [Authorize]
        [HttpPost("validate")]
        public IActionResult ValidateToken([FromBody] ValidationRequest request)
        {
            //if token is invalid, it will throw 401 beforehand
            return Ok("valid");
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public UserEntity Login([FromBody] UserEntity login)
        {
            return AppHelper.AuthenticateUser(login);
        }
    }


}
