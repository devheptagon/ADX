using Microsoft.Extensions.Configuration;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading;
using System.Threading.Tasks;

namespace adx.Services
{
    public class AppHelper
    {

        public static IConfigurationRoot config = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();

        public static string connStr = config.GetSection("ConnectionStrings")["adx"];

        //public static async Task SaveMetaRequestResponse(MetaRequest request, MetaResponse response)
        //{
        //    await Task.Run(() =>
        //    {
        //        // do somethign
        //    });
        //}

        public static string GetActiveCustomAds()
        {
            return "test ads";
        }


    }
}
