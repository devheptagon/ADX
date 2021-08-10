using adx.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace adx
{

    public partial class v1Controller : ControllerBase
    {
        [Authorize]
        [HttpGet("messages")]
        public MessageResponse GetMessages()
        {
            var userId = AppHelper.GetUserIdFromClaim(HttpContext);
            var data = MessageService.GetMessages(userId);
            return new MessageResponse() { Data = data, Count = data.Count, Page = -1 };
        }

        [Authorize]
        [HttpPost("messages")]
        public void AddMessage([FromBody] MessageRequest request)
        {
            var userId = AppHelper.GetUserIdFromClaim(HttpContext);
            var message = request.Data;
            message.sender = userId;
            MessageService.AddMessage(message);
        }

        [Authorize]
        [HttpPatch("messages")]
        public void UpdateSeenMessages()
        {
            var userId = AppHelper.GetUserIdFromClaim(HttpContext);
            MessageService.UpdateSeenMessages(userId);
        }

    }


}
