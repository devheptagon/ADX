using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
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

        //public static async Task SaveMetaRequestResponse(MetaRequest request, MetaResponse response)
        //{
        //    await Task.Run(() =>
        //    {
        //        // do somethign
        //    });
        //}


    }
}
