using adx.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace adx
{
    public partial class v1Controller : ControllerBase
    {

        [Authorize]
        [HttpPost("payment")]
        public RedirectResult Payment([FromBody] PaymentRequest request)
        {
            var entity = request.Data;
            entity.user_id = AppHelper.GetUserIdFromClaim(HttpContext);
            PaymentService.AddPayment(new PaymentEntity());
            return Redirect("https://google.com"); // to stripe url
        }

        [AllowAnonymous]
        [HttpGet("success")]
        public RedirectResult RedirectSuccess()
        {
            var paymentId = PaymentService.UpdatePayment(new PaymentEntity());
            var payment = PaymentService.GetPayment(paymentId.ToString());
            UserService.UpgradeUser(payment.user_id, paymentId.ToString(), payment.months);

            return Redirect("https://google.com"); //to client success
        }

        [AllowAnonymous]
        [HttpGet("cancel")]
        public RedirectResult RedirectCancel()
        {
            PaymentService.UpdatePayment(new PaymentEntity());
            return Redirect("https://google.com"); //to client cancel
        }

    }


}
