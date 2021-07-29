using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
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
            var result = UserService.GetUserByCreds(login.email, passhash);
            if (result == null) return null;

            var user = new UserEntity();
            user.fullname = result.fullname;
            user.email = result.email;
            user.id = result.id;
            user.role = result.role;
            user.token = GenerateJSONWebToken(user);

            return user;
        }

        public static bool IsAdmin(HttpContext context)
        {
            var user = context.User;
            if (user == null) return false;

            //check role from db for security, not from claims
            var id = user.Claims.FirstOrDefault(c => c.Type == "Id").Value;
            var selectedUser = UserService.GetUser(id);
            return selectedUser?.FirstOrDefault().role == UserRole.Admin;
        }

        public static bool IsSeller(HttpContext context)
        {
            var user = context.User;
            if (user == null) return false;

            //check role from db for security, not from claims
            var id = user.Claims.FirstOrDefault(c => c.Type == "Id").Value;
            var selectedUser = UserService.GetUser(id);
            return selectedUser?.FirstOrDefault().role == UserRole.Seller;
        }

        public static bool IsAdvertOwner(HttpContext context, string advertId)
        {
            var user = context.User;
            if (user == null) return false;

            //check role from db for security, not from claims
            var userId = user.Claims.FirstOrDefault(c => c.Type == "Id").Value;
            return AdvertService.IsAdvertOwner(userId, advertId);
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
                return sb.ToString();
            }
        }


    }
}
