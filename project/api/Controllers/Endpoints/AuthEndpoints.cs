using adx.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System.Collections.Generic;

namespace adx
{
    public class AuthEndpoints
    {
        public static UserEntity Login(UserEntity login)
        {
            return AppHelper.AuthenticateUser(login);
        }
    }
}



