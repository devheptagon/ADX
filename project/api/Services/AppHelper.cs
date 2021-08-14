using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Stripe;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace adx.Services
{
    public class AppHelper
    {
        public static IConfigurationRoot config = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();

        public static string uploadPath = config.GetSection("UploadPath").Value;

        public static string assetsPath = config.GetSection("AssetsPath").Value;

        public static string stripePrivateKey = config.GetSection("StripePrivateKey").Value;

        public static string serverUrl = config.GetSection("ServerUrl").Value;

        public static string clientUrl = config.GetSection("ClientUrl").Value;

        public static List<Tuple<string, string, int>> PaymentOptions = new List<Tuple<string, string, int>>()
        {
            new Tuple<string, string, int>("1", "1 month Linxbiz membership", 699),   //in cents (or pence)
            new Tuple<string, string, int>("6", "6 months Linxbiz membership", 3499),
            new Tuple<string, string, int>("12", "12 months Linxbiz membership", 6999),
        };


        public static string Upload(IFormFile file)
        {
            if (file == null) return "";
            string newFileName = DateTime.Now.ToString("yyyyMMddHHmmss") + ".jpg";
            string path = uploadPath + newFileName;
            try
            {
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
            }
            catch (Exception exp)
            {
                //return exp.Message;
            }

            return newFileName;
        }

        public static string GenerateJSONWebToken(UserEntity userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim("Id", userInfo.id.ToString()),
                new Claim("Fullname", userInfo.fullname),
                new Claim("Role", userInfo.role),
                new Claim("Email", userInfo.email),
            };

            var token = new JwtSecurityToken(config["Jwt:Issuer"],
              config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(double.Parse(config["Jwt:ValidInMinutes"])),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public static UserEntity AuthenticateUser(UserEntity login)
        {
            var passhash = CreateMD5(login.password);
            var user = UserService.GetUserByCreds(login.email, passhash);
            if (user == null || !user.active) return null;
            user.password = null;
            user.token = GenerateJSONWebToken(user);

            return user;
        }

        public static bool IsAdmin(HttpContext context)
        {
            var user = context.User;
            if (user == null) return false;

            //check role from db for security, not from claims
            var id = GetUserIdFromClaim(context);
            var selectedUser = UserService.GetUser(id);

            return selectedUser?.FirstOrDefault().role == UserRole.Admin;
        }

        public static bool IsSeller(HttpContext context)
        {
            var user = context.User;
            if (user == null) return false;

            //check role from db for security, not from claims
            var id = GetUserIdFromClaim(context);
            var selectedUser = UserService.GetUser(id);

            return selectedUser?.FirstOrDefault().role == UserRole.Seller;
        }

        public static string CreateMD5(string input)
        {
            // Use input string to calculate MD5 hash
            using (System.Security.Cryptography.MD5 md5 = System.Security.Cryptography.MD5.Create())
            {
                byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(input);
                byte[] hashBytes = md5.ComputeHash(inputBytes);

                // Convert the byte array to hexadecimal string
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < hashBytes.Length; i++)
                {
                    sb.Append(hashBytes[i].ToString("X2"));
                }
                return sb.ToString().ToLower();
            }
        }

        public static string GetUserIdFromClaim(HttpContext context)
        {
            var user = context.User;
            if (user == null) return null;
            return user.Claims.FirstOrDefault(c => c.Type == "Id").Value;
        }

        public static string GenerateRandomPassword()
        {
            const string valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            var random = new Random();
            var letter = valid[random.Next(0, valid.Length - 1)].ToString();
            var pos = random.Next(0, 5);
            var number = random.Next(100000, 999999);
            return number.ToString().Insert(pos, letter);
        }

        public static string CreateStripeSession(string userId, string token, string desc, int amount)
        {
            var client = new StripeClient(stripePrivateKey);
            var sessionService = new Stripe.Checkout.SessionService(client);
            var options = new Stripe.Checkout.SessionCreateOptions()
            {
                PaymentMethodTypes = new List<string>() { "card" },
                Mode = "payment",
                SuccessUrl = serverUrl + "success?uid=" + userId + "&token=" + token,
                CancelUrl = serverUrl + "cancel?uid=" + userId + "&token=" + token,
                LineItems = new List<Stripe.Checkout.SessionLineItemOptions>()
                {
                    new Stripe.Checkout.SessionLineItemOptions()
                    {
                        Name=desc,
                        Amount=amount,
                        Currency="gbp",
                        Quantity=1
                    }
                }
            };
            var session = sessionService.Create(options);
            return session.Url;
        }
    }
}
