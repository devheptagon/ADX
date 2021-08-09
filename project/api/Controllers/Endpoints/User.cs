using adx.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace adx
{
    public partial class v1Controller : ControllerBase
    {
        [AllowAnonymous]
        [HttpGet("users")]
        [HttpGet("users/{page?}")]
        public UserResponse GetUsers()
        {
            var page = RouteData.Values.ContainsKey("page") ? RouteData.Values["page"].ToString() : null;
            if (page == null)
            {
                var data = UserService.GetUsers(null);
                return new UserResponse() { Data = data, Count = data.Count, Page = -1 };
            }
            else
            {
                var data = UserService.GetUsers(page);
                var count = UserService.GetUsers(null).Count;
                return new UserResponse() { Data = data, Count = count, Page = int.Parse(page) };
            }
        }

        [AllowAnonymous]
        [HttpGet("user/{id?}")]
        public UserResponse GetUser()
        {
            var id = RouteData.Values.ContainsKey("id") ? RouteData.Values["id"].ToString() : null;
            var userList = UserService.GetUser(id);
            if (userList.Count == 0) return null;

            var result = new UserResponse() { Data = userList };
            return result;
        }

        [Authorize]
        [HttpPost("users")]
        public void AddUser([FromBody] UserRequest request)
        {
            if (!AppHelper.IsAdmin(this.HttpContext)) return;
            UserService.AddUser(request.Data);
        }

        [Authorize]
        [HttpPatch("users")]
        public void UpdateUser([FromBody] UserRequest request)
        {
            if (!AppHelper.IsAdmin(this.HttpContext)) return;
            UserService.UpdateUser(request.Data);
        }

        [Authorize]
        [HttpGet("sellers")]
        public UserResponse GetSellers()
        {
            if (!AppHelper.IsAdmin(this.HttpContext)) return null;

            var data = UserService.GetSellers();
            return new UserResponse() { Data = data, Count = data.Count, Page = -1 };
        }

        [Authorize]
        [HttpPatch("toggle")]
        public void UpdateUserActivity([FromBody] UserRequest request)
        {
            if (!AppHelper.IsAdmin(this.HttpContext)) return;
            UserService.UpdateUserActivity(request.Data);
        }

        [AllowAnonymous]
        [HttpPost("forgot")]
        public void ForgotPassword([FromBody] UserRequest request)
        {
            var password = AppHelper.GenerateRandomPassword();
            var passhash = AppHelper.CreateMD5(password);
            UserService.ResetPassword(request.Data.email, passhash);
            //TODO: Email password (not passhash) to user email
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public void Register([FromBody] UserRequest request)
        {
            if (String.IsNullOrEmpty(request.Data.email) || String.IsNullOrEmpty(request.Data.password)) return;

            var passhash = AppHelper.CreateMD5(request.Data.password);
            //replace password with hash
            request.Data.password = passhash;
            UserService.AddUser(request.Data);
        }

        [Authorize]
        [HttpPatch("upgrade")]
        public UserEntity UpgradeUser([FromBody] UpgradeRequest request)
        {
            if (!AppHelper.IsSeller(this.HttpContext)) return null;
            var entity = request.Data;
            entity.user_id = AppHelper.GetUserIdFromClaim(HttpContext);
            return UserService.UpgradeUser(entity);
        }

    }


}
