using adx.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using Stripe;
using System.Collections.Generic;

namespace adx
{
    public partial class v1Controller : ControllerBase
    {

        [Authorize]
        [HttpPost("payment")]
        public RedirectResult Payment([FromBody] PaymentRequest request)
        {
            var userId = AppHelper.GetUserIdFromClaim(HttpContext);
            var paymentToken = Guid.NewGuid().ToString();
            var option = AppHelper.PaymentOptions.Where(op => op.Item1 == request.Data.months).First();
            var stripeUrl = AppHelper.CreateStripeSession(userId, paymentToken, option.Item2, option.Item3);

            var entity = request.Data;
            entity.token = paymentToken;
            entity.months = option.Item1;
            entity.amount = option.Item3.ToString();
            entity.ip = HttpContext.Connection.RemoteIpAddress.ToString();
            entity.user_id = userId;

            PaymentService.AddPayment(entity);
            return Redirect(stripeUrl);
        }

        [AllowAnonymous]
        [HttpGet("success")]
        public RedirectResult RedirectSuccess(string uid, string token)
        {
            var entity = new PaymentEntity();
            entity.user_id = uid;
            entity.token = token;
            entity.status = "success";
            var paymentId = PaymentService.UpdatePayment(entity);

            var payment = PaymentService.GetPayment(paymentId.ToString());
            UserService.UpgradeUser(payment.user_id, paymentId.ToString(), payment.months);

            return Redirect("https://google.com"); //to client success
        }

        [AllowAnonymous]
        [HttpGet("cancel")]
        public RedirectResult RedirectCancel(string uid, string token)
        {
            var entity = new PaymentEntity();
            entity.user_id = uid;
            entity.token = token;
            entity.status = "cancel";
            PaymentService.UpdatePayment(entity);

            return Redirect("https://yahoo.com"); //to client cancel
        }

    }


}
